import {instance, url} from "../../axios";
import React, {useEffect, useState} from "react";
import {Performance} from "../Performances/Performance";
import {useParams} from "react-router";
import {Session} from "./Session";

String.prototype.trimLenFrom = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}

export const PerformanceSession = () => {
    const {id} = useParams();
    const [sessions, setSessions] = useState("")
    const [performance, setPerformance] = useState("")

    const getSessions = () => {
        try {
            instance.get(`/schedule/sessions/${id}`).then(res => {
                setSessions(res.data)
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

    const getPerformance = () => {
        try {
            instance.get(`/performance/${id}`).then(res => {
                setPerformance(res.data)
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


    useEffect(() => {
        getSessions()
        getPerformance()
    }, [])

    return (
        <div>
            <div className={"d-flex justify-content-center"}>
                {performance ?
                    <Performance admin={true} performance={performance}/> : ""}
            </div>
            <div className={"d-flex justify-content-center"}>
                <div className={"gallery"}>
                    {
                        sessions ?
                            sessions.map((s) => <Session key={s._id} session={s}/>) : ""}
                </div>
            </div>
        </div>
    )
}