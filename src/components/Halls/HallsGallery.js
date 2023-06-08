import {Link, useLocation} from "react-router-dom"
import React, {useState, useEffect} from "react";
import {instance} from "../../axios";
import {Hall} from "./Hall";
import {HallForm} from "./HallForm";

export const HallsGallery = () => {
    const location = useLocation();
    const msg = location.state === null ? "" : location.state.msg
    const [halls, setHalls] = useState()
    const [updateId, setUpdateId] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const [data, setData] = useState(false)


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

    useEffect(() => {
        if (halls) {
            if (halls.length === 0) {
                setErrorMsg("Halls haven`t been created")
            }
            setData(true)
        }
    }, [halls])


    return (
        <div>
            {data ?

                <div>
                    <div className={"d-flex justify-content-center"}>
                        <h4> {"Halls"}</h4>
                    </div>
                    <div className={"d-flex justify-content-center"}>
                        {errorMsg ? <h6> {errorMsg}</h6> : ""}
                    </div>
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
                : ""}
        </div>
    )
}