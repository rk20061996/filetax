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
const getAllTaxReturnDocument = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "data/getAllTaxReturnDocument", data, config)
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

const updateTaxPersonal = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "taxInformation/taxInformation-update", data, config)
        return result
    } catch (err) {
        return err
    }

};
const getTaxInformation = async () => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "taxInformation/taxInformation-get", {}, config)
        console.log("result-->",result)
        if(result?.data?.data?.data?.res){
            return result?.data?.data?.data?.res
        }else{
            return[]
        }
        // return result
    } catch (err) {
        return err
    }

};


const updateTaxContact= async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "taxInformation/contact-details-update", data, config)
        return result
    } catch (err) {
        return err
    }

    

};

const getTaxContact = async () => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "taxInformation/contact-details-get", {}, config)
        console.log("result-->",result)
        if(result?.data?.data?.data?.res){
            return result?.data?.data?.data?.res
        }else{
            return[]
        }
        // return result
    } catch (err) {
        return err
    }

};

const updateTaxDependent = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "taxInformation/dependent-details-update", data, config)
        return result
    } catch (err) {
        return err
    }
};

const getTaxDependent = async () => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "taxInformation/dependent-details-get", {}, config)
        console.log("result-->",result)
        if(result?.data?.data?.data?.res){
            return result?.data?.data?.data?.res
        }else{
            return[]
        }
        // return result
    } catch (err) {
        return err
    }

};


const updateTaxResidency = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "taxInformation/residency-details-update", data, config)
        return result
    } catch (err) {
        return err
    }
};

const getTaxResidency= async () => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "taxInformation/residency-details-get", {}, config)
        console.log("result-->",result)
        if(result?.data?.data?.data?.res){
            return result?.data?.data?.data?.res
        }else{
            return[]
        }
        // return result
    } catch (err) {
        return err
    }

};

const updateTaxDocumentStatus = async () => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "taxInformation/updateTaxDocumentStatus", {}, config)
        return result
    } catch (err) {
        return err
    }
};
const approveDocument = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "data/changeStatusTaxReturnDocument", data, config)
        return result
    } catch (err) {
        return err
    }
};
const rejectDocument = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "data/changeStatusTaxReturnDocument", data, config)
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
    updateDocument,
    updateTaxPersonal,
    getTaxInformation,
    updateTaxContact,
    getTaxContact,
    updateTaxDependent,
    getTaxDependent,
    updateTaxResidency,
    getTaxResidency,
    updateTaxDocumentStatus,
    getAllTaxReturnDocument,
    rejectDocument,
    approveDocument,
}
export default userProfile
