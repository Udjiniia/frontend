import {instance, url} from "../../axios";
import React, {useEffect, useState} from "react";
import {Ticket} from "./Ticket";

String.prototype.trimLenFrom = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}

export const UserTickets = () => {
    const [tickets, setTickets] = useState([])

    const getTickets = () => {
        try {
            instance.get(`/ticket/bought`).then(res => {
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


    useEffect(() => {
        getTickets()
    }, [])

    return (
        <div>
            <div className={"d-flex justify-content-center"}>
                <h6> {"My tickets"}</h6>
            </div>
            <div className={"d-flex justify-content-center"}>
                <div className={"gallery"}>
                    {
                        tickets ?
                            tickets.map((t) => <Ticket basket={true} archives={true}  key={t._id} ticket={t}/>) : ""}
                </div>
            </div>
        </div>
    )
}