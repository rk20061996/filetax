import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import authFunc from '../../serviceApi/admin';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextField } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';


const Personalinfo = (props) => {
    const [validated, setValidated] = useState(false);
    const [successMessage, setsuccessMessage] = useState(false);

    //const [value, setValue] = React.useState < Dayjs | null > (dayjs('2022-04-17'));

    useEffect(() => {
        //console.log("formData--->09",props.formData,props.formData.primaryTaxPayer?.primaryTaxPayer_LastName)
    }, [props.formData]);
    function formatDateToYYYYMMDD(dateString) {
        // var datetime = new Date(dateString);
        // console.log("Before: ", datetime);
        // datetime.setHours(datetime.getHours() + 6);
        // console.log("After: ", datetime);
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 as months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    const generatePDF = async () => {
        // alert("dd");
        // return
        const pages = document.querySelectorAll('.rowwww'); // Assuming each HTML page has the 'pdf-page' class
        const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
        const options = {
            scrollY: -window.scrollY,
            scale: 3, // Adjust the scale as needed
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
                document.body.style.fontSize = '20px'; // Adjust the font size as needed
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
            {successMessage && <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert onClose={() => { }}>Saved to Draft!</Alert>
                
            </Stack>}
            <button
                disabled={!props.formData.primaryTaxPayer?.primaryTaxPayer_LastName ? true : false}

                onClick={async () => {
                    setsuccessMessage(true);
                    await authFunc.updateTaxPersonal(props.formData)

                    setTimeout(
                        () => setsuccessMessage(false), 
                        2000
                      );
                }}
                className="btn btn-warning pull-right" style={{
                    "width": "fit-content"
                }}>Save As Draft</button>
            {/* <button
                // disabled={!props.formData.primaryTaxPayer?.primaryTaxPayer_LastName ? true : false}

                onClick={async () => {
                    generatePDF()


                }}
                className="btn btn-warning pull-right" style={{
                    "width": "fit-content"
                }}>PDFs</button> */}

            <div className="row rowwww">

                {/* <div className="></div> */}

                <div className="col-sm-12 mt-5">
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
                            {/* <input type="date" placeholder=""
                                required
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} 
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage && props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Married' ?formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage):""}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_DateOfMarriage", e.target.value)}

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
                                    value={props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage && props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Married' ?
                                        dayjs(formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage))
                                        : ""}
                                    onChange={(e) => {
                                        var datetime = new Date(e);
                                        datetime.setHours(datetime.getHours() + 6);
                                        console.log("dateeee", datetime)
                                        props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_DateOfMarriage", datetime)
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="">
                            <label>Date of Birth (DD/MM/YYYY)</label>
                            {/* <input type="date" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfBirth?formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfBirth):""}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_DateOfBirth", e.target.value)}

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
                                    value={props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfBirth ?
                                        dayjs(formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfBirth))
                                        : ""}
                                    onChange={(e) => {
                                        var datetime = new Date(e);
                                        datetime.setHours(datetime.getHours() + 6);
                                        console.log("dateeee", datetime)
                                        props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_DateOfBirth", datetime)
                                    }}
                                />
                            </LocalizationProvider>
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
                            {/* <input type="date" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_FirstEntryToUS?formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_FirstEntryToUS):""}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_FirstEntryToUS", e.target.value)}
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
                                    value={props.formData.primaryTaxPayer?.primaryTaxPayer_FirstEntryToUS ?
                                        dayjs(formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_FirstEntryToUS))
                                        : ""}
                                    onChange={(e) => {
                                        var datetime = new Date(e);
                                        datetime.setHours(datetime.getHours() + 6);
                                        console.log("dateeee", datetime)
                                        props.handleInputChange("primaryTaxPayer", "primaryTaxPayer_FirstEntryToUS", datetime)
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                    </form>
                </div>
                <div className="col-sm-12 mt-5">
                    <h4> Spouse </h4>
                    <form noValidate validated={validated} onSubmit={props.handleFormSubmit}>
                        <div className="">
                            <label>First date of entry to US (DD/MM/YYYY)</label>
                            {/* <input
                                type="date"
                                placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.spouse_FirstDate == '' ? '' : formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_FirstDate)}
                                // value={}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_FirstDate", e.target.value)}
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} /> */}
                                <LocalizationProvider style={{ 'width': '100% !important' }} dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''}

                                    format="DD-MM-YYYY"
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            error: false,
                                        },
                                    }}
                                    value={props.formData.primaryTaxPayer?.spouse_FirstDate ?
                                        dayjs(formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_FirstDate))
                                        : ""}
                                    onChange={(e) => {
                                        var datetime = new Date(e);
                                        datetime.setHours(datetime.getHours() + 6);
                                        console.log("dateeee", datetime)
                                        props.handleInputChange("primaryTaxPayer", "spouse_FirstDate", datetime)
                                    }}
                                />
                            </LocalizationProvider>
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
                            {/* <input type="date" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' ? '' : props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage}

                                // value={formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_DateOfMarriage)}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_DateOfMarriage", e.target.value)}
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} /> */}
                                <LocalizationProvider style={{ 'width': '100% !important' }} dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    readonly
                                    disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''}

                                    format="DD-MM-YYYY"
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            error: false,
                                            readOnly: true
                                        },
                                    }}
                                    // value={props.formData.primaryTaxPayer?.spouse_FirstDate ?
                                    //     dayjs(formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_FirstDate))
                                    //     : ""}
                                    value={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == '' ? '' :
                                        dayjs(formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage))
                                        // props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage
                                    }
                                    onChange={(e) => {
                                        var datetime = new Date(props.formData.primaryTaxPayer?.primaryTaxPayer_DateOfMarriage);
                                        datetime.setHours(datetime.getHours() + 6);
                                        console.log("dateeee", datetime)
                                        props.handleInputChange("primaryTaxPayer", "spouse_FirstDate", datetime)
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="">
                            <label>Date of Birth (DD/MM/YYYY)</label>
                            {/* <input type="date" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.spouse_DateOfBirth ? formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_DateOfBirth):""}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_DateOfBirth", e.target.value)}
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''} /> */}
                                <LocalizationProvider style={{ 'width': '100% !important' }} dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''}

                                    format="DD-MM-YYYY"
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            error: false,
                                        },
                                    }}
                                    value={props.formData.primaryTaxPayer?.spouse_DateOfBirth && props.formData.primaryTaxPayer?.spouse_DateOfBirth != '' ?
                                        dayjs(formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_DateOfBirth))
                                        : ""}
                                    onChange={(e) => {
                                        var datetime = new Date(e);
                                        datetime.setHours(datetime.getHours() + 6);
                                        console.log("dateeee", datetime)
                                        props.handleInputChange("primaryTaxPayer", "spouse_DateOfBirth", datetime)
                                    }}
                                />
                            </LocalizationProvider>
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
                            {/* <input type="date" placeholder=""
                                required
                                value={props.formData.primaryTaxPayer?.spouse_FirstEntryToUS ?formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_FirstEntryToUS):""}
                                onChange={(e) => props.handleInputChange("primaryTaxPayer", "spouse_FirstEntryToUS", e.target.value)}
                                disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''}
                            /> */}
                            <LocalizationProvider style={{ 'width': '100% !important' }} dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    disabled={props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == 'Single' || props.formData.primaryTaxPayer?.primaryTaxPayer_MaritalStatus == ''}

                                    format="DD-MM-YYYY"
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            error: false,
                                        },
                                    }}
                                    value={props.formData.primaryTaxPayer?.spouse_FirstEntryToUS ?
                                        dayjs(formatDateToYYYYMMDD(props.formData.primaryTaxPayer?.spouse_FirstEntryToUS))
                                        : ""}
                                    onChange={(e) => {
                                        var datetime = new Date(e);
                                        datetime.setHours(datetime.getHours() + 6);
                                        console.log("dateeee", datetime)
                                        props.handleInputChange("primaryTaxPayer", "spouse_FirstEntryToUS", datetime)
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                        {/* Add more inputs with similar validation and value change handling */}
                    </form>
                </div>
            </div>

        </div>
    );
}

export { Personalinfo }; // Exporting as a named export
