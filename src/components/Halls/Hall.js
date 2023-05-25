import {instance, url} from "../../axios";

export const Hall = (props) => {
    const hall = props.hall

    const onDelete = () => {
        if (window.confirm("Are you sure you want to delete this hall?")) {
            try {
                instance.delete(`/hall/delete/${hall._id}`)
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
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title"> {hall.name}</h3>
                    <div className="form-group mt-3">

                    </div>
                    <div className="form-group mt-3">
                        <div className={"d-flex justify-content-center"}>
                            <p style={{marginTop: "20px"}}> Capacity: {hall.capacity} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Rows: {hall.rows} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Status: {hall.status} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p>Details: {hall.details} </p>
                        </div>
                    </div>
                </div>
                <div className={"d-flex justify-content-center"} style={{marginBottom: "8px"}}>
                    <button onClick={() => {
                        props.updating(hall._id)
                    }} className="btn btn-secondary">
                        {`Edit ${hall.name} info`}
                    </button>
                </div>
                <div className={"d-flex justify-content-center"}>
                    <button onClick={onDelete} className="btn btn-danger">
                        {`Delete ${hall.name}`}
                    </button>
                </div>
            </form>
        </div>
    )
}

