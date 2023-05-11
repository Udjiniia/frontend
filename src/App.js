import './App.css';

import {Routes, Route, Navigate} from 'react-router-dom';
import {instance, PrivateRoute, PublicRoute, HeadRoute, WorkerRoute} from "./axios"


import {Login} from "./components/Login.js"
import {Home} from "./components/Home";
import {Registration} from "./components/Registration"
import {Header} from "./components/Header";
import {useState} from "react";
import {MainHead} from "./components/MainHead";
import {HallForm} from "./components/HallForm";



function App() {
    const [role, setRole] = useState('');
    const getRole = (userRole) => {
        setRole(userRole)
    }


    return (<Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
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
                    <MainHead option={"hallOption"}/>
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
                    <MainHead option={"employeesOption"}/>
                </HeadRoute>
            </PrivateRoute>}
        />
    </Routes>);
}

export default App;