import {Link, useLocation} from "react-router-dom"
import React, {useState, useEffect} from "react";
import {instance} from "../../axios";
import {PerformanceChoose} from "./PerformanceChoose";
import {Performance} from "./Performance";

export const PerformancesGallery = (props) => {
    const schedule = props.schedule
    const buying = props.buying
    const location = useLocation();
    const msg = location.state === null ? "" : location.state.msg
    const [performances, setPerformances] = useState([])
    const [data, setData] = useState(false)
    const [errorMsg, setErrorMsg] = useState()


    const getPerformances = () => {
        try {
            instance.get(`/performance/all`).then(res => {
                setPerformances(res.data)
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
        getPerformances()
    }, [])

    useEffect(() => {
        if (performances) {
            if (performances.length === 0) {
                setErrorMsg("Performances haven`t been created")
            }
            setData(true)
        }
    }, [performances])


    return (
        <div>
            {data ?
        <div>
            <div className={"d-flex justify-content-center"}>
                <h4> {"Performances"}</h4>
            </div>
            <div className={"d-flex justify-content-center"}>
                {errorMsg ? <h6> {errorMsg}</h6> : ""}
            </div>
            <div className={"d-flex justify-content-center"}>
                {!schedule ?
                <Link to="/performance-create" style={{marginTop: "50px"}} className="btn btn-primary btn-lg ">
                    {"Add performance"}
                </Link> : ""}
            </div>
            <div className={"d-flex justify-content-center"}>
                <h6> {msg}</h6>
            </div>
            <div className={"d-flex justify-content-center"}>
                <div className={"gallery"}>
                    {
                        performances ?
                            performances.map((p) => (
                                    <Performance buying={buying} schedule={schedule} performance={p} key={p._id}/>
                            )) : ""}
                </div>
            </div>
        </div> : ""}
        </div>
    )
}