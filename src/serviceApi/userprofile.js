// require('dotenv/config');

import Axios from "axios"

const apiUrl = "http://localhost:9000/api/"
// const apiUrl = "http://195.35.45.11:9000/api/"

const getAllDocument = async (data) => {
    try {
        const result = await Axios.post(apiUrl + "data/getDocumentName", {}, {})
        return result
    } catch (err) {
        return err
    }

};

const uploadDocument = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "data/uploadDocument", data, config)
        return result
    } catch (err) {
        return err
    }

};

const updateDocument = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "data/updateDocument", data, config)
        return result
    } catch (err) {
        return err
    }

};
const getAllUploadedDocument = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "data/getUploadedDocument", data, config)
        return result
    } catch (err) {
        return err
    }

};

const deleteDocument = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "data/deleteDocument", data, config)
        return result
    } catch (err) {
        return err
    }

};

const getUserDataByToken = async () => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "data/getUserDataByToken", {}, config)
        return result
    } catch (err) {
        return err
    }

};

const updateProfile = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "data/updateProfile", data, config)
        return result
    } catch (err) {
        return err
    }

};




const userProfile = {
    getAllDocument,
    uploadDocument,
    getAllUploadedDocument,
    deleteDocument,
    getUserDataByToken,
    updateProfile,
    updateDocument
}
export default userProfile
