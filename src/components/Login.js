import React, { Component } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext'

class Login extends Component {
    state = {
        username: null,
        password: null,
        token: null,
        switchHandle: this.handleLogin,
        legendAndSubmitText: "Login",
        linkText: "Register"


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
    handleLogin = async (e) => {
        e.preventDefault()
        const {username, password} = this.state
        const loginUser = {username, password}
        const {userData, setUserData} = this.context
        const newUser = { username: username, token: null};
        setUserData(newUser)
        axios.post('http://localhost:4000/users/login', loginUser)
            .then((res)=> {
                localStorage.setItem("auth-token", JSON.stringify(res.data.token));
                
                this.setState({
                    token: res.data.token
                })
            })
    }
    handleRegister = async (e) => {
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
    toggleLoginForm = () => {
        this.state.linkText == "Register" ?
        this.setState({
            switchHandle: this.handleRegister,
            linkText: "Login",
            legendAndSubmitText: "Register"
        })
        : this.setState({
            switchHandle: this.handleLogin,
            linkText: "Register",
            legendAndSubmitText: "Login"
        })
    }
    render(){
        return (
            <div className="loginContainer">
                <form className="loginForm" onSubmit={this.state.switchHandle}>
                    {/* <legend>{this.state.legendAndSubmitText}:</legend> */}
                    <div className="loginForm-div">
                        <label htmlFor='username'>Username:</label>
                        <input type='text' id='username' onChange={this.handleChange}/>
                    </div>
                    <div className="loginForm-div">
                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input className="loginSubmit" type='submit' value={this.state.legendAndSubmitText}/>
                    </div>
                </form>
                <div className="orText">
                    <p>- or -</p>
                </div>
                <div className='navlinks'>
                    <p onClick={this.toggleLoginForm}>{this.state.linkText}</p>
                </div>
            </div>
        )
    }  
}

export default Login