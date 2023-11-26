// require('dotenv/config');

import Axios from "axios"

// const apiUrl = "http://localhost:9000/api/"
 const apiUrl = "http://195.35.45.11:9000/api/"


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

const getallUploadedDocument = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/user-uploaded-document", data, config)
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

const uploadDocument = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/uploadDocument", data, config)
        return result
    } catch (err) {
        return err
    }

};
const getAllDocument = async (data) => {
    try {
        const result = await Axios.post(apiUrl + "data/getDocumentName", {}, {})
        return result
    } catch (err) {
        return err
    }

};

const uploadTaxDraft = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/uploadTaxDraft", data, config)
        return result
    } catch (err) {
        return err
    }

};
const getTaxDraftDocument = async (data) => {
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/getTaxDraftDocument", data, config)
        return result
    } catch (err) {
        return err
    }

};

const deleteTaxDocument = async (data) =>{
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/deleteTaxDocument", data, config)
        return result
    } catch (err) {
        return err
    }
    
}

const updateStatus = async (data) =>{
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/updateStatus", data, config)
        return result
    } catch (err) {
        return err
    }
    
}

const updateDynamicUserId = async (data) =>{
    const config = {
        headers: { Authorization: `${localStorage.getItem('token')}` }
    };
    try {
        const result = await Axios.post(apiUrl + "admin/updateDynamicUserId", data, config)
        return result
    } catch (err) {
        return err
    }
    
}

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
    updateTaxResidency,
    getallUploadedDocument,
    deleteDocument,
    uploadDocument,
    getAllDocument,
    uploadTaxDraft,
    getTaxDraftDocument,
    deleteTaxDocument,
    updateStatus,
    updateDynamicUserId
}
export default authFunc
