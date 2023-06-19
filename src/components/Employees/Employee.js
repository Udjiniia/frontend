import React, {useEffect, useRef, useState} from "react";
import {instance, url} from "../../axios.js";
import {Link, useLocation} from "react-router-dom";


String.prototype.trimLen = function (length) {
    return this.length > length ? this.substring(0, length) : this;
}

export const Employee = (props) => {
    let now = new Date()
    now = now.toISOString().split('T')[0]
    const employee = props.employee
    const [errorMsg, setErrorMsg] = useState("")
    const [status, setStatus] = useState(employee.status)
    const buttonRef = useRef(null)

    const updateStatus = () => {
        try {
            instance.patch(`/employee/updateStatus/${employee._id}`, {
                status: status
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

    useEffect(() => {
        if (employee.status === "active") {
            buttonRef.current.className = "btn btn-danger"
        } else {
            buttonRef.current.className = "btn btn-secondary"
        }
        updateStatus()
    }, [status])

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title"> {employee.userRole}</h3>
                    <div className="form-group mt-3">
                        <div className={"d-flex justify-content-center header"}>
                            <img alt="Uploaded" src={`${url}${employee.avatarUrl}`}
                                 style={{borderRadius: "50%", width: "200px", height: "200px", objectFit: "cover"}}/>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p style={{marginTop: "20px"}}> {employee.firstName} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> {employee.lastName} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> {employee.phone} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> {employee.birthday.trimLen(10)} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> {employee.email} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> {employee.status} </p>
                        </div>
                    </div>
                </div>
                <div className={"d-flex justify-content-center"} style={{marginBottom: "8px"}}>
                    <button onClick={() => {

                        if (employee.status === "active") {
                            setStatus("inactive")
                        } else {
                            setStatus("active")
                        }
                    }} className={"btn btn-danger"} ref={buttonRef}>
                        Make {employee.firstName} {employee.lastName} {employee.status === `active` ? `inactive` : `active`}
                    </button>
                </div>
                {employee.userRole === "worker" ?
                <div className={"d-flex justify-content-center"}>
                    <Link to={`/employee-schedule/${employee._id}`} style={{marginRight: "10px"}}
                          className="btn btn-primary">
                        {`Check worker schedule`}
                    </Link>
                </div> : ""}
                <div className=" forgot-password text-right mt-2" style={{color: 'red'}}>
                    {errorMsg}
                </div>
            </form>
        </div>
    )
};