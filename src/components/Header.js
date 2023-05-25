import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from "react-router-dom"


export const Header = (props) => {
    const state = props.state
    const role = props.role

    console.log(role)

    return (

        <div className="position-relative" style={{marginTop: "10px"}}>
            <div className="position-absolute top-0 end-0">
                {role === "head"  && state === "profile" ?
                    <><Link to="/halls" style={{marginRight: "10px"}} className="btn btn-primary">
                        {"Halls"}
                    </Link>
                        <Link to="/employees" style={{marginRight: "10px"}} className="btn btn-primary">
                            {"Employees"}
                        </Link>
                    </> : ""}
                {role === "admin" || "head" && state === "profile" && role !== "worker" && role!== "user" ?
                    <><Link to="/shows" style={{marginRight: "10px"}} className="btn btn-primary">
                        {"Shows"}
                    </Link>
                        <Link to="/performances" style={{marginRight: "10px"}} className="btn btn-primary">
                            {"Performances"}
                        </Link>
                    </> : ""}
                {state === "main" ?
                    <Link to="/profile" style={{marginRight: "10px"}} className="btn btn-primary">
                        {"Мій профіль"}
                    </Link> : ""}
                {role === "worker" && state === "profile"  ?
                    <Link to="/my-schedule" style={{marginRight: "10px"}} className="btn btn-primary">
                        {"My schedule"}
                    </Link> : ""}
                {state === "profile" ?
                    <>
                        <Link to="/update-profile" style={{marginRight: "10px"}} className="btn btn-primary">
                            {"Оновити профіль"}
                        </Link>
                        <Link to="/update-password" style={{marginRight: "10px"}} className="btn btn-primary">
                            {"Змінити пароль"}
                        </Link>
                    </>
                    : ""}


            </div>
        </div>
    );
};