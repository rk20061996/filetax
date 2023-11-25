import React, { useState } from "react";
import { Link } from 'react-router-dom';
import authFunc from '../../serviceApi/admin';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextField } from '@material-ui/core';


const Dependents = (props) => {
    const [validated, setValidated] = useState(false);
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
    return (
        <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
            <button
                disabled={!props.formData.dependent?.firstName ? true : false}

                onClick={async () => {
                    await authFunc.updateTaxDependent(props.formData)
                }}
                className="btn btn-warning pull-right" style={{
                    "width": "fit-content"
                }}>Save As Draft</button>
            <div className="row">
                <div className="col-sm-7">
                    <form noValidate validated={validated} onSubmit={props.handleFormSubmit}>
                        <div className="">
                            <label>Dependant First Name</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.firstName}
                                onChange={(e) => props.handleInputChange("dependent", "firstName", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Dependant Middle Name</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.middleName}
                                onChange={(e) => props.handleInputChange("dependent", "middleName", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Dependant Last Name</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.lastName}
                                onChange={(e) => props.handleInputChange("dependent", "lastName", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>SSN/ITIN</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.ssnItin}
                                onChange={(e) => props.handleInputChange("dependent", "ssnItin", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Dependant Visa Category</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.visaCategory}
                                onChange={(e) => props.handleInputChange("dependent", "visaCategory", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
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
                                    value={props.formData.dependent?.dateOfBirth && props.formData.dependent?.dateOfBirth != '' ?
                                        dayjs(formatDateToYYYYMMDD(props.formData.dependent?.dateOfBirth))
                                        : ""}
                                    onChange={(e) => {
                                        var datetime = new Date(e);
                                        datetime.setHours(datetime.getHours() + 6);
                                        console.log("dateeee", datetime)
                                        props.handleInputChange("dependent", "dateOfBirth", datetime)
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="">
                            <label>Relationship</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.dependent?.relationship}
                                onChange={(e) => props.handleInputChange("dependent", "relationship", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>First date of entry to US (DD/MM/YYYY)</label>
                            {/* <input
                                type="date"
                                placeholder=""
                                value={props.formData.dependent?.firstDateOfEntry}
                                onChange={(e) => props.handleInputChange("dependent", "firstDateOfEntry", e.target.value)}
                                required
                            /> */}
                            {/* {
                                console.log("props.formData.dependent?.firstDateOfEntry",props.formData.dependent)
                            } */}
                            <LocalizationProvider style={{ 'width': '100% !important' }} dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    format="DD-MM-YYYY"
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            error: false,
                                        },
                                    }}
                                    value={props.formData.dependent?.firstDateOfEntry && props.formData.dependent?.firstDateOfEntry != '' ?
                                        dayjs(formatDateToYYYYMMDD(props.formData.dependent?.firstDateOfEntry))
                                        : ""}
                                    onChange={(e) => {
                                        var datetime = new Date(e);
                                        datetime.setHours(datetime.getHours() + 6);
                                        console.log("dateeee", datetime)
                                        props.handleInputChange("dependent", "firstDateOfEntry", datetime)
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="">
                            <label>Have you incurred any dependant care expenses</label>
                            <input
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
        </div>
    )
}
export { Dependents }; // Exporting as a named export
