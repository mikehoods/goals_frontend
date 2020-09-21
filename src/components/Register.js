import React, { Component } from 'react'
import axios from 'axios'

class Register extends Component {
    state = {
        username: null,
        password: null,
        token: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const {username, password} = this.state
        const newUser = {username, password}
        await axios.post('http://localhost:4000/users/register',
            newUser
        )
        const loginResponse = await axios.post('http://localhost:4000/users/login', 
            newUser
        )
        await localStorage.setItem("auth-token", JSON.stringify(loginResponse.data.token))
        this.setState({
            token: localStorage.data.token
        })
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <legend>Register:</legend>
                    <div>
                        <label htmlFor='username'>Username:</label>
                        <input type='text' id='username' onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type='submit' value='Register'/>
                    </div>
                </form>
                <div className='navlinks'>
                    <button>Login</button>
                </div>
            </div>
        )
    }
}

export default Register
