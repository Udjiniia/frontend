import React, {useState} from "react";
import {instance, url} from "../axios.js";
import TextField from "@mui/material/TextField";
import {Link, Navigate, useLocation} from "react-router-dom";


export const Home = (props) => {
    const location = useLocation();
    const msg = location.state === null ? "" : location.state.msg
    const [birthday, setBirthday] = useState("")
    const [firstName, setFirstName] = useState("")
    const [phone, setPhone] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const [auth, setAuth] = useState(true)
    const [role, setRole] = useState("user")

    String.prototype.trimLen = function (length) {
        return this.length > length ? this.substring(0, length) : this;
    }

    try {
        instance.get("/me").then(res => {
            setEmail(res.data.userData.email)
            setBirthday(res.data.userData.birthday)
            setFirstName(res.data.userData.firstName)
            setLastName(res.data.userData.lastName)
            setPhone(res.data.userData.phone)
            setAvatarUrl(res.data.userData.avatarUrl)
            setRole(res.data.userData.userRole)
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

    const onLogout = () => {
        window.localStorage.setItem("token", "")
        setAuth(false);
    }

    const onDelete = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                instance.delete("/me/deleteAccount").then(res => {
                    onLogout();
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
    }

    if (!auth) {
        return <Navigate to="/"/>
    }

    props.currentRole(role)

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h6 className="Auth-form-title"> {msg}</h6>
                    <h3 className="Auth-form-title"> Вітаю, {firstName}</h3>
                    <div className="form-group mt-3">
                        <div className={"d-flex justify-content-center header"}>
                            <img alt="Uploaded" src={`${url}${avatarUrl}`}
                                 style={{borderRadius: "50%", width: "200px", height: "200px", objectFit: "cover"}}/>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p style={{marginTop: "20px"}}> Ім'я: {firstName} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Прізвище: {lastName} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Телефон: {phone} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p>Birthday: {birthday.trimLen(10)} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Пошта: {email} </p>
                        </div>
                    </div>
                </div>
                <div className={"d-flex justify-content-center"} style={{marginBottom: "8px"}}>
                    <button onClick={onLogout} className="btn btn-secondary">
                        {"Log out"}
                    </button>
                </div>
                <div className={"d-flex justify-content-center"}>
                    <button onClick={onDelete} className="btn btn-secondary">
                        {"Delete account"}
                    </button>
                </div>
            </form>
        </div>
    )
};