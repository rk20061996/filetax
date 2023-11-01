// require('dotenv/config');

import Axios from "axios"

const apiUrl = "http://localhost:9000/api/"
// const apiUrl = "http://195.35.45.11:9000/api/"
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

const authFunc = {
    signup,
    login,
    tokenCheck
    
}
export default authFunc
