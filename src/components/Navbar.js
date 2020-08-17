import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return ( 
        <nav className='navbar'>
            <div className='container'>
                <h1 className="app-logo">Goal Tracker</h1>
                <ul className='navlinks'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/'>Logout</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;