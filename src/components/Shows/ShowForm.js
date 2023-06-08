import React, {useEffect, useRef, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {instance, url} from "../../axios.js";
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import {useNavigate} from 'react-router-dom';

String.prototype.trimPart = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}

export const ShowForm = (props) => {
        const navigation = useNavigate()
        const [errorMsg, setErrorMsg] = useState()
        const [name, setName] = useState()
        const [author, setAuthor] = useState()
        const [description, setDescription] = useState()
        const [showAvatarUrl, setShowAvatarUrl] = useState("/uploads/show.jpg")
        const [durationFull, setDurationFull] = useState("2023-01-01T00:00:00.000+00:00")
        const [duration, setDuration] = useState(durationFull.trimPart(11, 16))
        const [details, setDetails] = useState()
        const [data, setData] = useState(false)
        const update = props.update
        const show = props.show
        const inputFileRef = useRef(null);

        const {handleSubmit, formState: {errors}} = useForm({})

        String.prototype.replaceAt = function (index, replacement) {
            return this.substring(0, index) + replacement + this.substring(index + replacement.length);
        }


        const showSubmit = () => {
            try {
                instance.post('/show/create', {
                    name: name,
                    details: details,
                    description: description,
                    author: author,
                    showAvatarUrl: showAvatarUrl,
                    duration: durationFull
                }).then(() => {
                    navigation('/shows', {
                        state: {
                            msg: `You have created new show - ${name}`,
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

        const showUpdate = () => {
            try {
                instance.put(`/show/update/${show._id}`, {
                    name: name,
                    details: details,
                    description: description,
                    author: author,
                    showAvatarUrl: showAvatarUrl,
                    duration: durationFull
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
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                }
            }
        }


        useEffect(() => {
            if (show) {
                setAuthor(show.author)
                setName(show.name)
                setDetails(show.details)
                setDescription(show.description)
                setShowAvatarUrl(show.showAvatarUrl)
                setDurationFull(show.duration)
            }
        }, [show])

        useEffect(() => {
            setDurationFull(durationFull.replaceAt(11, duration))
        }, [duration])


        useEffect(() => {
            if (showAvatarUrl) {
                setData(true)
            }
        }, [showAvatarUrl])


        useEffect(() => {
            if (!update) {
                setData(true)
            }
        }, [])

        const handleChangeFile = async (event) => {
            try {
                const formData = new FormData();
                const file = event.target.files[0];
                formData.append("image", file);
                const {data} = await instance.post("/upload", formData)
                setShowAvatarUrl(data.url)
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
                {data ?
                    <div className="Auth-form-container">
                        <form onSubmit={handleSubmit(update ? showUpdate : showSubmit)} className="form">
                            <div className="Auth-form-content">
                                <h3 className="Auth-form-title">{update ? "Update the show" : "Create a new show"}</h3>
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
                                    <label>Author</label>
                                    <TextField
                                        required
                                        id={"author"}
                                        type="text"
                                        value={author}
                                        onChange={e => setAuthor(e.target.value)}
                                        className="form-control mt-sm-0"
                                        placeholder="Enter author"
                                        error={Boolean(errors.author?.message)}
                                        helperText={errors.author?.message}
                                    />
                                </div>
                                <div className="form-group mt-sm-0">
                                    <label>Duration</label>
                                    <TextField
                                        required
                                        id={"duration"}
                                        type="time"
                                        value={durationFull.trimPart(11, 16)}
                                        onChange={e => setDuration(e.target.value)}
                                        className="form-control mt-sm-0"
                                        placeholder="Enter duration"
                                        error={Boolean(errors.duration?.message)}
                                        helperText={errors.duration?.message}
                                    />
                                </div>
                                <div className="form-group mt-sm-0">
                                    <label>Description</label>
                                    <TextField
                                        required
                                        id={"description"}
                                        type="text"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        className="form-control mt-sm-0"
                                        placeholder="Enter rows"
                                        error={Boolean(errors.description?.message)}
                                        helperText={errors.description?.message}
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
                                <div className="d-grid gap-2 mt-3">
                                    <button type="button" onClick={() => inputFileRef.current.click()}
                                            className="btn btn-outline-primary">
                                        Upload avatar
                                    </button>
                                </div>
                                <input ref={inputFileRef} type="file" accept="image/*" onChange={handleChangeFile} hidden/>
                                {showAvatarUrl !== "/uploads/show.jpg" && showAvatarUrl !== "" && (
                                    <div className="d-grid gap-2 mt-3">
                                        <button type="button" onClick={() => setShowAvatarUrl("/uploads/show.jpg")}
                                                className="btn btn-outline-primary">
                                            Remove avatar
                                        </button>
                                        <div className={"d-flex justify-content-center header"}>
                                            <img alt="Uploaded" src={`${url}${showAvatarUrl}`}
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
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                                {update ? <div className="d-grid gap-2 mt-3">
                                    <button type={"button"} onClick={() => {
                                        props.cancelling("")
                                    }} className="btn btn-secondary">
                                        {"Cancel"}
                                    </button>
                                </div> : ""}
                                <div className=" forgot-password text-right mt-2" style={{color: 'red'}}>
                                    {errorMsg}
                                </div>
                            </div>
                        </form>
                    </div> : ""}
            </div>
        )
    }
;