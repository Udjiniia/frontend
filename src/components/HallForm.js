import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from "react-router-dom"
import {instance, url} from "../axios.js";
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import {useNavigate} from 'react-router-dom';
import {MenuItem} from "@mui/material";


export const HallForm = (props) => {
    const navigation = useNavigate()
    const [errorMsg, setErrorMsg] = useState("")
    const [name, setName] = useState("")
    const [capacity, setCapacity] = useState("")
    const [status, setStatus] = useState("")
    const [details, setDetails] = useState("")
    const [rows, setRows] = useState("")
    const [creation, setCreation] = useState(false)
    const [edition, setEdition] = useState(false)
    const update = props.update
    const hall = props.hall

    const {handleSubmit, formState: {errors, isValid}} = useForm({})

    const hallSubmit = () => {
        try {
            instance.post('/hall/create', {
                name: name,
                capacity: capacity,
                rows: rows,
                details: details,
            }).then(res => {
                setCreation(true)
            }).catch(error => {
                if (error.response.status === 400) {
                    const msg = error.response.data[0];
                    setErrorMsg(msg.msg);
                } else {
                    setErrorMsg(error.response.data.message);
                }
            })
        } catch
            (error) {
            if (error.response) {
                console.log(error.response.data.message);
            }
        }
    }

    const hallUpdate = () => {
        try {
            instance.patch(`/hall/update/${hall._id}`, {
                name: name,
                capacity: capacity,
                rows: rows,
                details: details,
                status: status
            }).then(res => {
                props.cancelling("")
            }).catch(error => {
                if (error.response.status === 400) {
                    const msg = error.response.data[0];
                    setErrorMsg(msg.msg);
                } else {
                    setErrorMsg(error.response.data.message);
                }
            })
        } catch
            (error) {
            if (error.response) {
                console.log(error.response.data.message);
            }
        }
    }


    if (creation) {
        navigation('/halls', {
            state: {
                msg: `You have created new hall - ${name}`,
            }
        });
    }


    useEffect(() => {
        if (hall) {
            setStatus(hall.status)
            setName(hall.name)
            setRows(hall.rows)
            setCapacity(hall.capacity)
            setDetails(hall.details)
        }
    }, [hall])


    return (
        <div className="Auth-form-container">
            <form onSubmit={handleSubmit(update ? hallUpdate : hallSubmit)} className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">{update? "Update the hall" : "Create a new hall"}</h3>
                    <div className="form-group mt-sm-0">
                        <label>Name</label>
                        <TextField
                            required
                            id={"name"}
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter name"
                            error={Boolean(errors.name?.message)}
                            helperText={errors.name?.message}
                        />
                    </div>
                    <div className="form-group mt-sm-0">
                        <label>Capacity</label>
                        <TextField
                            required
                            id={"capacity"}
                            type="number"
                            value={capacity}
                            onChange={e => setCapacity(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter capacity"
                            error={Boolean(errors.capacity?.message)}
                            helperText={errors.capacity?.message}
                        />
                    </div>
                    <div className="form-group mt-sm-0">
                        <label>Rows</label>
                        <TextField
                            required
                            id={"rows"}
                            type="number"
                            value={rows}
                            onChange={e => setRows(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter rows"
                            error={Boolean(errors.rows?.message)}
                            helperText={errors.rows?.message}
                        />
                    </div>
                    <div className="form-group mt-sm-0">
                        <label>Details</label>
                        <TextField
                            required
                            id={"details"}
                            type="text"
                            value={details}
                            onChange={e => setDetails(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter details"
                            error={Boolean(errors.details?.message)}
                            helperText={errors.details?.message}
                        />
                    </div>
                    {update ?
                        <div className="form-group mt-sm-0">
                            <label>Status</label>
                            <Select
                                required
                                id={"status"}
                                type="text"
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                                className="form-control mt-sm-0"
                                placeholder="Enter status"
                                error={Boolean(errors.status?.message)}
                                helperText={errors.status?.message}
                            >
                                <MenuItem value={"active"}>Active</MenuItem>
                                <MenuItem value={"inactive"}>Inactive</MenuItem>
                            </Select>
                        </div> : ""}

                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    {update ?
                        <div className="d-grid gap-2 mt-3">
                            <button type={"button"} onClick={() => {
                                props.cancelling("")
                            }} className="btn btn-secondary">
                                {"Cancel"}
                            </button>
                        </div> : ""
                    }
                    <div className=" forgot-password text-right mt-2" style={{color: 'red'}}>
                        {errorMsg}
                    </div>
                </div>
            </form>
        </div>
    )
};