import {instance, url} from "../../axios";

String.prototype.trimPart = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}
export const HallSlot = (props) => {

    const hall = props.slot[0]
    const slots = props.slot[1]

    const setParams = (slotTime) => {
        props.hall(hall)
        props.time(slotTime)
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title"> {hall}</h3>
                </div>
                {
                    slots ? slots.map((s) =>
                        <div className="d-grid gap-2 mt-3">
                            <button className={"btn btn-secondary"} type={"button"} onClick={() => {
                                setParams(s[0])
                            }}>{s[0].trimPart(11, 16)} - {s[1].trimPart(11, 16)} </button>
                        </div>) : ""
                }
            </form>
        </div>
    )
}

