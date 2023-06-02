import React, {useState, useEffect} from "react";
import {instance} from "../../axios";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import {WorkSession} from "./WorkSession";

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

export const EmployeesSchedule = () => {;
    const [schedule, setSchedule] = useState([])
    const [dateFull, setDateFull] = useState("2023-05-01T00:00:00.000+00:00")
    let now = new Date()
    now = now.toISOString().split('T')[0]
    const [date, setDate] = useState(now)


    const {handleSubmit, formState: {errors}} = useForm({})

    const getSchedule = () => {
        try {
            instance.post(`/schedule/my-schedule`, {
                date: dateFull
            }).then(res => {
                setSchedule(res.data)
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
        console.log(schedule)
    }, [schedule])


    useEffect(() => {
        setDateFull(dateFull.replaceAt(0, date))
    }, [date])


    return (
        <div>
            <div className="Auth-form-container">
                <form onSubmit={handleSubmit(() => {getSchedule()})} className="form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">{"Choose a date"}</h3>
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
                        <div className={"d-flex justify-content-center"}>
                            <button type={"submit"} style={{marginTop: "50px"}} className="btn btn-primary btn-lg ">
                                {"Get schedule"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={"d-flex justify-content-center"}>
                <div className={"gallery"}>
                    {
                        schedule ?
                            schedule.map((s) =>
                                <WorkSession key={s.performance._id} performance={s}/>) : ""}
                </div>
            </div>
        </div>
    )
}