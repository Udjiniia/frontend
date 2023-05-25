import {Link, useLocation} from "react-router-dom"
import React, {useState, useEffect} from "react";
import {instance} from "../../axios";
import {ShowForm} from "./ShowForm";
import {Show} from "./Show";

export const ShowsGallery = () => {
    const [shows, setShows] = useState([])
    const [updateId, setUpdateId] = useState("")
    const location = useLocation();
    const msg = location.state === null ? "" : location.state.msg

    const getShows = () => {
        try {
            instance.get(`/show/all`).then(res => {
                setShows(res.data)
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
        getShows()
    }, [updateId])


    return (
        <div>
            <div className={"d-flex justify-content-center"}>
                <Link to="/show-create" style={{marginTop: "50px"}} className="btn btn-primary btn-lg ">
                    {"Add show"}
                </Link>
            </div>
            <div className={"d-flex justify-content-center"}>
                <h6> {msg}</h6>
            </div>
            <div className={"d-flex justify-content-center"}>
                <div className={"gallery"}>
                    {
                        shows ?
                            shows.map((s) => (s._id === updateId ?
                                    <ShowForm cancelling={() => {
                                        setUpdateId("")
                                    }} show={s} key={s._id} update={true}/> :
                                    <Show updating={(id) => {
                                        setUpdateId(id)
                                    }} show={s} key={s._id}/>
                            )) : ""}
                </div>
            </div>
        </div>
    )
}