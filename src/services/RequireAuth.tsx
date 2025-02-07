import React from "react";
import useContext, {useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

import {validToken} from "../api/authApi";
import {AxiosResponse} from "axios";

function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth || !auth.user) {
        let username = localStorage.getItem('userName');
        let jwt = localStorage.getItem('jwt');

        if (username && jwt) {
            validToken(username)
                .then((res: AxiosResponse<any, any>) => {
                    console.log('res', res);
                    auth.signin(username, () => {
                        console.log('SignIn!!');
                    });
                    return children
                })
                .catch((err: any) => {
                    console.log('err', err);
                    localStorage.clear();
                    return <Navigate to="/login" state={{ from: '/' }} replace />
                });
        } else {
            return <Navigate to="/login" state={{ from: '/' }} replace />;
        }

    }

    return children;
}

export default RequireAuth;
