
String.prototype.trimLenFrom = function (start, length) {
    return this.length > length ? this.substring(start, length) : this;
}

export const WorkSession = (props) => {
    const performance = props.performance

    return (
        <div className="Auth-form-container">
            <form className="form">
                <div className="Auth-form-content">
                    <div className="form-group mt-3">
                        <div className={"d-flex justify-content-center"}>
                            <p style={{marginTop: "20px"}}> Show: {performance.show} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Work starting time: {performance.performance.performanceWorkTime.trimLenFrom(0, 10)} {performance.performance.performanceWorkTime.trimLenFrom(11, 16)} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Work ending time: {performance.performance.performanceWorkEndTime.trimLenFrom(0, 10)} {performance.performance.performanceWorkEndTime.trimLenFrom(11, 16)} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Performance starting time: {performance.performance.performanceTime.trimLenFrom(0, 10)} {performance.performance.performanceTime.trimLenFrom(11, 16)} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Performance ending time: {performance.performance.performanceEndTime.trimLenFrom(0, 10)} {performance.performance.performanceEndTime.trimLenFrom(11, 16)} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Hall: {performance.hall} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Role: {performance.role} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Salary: {performance.salary} </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}