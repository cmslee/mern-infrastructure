//THE FLOW: src/components/SignUpForm/SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)

//*organizes functions used to sign-up. log in, log out, etc.

import * as usersApi from './users-api';

//*Get Token
export function getToken() {
    //first, look to see if there is token by using getItem method to search a token with name 'token'
    const token = localStorage.getItem('token');
    //if no token, then we're done here
    if(!token) return null;
    //set expected payload to be parsed as JSON object; split at . bc of token expression; index 1 is where the payload is
    //!atob is deprecated in some context, but we can still use it here (to make strikeout go away, write window.atob)
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload);

    //if token is expired
    //?dates will appear in millisecond, so divide by 1000
    if(payload.exp < Date.now() /1000){
        localStorage.removeItem('token');
        return null;
    }
    //if token is valid
    return token;
}

//*Get User
export function getUser() {
    const token = getToken();
    //ternary expression for if valid token exists vs. no
    return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

//*SignUp
export async function signUp(userData) {
    // delegate the network request code to the users-api.js API module
    // console.log('[From SignUp function]', userData)
    const token = await usersApi.signUp(userData);
    console.log(token)

    //*save token to local storage ("persist the token" pfffft)
    localStorage.setItem('token', token);
    return getUser();
}

//*LogOut
export async function logOut () {
    localStorage.removeItem('token');
}

//*Login
export async function login(credentials) {
    const token = await usersApi.login(credentials);
    localStorage.setItem('token', token);
    return getUser();
};


//*Check token
export async function checkToken() {
    // console.log('Check token')
    return usersApi.checkToken()
    //checkToken returns string, so this makes it a Date object
    .then(dateStr => new Date(dateStr))
}