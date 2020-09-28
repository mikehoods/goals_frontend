import React, { Component } from 'react';

import { connect } from 'react-redux'

class Welcome extends Component {
    render(){
        return (
            <h1 className="welcome-h1">Log in to get started</h1>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        userData: state.userData
    }
}

export default connect(mapStateToProps)(Welcome)