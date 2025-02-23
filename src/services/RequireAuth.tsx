import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

import {validToken} from "../api/authApi";

function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();

    if (!auth || !auth.user) {
        let username = localStorage.getItem('userName');
        let jwt = localStorage.getItem('jwt');

        if (username && jwt) {
            validToken(username)
                .then(() => {
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
