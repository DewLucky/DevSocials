// This is a good practice to seperate actions and reducer. 

/* Benefits: 
    1. You don't have to write manually the type of action to be dispatched. 
    
    2. Once you declare your actions and the respective payload that needs to be passed, it's easy to pass them as arguments and chances of errors are reduced.
*/

export const LoginStart = (userCredentials)=>({
    type: 'LOGIN_START',
})

export const LoginSuccess = (userCredentials)=>({
    type: 'LOGIN_SUCCESS',
    payload: user,
})

export const LoginFailure = (userCredentials)=>({
    type: 'LOGIN_FAILURE',
    payload: error,
})