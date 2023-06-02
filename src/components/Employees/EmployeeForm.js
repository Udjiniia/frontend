import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {instance, url} from "../../axios.js";
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import {useNavigate} from 'react-router-dom';
import Select from "@mui/material/Select";
import {MenuItem} from "@mui/material";


export const EmployeeForm = (props) => {
    const navigation = useNavigate()
    const [errorMsg, setErrorMsg] = useState()
    const [role, setRole] = useState()
    const [firstName, setFirstName] = useState()
    const [phone, setPhone] = useState()
    const [lastName, setLastName] = useState()
    const [birthday, setBirthday] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [avatarUrl, setAvatarUrl] = useState("/uploads/anon.jpg")
    const inputFileRef = React.useRef(null);

    const {handleSubmit, formState: {errors, isValid}} = useForm({})

    String.prototype.trimLen = function (length) {
        return this.length > length ? this.substring(0, length)  : this;
    }

    const registerSubmit = () => {
        try {
            instance.post('/user/register', {
                email: email,
                password: password,
                userRole: role,
                phone: phone,
                firstName: firstName,
                lastName: lastName,
                avatarUrl: avatarUrl,
                birthday: birthday,
                status: "active"
            }).then(res => {
                navigation('/employees', {
                    state: {
                        msg: `You have created new employee - ${firstName} ${lastName}`,
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
        } catch
            (error) {
            if (error.response) {
                console.log(error.response.data.message);
            }
        }
    }

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append("image", file);
            const {data} = await instance.post("/upload", formData)
            setAvatarUrl(data.url)
        } catch
            (error) {
            alert("Couldn`t upload the image")
            if (error.response) {
                console.log(error.response.data.message);
            }
        }
    }




    return (
        <div className="Auth-form-container">
            <form onSubmit={handleSubmit(registerSubmit)} className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">{"Create employee account"}</h3>
                    <div className="form-group mt-sm-0">
                        <label>Email address</label>
                        <TextField
                            required
                            id={"email"}
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter email"
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                        />
                    </div>
                    <div className="form-group mt-sm-0">
                        <label>Password</label>
                        <TextField
                            required
                            id={"password"}
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter password"
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                        />
                    </div>
                    <div className="form-group mt-sm-0">
                        <label>First name</label>
                        <TextField
                            required
                            id={"firstName"}
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter first name"
                            error={Boolean(errors.firstName?.message)}
                            helperText={errors.firstName?.message}
                        />
                    </div>
                    <div className="form-group mt-sm-0">
                        <label>Last Name</label>
                        <TextField
                            required
                            id={"lastName"}
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter last name"
                            error={Boolean(errors.lasName?.message)}
                            helperText={errors.lastName?.message}
                        />
                    </div>

                    <div className="form-group mt-sm-0">
                        <label>Birthday</label>
                        <TextField
                            required
                            id={"birthday"}
                            type="date"
                            value={birthday.trimLen(10)}
                            onChange={e => setBirthday(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter birthday "
                            error={Boolean(errors.birthday?.message)}
                            helperText={errors.birthday?.message}
                        />
                    </div>
                    <div className="form-group mt-sm-0">
                        <label>Phone</label>
                        <TextField
                            required
                            id={"phone"}
                            type="text"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter phone"
                            error={Boolean(errors.phone?.message)}
                            helperText={errors.phone?.message}
                        />
                    </div>
                    <div className="form-group mt-sm-0">
                        <label>Role</label>
                        <Select
                            required
                            id={"role"}
                            type="text"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter role"
                            error={Boolean(errors.role?.message)}
                            helperText={errors.role?.message}
                        >
                            <MenuItem value={"worker"}>Worker</MenuItem>
                            <MenuItem value={"admin"}>Admin</MenuItem>
                        </Select>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="button" onClick={() => inputFileRef.current.click()}
                                className="btn btn-outline-primary">
                            Upload avatar
                        </button>
                    </div>
                    <input ref={inputFileRef} type="file" accept="image/*" onChange={handleChangeFile} hidden/>
                    {avatarUrl !== "/uploads/anon.jpg" && avatarUrl !== "" && (
                        <div className="d-grid gap-2 mt-3">
                            <button type="button" onClick={() => setAvatarUrl("/uploads/anon.jpg")}
                                    className="btn btn-outline-primary">
                                Remove avatar
                            </button>
                            <div className={"d-flex justify-content-center header"}>
                                <img alt="Uploaded" src={`${url}${avatarUrl}`}
                                     style={{borderRadius: "50%", width: "200px", height: "200px", objectFit: "cover"}}/>
                            </div>
                        </div>
                    )}
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <div className=" forgot-password text-right mt-2" style={{color: 'red'}}>
                        {errorMsg}
                    </div>
                </div>
            </form>
        </div>
    )
};