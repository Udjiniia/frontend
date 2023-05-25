import {Link, useLocation} from "react-router-dom"
import React, {useState, useEffect} from "react";
import {instance} from "../../axios";
import {Employee} from "./Employee";


export const EmployeesGallery = () => {
    const [employees, setEmployees] = useState([])
    const location = useLocation();
    const msg = location.state === null ? "" : location.state.msg


    const getEmployees = () => {
        try {
            instance.get(`/employee/employees`).then(res => {
                setEmployees(res.data)
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
        getEmployees()
    }, [])


    return (
        <div>
            <div className={"d-flex justify-content-center"}>
                <Link to="/employee-create" style={{marginTop: "50px"}} className="btn btn-primary btn-lg ">
                    {"Add employee"}
                </Link>
            </div>
            <div className={"d-flex justify-content-center"}>
                <h6> {msg}</h6>
            </div>
            <div className={"d-flex justify-content-center"}>
                <div className={"gallery"}>
                    {
                        employees ?
                            employees.map((e) => (
                                <Employee employee={e} key={e._id}/>
                            )) : ""}
                </div>
            </div>
        </div>
    )
}