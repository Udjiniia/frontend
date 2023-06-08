import {instance, url} from "../../axios";
import React, {useEffect, useState} from "react";
import {Ticket} from "./Ticket";

String.prototype.trimLenFrom = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}

export const Basket = () => {
    const [tickets, setTickets] = useState([])
    const [errorMsg, setErrorMsg] = useState()
    const [data, setData] = useState(false)

    const getTickets = () => {
        try {
            instance.get(`/ticket/basket`).then(res => {
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
                setErrorMsg("Basket is empty")
            }
            setData(true)
        }
    }, [tickets])

    return (
        <div>
        {data ?
        <div>
            <div className={"d-flex justify-content-center"}>
                <h4> {"My basket"}</h4>
            </div>
            <div className={"d-flex justify-content-center"}>
                {errorMsg ? <h6> {errorMsg}</h6> : ""}
            </div>
            <div className={"d-flex justify-content-center"}>
                <div className={"gallery"}>
                    {
                        tickets ?
                        tickets.map((t) => <Ticket basket={true} deleting={(() => getTickets())} key={t._id} ticket={t}/>) : ""}
                </div>
            </div>
        </div> : ""}
        </div>
    )
}