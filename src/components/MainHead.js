import {Link} from "react-router-dom"
import {useState, useEffect} from "react";
import {instance} from "../axios";
import {Hall} from "./Hall"
import {HallForm} from "./HallForm";

export const MainHead = (props) => {
    const [halls, setHalls] = useState([])
    const [updateId, setUpdateId] = useState("")
    const option = props.option

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


    const hallOption = (<div>
        <div className={"d-flex justify-content-center"}>
            <Link to="/hall-create" style={{marginTop: "50px"}} className="btn btn-primary btn-lg ">
                {"Add hall"}
            </Link>
        </div>
        <div className={"d-flex justify-content-center"}>
            <div className={"gallery"}>
                {halls ?
                    halls.map((h) => (h._id === updateId ?
                            <HallForm cancelling = {() => {setUpdateId("")}} hall={h} id={h._id} key={h._id} update={true}/> :
                            <Hall updating = {(id) => {setUpdateId(id)}} hall={h} id={h._id} key={h._id}/>
                    )) : ""}
            </div>
        </div>
    </div>)

    return (
        <>
            {eval(option)}
        </>
    )
}