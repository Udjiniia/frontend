import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from "react-router-dom"


export const Header = (props) => {
    const state = props.state
    const role = props.role

    return (

        <div className="position-relative" style={{marginTop: "10px"}}>
            <div className="position-absolute top-0 end-0">
                {role === "head" ? <>{state === "profile" ?
                    <><Link to="/halls" style={{marginRight: "10px"}}
                            className="btn btn-outline-primary">
                        {"Halls"}
                    </Link>
                        <Link to="/employees" style={{marginRight: "10px"}} className="btn btn-outline-primary">
                            {"Employees"}
                        </Link>
                        <Link to="/shows" style={{marginRight: "10px"}} className="btn btn-outline-primary">
                            {"Shows"}
                        </Link>
                        <Link to="/performances" style={{marginRight: "10px"}} className="btn btn-outline-primary">
                            {"Performances"}
                        </Link>
                    </> : ""}</> : ""}
                {role === "user" ? <>{state === "profile" ?
                    <>   <Link to="/schedule-tickets" style={{marginRight: "10px"}} className="btn btn-outline-primary">
                        {"Buy tickets"}
                    </Link>
                        <Link to="/posters" style={{marginRight: "10px"}} className="btn btn-outline-primary">
                            {"Shows list"}
                        </Link>
                        <Link to="/basket" style={{marginRight: "10px"}} className="btn btn-outline-primary">
                            {"My basket"}
                        </Link>
                        <Link to="/tickets" style={{marginRight: "10px"}} className="btn btn-outline-primary">
                            {"My tickets"}
                        </Link>
                    </> : ""}</> : ""}
                {role === "admin" && state === "profile" && role !== "worker" && role !== "user" ?
                    <><Link to="/shows" style={{marginRight: "10px"}} className="btn btn-outline-primary">
                        {"Shows"}
                    </Link>
                        <Link to="/performances" style={{marginRight: "10px"}} className="btn btn-outline-primary">
                            {"Performances"}
                        </Link>
                    </> : ""}
                {state === "main" ?
                    <Link to="/profile" style={{marginRight: "10px"}} className="btn btn-outline-primary">
                        {"My profile"}
                    </Link> : ""}
                {role === "worker" && state === "profile" ?
                    <Link to="/my-schedule" style={{marginRight: "10px"}} className="btn btn-outline-primary">
                        {"My schedule"}
                    </Link> : ""}
                {role && state === "profile" ?
                    <>
                        <Link to="/update-profile" style={{marginRight: "10px"}} className="btn btn-outline-primary">
                            {"Update profile info"}
                        </Link>
                        <Link to="/update-password" style={{marginRight: "10px"}} className="btn btn-outline-primary">
                            {"Change password"}
                        </Link>
                    </>
                    : ""}
                {state === "public" ?
                    <>
                        <Link to="/profile" style={{marginRight: "10px"}} className="btn btn-outline-primary">
                            {"Main"}
                        </Link>
                    </>
                    : ""}


            </div>
        </div>
    )
        ;
};