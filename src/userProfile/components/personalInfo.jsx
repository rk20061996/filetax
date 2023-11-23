import React ,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import userProfile from "../../serviceApi/userprofile";


const Personalinfo = (props) => {
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        //console.log("formData--->09",props.formData,props.formData.primaryTaxPayer?.primaryTaxPayer_LastName)
      }, [props.formData]);
      function formatDateToYYYYMMDD(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 as months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }
    return (
        <div className="tab-pane fade show active"
            id="personalInfotab"
            role="tabpanel"
            aria-labelledby="personalInfo"
            tabindex="0"
        >
            <button
                disabled={!props.formData.primaryTaxPayer?.primaryTaxPayer_LastName ? true : false}

                onClick={async () => {

                    await userProfile.updateTaxPersonal(props.formData)
                }}
                className="btn btn-warning pull-right" style={{
                    "width": "fit-content"
                }}>Save As Draft</button>
            <div className="row">
                {/* <div className="></div> */}

                <div className="col-sm-12 col-md-6">
                    <h4>Primary Tax Payer</h4>
                    <form >
                        <div className="">
                            <label>Last name as per SSN card *</label>
                            <input
                                type="text"
                                placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_LastName}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_LastName", e.target.value)}
                            />
                        </div>
                        <div className="">
                            <label>First Name</label>
                            <input
                                type="text"
                                placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_FirstName}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_FirstName", e.target.value)}
                            />
                        </div>
                        <div className="">
                            <label>Middle Name</label>
                            <input type="text" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MiddleName}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_MiddleName", e.target.value)} />
                        </div>
                        <div className="">
                            <label>Marital Status</label>
                            <select
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_MaritalStatus", e.target.value)}
                            >
                                <option value="">Select Marital Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                            </select>
                        </div>
                        <div className="">
                            <label>Date of Marriage (DD/MM/YYYY)</label>
                            <input type="date" placeholder=""
                                required
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage && props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Married' ?formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage):""}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_DateOfMarriage", e.target.value)}

                            />
                        </div>
                        <div className="">
                            <label>Date of Birth (DD/MM/YYYY)</label>
                            <input type="date" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfBirth?formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfBirth):""}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_DateOfBirth", e.target.value)}

                            />
                        </div>
                        <div className="">
                            <label>SSN/ITIN</label>
                            <input type="text" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_SSN_ITIN}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_SSN_ITIN", e.target.value)}

                            />
                        </div>
                        <div className="">
                            <label>Current Visa Category</label>
                            <input type="text" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_CurrentVisaCategory}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_CurrentVisaCategory", e.target.value)}

                            />
                        </div>
                        <div className="">
                            <label>Current Occupation</label>
                            <input type="text" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_CurrentOccupation}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_CurrentOccupation", e.target.value)}

                            />
                        </div>
                        <div className="">
                            <label>First date of entry to US (DD/MM/YYYY)</label>
                            <input type="date" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_FirstEntryToUS?formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_FirstEntryToUS):""}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_FirstEntryToUS", e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                <div className="col-sm-12 col-md-6">
                    <h4> Spouse </h4>
                    <form noValidate validated={validated} onSubmit={props.handleFormSubmit}>
                        <div className="">
                            <label>First date of entry to US (DD/MM/YYYY)</label>
                            <input
                                type="date"
                                placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.spouse_FirstDate == '' ? '' : formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_FirstDate)}
                                // value={}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_FirstDate", e.target.value)}
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} />
                        </div>
                        <div className="">
                            <label>First Name</label>
                            <input
                                type="text"
                                placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.spouse_FirstName}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_FirstName", e.target.value)}
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} />
                        </div>
                        <div className="">
                            <label>Middle Name</label>
                            <input type="text" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.spouse_MiddleName}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_MiddleName", e.target.value)}
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} />
                        </div>
                        <div className="">
                            <label>Marital Status</label>
                            <input type="text" placeholder=""
                                required
                                readOnly
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' ? '' : props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus}
                                onChange={(e) =>

                                    props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_MaritalStatus", e.target.value)

                                }


                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''}
                            />
                        </div>
                        <div className="">
                            <label>Date of Marriage (DD/MM/YYYY)</label>
                            <input type="date" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' ? '' : props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage}

                                // value={formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_DateOfMarriage)}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_DateOfMarriage", e.target.value)}
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} />
                        </div>
                        <div className="">
                            <label>Date of Birth (DD/MM/YYYY)</label>
                            <input type="date" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.spouse_DateOfBirth ? formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_DateOfBirth):""}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_DateOfBirth", e.target.value)}
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} />
                        </div>
                        <div className="">
                            <label>SSN/ITIN</label>
                            <input type="text" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.spouse_SSN_ITIN}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_SSN_ITIN", e.target.value)}
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} />
                        </div>
                        <div className="">
                            <label>Current Visa Category</label>
                            <input type="text" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.spouse_CurrentVisaCategory}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_CurrentVisaCategory", e.target.value)}
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} />
                        </div>
                        <div className="">
                            <label>Current Occupation</label>
                            <input type="text" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.spouse_CurrentOccupation}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_CurrentOccupation", e.target.value)}
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} />
                        </div>
                        <div className="">
                            <label>First date of entry to US (DD/MM/YYYY)</label>
                            <input type="date" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.spouse_FirstEntryToUS ?formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_FirstEntryToUS):""}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_FirstEntryToUS", e.target.value)}
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''}
                            />
                        </div>
                        {/* Add more inputs with similar validation and value change handling */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export { Personalinfo }; // Exporting as a named export
