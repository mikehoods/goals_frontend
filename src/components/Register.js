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
        await axios.post('http://localhost:3000/users/register',
            newUser
        )
        const loginResponse = await axios.post('http://localhost:3000/users/login', 
            {username, password}
        )
        await localStorage.setItem("auth-token", JSON.stringify(loginResponse.data.token))
        console.log(loginResponse)
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
            </div>
        )
    }
}

export default Register