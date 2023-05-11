import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from "react-router-dom"


export const Header = (props) => {
    const state = props.state
    const role = props.role

    return (

        <div className="position-relative" style={{marginTop: "10px"}}>
            <div className="position-absolute top-0 end-0">
                {role === "head" && state === "profile" ?
                    <><Link to="/halls" style={{marginRight: "10px"}} className="btn btn-primary">
                        {"Halls"}
                    </Link>
                        <Link to="/employees" style={{marginRight: "10px"}} className="btn btn-primary">
                            {"Employees"}
                        </Link>
                    </> : ""}
                {state === "main" ?
                    <Link to="/profile" style={{marginRight: "10px"}} className="btn btn-primary">
                        {"Мій профіль"}
                    </Link> : ""}
                {state === "profile" ?
                    <>
                        <Link to="/update-profile" style={{marginRight: "10px"}} className="btn btn-primary">
                            {"Оновити профіль"}
                        </Link>
                        <Link to="/update-password" className="btn btn-primary">
                            {"Змінити пароль"}
                        </Link>
                    </>
                    : ""}

            </div>
        </div>
    );
};