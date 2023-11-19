import React,{useState,useEffect} from "react"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Personalinfo } from "./components/personalInfo"
import { Contactinfo } from "./components/contactinfo"
import { Dependents } from "./components/dependents"
import { Residency } from "./components/residency"
import authFunc from '../serviceApi/admin';
import {
    useParams
} from "react-router-dom";
function Taxdocumentationadmin() {
    let { id } = useParams();
    let navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        primaryTaxPayer: {
            // id
        },
        spouse: {
            // id
        },
        contact: {
            // id
        },
        dependent: {
            // id
        },
        residency: {
            // id
        },
        id
        // Add data structure for other sections
    });

    const handleFormSubmit = async () => {
        // await authFunc.updateTaxPersonal(formData)
        // await authFunc.updateTaxContact(formData)
        // await authFunc.updateTaxDependent(formData)
        // await authFunc.updateTaxResidency(formData)
        // getTaxData()
    };

    const getTaxData = async () =>{
        const data = await authFunc.getTaxInformation({id:id})
        // console.log("data--->0",data)
        // setFormData({...formData,primaryTaxPayer:data[0] } )
        const data2 = await authFunc.getTaxContact({id:id})
        const data3 = await authFunc.getTaxDependent({id:id})
        const data4 = await authFunc.getTaxResidency({id:id})
        console.log("data3",data.data.data.res)
        setFormData({...formData,
            contact:data2.data.data.res[0],
            primaryTaxPayer:data.data.data.res[0],
            dependent:data3.data.data.res[0],
            residency:data4.data.data.res[0] 
        } )
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
        <div className="tagDocumentation">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button onClick={() => { handleFormSubmit() }} className="nav-link active" id="personalInfo" data-bs-toggle="tab" data-bs-target="#personalInfotab" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Personal Info</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button onClick={() => { handleFormSubmit() }} className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Contact Info</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button onClick={() => { handleFormSubmit() }} className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Dependants</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button onClick={() => { handleFormSubmit() }} className="nav-link" id="residency-tab" data-bs-toggle="tab" data-bs-target="#residency-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Residency Details</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <Personalinfo formData={formData} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />
                <Contactinfo formData={formData} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />
                <Dependents formData={formData} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />
                <Residency formData={formData} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />

            </div>
        </div>
    );
}

export default Taxdocumentationadmin;
