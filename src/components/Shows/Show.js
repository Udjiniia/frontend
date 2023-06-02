import {instance, url} from "../../axios";
import {useState} from "react";

String.prototype.trimLenFrom = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}
export const Show = (props) => {
    const show = props.show
    const schedule = props.schedule

    const onDelete = () => {
        if (window.confirm("Are you sure you want to delete this show?")) {
            try {
                instance.delete(`/show/delete/${show._id}`)
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
        <div className="Auth-form-container">
            <form className="form">
                <div className="Auth-form-content">
                    <div className="form-group mt-3">
                        <div className={"d-flex justify-content-center header"} >
                            <h3 className="Auth-form-title"> {show.name}</h3>
                        </div>
                        <div className={"d-flex justify-content-center header"}>
                            <img alt="Uploaded" src={`${url}${show.showAvatarUrl}`}
                                 style={{borderRadius: "5%", width: "300px", height: "300px", objectFit: "cover"}}/>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p style={{marginTop: "20px"}}> Author: {show.author} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Duration: {show.duration.trimLenFrom(11, 16)} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Details: {show.details} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Description: {show.description} </p>
                        </div>
                        {!schedule ?
                        <div className={"d-flex justify-content-center"}>
                            <p> Creator: {show.creator.firstName} {show.creator.lastName} </p>
                        </div> : ""}
                    </div>
                </div>
                {!schedule ?
                    <>
                <div className={"d-flex justify-content-center"} style={{marginBottom: "8px"}}>
                    <button onClick={() => {
                        props.updating(show._id)
                    }} className="btn btn-secondary">
                        {`Edit ${show.name} info`}
                    </button>
                </div>
                <div className={"d-flex justify-content-center"}>
                    <button onClick={onDelete} className="btn btn-danger">
                        {`Delete ${show.name}`}
                    </button>
                </div>
                    </> : ""}
            </form>
        </div>
    )
}