import React, { Component } from 'react';
import Home from './Home'
import Welcome from './Welcome'

import { connect } from 'react-redux'

class Main extends Component {
    render(){
        const checkIfLoggedIn = 
        !this.props.userData.username ? <Welcome/>
        : <Home/>
        return (
            <div>
                    {checkIfLoggedIn}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        userData: state.userData
    }
}

export default connect(mapStateToProps)(Main)