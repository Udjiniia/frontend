import {instance} from "../../axios";
import React, {useEffect, useState} from "react";
import {Ticket} from "./Ticket";

String.prototype.trimLenFrom = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}

export const UserTickets = () => {
    const [tickets, setTickets] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const [data, setData] = useState(false)

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

    useEffect(() => {
        if (tickets) {
            if (tickets.length === 0) {
                setErrorMsg("You haven`t bought any tickets")
            }
            setData(true)
        }
    }, [tickets])

    return (
        <div>
            {data ?
                <div>
                    <div className={"d-flex justify-content-center"}>
                        <h4> {"My tickets"}</h4>
                    </div>
                    <div className={"d-flex justify-content-center"}>
                        {errorMsg ? <h6> {errorMsg}</h6> : ""}
                    </div>
                    <div className={"d-flex justify-content-center"}>
                        <div className={"gallery"}>
                            {
                                tickets ?
                                    tickets.map((t) => <Ticket basket={true} archives={true} key={t._id}
                                                               ticket={t}/>) : ""}
                        </div>
                    </div>
                </div> : ""}
        </div>
    )
}