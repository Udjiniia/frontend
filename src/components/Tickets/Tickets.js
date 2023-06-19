import {instance, url} from "../../axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import Select from "@mui/material/Select";
import {MenuItem} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import {Performance} from "../Performances/Performance";
import {Ticket} from "./Ticket";
import {Link, useNavigate} from "react-router-dom";

String.prototype.trimLenFrom = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}

export const Tickets = () => {
    const navigation = useNavigate()
    const {id} = useParams();
    const [tickets, setTickets] = useState([])
    const [currentTicket, setCurrentTicket] = useState()
    const [deleteTicket, setDeleteTicket] = useState()
    const [freeTickets, setFreeTickets] = useState([])
    const [sum, setSum] = useState()
    const [performance, setPerformance] = useState()
    const [data, setData] = useState(false)

    const {formState: {errors}} = useForm({})

    const unbookTickets = () => {
        try {
            instance.patch("/ticket/unbook").then()
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
    const unbookTicket = () => {
        const delId = deleteTicket._id
        try {
            instance.patch(`/ticket/unbook/${delId}`).then()
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
    const getFreeTickets = () => {
        try {
            instance.get(`/ticket/free/${id}`).then((res) => {
                console.log(res.data)
                setFreeTickets(res.data)
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

    const setTicketBooked = () => {
        try {
            instance.patch(`/ticket/book/${currentTicket}`).then((res) => {
                console.log(res.data)
                setTickets(tickets => [...tickets, res.data]);
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

    const getSum = () => {
        let sum = 0
        for (const t of tickets) {
            sum += t.price
        }
        setSum(sum)
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

    const addTicketToBasket = (t) => {
        try {
            instance.patch(`/ticket/basket/${t._id}`).then()
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

    const buyTicket = (t) => {
        try {
            instance.patch(`/ticket/buy/${t._id}`).then()
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

    const ticketsToBasket = () => {
        for (const t of tickets){
            addTicketToBasket(t)
        }
        navigation('/basket')

    }

    const buyTickets = () => {
        if (window.confirm("Comfirm purchase")) {
            for (const t of tickets) {
                buyTicket(t)
            }
        }
        navigation('/profile')
    }




    useEffect(() => {
        unbookTickets()
        getPerformance()
    }, [])

    useEffect(() => {
        if (currentTicket) {
            setTicketBooked()
        }
        getFreeTickets()
    }, [currentTicket])

    useEffect(() => {
        getSum()
    }, [tickets])

    useEffect(() => {
        if (deleteTicket) {
            unbookTicket()
            getFreeTickets()
        }
    }, [deleteTicket])

    useEffect(() => {
        if (performance) {
            setData(true)
        }
    }, [performance])


    return (
        <div>
            {data ?
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <div className="form-group mt-sm-0">
                        <label>Choose tickets</label>
                        <Select
                            required
                            id={"ticket"}
                            type="text"
                            onChange={e => setCurrentTicket(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter ticket"
                            error={Boolean(errors.ticket?.message)}
                            helperText={errors.ticket?.message}
                        >
                            {freeTickets ? freeTickets.map((t) => (
                                <MenuItem key={`${t._id}`} value={t._id}>{t.row} row {t.seat} seat ({t.price} &#8372;)</MenuItem>)) : ""}
                        </Select>
                    </div>
                </div>
                {tickets ? tickets.map((t)=> <Ticket basket={false} key={t._id} ticket={t}/>) : ""}
                {tickets.length !== 0 ? <div style={{marginTop: "20px"}}  className={"d-flex justify-content-center"}>  <button onClick={() => {
                    setDeleteTicket(tickets[tickets.length - 1])
                    setTickets(tickets.slice(0,-1))
                }} type="button" className="btn btn-secondary">
                    Remove the ticket
                </button></div> : ""}
                {sum ?   <div style={{marginTop: "20px"}}  className={"d-flex justify-content-center"}>
                    <h6> Total: {sum}</h6>
                </div> : ""}
                {sum ?    <div style={{marginTop: "20px"}} className={"d-flex justify-content-center"}>
                    <button type="button" onClick={() => {buyTickets()}} style={{marginRight: "20px"}} className="btn btn-primary btn-lg ">
                        {"Buy tickets"}
                    </button>
                    <button type={"button"} onClick={() => {ticketsToBasket()}} className="btn btn-warning btn-lg ">
                        {"Add tickets to basket"}
                    </button> </div>: ""}
            </form>
            {performance ?
            <Performance performance={performance}  buying={false} schedule={true}/> : ""}
        </div> : ""}
        </div>
    )
}