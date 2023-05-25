import {Link, useLocation} from "react-router-dom"
import React, {useState, useEffect} from "react";
import {instance} from "../../axios";
import {Employee} from "./Employee";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

export const EmployeesSchedule = () => {
    const current = new Date();
    const [schedule, setSchedule] = useState([])
    const [dateFull, setDateFull] = useState("2023-05-01T00:00:00.000+00:00")
    let dateNow = ""
    if (current.getMonth() <= 9) {
        dateNow = `${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}`
    } else {
        dateNow = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
    }
    const [date, setDate] = useState(dateNow)


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
                        <div className={"d-flex justify-content-center"}>
                            <button type={"submit"} style={{marginTop: "50px"}} className="btn btn-primary btn-lg ">
                                {"Add employee"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}