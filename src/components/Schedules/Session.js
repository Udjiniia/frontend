import {Link, useLocation} from "react-router-dom"
import React, {useState, useEffect} from "react";
import {instance} from "../../axios";


String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

export const Session = (props) => {
    const session = props.session


    return (
        <div className="Auth-form-container">
            <form className="form">
                <div className="Auth-form-content">
                    <div className="form-group mt-3">
                        <div className={"d-flex justify-content-center"}>
                            <p style={{marginTop: "20px"}}> Worker: {session.worker.firstName} {session.worker.lastName} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Role: {session.role} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Salary: {session.salary} </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}