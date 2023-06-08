import {Link, useLocation} from "react-router-dom"
import React, {useState, useEffect} from "react";
import {instance} from "../../axios";
import {ShowForm} from "./ShowForm";
import {Show} from "./Show";

export const ShowsGallery = (props) => {
    const schedule = props.schedule
    const [shows, setShows] = useState()
    const [updateId, setUpdateId] = useState("")
    const location = useLocation();
    const msg = location.state === null ? "" : location.state.msg
    const [errorMsg, setErrorMsg] = useState()
    const [data, setData] = useState(false)

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

    useEffect(() => {
        if (shows) {
            if (shows.length === 0) {
                setErrorMsg("Shows haven`t been created")
            }
            setData(true)
        }
    }, [shows])


    return (
        <div>
            {data ?
                <div>
                    <div className={"d-flex justify-content-center"}>
                        <h4> {"Shows"}</h4>
                    </div>
                    <div className={"d-flex justify-content-center"}>
                        {errorMsg ? <h6> {errorMsg}</h6> : ""}
                    </div>
                    <div className={"d-flex justify-content-center"}>
                        {!schedule ?
                            <Link to="/show-create" style={{marginTop: "50px"}} className="btn btn-primary btn-lg ">
                                {"Add show"}
                            </Link> : ""}
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
                                            <Show schedule={schedule} updating={(id) => {
                                                setUpdateId(id)
                                            }} show={s} key={s._id}/>
                                    )) : ""}
                        </div>
                    </div>
                </div> : ""}
        </div>
    )
}