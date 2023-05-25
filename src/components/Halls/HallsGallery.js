import {Link, useLocation} from "react-router-dom"
import React, {useState, useEffect} from "react";
import {instance} from "../../axios";
import {Hall} from "./Hall";
import {HallForm} from "./HallForm";

export const HallsGallery = () => {
    const location = useLocation();
    const msg = location.state === null ? "" : location.state.msg
    const [halls, setHalls] = useState([])
    const [updateId, setUpdateId] = useState("")



    const getHalls = () => {
        try {
            instance.get(`/hall/all`).then(res => {
                setHalls(res.data)
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
        getHalls()
    }, [updateId])


    return (
        <div>
            <div className={"d-flex justify-content-center"}>
                <Link to="/hall-create" style={{marginTop: "50px"}} className="btn btn-primary btn-lg ">
                    {"Add hall"}
                </Link>
            </div>
            <div className={"d-flex justify-content-center"}>
                <h6> {msg}</h6>
            </div>
            <div className={"d-flex justify-content-center"}>
                <div className={"gallery"}>
                    {
                        halls ?
                            halls.map((h) => (h._id === updateId ?
                                    <HallForm cancelling={() => {
                                        setUpdateId("")
                                    }} hall={h} key={h._id} update={true}/> :
                                    <Hall updating={(id) => {
                                        setUpdateId(id)
                                    }} hall={h} key={h._id}/>
                            )) : ""}
                </div>
            </div>
        </div>
    )
}