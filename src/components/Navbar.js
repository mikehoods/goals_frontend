import React from 'react'
import Login from './Login'
import Logout from './Logout'

const Navbar = () => {
    return ( 
        <nav className='navbar'>
            <div className='container'>
                <h1 className="app-logo">Goal Tracker</h1>
                <Login/>
                <Logout/>   
            </div>
        </nav>
     );
}
 
export default Navbar;