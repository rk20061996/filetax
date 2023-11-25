import React, { useState, useEffect } from "react";
import Sidebar from "../../src/layout/sidebar";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userSlice";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Personalinfo } from "./components/personalInfo"
import { Contactinfo } from "./components/contactinfo"
import { Dependents } from "./components/dependents"
import { Residency } from "./components/residency"
import userProfile from "../serviceApi/userprofile";

function TaxDocument(props) {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        primaryTaxPayer: {
        },
        spouse: {
        },
        contact: {
        },
        dependent: {
        },
        residency: {
        }
        // Add data structure for other sections
    });

    const handleFormSubmit = async () => {
        // await userProfile.updateTaxPersonal(formData)
        // await userProfile.updateTaxContact(formData)
        // await userProfile.updateTaxDependent(formData)
        // await userProfile.updateTaxResidency(formData)
        // getTaxData()
    };

    const getTaxData = async () =>{
        const data = await userProfile.getTaxInformation(formData)
        // console.log("data--->0",data)
        // setFormData({...formData,primaryTaxPayer:data[0] } )
        const data2 = await userProfile.getTaxContact(formData)
        const data3 = await userProfile.getTaxDependent(formData)
        const data4 = await userProfile.getTaxResidency(formData)
        console.log("data3",data3)
        setFormData({...formData,contact:data2[0],primaryTaxPayer:data[0],dependent:data3,residency:data4 } )
    }
    useEffect(() => {
        getTaxData()
      }, []);
    
    const handleInputChange = (section, field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: value,
            },
        }));
    };

    return (
        <div className="main d-flex w-100 h-100">
            <Sidebar setisLoggedIn={props.setisLoggedIn} />
            <div className="mainContent container-fluid">
                <div className="card">
                    <div className="tagDocumentation">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button onClick={ () => {handleFormSubmit()}} className="nav-link active" id="personalInfo" data-bs-toggle="tab" data-bs-target="#personalInfotab" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Personal Info</button>
                            </li>
                            <li  className="nav-item" role="presentation">
                                <button onClick={ () => {handleFormSubmit()}} className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Contact Info</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button onClick={ () => {handleFormSubmit()}} className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Dependants</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button onClick={ () => {handleFormSubmit()}} className="nav-link" id="residency-tab" data-bs-toggle="tab" data-bs-target="#residency-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Residency Details</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <Personalinfo formData={formData} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />
                            <Contactinfo formData={formData} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit}/>
                            <Dependents setFormData= {setFormData} formData={formData} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit}/>
                            <Residency setFormData= {setFormData}  formData={formData} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaxDocument;
