import React from 'react'
// import Register from './Register'
import Login from './Login'

const Navbar = () => {
    return ( 
        <nav className='navbar'>
            <div className='container'>
                <h1 className="app-logo">Goal Tracker</h1>
                <Login/>
            </div>
        </nav>
     );
}
 
export default Navbar;