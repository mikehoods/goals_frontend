import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Logout() {
    const {
        isAuthenticated,
        logout
    } = useAuth0();

    return isAuthenticated && (
        <p className="navlinks" onClick={() => {
            logout({ returnTo: window.location.origin });
            }}>Logout</p>
    );
}

export default Logout;