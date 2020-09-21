import React, { Component } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext'

class Login extends Component {
    state = {
        username: null,
        password: null,
        token: null
    }
    static contextType = UserContext
    componentDidMount(){
        const userData = this.context
        console.log(userData)
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
        const {userData, setUserData} = this.context
        const newUser = { username: username, token: null};
        setUserData(newUser)
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