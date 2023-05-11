import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {Link, useNavigate} from "react-router-dom"
import {instance} from "../axios.js";
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import {Navigate} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import {genSaltSync, hashSync} from "bcryptjs"


export const Login = (props) => {
        const location = useLocation();
        const navigation = useNavigate()
        const updatePassword = props.updatePassword;
        const msg = location.state === null ? "" : location.state.msg
        const [errorMsg, setErrorMsg] = useState("")
        const [auth, setAuth] = useState(false)
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [updatePass, setUpdatePass] = useState(false)
        const salt =  genSaltSync(10)

        const {handleSubmit, setError, formState: {errors, isValid}} = useForm()

        const login = () => {
            try {
                instance.post('/login', {
                    email: email,
                    password: password
                }).then(res => {
                    window.localStorage.setItem("token", res.data.token)
                    setAuth(true);
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
            const passwordHashed = hashSync(password, salt)
            try {
                instance.patch('/me/updatePassword', {
                    password: passwordHashed,
                }).then(res => {
                    setUpdatePass(true)
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


        if (auth) {
            navigation('/profile')
        }

        if (updatePass) {
            navigation('/profile', {
                state: {
                    msg: "Your password changed",
                }
            });
        }

        return (
            <div>
                {msg ?
                    <h4 style={{marginTop: '20px'}} className="d-flex justify-content-around">{msg}</h4> : ""}
                <div className="Auth-form-container">
                    <form onSubmit={handleSubmit(updatePassword ? changePassword : login)} className="Auth-form">
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">{updatePassword ? "Введіть новий пароль" : "Вхід"}</h3>
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
                            {updatePassword ? "" : <p className="forgot-password text-right mt-2"> Немає акаунту? <Link
                                to={"/register"}> Зареєструватись </Link></p>}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
;