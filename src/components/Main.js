import {Link} from "react-router-dom";

export const Main = () => {

    return (
        <div>
            <div style={{marginTop: "150px"}} className={"d-flex justify-content-center"}>
                <h6> Welcome!</h6>
            </div>
            <div className={"d-flex justify-content-center"}>
                <Link to="/schedule" style={{marginTop: "150px"}} className="btn btn-primary btn-lg ">
                    {"Schedule"}
                </Link>
            </div>
            <div className={"d-flex justify-content-center"}>
                <Link to="/login" style={{marginTop: "50px", marginRight: "20px"}} className="btn btn-secondary ">
                    {"Sign in"}
                </Link>
                <Link to="/register" style={{marginTop: "50px"}} className="btn btn-outline-secondary ">
                    {"Sign up"}
                </Link>
            </div>
        </div>
    )
}