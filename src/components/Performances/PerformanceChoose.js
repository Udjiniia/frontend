import React, {useEffect, useRef, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {instance, url} from "../../axios.js";
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import {useNavigate} from 'react-router-dom';
import Select from "@mui/material/Select";
import {MenuItem} from "@mui/material";
import {HallSlot} from "../Schedules/HallSlot";
import {SessionForm} from "../Schedules/SessionForm";
import {wait} from "@testing-library/user-event/dist/utils";

String.prototype.trimPart = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}

export const PerformanceChoose = (props) => {
        const navigation = useNavigate()
        let now = new Date()
        now = now.toISOString().split('T')[0]
        const [errorMsg, setErrorMsg] = useState("")
        const [timeFull, setTimeFull] = useState("2023-05-01T00:00:00.000+00:00")
        const [hall, setHall] = useState("")
        const [show, setShow] = useState("")
        const [performanceAvatarUrl, setPerformanceAvatarUrl] = useState("/uploads/show.jpg")
        const [time, setTime] = useState(timeFull.trimPart(11, 16))
        const [date, setDate] = useState(now)
        const [details, setDetails] = useState("")
        const [interval, setInterval] = useState("10")
        const performance = props.performance
        const inputFileRef = useRef(null);
        const [shows, setShows] = useState([])
        const [slots, setSlots] = useState([])
        const [sessions, setSessions] = useState([])
        const [counts, setCounts] = useState([])
        const [rows, setRows] = useState([])
        const [prices, setPrices] = useState([])
        const [workers, setWorkers] = useState([])



        const {handleSubmit, formState: {errors}} = useForm({})

        String.prototype.replaceAt = function (index, replacement) {
            return this.substring(0, index) + replacement + this.substring(index + replacement.length);
        }


        const performanceSubmit = () => {
            if (sessions) {
                try {
                    instance.post('/performance/create', {
                        performanceTime: timeFull,
                        details: details,
                        hall: hall,
                        show: show,
                        performanceAvatarUrl: performanceAvatarUrl,
                        prices: prices,
                        sessions: sessions.slice(0, counts.length),
                        interval: interval
                    }).then(res => {
                        navigation('/performances', {
                            state: {
                                msg: `You have created new performance on ${timeFull.trimPart(0, 10)} ${timeFull.trimPart(11, 16)}`,
                            }
                        });
                    }).catch(error => {
                        if (error.response.status === 400) {
                            const msg = error.response.data[0];
                            setErrorMsg(msg.msg);
                        } else {
                            setErrorMsg(error.response.data.message);
                        }
                    })
                } catch (error) {
                    if (error.response) {
                        console.log(error.response.data.message);
                    }
                }
            }
        }


        const getWorkers = () => {
            try {
                instance.get(`/employee/workers/active`).then(res => {
                    setWorkers(res.data)
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
        const getShows = () => {
            try {
                instance.get(`/show/all`).then(res => {
                    setShows(res.data)
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
                    show: show,
                    sessions: sessions.slice(0, counts.length),
                    hall: null
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


        useEffect(() => {
            if (performance) {
                setTimeFull(performance.performanceTime)
                setShow(performance.show)
                setHall(performance.hall)
                setDetails(performance.details)
            }
        }, [show])


        useEffect(() => {
            setTimeFull(timeFull.replaceAt(0, date))
        }, [date])

        useEffect(() => {
            setTimeFull(timeFull.replaceAt(11, time))
        }, [time])

        useEffect(() => {
            if (hall) {
                const rows = []
                for (let i = 1; i <= parseInt(hall.rows); i++) {
                    rows.push(i)
                }
                setRows(rows)
                setPrices(rows)
            }
        }, [hall])


        function changePrices(index, price) {
            const newArr = [...prices]
            newArr[index - 1] = price;
            setPrices(newArr)
        }


        function changeSession(index, session) {
            if (sessions.length !== 0) {
                const newArr = [...sessions]
                newArr[index - 1] = session;
                setSessions(newArr)
            } else {
                setSessions(session)
            }
        }


        const handleChangeFile = async (event) => {
            try {
                const formData = new FormData();
                const file = event.target.files[0];
                formData.append("image", file);
                const {data} = await instance.post("/upload", formData)
                setPerformanceAvatarUrl(data.url)
            } catch
                (error) {
                alert("Couldn`t upload the image")
                if (error.response) {
                    console.log(error.response.data.message);
                }
            }
        }


        return (
            <div>
                <div className="Auth-form-container">
                    <form onSubmit={handleSubmit(performanceSubmit)} className="form">
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">{"Create a new performance"}</h3>
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
                                <label>Show</label>
                                <Select
                                    required
                                    id={"show"}
                                    type="text"
                                    onChange={e => setShow(e.target.value)}
                                    onMouseEnter={() => {
                                        getShows()
                                    }}
                                    className="form-control mt-sm-0"
                                    placeholder="Enter show"
                                    error={Boolean(errors.show?.message)}
                                    helperText={errors.show?.message}
                                >
                                    {shows ? shows.map((s) => (
                                        <MenuItem value={`${s._id}`}>{s.name} ({s.author})</MenuItem>)) : ""}

                                </Select>
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
                            <div className="form-group mt-sm-0">
                                <label>Details</label>
                                <TextField
                                    required
                                    id={""}
                                    type="text"
                                    value={details}
                                    onChange={e => setDetails(e.target.value)}
                                    className="form-control mt-sm-0"
                                    placeholder="Enter details"
                                    error={Boolean(errors.details?.message)}
                                    helperText={errors.details?.message}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="button" onClick={() => inputFileRef.current.click()}
                                        className="btn btn-outline-primary">
                                    Upload avatar
                                </button>
                            </div>
                            <input ref={inputFileRef} type="file" accept="image/*" onChange={handleChangeFile} hidden/>
                            {performanceAvatarUrl !== "/uploads/show.jpg" && performanceAvatarUrl !== "" && (
                                <div className="d-grid gap-2 mt-3">
                                    <button type="button" onClick={() => setPerformanceAvatarUrl("/uploads/show.jpg")}
                                            className="btn btn-outline-primary">
                                        Remove avatar
                                    </button>
                                    <div className={"d-flex justify-content-center header"}>
                                        <img alt="Uploaded" src={`${url}${performanceAvatarUrl}`}
                                             style={{
                                                 borderRadius: "5%",
                                                 width: "200px",
                                                 height: "200px",
                                                 objectFit: "cover"
                                             }}/>
                                    </div>
                                </div>
                            )}
                            <div className="d-grid gap-2 mt-3">
                                <button onClick={() => {
                                    setCounts([...counts, counts.length + 1])
                                    getWorkers()
                                }} type="button" className="btn btn-primary">
                                    Add worker for the performance
                                </button>
                                <button onClick={() => {
                                    setCounts(counts.slice(0, -1))
                                    setSessions(sessions.slice(0, counts.length - 1))
                                }} type="button" className="btn btn-primary">
                                    Remove worker for the performance
                                </button>
                            </div>
                            {
                                counts ? counts.map((c) =>
                                    <SessionForm key={c} adding={(s) => {
                                        changeSession(c, s)
                                    }} workers={workers}></SessionForm>) : ""
                            }
                            {!hall ?
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
                                    <div>
                                        {hall && rows ? rows.map((r) =>
                                            <div className="form-group mt-sm-0">
                                                <label>Row {r} price</label>
                                                <TextField
                                                    required
                                                    id={`price${r}`}
                                                    type="number"
                                                    value={prices[r - 1]}
                                                    onChange={e => changePrices(r, e.target.value)}
                                                    className="form-control mt-sm-0"
                                                    placeholder={`Enter row ${r} price`}
                                                />
                                            </div>
                                        ) : ""
                                        }
                                        <div className=" forgot-password text-right mt-2" style={{color: 'red'}}>
                                            {errorMsg}
                                        </div>
                                    </div>
                                    {hall && rows ?
                                        <div className="d-grid gap-2 mt-3">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div> : ""}
                                </div>
                            </div>
                        </div>
                        <p>
                        </p>
                    </form>
                </div>
            </div>)
    }
;