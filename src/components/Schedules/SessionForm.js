import {instance, url} from "../../axios";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import {MenuItem} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

export const SessionForm = (props) => {

    const [role, setRole] = useState("")
    const [salary, setSalary] = useState("")
    const [worker, setWorker] = useState("")
    const workers = props.workers
    const [session, setSession] = useState([])


    const {handleSubmit, formState: {errors}} = useForm({})

    useEffect(() => {
        setSession([worker, salary, role])
    }, [role, worker, salary])


    useEffect(() => {
        props.adding(session)
    }, [session])
    //

    return (<div className="Auth-form-container">
        <form className="Auth-form">
            <div className="Auth-form-content">
                <div className="form-group mt-sm-0">
                    <label>Worker</label>
                    <Select
                        required
                        id={"worker"}
                        type="text"
                        value={worker}
                        onChange={e => setWorker(e.target.value)}
                        className="form-control mt-sm-0"
                        placeholder="Enter worker"
                        error={Boolean(errors.worker?.message)}
                        helperText={errors.worker?.message}
                    >
                        {workers ? workers.map((w) => (
                            <MenuItem value={`${w._id}`}>{w.firstName} {w.lastName} ({w.phone})</MenuItem>)) : ""}
                    </Select>
                </div>
                <div className="form-group mt-sm-0">
                    <label>Salary</label>
                    <TextField
                        required
                        id={"salary"}
                        type="number"
                        value={salary}
                        onChange={e => setSalary(e.target.value)}
                        className="form-control mt-sm-0"
                        placeholder="Enter salary"
                        error={Boolean(errors.salary?.message)}
                        helperText={errors.salary?.message}
                    />
                </div>
                <div className="form-group mt-sm-0">
                    <label>Role</label>
                    <TextField
                        required
                        id={"role"}
                        type="text"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        className="form-control mt-sm-0"
                        placeholder="Enter role"
                        error={Boolean(errors.role?.message)}
                        helperText={errors.role?.message}
                    />
                </div>
            </div>
        </form>
    </div>)
}

