// require('dotenv/config');

import Axios from "axios"

const apiUrl = "http://localhost:9000/api/"
// const apiUrl = "http://195.35.45.11:9000/api/"


const getAllUser = async (data) => {
    try {
        const config = {
            headers: { Authorization: `${localStorage.getItem('token')}` }
        };
        const result = await Axios.post(apiUrl + "admin/get-all-user", data, config)
        return result
    } catch (err) {
        return err
    }
}

const getSingleUser = async (data) =>{
    try {
        const config = {
            headers: { Authorization: `${localStorage.getItem('token')}` }
        };
        const result = await Axios.post(apiUrl + "admin/get-single-user", data, config)
        return result
    } catch (err) {
        return err
    }
}

const getTaxInformation = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/taxInformation-get", data, config)
        console.log("result-->",result)
        // if(result?.data?.data?.data?.res){
        //     return result?.data?.data?.data?.res[0]
        // }else{
        //     return[]
        // }
        return result
    } catch (err) {
        return err
    }

};

const getTaxContact = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/contact-details-get", data, config)
        return result

        // return result
    } catch (err) {
        return err
    }

};

const getTaxDependent = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/dependent-details-get", data, config)
        console.log("result-->",result)
        // if(result?.data?.data?.data?.res){
        //     return result?.data?.data?.data?.res
        // }else{
        //     return[]
        // }
        return result
    } catch (err) {
        return err
    }

};

const getTaxResidency= async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/residency-details-get", data, config)
        console.log("result-->",result)
        // if(result?.data?.data?.data?.res){
        //     return result?.data?.data?.data?.res
        // }else{
        //     return[]
        // }
        return result
    } catch (err) {
        return err
    }

};

const updateTaxPersonal = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/taxInformation-update", data, config)
        return result
    } catch (err) {
        return err
    }

};

const updateTaxContact= async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/contact-details-update", data, config)
        return result
    } catch (err) {
        return err
    }

    

};
const updateTaxDependent = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/dependent-details-update", data, config)
        return result
    } catch (err) {
        return err
    }
};

const updateTaxResidency = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/residency-details-update", data, config)
        return result
    } catch (err) {
        return err
    }
};
const authFunc = {
    getAllUser,
    getSingleUser,
    getTaxInformation,
    getTaxContact,
    getTaxDependent,
    getTaxResidency,
    updateTaxPersonal,
    updateTaxContact,
    updateTaxDependent,
    updateTaxResidency
    
}
export default authFunc
