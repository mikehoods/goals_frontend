import React, {Component, createContext} from 'react';
export const UserDataContext = createContext(null);

export class UserDataProvider extends Component {
    state = {
        userData: {
            username: null,
            token: null
        },
        setUserData: this.setUserData
    }
    
    setUserData = (userData) => {
        this.setState({ userData })
    }
    
    render() {
        return(
            <UserDataContext.Provider 
            value={{
                ...this.state,
                setUserData: this.setUserData
            }}>
                {this.props.children}
            </UserDataContext.Provider>
        )
    }
}