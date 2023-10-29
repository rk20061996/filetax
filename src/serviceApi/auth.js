// require('dotenv/config');

import Axios from "axios"

const apiUrl = "http://localhost:9000/api/"
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

const authFunc = {
    signup,
    login
    
}
export default authFunc
