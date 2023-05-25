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

function App() {
    const [role, setRole] = useState('');
    const getRole = (userRole) => {
        setRole(userRole)
    }


    return (<Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/register" element={<PublicRoute>
            < Registration signUp={true}/>
        </PublicRoute>}/>
        <Route
            path="/login"
            element={<PublicRoute>
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
                <Header state={"main"} />
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
                    <Header state={"main"}/>
                    <HallForm update={false}/>
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
                <Header state={"main"}/>
                <EmployeeForm/>
            </PrivateRoute>}
        />
        <Route
            path="/shows"
            element={<PrivateRoute>
                <AdministrationRoute>
                    <Header state={"main"} role={role}/>
                    <ShowsGallery/>
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
                    <PerformancesGallery/>
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
            path="/my-schedule"
            element={<PrivateRoute>
                <WorkerRoute>
                    <Header state={"main"} role={role}/>
                    <EmployeesSchedule/>
                </WorkerRoute>
            </PrivateRoute>}
        />
    </Routes>);
}

export default App;