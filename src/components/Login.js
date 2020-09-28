import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux'
import { updateUserData } from '../actions/userActions'

class Login extends Component {
    state = {
        username: null,
        password: null,
        token: null,
        switchHandle: this.handleLogin,
        legendAndSubmitText: "Login",
        linkText: "Register"
    }
    componentDidMount(){
        console.log(this.props)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleLogin = (e) => {
        e.preventDefault()
        console.log("test")
        const {username, password} = this.state
        const loginUser = {username, password}
        axios.post('http://localhost:4000/users/login', loginUser)
            .then((res)=> {
                console.log(res.body)
                localStorage.setItem("auth-token", JSON.stringify(res.data.token));
                this.setState({
                    token: res.data.token
                });
                const currentUser = { username: username, token: res.data.token};
                console.log(currentUser)
                this.props.updateUserData(currentUser)
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
            token: loginResponse.data.token
        })
        const currentUser = { username: username, token: loginResponse.data.token};
        console.log(currentUser)
        this.props.updateUserData(currentUser)
        
    }
    toggleLoginForm = () => {
        this.state.linkText === "Register" ?
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

const mapStateToProps = (state) => {
    return{
        userData: state.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserData: (currentUser) => { dispatch(updateUserData(currentUser)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)