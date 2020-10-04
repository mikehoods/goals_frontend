import React from 'react';
import Home from './Home'
import Welcome from './Welcome'
import { useAuth0 } from '@auth0/auth0-react'

function Main() {
        const { user } = useAuth0();
        const checkIfLoggedIn = 
            !user ? 
                <Welcome/>
                : <Home/>
        return (
            <div>
                    {checkIfLoggedIn}
            </div>
        )
    }

export default Main