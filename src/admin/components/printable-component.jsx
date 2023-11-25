import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import authFunc from '../../serviceApi/admin';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const Printablecomponent = (props) => {
    const [validated, setValidated] = useState(false);
    const [showLoader, setshowLoader] = useState(false);

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
    const generatePDF = async () => {
        // alert("dd");
        // const [showLoader, setshowLoader] = useState(false);
        // return
        setshowLoader(true)
        const pages = document.querySelectorAll('.rowwwws'); // Assuming each HTML page has the 'pdf-page' class
        const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
        const options = {
            scrollY: -window.scrollY,
            scale: 1.4, // Adjust the scale as needed
            // windowWidth: document.documentElement.scrollWidth,
            // windowHeight: document.documentElement.scrollHeight,
            // useCORS: true, // Enable CORS support
            // letterRendering: true,
            // logging: true,
            // allowTaint: false,
            // foreignObjectRendering: true,
            // width:"20px",
            // width: 1200,
            height: 1100,
            onclone: (document) => {
                // Apply styles to the cloned document
                document.body.style.fontSize = '15px'; // Adjust the font size as needed
                // document.body.style.height = '5px';
            },
        };
        const promises = Array.from(pages).map(async (page, index) => {
            const canvas = await html2canvas(page, options);
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
            if (index < pages.length - 1) {
                pdf.addPage();
            }
        });

        try {
            await Promise.all(promises);
            pdf.save('multi_page_document.pdf');
            props.setshowModal2(false)
            setshowLoader(false)
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    return (
        <div className="tab-pane fade show active"
            id="personalInfotab"
            role="tabpanel"
            aria-labelledby="personalInfo"
            tabindex="0"
        >

            <button
                // disabled={!props.formData.primaryTaxPayer?.primaryTaxPayer_LastName ? true : false}

                onClick={async () => {
                    generatePDF()


                }}
                className="btn btn-warning pull-right " style={{
                    "width": "fit-content"
                }}>

                {showLoader && <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                </div>}Download PDF</button>
            <button
                // data-bs-toggle="modal" data-bs-target="#tagdoc"
                // disabled={!props.formData.primaryTaxPayer?.primaryTaxPayer_LastName ? true : false}

                onClick={async () => {
                    // generatePDF()
                    props.setshowModal2(false)
                    props.setShowModal3(true)
                }}
                className="btn btn-success " style={{
                    "width": "fit-content",
                    "marginLeft": "90px"
                }}>Edit Form</button>

            <div className="row rowwwws">

                {/* <div className="></div> */}

                <div className="col-sm-12 col-md-6">
                    <h4>Primary Tax Payer</h4>
                    <form >
                        <div className="">
                            <label>Last name as per SSN card *</label>
                            <input
                                readOnly
                                type="text"
                                placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_LastName}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_LastName", e.target.value)}
                            />
                        </div>
                        <div className="">
                            <label>First Name</label>
                            <input
                                readOnly
                                type="text"
                                placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_FirstName}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_FirstName", e.target.value)}
                            />
                        </div>
                        <div className="">
                            <label>Middle Name</label>
                            <input type="text" placeholder=""
                                disabled
                                readOnly
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MiddleName}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_MiddleName", e.target.value)} 
                            />
                        </div>
                        <div className="">
                            <label>Marital Status</label>
                            <select
                                disabled
                                readOnly
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_MaritalStatus", e.target.value)}
                            >
                                <option value="">Select Marital Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                            </select>
                        </div>
                        <div className="">
                            <label>Date of Marriage (DD/MM/YYYY)</label>
                            <input readOnly type="date" placeholder="" disabled
                                required
                                value={formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage)}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_DateOfMarriage", e.target.value)}

                            />
                        </div>
                        <div className="">
                            <label>Date of Birth (DD/MM/YYYY)</label>
                            <input readOnly type="date" placeholder="" disabled
                                required
                                value={formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfBirth)}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_DateOfBirth", e.target.value)}

                            />
                        </div>
                        <div className="">
                            <label>SSN/ITIN</label>
                            <input readOnly type="text" placeholder="" disabled
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_SSN_ITIN}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_SSN_ITIN", e.target.value)}

                            />
                        </div>
                        <div className="">
                            <label>Current Visa Category</label>
                            <input readOnly type="text" placeholder="" disabled
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_CurrentVisaCategory}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_CurrentVisaCategory", e.target.value)}

                            />
                        </div>
                        <div className="">
                            <label>Current Occupation</label>
                            <input readOnly type="text" placeholder=""
                                required disabled
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_CurrentOccupation}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_CurrentOccupation", e.target.value)}

                            />
                        </div>
                        <div className="">
                            <label>First date of entry to US (DD/MM/YYYY)</label>
                            <input readOnly type="date" placeholder=""
                                required disabled
                                value={formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_FirstEntryToUS)}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_FirstEntryToUS", e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                <div className="col-sm-12 col-md-6">
                    <h4> Spouse </h4>
                    <form noValidate validated={validated} onSubmit={props.handleFormSubmit}>
                        <div className="">
                            <label>First date of entry to US (DD/MM/YYYY)</label>
                            <input readOnly disabled
                                type="date"
                                placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.spouse_FirstDate == '' ? '' : formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_FirstDate)}                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_FirstDate", e.target.value)}
                            // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                            />
                        </div>
                        <div className="">
                            <label>First Name</label>
                            <input readOnly disabled
                                type="text"
                                placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.spouse_FirstName}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_FirstName", e.target.value)}
                            // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                            />
                        </div>
                        <div className="">
                            <label>Middle Name</label>
                            <input readOnly type="text" placeholder="" disabled
                                required
                                value={props.formData.primaryTaxPayer?.spouse_MiddleName}
                                // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_MiddleName", e.target.value)}
                                // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                                />
                        </div>
                        <div className="">
                            <label>Marital Status</label>
                            <input type="text" placeholder="" disabled
                                required
                                readOnly
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' ? '' : props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus}
                                // onChange={(e) =>

                                //     props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_MaritalStatus", e.target.value)

                                // }


                                // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''}
                            />
                        </div>
                        <div className="">
                            <label>Date of Marriage (DD/MM/YYYY)</label>
                            <input readOnly type="date" placeholder=""
                                required disabled
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' ? '' : props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage}

                            // value={formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_DateOfMarriage)}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_DateOfMarriage", e.target.value)}
                            // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                            />
                        </div>
                        <div className="">
                            <label>Date of Birth (DD/MM/YYYY)</label>
                            <input readOnly type="date" placeholder=""
                                required disabled
                                value={formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_DateOfBirth)}
                                // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_DateOfBirth", e.target.value)}
                                // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                                />
                        </div>
                        <div className="">
                            <label>SSN/ITIN</label>
                            <input readOnly type="text" placeholder=""
                                required disabled
                                value={props.formData.primaryTaxPayer?.spouse_SSN_ITIN}
                                // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_SSN_ITIN", e.target.value)}
                                // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                                />
                        </div>
                        <div className="">
                            <label>Current Visa Category</label>
                            <input readOnly type="text" placeholder=""
                                required disabled
                                value={props.formData.primaryTaxPayer?.spouse_CurrentVisaCategory}
                                // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_CurrentVisaCategory", e.target.value)}
                                // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                                />
                        </div>
                        <div className="">
                            <label>Current Occupation</label>
                            <input readOnly type="text" placeholder=""
                                required disabled
                                value={props.formData.primaryTaxPayer?.spouse_CurrentOccupation}
                                // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_CurrentOccupation", e.target.value)}
                                // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                                />
                        </div>
                        <div className="">
                            <label>First date of entry to US (DD/MM/YYYY)</label>
                            <input readOnly type="date" placeholder=""
                                required disabled
                                value={formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_FirstEntryToUS)}
                                // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_FirstEntryToUS", e.target.value)}
                                // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''}
                            />
                        </div>
                        {/* Add more inputs with similar validation and value change handling */}
                    </form>
                </div>
            </div>
            <div className="row rowwwws">
                <div className="col-sm-7">
                    <form noValidate validated={validated} onSubmit={props.handleFormSubmit}>
                        <div className="">
                            <label>Current Street address</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                required
                                value={props.formData.contact?.currentStreetAddress}
                                onChange={(e) => props.handleInputChange("contact", "currentStreetAddress", e.target.value)}

                            />
                        </div>
                        <div className="">
                            <label>Apt Number</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.aptNumber}
                                onChange={(e) => props.handleInputChange("contact", "aptNumber", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>City</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.city}
                                onChange={(e) => props.handleInputChange("contact", "city", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>State</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.state}
                                onChange={(e) => props.handleInputChange("contact", "state", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Zip Code</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.zipCode}
                                onChange={(e) => props.handleInputChange("contact", "zipCode", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Country</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.country}
                                onChange={(e) => props.handleInputChange("contact", "country", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Email ID</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.emailId}
                                onChange={(e) => props.handleInputChange("contact", "emailId", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Mobile Number</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.mobileNumber}
                                onChange={(e) => props.handleInputChange("contact", "mobileNumber", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Work Number</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.workNumber}
                                onChange={(e) => props.handleInputChange("contact", "workNumber", e.target.value)}
                                required
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="row rowwwws">
                <div className="col-sm-7">
                    <form noValidate validated={validated} onSubmit={props.handleFormSubmit}>
                        <div className="">
                            <label>Dependant First Name</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.firstName}
                                onChange={(e) => props.handleInputChange("dependent", "firstName", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Dependant Middle Name</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.middleName}
                                onChange={(e) => props.handleInputChange("dependent", "middleName", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Dependant Last Name</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.lastName}
                                onChange={(e) => props.handleInputChange("dependent", "lastName", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>SSN/ITIN</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.ssnItin}
                                onChange={(e) => props.handleInputChange("dependent", "ssnItin", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Dependant Visa Category</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.visaCategory}
                                onChange={(e) => props.handleInputChange("dependent", "visaCategory", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Dependant Date of Birth</label>
                            <input readOnly
                                type="date"
                                placeholder=""
                                value={props.formData.dependent?.dateOfBirth}
                                onChange={(e) => props.handleInputChange("dependent", "dateOfBirth", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Relationship</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.relationship}
                                onChange={(e) => props.handleInputChange("dependent", "relationship", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>First date of entry to US (DD/MM/YYYY)</label>
                            <input readOnly
                                type="date"
                                placeholder=""
                                value={props.formData.dependent?.firstDateOfEntry}
                                onChange={(e) => props.handleInputChange("dependent", "firstDateOfEntry", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Have you incurred any dependant care expenses</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.dependantCareExpenses}
                                onChange={(e) => props.handleInputChange("dependent", "dependantCareExpenses", e.target.value)}
                                required
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="row rowwwws">
                <div className="col-sm-12">
                    <form >
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label style={{ "color": "transparent" }}>Label</label>
                                        <label>STATE NAME - 1</label>
                                        <label>Residency Start Date (DD/MM/YYYY)</label>
                                        <label>Residency End Date (DD/MM/YYYY)</label>
                                        <label>Rent Paid - Annual</label>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="columntax d-block">
                                            <label>Tax Payer</label>
                                            <label>Spouse</label>
                                        </div>
                                        <div className="columntax">
                                            <input readOnly
                                                type="text"
                                                placeholder=""
                                                required
                                                value={props.formData?.residency?.payerStateName1}
                                                onChange={(e) => props.handleInputChange("residency", "payerStateName1", e.target.value)}
                                            />
                                            <input readOnly
                                                type="text"
                                                placeholder=""
                                                required
                                                value={props.formData?.residency?.spouseStateName1}
                                                onChange={(e) => props.handleInputChange("residency", "spouseStateName1", e.target.value)}
                                            />
                                        </div>
                                        <div className="columntax">
                                            <input readOnly
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.payerResidencyStartDate1)}
                                                onChange={(e) => props.handleInputChange("residency", "payerResidencyStartDate1", e.target.value)}
                                            />
                                            <input readOnly
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.spouseResidencyStartDate1)}
                                                onChange={(e) => props.handleInputChange("residency", "spouseResidencyStartDate1", e.target.value)}
                                            />
                                        </div>
                                        <div className="columntax">
                                            <input readOnly
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.payerResidencyEndDate1)}
                                                onChange={(e) => props.handleInputChange("residency", "payerResidencyEndDate1", e.target.value)}
                                            />
                                            <input readOnly
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.spouseResidencyEndDate1)}
                                                onChange={(e) => props.handleInputChange("residency", "spouseResidencyEndDate1", e.target.value)}
                                            />
                                        </div>
                                        <div className="columntax">
                                            <input readOnly
                                                type="text"
                                                placeholder=""
                                                required
                                                value={props.formData?.residency?.payerRentPaidAnnual1}
                                                onChange={(e) => props.handleInputChange("residency", "payerRentPaidAnnual1", e.target.value)}
                                            />
                                            <input readOnly
                                                type="text"
                                                placeholder=""
                                                required
                                                value={props.formData?.residency?.spouseRentPaidAnnual1}
                                                onChange={(e) => props.handleInputChange("residency", "spouseRentPaidAnnual1", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <label>STATE NAME - 2</label>
                                        <label>Residency Start Date (DD/MM/YYYY)</label>
                                        <label>Residency End Date (DD/MM/YYYY)</label>
                                        <label>Rent Paid - Annual</label>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="columntax">
                                            <input readOnly
                                                type="text"
                                                placeholder=""
                                                required
                                                value={props.formData?.residency?.payerStateName2}
                                                onChange={(e) => props.handleInputChange("residency", "payerStateName2", e.target.value)}
                                            />
                                            <input readOnly
                                                type="text"
                                                placeholder=""
                                                required
                                                value={props.formData?.residency?.spouseStateName2}
                                                onChange={(e) => props.handleInputChange("residency", "spouseStateName2", e.target.value)}
                                            />
                                        </div>
                                        <div className="columntax">
                                            <input readOnly
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.payerResidencyStartDate2)}
                                                onChange={(e) => props.handleInputChange("residency", "payerResidencyStartDate2", e.target.value)}
                                            />
                                            <input readOnly
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.spouseResidencyStartDate2)}
                                                onChange={(e) => props.handleInputChange("residency", "spouseResidencyStartDate2", e.target.value)}
                                            />
                                        </div>
                                        <div className="columntax">
                                            <input readOnly
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.payerResidencyEndDate2)}
                                                onChange={(e) => props.handleInputChange("residency", "payerResidencyEndDate2", e.target.value)}
                                            />
                                            <input readOnly
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.spouseResidencyEndDate2)}
                                                onChange={(e) => props.handleInputChange("residency", "spouseResidencyEndDate2", e.target.value)}
                                            />
                                        </div>
                                        <div className="columntax">
                                            <input readOnly
                                                type="text"
                                                placeholder=""
                                                required
                                                value={props.formData?.residency?.payerRentPaidAnnual2}
                                                onChange={(e) => props.handleInputChange("residency", "payerRentPaidAnnual2", e.target.value)}
                                            />
                                            <input readOnly
                                                type="text"
                                                placeholder=""
                                                required
                                                value={props.formData?.residency?.spouseRentPaidAnnual2}
                                                onChange={(e) => props.handleInputChange("residency", "spouseRentPaidAnnual2", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export { Printablecomponent }; // Exporting as a named export
