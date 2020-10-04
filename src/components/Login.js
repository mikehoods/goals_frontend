import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Login() {
    const {
        isAuthenticated,
        loginWithPopup
    } = useAuth0();

    return !isAuthenticated && (
        <p className="navlinks" onClick={loginWithPopup}>Login</p>
    );
}

export default Login;