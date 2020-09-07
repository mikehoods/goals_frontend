import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
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
        const loginUser = {username, password}
        axios.post('http://localhost:3000/users/login', loginUser)
            .then((res)=> {
                localStorage.setItem("auth-token", JSON.stringify(res.data.token));
                this.setState({
                    token: res.data.token
                })
            })
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <legend>Login:</legend>
                    <div>
                        <label htmlFor='username'>Username:</label>
                        <input type='text' id='username' onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type='submit' value='Login'/>
                    </div>
                </form>
            </div>
        )
    }  
}

export default Login