const initState = {
    userData: {}
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'UPDATE_USERDATA') {
        console.log(action.currentUser)
        return {
            ...state,
            userData: {
                username: action.currentUser.username,
                token: action.currentUser.token
            }
        }  
    }
    return state;
}

export default rootReducer