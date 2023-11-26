import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import authFunc from '../../serviceApi/admin';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextField } from '@material-ui/core';


import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const Printablecomponent = (props) => {
    const [validated, setValidated] = useState(false);
    const [showLoader, setshowLoader] = useState(false);
    const [sheet3Data, setsheet3Data] = useState([]);
    const [sheet4Data, setsheet4Data] = useState([]);
    // const [validated, setValidated] = useState(false);
    const [successMessage, setsuccessMessage] = useState(false);
    const [currentDependentIndex, setCurrentDependentIndex] = useState(0);
    const [activeDependetIndex, setactiveDependetIndex] = useState(0);
    const [totalDependet, settotalDependet] = useState([0]);

    const daYCounter = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth']
    // let  = []
    useEffect(() => {
        let data = []
        for (let i = 0; i < props.formData?.dependent.length; i++) {
            data.push(
                [`${daYCounter[i]} Dependent`, ''],
                ['Dependant First Name', props.formData?.dependent[i]?.firstName],
                ['Dependant Middle Name', props.formData?.dependent[i]?.middleName],
                ['Dependant Last Name', props.formData?.dependent[i]?.lastName],
                ['SSN/ITIN', props.formData?.dependent[i]?.ssnItin],
                ['Dependant Visa Category', props.formData?.dependent[i]?.visaCategory],
                ['Dependant Date of Birth', props.formData?.dependent[i]?.dateOfBirth],
                ['Relationship', props.formData?.dependent[i]?.relationship],
                ['First date of entry to US (DD/MM/YYYY)', props.formData?.dependent[i]?.firstDateOfEntry],
                ['Have you incurred any dependant care expenses', props.formData?.dependent[i]?.dependantCareExpenses],
                ['', ''],
                ['', ''],
                ['', ''],
            );

        }
        let data2 = []
        data2.push(['', 'Tax Payer', 'Spouse'])
        for (let i = 0; i < props.formData?.residency.length; i++) {
            data2.push([
                ['STATE NAME - ' + i + 1, props.formData?.residency[i].payerStateName1, props.formData?.residency[i].spouseStateName1],
                ['Residency Start Date (DD/MM/YYYY)', props.formData?.residency[i].payerResidencyStartDate1, props.formData?.residency[i].spouseResidencyStartDate1],
                ['Residency End Date (DD/MM/YYYY)', props.formData?.residency[i].payerResidencyEndDate1, props.formData?.residency[i].spouseResidencyEndDate1],
                ['Rent Paid - Annual', props.formData?.residency[i].payerRentPaidAnnual1, props.formData?.residency[i].spouseRentPaidAnnual1],
                ['', ''],
                ['', ''],
            ]);
        }
        console.log("data0000", data2)
        setsheet3Data(data)
        setsheet4Data(data2)
        if (props.formData.dependent.length == 0) {
            const dependetn = props.formData.dependent
            dependetn.push({})
            // const [activeDependetIndex, setactiveDependetIndex] = useState(0);
            setactiveDependetIndex(0)
            // setactiveDependetIndex(dependetn.length - 1)

            props.setFormData({ ...props.formData, contact: props.formData.contact, primaryTaxPayer: props.formData.primaryTaxPayer, dependent: dependetn, residency: props.formData.residency })
        }
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

    const exportToExcel = () => {
        // Create a workbook
        const workbook = XLSX.utils.book_new();

        // Add sheets to the workbook
        let sheet1Data = [
            ['', 'Primary Tax Payer', 'Spouse'],
            ['Last name as per SSN card', props.formData?.primaryTaxPayer?.primaryTaxPayer_LastName, props.formData?.primaryTaxPayer?.spouse_FirstDate],
            ['First Name', props.formData?.primaryTaxPayer?.primaryTaxPayer_FirstName, props.formData?.primaryTaxPayer?.spouse_FirstName],
            ['Middle Name', props.formData?.primaryTaxPayer?.primaryTaxPayer_MiddleName, props.formData?.primaryTaxPayer?.spouse_MiddleName],
            ['Marital Status', props.formData?.primaryTaxPayer?.primaryTaxPayer_MaritalStatus, props.formData?.primaryTaxPayer?.primaryTaxPayer_MaritalStatus != 'Single' && props.formData?.primaryTaxPayer?.primaryTaxPayer_MaritalStatus != '' ? props.formData?.primaryTaxPayer?.primaryTaxPayer_MaritalStatus : ""],
            ['Date of Marriage (DD/MM/YYYY)', props.formData?.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage, props.formData?.primaryTaxPayer?.primaryTaxPayer_MaritalStatus != 'Single' && props.formData?.primaryTaxPayer?.primaryTaxPayer_MaritalStatus != '' ? props.formData?.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage : ""],
            ['Date of Birth (DD/MM/YYYY)', props.formData?.primaryTaxPayer?.primaryTaxPayer_DateOfBirth, props.formData?.primaryTaxPayer?.spouse_DateOfBirth],
            ['SSN/ITIN', props.formData?.primaryTaxPayer?.primaryTaxPayer_SSN_ITIN, props.formData?.primaryTaxPayer?.spouse_SSN_ITIN],
            ['Current Visa Category', props.formData?.primaryTaxPayer?.primaryTaxPayer_CurrentVisaCategory, props.formData?.primaryTaxPayer?.spouse_CurrentVisaCategory],
            ['Current Occupation', props.formData?.primaryTaxPayer?.primaryTaxPayer_CurrentOccupation, props.formData?.primaryTaxPayer?.spouse_CurrentOccupation],
            ['First date of entry to US (DD/MM/YYYY)', props.formData?.primaryTaxPayer?.primaryTaxPayer_FirstEntryToUS, props.formData?.primaryTaxPayer?.spouse_FirstEntryToUS],
        ];
        // for(let i = 0 ; i < props.formData.primaryTaxPayer)
        const sheet1 = XLSX.utils.aoa_to_sheet(sheet1Data);

        // Set column width for Sheet1 (columns B and C)
        sheet1['!cols'] = [{ width: 25 }, { width: 25 }, { width: 25 }];

        XLSX.utils.book_append_sheet(workbook, sheet1, 'Personal Info');



        const sheet2Data = [
            ['Current Street address', props.formData?.contact?.currentStreetAddress],
            ['Apt Number', props.formData?.contact?.aptNumber],
            ['City', props.formData?.contact?.city],
            ['State', props.formData?.contact?.state],
            ['Zip Code', props.formData?.contact?.zipCode],
            ['Country', props.formData?.contact?.country],
            ['Email ID', props.formData?.contact?.emailId],
            ['Mobile Number', props.formData?.contact?.mobileNumber],
            ['Work Number', props.formData?.contact?.workNumber],
        ];
        const sheet2 = XLSX.utils.aoa_to_sheet(sheet2Data);

        // Set column width for Sheet2 (columns A and B)
        sheet2['!cols'] = [{ width: 20 }, { width: 20 }];

        XLSX.utils.book_append_sheet(workbook, sheet2, 'Contact Info');


        const sheet3 = XLSX.utils.aoa_to_sheet(sheet3Data);

        // Set column width for Sheet2 (columns A and B)
        sheet3['!cols'] = [{ width: 20 }, { width: 25 }];

        XLSX.utils.book_append_sheet(workbook, sheet3, 'Dependent Details');



        let data2 = [['', 'Tax Payer', 'Spouse']];
        for (let i = 0; i < props.formData?.residency.length; i++) {
            data2.push(['STATE NAME - ' + (i + 1), props.formData?.residency[i]?.payerStateName1, props.formData?.residency[i]?.spouseStateName1]);
            data2.push(['Residency Start Date (DD/MM/YYYY)', props.formData?.residency[i]?.payerResidencyStartDate1, props.formData?.residency[i]?.spouseResidencyStartDate1]);
            data2.push(['Residency End Date (DD/MM/YYYY)', props.formData?.residency[i]?.payerResidencyEndDate1, props.formData?.residency[i]?.spouseResidencyEndDate1]);
            data2.push(['Rent Paid - Annual', props.formData?.residency[i]?.payerRentPaidAnnual1, props.formData?.residency[i]?.spouseRentPaidAnnual1]);
            data2.push(['', '']);
            data2.push(['', '']);
        }

        const sheet4 = XLSX.utils.aoa_to_sheet(data2);
        sheet4['!cols'] = [{ width: 20 }, { width: 25 }, { width: 25 }];


        XLSX.utils.book_append_sheet(workbook, sheet4, 'Residency Details');

        // Save the workbook to a file
        XLSX.writeFile(workbook, 'exported_data.xlsx');
    };
    const addDependent = () => {
        // Your logic to add a new dependent form
        // For example, you can create a new dependent object and add it to the formData array
        // props.handleAddDependent();
        // setCurrentDependentIndex(activeDependetIndex + 1);
        // settotalDependet(totalDependet + 1)
        if (props.formData.dependent.length < 6) {
            const dependetn = props.formData.dependent
            dependetn.push({})
            setactiveDependetIndex(dependetn.length - 1)

            props.setFormData({ ...props.formData, contact: props.formData.contact, primaryTaxPayer: props.formData.primaryTaxPayer, dependent: dependetn, residency: props.formData.residency })
        }


    };

    const changeDependent = (index) => {
        setactiveDependetIndex(index)
    };
    const removeDependent = (index) => {
        // alert(3)
        // Implement your logic to remove the dependent at the given index
        let dependetn = props.formData.dependent
        // const dependetn = props.formData.dependent
        dependetn.splice(index, 1)
        props.setFormData({ ...props.formData, contact: props.formData.contact, primaryTaxPayer: props.formData.primaryTaxPayer, dependent: dependetn, residency: props.formData.residency })
        // let 
        setTimeout(
            () => setactiveDependetIndex(0)
            ,
            100
        );
    };
    const handleInputChange = (index, field, value) => {
        const data = props.formData.dependent
        data[index][field] = value
        props.setFormData({ ...props.formData, contact: props.formData.contact, primaryTaxPayer: props.formData.primaryTaxPayer, dependent: data, residency: props.formData.residency })
    };
    return (
        <div className="tab-pane fade show active"
            id="personalInfotab"
            role="tabpanel"
            aria-labelledby="personalInfo"
            tabindex="0"
        >
            <div className="headBtn">
                <button
                    disabled={!props.formData.primaryTaxPayer?.primaryTaxPayer_LastName ? true : false}

                    onClick={async () => {
                        exportToExcel()


                    }}
                    className="btn btn-warning pull-right " style={{
                        "width": "fit-content"
                    }}>

                    {showLoader && <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>}Download XLS</button>
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
            </div>
            <div className="row rowwwws">

                {/* <div className="></div> */}

                <div className="col-sm-12 col-md-7">
                    <h4>Primary Tax Payer</h4>
                    <form >
                        <div className="form-group">
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
                        <div className="form-group">
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
                        <div className="form-group">
                            <label>Middle Name</label>
                            <input type="text" placeholder=""
                                disabled
                                readOnly
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MiddleName}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_MiddleName", e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
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
                        <div className="form-group">
                            <label>Date of Marriage (DD/MM/YYYY)</label>
                            <input readOnly type="date" placeholder="" disabled
                                required
                                value={formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage)}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_DateOfMarriage", e.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth (DD/MM/YYYY)</label>
                            <input readOnly type="date" placeholder="" disabled
                                required
                                value={formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfBirth)}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_DateOfBirth", e.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label>SSN/ITIN</label>
                            <input readOnly type="text" placeholder="" disabled
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_SSN_ITIN}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_SSN_ITIN", e.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label>Current Visa Category</label>
                            <input readOnly type="text" placeholder="" disabled
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_CurrentVisaCategory}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_CurrentVisaCategory", e.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label>Current Occupation</label>
                            <input readOnly type="text" placeholder=""
                                required disabled
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_CurrentOccupation}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_CurrentOccupation", e.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label>First date of entry to US (DD/MM/YYYY)</label>
                            <input readOnly type="date" placeholder=""
                                required disabled
                                value={formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_FirstEntryToUS)}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_FirstEntryToUS", e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                <div className="col-sm-12 col-md-5">
                    <h4> Spouse </h4>
                    <form noValidate validated={validated} onSubmit={props.handleFormSubmit}>
                        <div className="form-group">
                            {/* <label>First date of entry to US (DD/MM/YYYY)</label> */}
                            <input readOnly disabled
                                type="date"
                                placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.spouse_FirstDate == '' ? '' : formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_FirstDate)}                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_FirstDate", e.target.value)}
                            // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                            />
                        </div>
                        <div className="form-group">
                            {/* <label>First Name</label> */}
                            <input readOnly disabled
                                type="text"
                                placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.spouse_FirstName}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_FirstName", e.target.value)}
                            // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                            />
                        </div>
                        <div className="form-group">
                            {/* <label>Middle Name</label> */}
                            <input readOnly type="text" placeholder="" disabled
                                required
                                value={props.formData.primaryTaxPayer?.spouse_MiddleName}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_MiddleName", e.target.value)}
                            // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                            />
                        </div>
                        <div className="form-group">
                            {/* <label>Marital Status</label> */}
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
                        <div className="form-group">
                            {/* <label>Date of Marriage (DD/MM/YYYY)</label> */}
                            <input readOnly type="date" placeholder=""
                                required disabled
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' ? '' : props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage}

                            // value={formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_DateOfMarriage)}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_DateOfMarriage", e.target.value)}
                            // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                            />
                        </div>
                        <div className="form-group">
                            {/* <label>Date of Birth (DD/MM/YYYY)</label> */}
                            <input readOnly type="date" placeholder=""
                                required disabled
                                value={formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_DateOfBirth)}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_DateOfBirth", e.target.value)}
                            // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                            />
                        </div>
                        <div className="form-group">
                            {/* <label>SSN/ITIN</label> */}
                            <input readOnly type="text" placeholder=""
                                required disabled
                                value={props.formData.primaryTaxPayer?.spouse_SSN_ITIN}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_SSN_ITIN", e.target.value)}
                            // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                            />
                        </div>
                        <div className="form-group">
                            {/* <label>Current Visa Category</label> */}
                            <input readOnly type="text" placeholder=""
                                required disabled
                                value={props.formData.primaryTaxPayer?.spouse_CurrentVisaCategory}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_CurrentVisaCategory", e.target.value)}
                            // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                            />
                        </div>
                        <div className="form-group">
                            {/* <label>Current Occupation</label> */}
                            <input readOnly type="text" placeholder=""
                                required disabled
                                value={props.formData.primaryTaxPayer?.spouse_CurrentOccupation}
                            // onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_CurrentOccupation", e.target.value)}
                            // disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                            />
                        </div>
                        <div className="form-group">
                            {/* <label>First date of entry to US (DD/MM/YYYY)</label> */}
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
            <div className="row rowwwws singleForm mt-5">
                <div className="col-sm-12">
                    <h4>Contact Details</h4>
                    <form noValidate validated={validated} onSubmit={props.handleFormSubmit}>
                        <div className="form-group">
                            <label>Current Street address</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                required
                                value={props.formData.contact?.currentStreetAddress}
                                onChange={(e) => props.handleInputChange("contact", "currentStreetAddress", e.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label>Apt Number</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.aptNumber}
                                onChange={(e) => props.handleInputChange("contact", "aptNumber", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.city}
                                onChange={(e) => props.handleInputChange("contact", "city", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.state}
                                onChange={(e) => props.handleInputChange("contact", "state", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Zip Code</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.zipCode}
                                onChange={(e) => props.handleInputChange("contact", "zipCode", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.country}
                                onChange={(e) => props.handleInputChange("contact", "country", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email ID</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.emailId}
                                onChange={(e) => props.handleInputChange("contact", "emailId", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.mobileNumber}
                                onChange={(e) => props.handleInputChange("contact", "mobileNumber", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
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
            <div className="row rowwwws singleForm mt-5">
                <div className="col-sm-12">
                    <h4>Dependent Details</h4>
                    {/* <form noValidate validated={validated} onSubmit={props.handleFormSubmit}>
                        <div className="form-group">
                            <label>Dependant First Name</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.firstName}
                                onChange={(e) => props.handleInputChange("dependent", "firstName", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Dependant Middle Name</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.middleName}
                                onChange={(e) => props.handleInputChange("dependent", "middleName", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Dependant Last Name</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.lastName}
                                onChange={(e) => props.handleInputChange("dependent", "lastName", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>SSN/ITIN</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.ssnItin}
                                onChange={(e) => props.handleInputChange("dependent", "ssnItin", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Dependant Visa Category</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.visaCategory}
                                onChange={(e) => props.handleInputChange("dependent", "visaCategory", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Dependant Date of Birth</label>
                            <input readOnly
                                type="date"
                                placeholder=""
                                value={props.formData.dependent?.dateOfBirth}
                                onChange={(e) => props.handleInputChange("dependent", "dateOfBirth", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Relationship</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.relationship}
                                onChange={(e) => props.handleInputChange("dependent", "relationship", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>First date of entry to US (DD/MM/YYYY)</label>
                            <input readOnly
                                type="date"
                                placeholder=""
                                value={props.formData.dependent?.firstDateOfEntry}
                                onChange={(e) => props.handleInputChange("dependent", "firstDateOfEntry", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Have you incurred any dependant care expenses</label>
                            <input readOnly
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.dependantCareExpenses}
                                onChange={(e) => props.handleInputChange("dependent", "dependantCareExpenses", e.target.value)}
                                required
                            />
                        </div>
                    </form> */}
                    {props.formData?.dependent?.length ? <div className="mt-4">
                        {props.formData?.dependent?.map((depend, index) => (
                            <div key={index} style={{ display: 'inline-block', marginRight: '5px' }}>
                                <Button
                                    variant={index === activeDependetIndex ? 'contained' : 'outlined'}
                                    onClick={() => changeDependent(index)}
                                    style={{ marginRight: '5px' }}
                                >
                                    Dependent {index + 1}
                                    {/* {props.formData?.dependent?.length > 1 && <IconButton
                                        onClick={() => removeDependent(index)}
                                        color="secondary"
                                        size="small"
                                    >
                                        <CloseIcon />
                                    </IconButton>} */}
                                </Button>

                            </div>
                        ))}
                    </div> : ""}
                    <div className="row singleForm">
                        <div className="col-sm-12 mt-5">
                            <form noValidate validated={validated} onSubmit={props.handleFormSubmit}>
                                <div className="form-group">
                                    <label>Dependant First Name</label>
                                    <input
                                        readonly
                                        type="text"
                                        placeholder=""
                                        value={props.formData.dependent[activeDependetIndex]?.firstName ? props.formData.dependent[activeDependetIndex]?.firstName : ""}
                                        onChange={(e) => handleInputChange(activeDependetIndex, "firstName", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Dependant Middle Name</label>
                                    <input
                                        readonly
                                        type="text"
                                        placeholder=""
                                        value={props.formData.dependent[activeDependetIndex]?.middleName ? props.formData.dependent[activeDependetIndex]?.middleName : ""}
                                        onChange={(e) => handleInputChange(activeDependetIndex, "middleName", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Dependant Last Name</label>
                                    <input
                                        readonly

                                        type="text"
                                        placeholder=""
                                        value={props.formData.dependent[activeDependetIndex]?.lastName ? props.formData.dependent[activeDependetIndex]?.lastName : ""}
                                        onChange={(e) => handleInputChange(activeDependetIndex, "lastName", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>SSN/ITIN</label>
                                    <input
                                        readonly
                                        type="text"
                                        placeholder=""
                                        value={props.formData.dependent[activeDependetIndex]?.ssnItin ? props.formData.dependent[activeDependetIndex]?.ssnItin : ''}
                                        onChange={(e) => handleInputChange(activeDependetIndex, "ssnItin", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Dependant Visa Category</label>
                                    <input
                                        readonly
                                        type="text"
                                        placeholder=""
                                        value={props.formData.dependent[activeDependetIndex]?.visaCategory ? props.formData.dependent[activeDependetIndex]?.visaCategory : ""}
                                        onChange={(e) => handleInputChange(activeDependetIndex, "visaCategory", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Dependant Date of Birth</label>
                                    {/* <input
                                type="date"
                                placeholder=""
                                value={props.formData.dependent?.dateOfBirth}
                                onChange={(e) => props.handleInputChange("dependent", "dateOfBirth", e.target.value)}
                                required
                            /> */}
                                    <LocalizationProvider style={{ 'width': '100% !important' }} dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            format="DD-MM-YYYY"
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                    error: false,
                                                },
                                            }}
                                            value={props.formData.dependent[activeDependetIndex]?.dateOfBirth && props.formData.dependent[activeDependetIndex]?.dateOfBirth != '' ?
                                                dayjs(formatDateToYYYYMMDD(props.formData.dependent[activeDependetIndex]?.dateOfBirth))
                                                : ""}
                                            onChange={(e) => {
                                                var datetime = new Date(e);
                                                datetime.setHours(datetime.getHours() + 6);
                                                console.log("dateeee", datetime)
                                                handleInputChange(activeDependetIndex, "dateOfBirth", datetime)
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="form-group">
                                    <label>Relationship</label>
                                    <input
                                        readonly
                                        type="text"
                                        placeholder=""
                                        value={props.formData.dependent[activeDependetIndex]?.relationship ? props.formData.dependent[activeDependetIndex]?.relationship : ""}
                                        onChange={(e) => handleInputChange(activeDependetIndex, "relationship", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>First date of entry to US (DD/MM/YYYY)</label>
                                    {/* <input
                                type="date"
                                placeholder=""
                                value={props.formData.dependent?.firstDateOfEntry}
                                onChange={(e) => props.handleInputChange("dependent", "firstDateOfEntry", e.target.value)}
                                required
                            /> */}
                                    <LocalizationProvider style={{ 'width': '100% !important' }} dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            format="DD-MM-YYYY"
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                    error: false,
                                                },
                                            }}
                                            value={props.formData.dependent[activeDependetIndex]?.firstDateOfEntry && props.formData.dependent[activeDependetIndex]?.firstDateOfEntry != '' ?
                                                dayjs(formatDateToYYYYMMDD(props.formData.dependent[activeDependetIndex]?.firstDateOfEntry))
                                                : ""}
                                            onChange={(e) => {
                                                var datetime = new Date(e);
                                                datetime.setHours(datetime.getHours() + 6);
                                                console.log("dateeee", datetime)
                                                handleInputChange(activeDependetIndex, "firstDateOfEntry", datetime)
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="form-group">
                                    <label>Have you incurred any dependant care expenses</label>
                                    <input
                                        readonly
                                        type="text"
                                        placeholder=""
                                        value={props.formData.dependent[activeDependetIndex]?.dependantCareExpenses ? props.formData.dependent[activeDependetIndex]?.dependantCareExpenses : ""}
                                        onChange={(e) => handleInputChange(activeDependetIndex, "dependantCareExpenses", e.target.value)}
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row rowwwws mt-5 residentForm">
                <div className="col-sm-12">
                    <h4>Resident Details</h4>
                    {/* <form >
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-md-4 residentLabel">
                                        <label style={{ "color": "transparent" }}>Label</label>
                                        <label>STATE NAME - 1</label>
                                        <label>Residency Start Date (DD/MM/YYYY)</label>
                                        <label>Residency End Date (DD/MM/YYYY)</label>
                                        <label>Rent Paid - Annual</label>
                                    </div>
                                    <div className="col-md-8">
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
                                <div className="row mt-4 residentLabel">
                                    <div className="col-md-4">
                                        <label>STATE NAME - 2</label>
                                        <label>Residency Start Date (DD/MM/YYYY)</label>
                                        <label>Residency End Date (DD/MM/YYYY)</label>
                                        <label>Rent Paid - Annual</label>
                                    </div>
                                    <div className="col-md-8">
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

                    </form> */}
                    {props.formData?.residency?.length ? < >
                        {props.formData?.residency?.map((depend, index) => (
                            <div className="col-sm-12">
                                {/* <button
                                type="button"
                            // onClick={() => 
                            // handleRemoveResidency(index)
                            // }
                            >
                                Remove
                            </button> */}
                                <form >
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="col-md-6 residencyLabel">
                                                    <label style={{ "color": "transparent" }}>Label</label>
                                                    <label>STATE NAME - {index + 1}</label>
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
                                                        <input
                                                            readonly
                                                            type="text"
                                                            placeholder=""
                                                            required
                                                            value={props.formData?.residency?.[index].payerStateName1 || ""}
                                                        // onChange={(e) => handleInputChange(index, "payerStateName1", e.target.value)}
                                                        />
                                                        <input
                                                            readonly
                                                            type="text"
                                                            placeholder=""
                                                            required
                                                            value={props.formData?.residency?.[index].spouseStateName1 || ""}
                                                            onChange={(e) => handleInputChange(index, "spouseStateName1", e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="columntax">
                                                        {/* <input
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.payerResidencyStartDate1)}
                                                onChange={(e) => props.handleInputChange("residency", "payerResidencyStartDate1", e.target.value)}
                                            /> */}
                                                        <LocalizationProvider style={{ 'width': '100% !important' }} dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                format="DD-MM-YYYY"
                                                                slotProps={{
                                                                    textField: {
                                                                        size: "small",
                                                                        error: false,
                                                                    },
                                                                }}
                                                                value={dayjs(formatDateToYYYYMMDD(props.formData.residency?.[index].payerResidencyStartDate1)) || ""}

                                                                // value={props.formData.residency[index]?.payerResidencyStartDate1 && props.formData.residency?.[index].payerResidencyStartDate1 && props.formData.residency?.[index].payerResidencyStartDate1 != '' ?
                                                                //     dayjs(formatDateToYYYYMMDD(props.formData.residency?.payerResidencyStartDate1[index]))
                                                                //     : ""}
                                                                onChange={(e) => {
                                                                    var datetime = new Date(e);
                                                                    datetime.setHours(datetime.getHours() + 6);
                                                                    console.log("dateeee", datetime)
                                                                    handleInputChange(index, "payerResidencyStartDate1", datetime)
                                                                }}
                                                            />
                                                        </LocalizationProvider>
                                                        {/* <input
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.spouseResidencyStartDate1)}
                                                onChange={(e) => props.handleInputChange("residency", "spouseResidencyStartDate1", e.target.value)}
                                            /> */}
                                                        <LocalizationProvider style={{ 'width': '100% !important' }} dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                format="DD-MM-YYYY"
                                                                slotProps={{
                                                                    textField: {
                                                                        size: "small",
                                                                        error: false,
                                                                    },
                                                                }}
                                                                // value={props.formData.residency?.spouseResidencyStartDate1 && props.formData.residency?.[index].spouseResidencyStartDate1 && props.formData.residency?.spouseResidencyStartDate1[index] != '' ?
                                                                //     dayjs(formatDateToYYYYMMDD(props.formData.residency?.spouseResidencyStartDate1[index]))
                                                                //     : ""}
                                                                value={dayjs(formatDateToYYYYMMDD(props.formData.residency?.[index].spouseResidencyStartDate1)) || ""}
                                                                onChange={(e) => {
                                                                    var datetime = new Date(e);
                                                                    datetime.setHours(datetime.getHours() + 6);
                                                                    console.log("dateeee", datetime)
                                                                    handleInputChange(index, "spouseResidencyStartDate1", datetime)
                                                                }}
                                                            />
                                                        </LocalizationProvider>
                                                    </div>
                                                    <div className="columntax">
                                                        {/* <input
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.payerResidencyEndDate1)}
                                                onChange={(e) => props.handleInputChange("residency", "payerResidencyEndDate1", e.target.value)}
                                            /> */}
                                                        <LocalizationProvider style={{ 'width': '100% !important' }} dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                format="DD-MM-YYYY"
                                                                slotProps={{
                                                                    textField: {
                                                                        size: "small",
                                                                        error: false,
                                                                    },
                                                                }}
                                                                // value={props.formData.residency?.payerResidencyEndDate1 && props.formData.residency?.payerResidencyEndDate1[index] && props.formData.residency?.payerResidencyEndDate1[index] != '' ?
                                                                //     dayjs(formatDateToYYYYMMDD(props.formData.residency?.payerResidencyEndDate1[index]))
                                                                //     : ""}
                                                                value={dayjs(formatDateToYYYYMMDD(props.formData.residency?.[index].payerResidencyEndDate1)) || ""}
                                                                onChange={(e) => {
                                                                    var datetime = new Date(e);
                                                                    datetime.setHours(datetime.getHours() + 6);
                                                                    console.log("dateeee", datetime)
                                                                    handleInputChange(index, "payerResidencyEndDate1", datetime)
                                                                }}
                                                            />
                                                        </LocalizationProvider>
                                                        {/* <input
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.spouseResidencyEndDate1)}
                                                onChange={(e) => props.handleInputChange("residency", "spouseResidencyEndDate1", e.target.value)}
                                            /> */}
                                                        <LocalizationProvider style={{ 'width': '100% !important' }} dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                format="DD-MM-YYYY"
                                                                slotProps={{
                                                                    textField: {
                                                                        size: "small",
                                                                        error: false,
                                                                    },
                                                                }}
                                                                // value={props.formData.residency?.spouseResidencyEndDate1 && props.formData.residency?.spouseResidencyEndDate1[index] && props.formData.residency?.spouseResidencyEndDate1[index] != '' ?
                                                                //     dayjs(formatDateToYYYYMMDD(props.formData.residency?.spouseResidencyEndDate1[index]))
                                                                //     : ""}
                                                                value={dayjs(formatDateToYYYYMMDD(props.formData.residency?.[index].spouseResidencyEndDate1)) || ""}
                                                                onChange={(e) => {
                                                                    var datetime = new Date(e);
                                                                    datetime.setHours(datetime.getHours() + 6);
                                                                    console.log("dateeee", datetime)
                                                                    handleInputChange(index, "spouseResidencyEndDate1", datetime)
                                                                }}
                                                            />
                                                        </LocalizationProvider>
                                                    </div>
                                                    <div className="columntax">
                                                        <input
                                                            readonly
                                                            type="text"
                                                            placeholder=""
                                                            required
                                                            value={props.formData.residency?.[index].payerRentPaidAnnual1 || ""}
                                                            // value={props.formData?.residency?.payerRentPaidAnnual1 && props.formData.residency.payerRentPaidAnnual1[index]}
                                                            // value={dayjs(formatDateToYYYYMMDD(props.formData.residency?.[index].payerRentPaidAnnual1)) || ""}
                                                            onChange={(e) => handleInputChange(index, "payerRentPaidAnnual1", e.target.value)}
                                                        />

                                                        <input
                                                            readonly
                                                            type="text"
                                                            placeholder=""
                                                            required
                                                            // value={props.formData?.residency?.spouseRentPaidAnnual1?.[index] || ""}
                                                            // value={props.formData?.residency?.spouseRentPaidAnnual1 && props.formData.residency.spouseRentPaidAnnual1[index]}
                                                            // value={dayjs(formatDateToYYYYMMDD(props.formData.residency?.[index].spouseRentPaidAnnual1)) || ""}
                                                            value={props.formData.residency?.[index].spouseRentPaidAnnual1 || ""}
                                                            onChange={(e) => handleInputChange(index, "spouseRentPaidAnnual1", e.target.value)}
                                                        />

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </form>
                            </div>

                        )
                        )}
                    </> : ""}
                </div>
            </div>
        </div>
    );
}

export { Printablecomponent }; // Exporting as a named export
