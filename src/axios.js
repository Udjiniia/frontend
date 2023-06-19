import axios from "axios"
import {Navigate, Route} from "react-router-dom";
import {useEffect, useState} from "react";


//export const url = "http://localhost:5000"
export const url = ""
//export const baseUrl = "http://localhost:5000"
export const baseUrl = process.env.APP_API_BASE_URL

export const instance = axios.create({
    baseURL: baseUrl
});

instance.interceptors.request.use(function (config) {
    const token = window.localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});


export const PrivateRoute =
    ({children}) => {
        const [auth, setAuth] = useState(true)
        try {
            instance.get("/checkAuth")
                .catch(error => {
                    if (error.response.status === 403) {
                        setAuth(false)
                    } else {
                        console.log(error.response.data.message);
                    }
                })
        } catch
            (error) {
            if (error.response) {
                console.log(error.response.data.message);
            }
        }
        return auth ? children : <Navigate to="/"/>;
    };

export const PublicRoute =
    ({children}) => {
        const [auth, setAuth] = useState(false)
        try {
            instance.get("/checkAuth").then((res) => {
                setAuth(true)
            }).catch(error => {
                if (error.response.status === 403) {
                    setAuth(false)
                } else {
                    console.log(error.response.data.message);
                }
            })
        } catch
            (error) {
            if (error.response) {
                console.log(error.response.data.message);
            }
        }
        return auth ? <Navigate to="/profile"/> : children;
    };

export const HeadRoute =
    ({children}) => {
        const [auth, setAuth] = useState(true)
        try {
            instance.get("/checkHead")
                .catch(error => {
                    if (error.response.status === 403) {
                        setAuth(false)
                    } else {
                        console.log(error.response.data.message);
                    }
                })
        } catch
            (error) {
            if (error.response) {
                console.log(error.response.data.message);
            }
        }
        return auth ? children : <Navigate to="/profile"/>;
    };

export const WorkerRoute =
    ({children}) => {
        const [auth, setAuth] = useState(true)
        try {
            instance.get("/checkWorker")
                .catch(error => {
                    if (error.response.status === 403) {
                        setAuth(false)
                    } else {
                        console.log(error.response.data.message);
                    }
                })
        } catch
            (error) {
            if (error.response) {
                console.log(error.response.data.message);
            }
        }
        return auth ? children : <Navigate to="/profile"/>;
    };

export const AdministrationRoute =
    ({children}) => {
        const [auth, setAuth] = useState(true)
        try {
            instance.get("/checkAdministration")
                .catch(error => {
                    if (error.response.status === 403) {
                        setAuth(false)
                    } else {
                        console.log(error.response.data.message);
                    }
                })
        } catch
            (error) {
            if (error.response) {
                console.log(error.response.data.message);
            }
        }
        return auth ? children : <Navigate to="/profile"/>;
    };