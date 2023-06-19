import React, {useEffect, useState} from "react";
import {instance, url} from "../axios.js";
import { useLocation, useNavigate} from "react-router-dom";


export const Home = (props) => {
    const navigation = useNavigate()
    const location = useLocation();
    const msg = location.state === null ? "" : location.state.msg
    const [user, setUser] = useState()
    const [data, setData] = useState(false)

    String.prototype.trimLen = function (length) {
        return this.length > length ? this.substring(0, length) : this;
    }

    useEffect(() => {
    try {
        instance.get("/user/me").then(res => {
            setUser(res.data.userData)
            props.currentRole(res.data.userData.userRole)
        })
            .catch(error => {
                console.log(error.response.data.message);
            })
    } catch
        (error) {
        if (error.response) {
            console.log(error.response.data.message);
        }
    }},[])

    const onLogout = () => {
        window.localStorage.setItem("token", "")
        navigation('/login');
    }

    const onDelete = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                instance.delete("/user/me/deleteAccount").then(res => {
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

    useEffect(() => {
        if (user) {
            setData(true)
        }
    }, [user])





    return (
        <div>
            { data ?
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h6 className="Auth-form-title"> {msg}</h6>
                    <h3 className="Auth-form-title"> Hello {user.firstName}</h3>
                    <div className="form-group mt-3">
                        <div className={"d-flex justify-content-center header"}>
                            <img alt="Uploaded" src={`${url}${user.avatarUrl}`}
                                 style={{borderRadius: "50%", width: "200px", height: "200px", objectFit: "cover"}}/>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p style={{marginTop: "20px"}}> Ім'я: {user.firstName} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Прізвище: {user.lastName} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Телефон: {user.phone} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p>Birthday: {user.birthday.trimLen(10)} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Пошта: {user.email} </p>
                        </div>
                    </div>
                </div>
                <div className={"d-flex justify-content-center"} style={{marginBottom: "8px"}}>
                    <button onClick={onLogout} className="btn btn-secondary">
                        {"Log out"}
                    </button>
                </div>
                {(user.userRole !== "head" && user.userRole !== "admin") ?
                <div className={"d-flex justify-content-center"}>
                    <button onClick={onDelete} className="btn btn-secondary">
                        {"Delete account"}
                    </button>
                </div> : ""}
            </form>
        </div> : ""}
        </div>
    )
};