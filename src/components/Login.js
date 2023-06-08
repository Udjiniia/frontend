import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {Link, useNavigate} from "react-router-dom"
import {instance} from "../axios.js";
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import {useLocation} from "react-router-dom";


export const Login = (props) => {
        const location = useLocation();
        const navigation = useNavigate()
        const updatePassword = props.updatePassword;
        const msg = location.state === null ? "" : location.state.msg
        const [errorMsg, setErrorMsg] = useState()
        const [email, setEmail] = useState()
        const [password, setPassword] = useState()

        const {handleSubmit, formState: {errors}} = useForm()

        const login = () => {
            try {
                instance.post('/user/login', {
                    email: email,
                    password: password
                }).then(res => {
                    window.localStorage.setItem("token", res.data.token)
                    navigation('/profile')
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

        const changePassword = () => {
            try {
                instance.patch('/user/me/updatePassword', {
                    password: password,
                }).then(res => {
                    navigation('/profile', {
                        state: {
                            msg: "Your password changed",
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


        return (
            <div>
                {msg ?
                    <h4 style={{marginTop: '20px'}} className="d-flex justify-content-around">{msg}</h4> : ""}
                <div className="Auth-form-container">
                    <form onSubmit={handleSubmit(updatePassword ? changePassword : login)} className="Auth-form">
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">{updatePassword ? "Enter new password" : "Sign in"}</h3>
                            {updatePassword ? "" :
                                <div className="form-group mt-3">
                                    <label>Email address</label>
                                    <TextField
                                        required
                                        id={"email"}
                                        type="email"
                                        className="form-control mt-1"
                                        placeholder="Enter email"
                                        onChange={e => setEmail(e.target.value)}
                                        error={Boolean(errors.email?.message)}
                                        helperText={errors.email?.message}
                                    />
                                </div>}
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <TextField
                                    required
                                    id={"password"}
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Enter password"
                                    onChange={e => setPassword(e.target.value)}
                                    error={Boolean(errors.password?.message)}
                                    helperText={errors.password?.message}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                            <div className="forgot-password text-right mt-2" style={{color: 'red'}}>
                                {errorMsg}
                            </div>
                            {updatePassword ? "" :
                                <p className="forgot-password text-right mt-2"> Don`t have an account? <Link
                                    to={"/register"}> Sign up </Link></p>}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
;