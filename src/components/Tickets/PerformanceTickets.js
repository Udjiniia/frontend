import {instance, url} from "../../axios";
import React, {useEffect, useState} from "react";
import {Ticket} from "./Ticket";
import {Performance} from "../Performances/Performance";
import {useParams} from "react-router";

String.prototype.trimLenFrom = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}

export const PerformanceTickets = () => {
    const {id} = useParams();
    const [tickets, setTickets] = useState([])
    const [performance, setPerformance] = useState()

    const getTickets = () => {
        try {
            instance.get(`/ticket/tickets/${id}`).then(res => {
                setTickets(res.data)
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
        getTickets()
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
                        tickets ?
                            tickets.map((t) => <Ticket admin={true} basket={false} key={t._id} ticket={t}/>) : ""}
                </div>
            </div>
        </div>
    )
}