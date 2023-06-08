import {instance, url} from "../../axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useNavigation} from "react-router";

String.prototype.trimLenFrom = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}

export const Performance = (props) => {
    const navigation = useNavigate()
    const schedule = props.schedule
    const buying = props.buying
    const performance = props.performance
    const admin = props.admin

    const onDelete = () => {
        if (window.confirm("Are you sure you want to delete this performance?")) {
            try {
                instance.delete(`/performance/delete/${performance._id}`).then(() => {
                    navigation("/performances")
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


    return (
        <div className="Auth-form-container">
            <form className="form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title"> {performance.show.name}</h3>
                    <div className="form-group mt-3">
                    </div>
                    <div className="form-group mt-3">
                        <div className={"d-flex justify-content-center header"}>
                            <img alt="Uploaded" src={`${url}${performance.performanceAvatarUrl}`}
                                 style={{borderRadius: "5%", width: "300px", height: "300px", objectFit: "cover"}}/>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p style={{marginTop: "20px"}}> Author: {performance.show.author} </p>
                        </div>
                        {performance.performanceTime ?
                            <div className={"d-flex justify-content-center"}>
                                <p style={{marginTop: "20px"}}> Performance starting
                                    time: {performance.performanceTime.trimLenFrom(0, 10)} {performance.performanceTime.trimLenFrom(11, 16)} </p>
                            </div> : ""}
                        <div className={"d-flex justify-content-center"}>
                            <p> Hall: {performance.hall.name} </p>
                        </div>
                        {performance.show.duration ?
                            <div className={"d-flex justify-content-center"}>
                                <p> Duration: {performance.show.duration.trimLenFrom(11, 16)} </p>
                            </div> : ""}
                        <div className={"d-flex justify-content-center"}>
                            <p> Details: {performance.show.details} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Description: {performance.show.description} </p>
                        </div>
                    </div>
                </div>
                {!schedule && !admin ?
                    <div className={"d-flex justify-content-center"}>
                        <Link to={`/all-tickets/${performance._id}`} style={{marginRight: "10px"}}
                              className="btn btn-primary">
                            {`Check tickets`}
                        </Link>
                        <Link to={`/workers/${performance._id}`} style={{marginRight: "10px"}}
                              className="btn btn-primary">
                            {`Check workers`}
                        </Link>
                        <Link to={`/performance-reschedule/${performance._id}`} style={{marginRight: "10px"}}
                              className="btn btn-primary">
                            {`Reschedule`}
                        </Link>
                        <button onClick={() => {
                            onDelete()
                        }} className="btn btn-danger">
                            {`Delete performance`}
                        </button>
                    </div> : ""}
                {buying ?
                    <div className={"d-flex justify-content-center"}>
                        <Link to={`/tickets/${performance._id}`} style={{marginRight: "10px"}}
                              className="btn btn-primary">
                            {"Buy tickets"}
                        </Link></div> : ""}
            </form>
        </div>
    )
}