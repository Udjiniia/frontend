import {instance, url} from "../../axios";
import {useEffect, useState} from "react";
import {useNavigation} from "react-router";
import {useNavigate} from "react-router-dom";

String.prototype.trimLenFrom = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}

export const Ticket = (props) => {
    const navigation = useNavigate()
    const ticket = props.ticket
    const basket = props.basket
    const admin = props.admin
    const archive = props.archives
    let now = new Date()
    now = now.toISOString().split('T')[0]


    const unBasketTicket = () => {
        try {
            instance.patch(`/ticket/unbasket/${ticket._id}`).then(res => {
                props.deleting(true)
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


    const buyTicket = () => {
        if (window.confirm("Comfirm purchase")) {
            try {
                instance.patch(`/ticket/buy/${ticket._id}`).then(res => {
                    navigation('/profile')
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
        <div className={basket ? "Auth-form-container" : "Ticket-form-container"}>
            <form className="form">
                <div className="form-group mt-3">
                    {archive && ticket.performance.performanceTime < now ?
                        <h4 className={"d-flex justify-content-center"}>EXPIRED</h4> : ""}
                    {archive ? <div className={"d-flex justify-content-center"}>
                        <img alt="Uploaded" src={`${url}${ticket.qrUrl}`}
                             style={{borderRadius: "5%", width: "300px", height: "300px", objectFit: "cover"}}/>
                    </div> : ""}
                    <div className={"gallery"}>
                        {(basket || archive) && !admin ?
                            <>
                                <div className={"d-flex justify-content-center"}>
                                    <p> Show: {ticket.performance.show.name} </p>
                                </div>
                                <div className={"d-flex justify-content-center"}>
                                    <p> Author: {ticket.performance.show.author} </p>
                                </div>

                                <div className={"d-flex justify-content-center"}>
                                    <p> Performance starting
                                        time: {ticket.performance.performanceTime.trimLenFrom(0, 10)} {ticket.performance.performanceTime.trimLenFrom(11, 16)} </p>
                                </div>
                                <div className={"d-flex justify-content-center"}>
                                    <p> Hall: {ticket.performance.hall.name} </p>
                                </div>
                                {ticket.performance.show.duration ?
                                    <div className={"d-flex justify-content-center"}>
                                        <p> Duration: {ticket.performance.show.duration.trimLenFrom(11, 16)} </p>
                                    </div> : ""}
                                <div className={"d-flex justify-content-center"}>
                                    <p> Details: {ticket.performance.show.details} </p>
                                </div>
                                <div className={"d-flex justify-content-center"}>
                                    <p> Description: {ticket.performance.show.description} </p>
                                </div>
                            </> : ""}
                        <div className={"d-flex justify-content-center"}>
                            <p> Row: {ticket.row} Seat: {ticket.seat} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Price: {ticket.price} </p>
                        </div>
                        {admin ?
                            <div className={"d-flex justify-content-center"}>
                                <p> Status: {ticket.status} </p>
                            </div>
                            : ""}
                        {ticket.owner && ticket.status === "sold" && admin ?
                            <div className={"d-flex justify-content-center"}> Customer
                                info: {ticket.owner.firstName} {ticket.owner.lastName} ({ticket.owner.email}/{ticket.owner.phone})
                            </div> : ""}
                    </div>
                    {basket && !archive && !admin ?
                        <div style={{marginTop: "20px"}} className={"d-flex justify-content-center"}>
                            <button type="button" onClick={() => {
                                buyTicket()
                            }} style={{marginRight: "20px"}} className="btn btn-primary btn-lg ">
                                {"Buy ticket"}
                            </button>
                            <button type={"button"} onClick={() => {
                                unBasketTicket()
                            }} className="btn btn-secondary btn-lg ">
                                {"Delete from the basket"}
                            </button>
                        </div> : ""}
                </div>
            </form>
        </div>
    )
}