import './App.css';

import {Routes, Route, Navigate} from 'react-router-dom';
import {instance, PrivateRoute, PublicRoute, HeadRoute, WorkerRoute, AdministrationRoute} from "./axios"


import {Login} from "./components/Login.js"
import {Home} from "./components/Home";
import {Registration} from "./components/Registration"
import {Header} from "./components/Header";
import {useState} from "react";
import {EmployeesGallery} from "./components/Employees/EmployeesGallery";
import {HallForm} from "./components/Halls/HallForm";
import {HallsGallery} from "./components/Halls/HallsGallery";
import {EmployeeForm} from "./components/Employees/EmployeeForm";
import {ShowsGallery} from "./components/Shows/ShowsGallery";
import {ShowForm} from "./components/Shows/ShowForm";
import {PerformanceChoose} from "./components/Performances/PerformanceChoose";
import {PerformancesGallery} from "./components/Performances/PerfomancesGallery";
import {Main} from "./components/Main"
import {EmployeesSchedule} from "./components/Employees/EmployeeSchedule";
import {Tickets} from "./components/Tickets/Tickets";
import {Basket} from "./components/Tickets/Basket";
import {UserTickets} from "./components/Tickets/UserTickets";
import {PerformanceTickets} from "./components/Tickets/PerformanceTickets"
import {PerformanceSession} from "./components/Schedules/PerformanceSessions";
import {PerformanceReplace} from "./components/Performances/PerformanceReplace";

function App() {
    const [role, setRole] = useState('');
    const getRole = (userRole) => {
        setRole(userRole)
    }


    return (<Routes>
        <Route path="/" element={
            <PublicRoute>
            <Main/>
            </PublicRoute>}/>
        <Route path="/register" element={<PublicRoute>
            <Header state={"public"} role={""}/>
            < Registration signUp={true}/>
        </PublicRoute>}/>
        <Route
            path="/login"
            element={<PublicRoute>
                <Header state={"public"} role={""}/>
                <Login updatePassword={false}/>
            </PublicRoute>}
        />
        <Route
            path="/update-profile"
            element={<PrivateRoute>
                <Header state={"main"}/>
                <Registration signUp={false}/>
            </PrivateRoute>}
        />
        <Route
            path="/update-password"
            element={<PrivateRoute>
                <Header state={"main"}/>
                <Login updatePassword={true}/>
            </PrivateRoute>}
        />
        <Route
            path="/profile"
            element={<PrivateRoute>
                <Header state={"profile"} role={role}/>
                <Home currentRole={getRole}/>
            </PrivateRoute>}
        />
        <Route
            path="/halls"
            element={<PrivateRoute>
                <HeadRoute>
                    <Header state={"main"} role={role}/>
                    <HallsGallery/>
                </HeadRoute>
            </PrivateRoute>}
        />
        <Route
            path="/hall-create"
            element={<PrivateRoute>
                <HeadRoute>
                <Header state={"main"}/>
                <HallForm update={false}/>
                </HeadRoute>
            </PrivateRoute>}
        />
        <Route
            path="/employees"
            element={<PrivateRoute>
                <HeadRoute>
                    <Header state={"main"} role={role}/>
                    <EmployeesGallery/>
                </HeadRoute>
            </PrivateRoute>}
        />
        <Route
            path="/employee-create"
            element={<PrivateRoute>
                <HeadRoute>
                <Header state={"main"}/>
                <EmployeeForm/>
                </HeadRoute>
            </PrivateRoute>}
        />
        <Route
            path="/shows"
            element={<PrivateRoute>
                <AdministrationRoute>
                    <Header state={"main"} role={role}/>
                    <ShowsGallery schedule={false}/>
                </AdministrationRoute>
            </PrivateRoute>}
        />
        <Route
            path="/show-create"
            element={<PrivateRoute>
                <AdministrationRoute>
                    <Header state={"main"} role={role}/>
                    <ShowForm/>
                </AdministrationRoute>
            </PrivateRoute>}
        />
        <Route
            path="/performances"
            element={<PrivateRoute>
                <AdministrationRoute>
                    <Header state={"main"} role={role}/>
                    <PerformancesGallery buying={false} schedule={false}/>
                </AdministrationRoute>
            </PrivateRoute>}
        />
        <Route
            path="/performance-create"
            element={<PrivateRoute>
                <AdministrationRoute>
                    <Header state={"main"} role={role}/>
                    <PerformanceChoose/>
                </AdministrationRoute>
            </PrivateRoute>}
        />
        <Route
            path="/performance-reschedule/:id"
            element={<PrivateRoute>
                <AdministrationRoute>
                    <Header state={"main"} role={role}/>
                    <PerformanceReplace buying={false} schedule={true}/>
                </AdministrationRoute>
            </PrivateRoute>}
        />
        <Route
            path="/all-tickets/:id"
            element={<PrivateRoute>
                <AdministrationRoute>
                    <Header state={"main"} role={role}/>
                    <PerformanceTickets/>
                </AdministrationRoute>
            </PrivateRoute>}
        />
        <Route
            path="/my-schedule"
            element={<PrivateRoute>
                <WorkerRoute>
                    <Header state={"main"} role={role}/>
                    <EmployeesSchedule/>
                </WorkerRoute>
            </PrivateRoute>}
        />
        <Route
            path="/employee-schedule/:id"
            element={<PrivateRoute>
                <HeadRoute>
                    <Header state={"main"} role={role}/>
                    <EmployeesSchedule/>
                </HeadRoute>
            </PrivateRoute>}
        />
        <Route
            path="/schedule"
            element={<>
                <Header state={"public"} role={""}/>
                <PerformancesGallery buying={false} schedule={true}/>
            </>}
        />
        <Route
            path="/schedule-tickets"
            element={<PrivateRoute>
                <Header state={"main"} role={role}/>
                <PerformancesGallery buying={true} schedule={true}/>
            </PrivateRoute>}
        />
        <Route
            path="/tickets/:id"
            element={<PrivateRoute>
                <Header state={"main"} role={role}/>
                <Tickets/>
            </PrivateRoute>}
        />
        <Route
            path="/workers/:id"
            element={<PrivateRoute>
                <Header state={"main"} role={role}/>
                <PerformanceSession/>
            </PrivateRoute>}
        />
        <Route
            path="/basket"
            element={<PrivateRoute>
                <Header state={"main"} role={role}/>
                <Basket/>
            </PrivateRoute>}
        />
        <Route
            path="/tickets"
            element={<PrivateRoute>
                <Header state={"main"} role={role}/>
                <UserTickets/>
            </PrivateRoute>}
        />
        <Route
            path="/posters"
            element={<>
                    <Header state={"public"} role={""}/>
                    <ShowsGallery schedule={true}/></>}
        />
    </Routes>);
}

export default App;