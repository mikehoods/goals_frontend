import React, { Component } from 'react'

const UserContext = React.createContext()

class UserProvider extends Component {
    state = {
        userData: {},
    }

    setUserData = (userData) => {
        this.setState((prevState) => ({ userData }))
    }

    render() {
        const { children } = this.props
        const { userData } = this.state
        const { setUserData } = this

        return (
            <UserContext.Provider
                value={{
                    userData,
                    setUserData
                }}
            >
                {children}
            </UserContext.Provider>
        )
    }
}

export default UserContext

export { UserProvider }