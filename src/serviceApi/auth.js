// require('dotenv/config');

import Axios from "axios"

// const apiUrl = "http://localhost:9000/api/"
const apiUrl = "http://195.35.45.11:9000/api/"
const signup = async (data) => {
    // alert(API_URL)
    // console.log("baseUri",baseUri)
    delete data.confirmPassword
    try {
        const result = await Axios.post(apiUrl + "auth/signup", data, {})
        return result
    } catch (err) {
        return err
    }

};

const login = async (data) => {
    try {
        const result = await Axios.post(apiUrl + "auth/signin", data, {})
        return result
    } catch (err) {
        return err
    }

};

const tokenCheck = async (data) => {
    try {
        const config = {
            headers: { Authorization: `${data}` }
        };
        const result = await Axios.post(apiUrl + "auth/check", {}, config)
        return result
    } catch (err) {
        return err
    }

};

const confirmAccount = async (data) => {
    try {
        const result = await Axios.get(apiUrl + "auth/confirmAccount?id="+data, {}, {})
        return result
    } catch (err) {
        return err
    }
}

const forgotPassword = async (data) => {
    try {
        const result = await Axios.post(apiUrl + "auth/forgotPassword", data, {})
        return result
    } catch (err) {
        return err
    }
}

const checkForgotToken = async (data) => {
    try {
        const result = await Axios.get(apiUrl + "auth/checkForgotToken?id="+data, {}, {})
        return result
    } catch (err) {
        return err
    }
}

const resetPassword = async (data) => {
    try {
        const result = await Axios.post(apiUrl + "auth/resetPassword", data, {})
        return result
    } catch (err) {
        return err
    }
}

const authFunc = {
    signup,
    login,
    tokenCheck,
    confirmAccount,
    forgotPassword,
    checkForgotToken,
    resetPassword
    
}
export default authFunc
