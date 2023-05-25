import {instance, url} from "../../axios";
import {useEffect, useState} from "react";

String.prototype.trimLenFrom = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}

export const Performance = (props) => {
    const schedule = props.schedule
    const performance = props.performance
    const [show, setShow] = useState("")
    const [hall, setHall] = useState("")
    const [data, setData] = useState("")

    const onDelete = () => {
        if (window.confirm("Are you sure you want to delete this performance?")) {
            try {
                instance.delete(`/performance/delete/${performance._id}`)
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


    const getHall = () => {
        try {
            instance.get(`/hall/${performance.hall}`).then(res => {
                setHall(res.data)
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

    const getShow = () => {
        try {
            instance.get(`/show/${performance.show}`).then(res => {
                setShow(res.data)
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
        getHall()
        getShow()
    }, [data])

    return (
        <div className="Auth-form-container">
            <form className="form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title"> {performance.name}</h3>
                    <div className="form-group mt-3">
                    </div>
                    <div className="form-group mt-3">
                        <div className={"d-flex justify-content-center header"}>
                            <img alt="Uploaded" src={`${url}${performance.performanceAvatarUrl}`}
                                 style={{borderRadius: "5%", width: "300px", height: "300px", objectFit: "cover"}}/>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p style={{marginTop: "20px"}}> Author: {show.author} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p style={{marginTop: "20px"}}> Performance starting time: {performance.performanceTime.trimLenFrom(0, 10)} {performance.performanceTime.trimLenFrom(11, 16)} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Hall: {hall.name} </p>
                        </div>
                        { show.duration ?
                        <div className={"d-flex justify-content-center"}>
                            <p> Duration: {show.duration.trimLenFrom(11, 16)} </p>
                        </div> : ""}
                        <div className={"d-flex justify-content-center"}>
                            <p> Details: {show.details} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Description: {show.description} </p>
                        </div>
                    </div>
                </div>
                { !schedule ?
                <div className={"d-flex justify-content-center"}>
                    <button onClick={onDelete} className="btn btn-danger">
                        {`Delete performance`}
                    </button></div> : "" }
            </form>
        </div>
    )
}