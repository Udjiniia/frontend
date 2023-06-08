import React, {useEffect, useRef, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {instance, url} from "../../axios.js";
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import {Link, useNavigate} from 'react-router-dom';
import Select from "@mui/material/Select";
import {MenuItem} from "@mui/material";
import {HallSlot} from "../Schedules/HallSlot";
import {useParams} from "react-router";
import {Performance} from "./Performance";

String.prototype.trimPart = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}

export const PerformanceReplace = (props) => {
        const {id} = useParams();
        const schedule = props.schedule
        const buying = props.buying
        const navigation = useNavigate()
        let now = new Date()
        now = now.toISOString().split('T')[0]
        const [timeFull, setTimeFull] = useState(now + "T00:00:00.000+00:00")
        const [hall, setHall] = useState()
        const [performances, setPerformances] = useState([])
        const [date, setDate] = useState(now)
        const [interval, setInterval] = useState("10")
        const [performance, setPerformance] = useState()
        const [slots, setSlots] = useState()
        const [sessions, setSessions] = useState()
        const [rows, setRows] = useState([])
        const [prices, setPrices] = useState([])
        const [performanceNew, setPerformanceNew] = useState()
        const [optionNew, setOptionNew] = useState()
        const [data, setData] = useState(false)


        const {handleSubmit, formState: {errors}} = useForm({})

        String.prototype.replaceAt = function (index, replacement) {
            return this.substring(0, index) + replacement + this.substring(index + replacement.length);
        }


        const performanceSubmit = () => {
            if (sessions) {
                try {
                    instance.post(`/performance/reschedule/${id}`, {
                        performanceTime: timeFull,
                        details: performance.details,
                        hall: hall._id,
                        show: performance.show._id,
                        prices: prices,
                        sessions: sessions,
                        interval: interval,
                        performanceAvatarUrl: performance.performanceAvatarUrl
                    }).then(res => {
                        navigation('/performances', {
                            state: {
                                msg: `You have created replacement performance on ${timeFull.trimPart(0, 10)} ${timeFull.trimPart(11, 16)}`,
                            }
                        });
                    })
                } catch (error) {
                    if (error.response) {
                        console.log(error.response.data.message);
                    }
                }
            }
        }

        const replacePerformance = () => {
            if (performanceNew) {
                try {
                    instance.post(`/performance/replace-performance/${id}`, {
                        id: performanceNew._id
                    }).then(res => {
                        navigation('/performances', {
                            state: {
                                msg: `You have moved tickets to another performance on ${performanceNew.performanceTime.trimPart(0, 10)} ${performanceNew.performanceTime.trimPart(11, 16)}`,
                            }
                        })
                    })
                } catch (error) {
                    if (error.response) {
                        console.log(error.response.data.message);
                    }
                }
            }
        }

        const getPerformances = () => {
            try {
                instance.get(`/performance/replace/${id}`).then(res => {
                    setPerformances(res.data)
                })
                    .catch(error => {
                        console.log(error.response.data.message);
                    })
            } catch
                (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                }
            }
        }


        const getTickets = () => {
            try {
                instance.get(`/ticket/tickets/${id}`).then(res => {
                    const tickets = []
                    for (const t of res.data) {
                        if (t.seat === 1) {
                            tickets.push(t.price)
                        }
                    }
                    setPrices(tickets)
                })
                    .catch(error => {
                        console.log(error.response.data.message);
                    })
            } catch
                (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                }
            }
        }


        const getSessions = () => {
            try {
                instance.get(`/schedule/sessions/${id}`).then(res => {
                    const sessions = []
                    for (const s of res.data) {
                        sessions.push([s.worker._id, s.salary, s.role])
                    }
                    setSessions(sessions)
                })
                    .catch(error => {
                        console.log(error.response.data.message);
                    })
            } catch
                (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                }
            }
        }


        const getSlots = () => {
            try {
                instance.post(`/schedule/slots`, {
                    interval: interval,
                    date: date,
                    show: performance.show,
                    sessions: sessions,
                    hall: performance.hall
                }).then(res => {
                    setSlots(res.data)
                })
                    .catch(error => {
                        console.log(error.response.data.message);
                    })
            } catch
                (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                }
            }

        }

        const getPerformance = () => {
            try {
                instance.get(`/performance/${id}`).then(res => {
                    setPerformance(res.data)
                })
                    .catch(error => {
                        console.log(error.response.data.message);
                    })
            } catch
                (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                }
            }
        }


        useEffect(() => {
            getPerformance()
            getSessions()
        }, [])

        useEffect(() => {
            getTickets()
            if (performance) {
                setData(true)
            }
        }, [performance])

        useEffect(() => {
            replacePerformance()
        }, [performanceNew])


        return (
            <div>
                {data ?
                    <div>
                        <div className="Auth-form-container">
                            <form onSubmit={handleSubmit(performanceSubmit)} className="form">
                                <div className="Auth-form-content">
                                    {performance ?
                                        <Performance buying={buying} schedule={schedule} performance={performance}
                                                     key={performance._id}/> : ""}
                                    <h3 className="Auth-form-title">{"Reschedule a performance"}</h3>
                                    <div className={"d-flex justify-content-center"}>
                                        <button onClick={() => {
                                            setOptionNew(true)
                                        }} style={{marginTop: "10px", marginRight: "10px"}}
                                                className="btn btn-primary btn-lg ">
                                            {"New performance"}
                                        </button>
                                        <button onClick={() => {
                                            setOptionNew(false)
                                            getPerformances()
                                        }} style={{marginTop: "10px"}} className="btn btn-primary btn-lg ">
                                            {"Existing performance"}
                                        </button>
                                    </div>
                                    {optionNew ? <>
                                        <div className="form-group mt-sm-0">
                                            <label>Date</label>
                                            <TextField
                                                required
                                                id={""}
                                                type="date"
                                                value={date}
                                                onChange={e => setDate(e.target.value)}
                                                className="form-control mt-sm-0"
                                                placeholder="Enter date"
                                                error={Boolean(errors.date?.message)}
                                                helperText={errors.date?.message}
                                            />
                                        </div>
                                        <div className="form-group mt-sm-0">
                                            <label>Interval</label>
                                            <Select
                                                required
                                                id={"interval"}
                                                type="text"
                                                onChange={e => setInterval(e.target.value)}
                                                className="form-control mt-sm-0"
                                                placeholder="Enter interval"
                                                error={Boolean(errors.interval?.message)}
                                                helperText={errors.interval?.message}
                                            >
                                                <MenuItem value={10}>10</MenuItem>
                                                <MenuItem value={20}>20</MenuItem>
                                                <MenuItem value={30}>30</MenuItem>
                                                <MenuItem value={40}>40</MenuItem>
                                                <MenuItem value={50}>50</MenuItem>
                                                <MenuItem value={60}>60</MenuItem>

                                            </Select>
                                        </div>
                                    </> : <>{performances ? performances.map((p) => (<>
                                        <Performance buying={buying} schedule={schedule} performance={p}
                                                     key={p._id}/>
                                        <div className="d-grid gap-2 mt-3">
                                            <button onClick={() => {
                                                setPerformanceNew(p)
                                            }} type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </>)) : ""}</>
                                    }
                                    {!hall && optionNew ?
                                        <div className="d-grid gap-2 mt-3">
                                            <button onClick={() => {
                                                getSlots()
                                            }} type="button" className="btn btn-primary">
                                                Get slots
                                            </button>
                                        </div> : ""}
                                    <div className={"d-flex justify-content-center"}>
                                        <div id={"gallery"} className={"gallery"}>
                                            {
                                                slots && !hall ? slots.map((s) =>
                                                    <HallSlot time={(time) => {
                                                        setTimeFull(time)
                                                    }} hall={(hall) => {
                                                        setHall(hall)
                                                    }} slot={s}></HallSlot>) : ""


                                            }
                                            {hall ? <>
                                                <div className={"d-flex justify-content-center"}>
                                                    <div className="d-grid gap-2 mt-3">
                                                        <h5> Зала: {hall.name} &nbsp; </h5>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className={"d-flex justify-content-center"}>
                                                    <div className="d-grid gap-2 mt-3">
                                                        <h5> Час: {timeFull.trimPart(11, 16)}</h5>
                                                    </div>
                                                </div>
                                            </> : ""
                                            }
                                            {hall && rows ?
                                                <div className="d-grid gap-2 mt-3">
                                                    <button style={{marginLeft: "10px"}} type="submit"
                                                            className="btn btn-primary">
                                                        Submit
                                                    </button>
                                                </div> : ""}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div> : ""}
            </div>)
    }
;