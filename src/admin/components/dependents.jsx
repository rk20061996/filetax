import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import authFunc from '../../serviceApi/admin';

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
const Dependents = (props) => {
    const [validated, setValidated] = useState(false);
    const [successMessage, setsuccessMessage] = useState(false);
    const [currentDependentIndex, setCurrentDependentIndex] = useState(0);
    const [activeDependetIndex, setactiveDependetIndex] = useState(0);
    const [totalDependet, settotalDependet] = useState([0]);

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
    useEffect(() => {
        console.log("propos.dependent-->", activeDependetIndex)
        if (props.formData.dependent.length == 0) {
            const dependetn = props.formData.dependent
            dependetn.push({})
            // const [activeDependetIndex, setactiveDependetIndex] = useState(0);
            setactiveDependetIndex(0)
            // setactiveDependetIndex(dependetn.length - 1)

            props.setFormData({ ...props.formData, contact: props.formData.contact, primaryTaxPayer: props.formData.primaryTaxPayer, dependent: dependetn, residency: props.formData.residency })
        }
        // settotalDependet(props.formData.dependent.length)
    }, [props.formData, activeDependetIndex])

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
        <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
            {successMessage && <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert onClose={() => { }}>Saved to Draft!</Alert>

            </Stack>}
            <button
                disabled={!props.formData.dependent[0]?.firstName ? true : false}

                onClick={async () => {
                    setsuccessMessage(true);
                    await authFunc.updateTaxDependent(props.formData)
                    setTimeout(
                        () => setsuccessMessage(false),
                        2000
                    );
                }}
                className="btn btn-warning pull-right" style={{
                    "width": "fit-content"
                }}>Save As Draft</button>
            <button
                disabled={props.formData.dependent.length > 5}
                onClick={addDependent}
                className="btn btn-primary pull-right" style={{ float: 'right' }}>Add Dependent</button>
            {props.formData?.dependent?.length ? <div >
                {props.formData?.dependent?.map((depend, index) => (
                    <div key={index} style={{ display: 'inline-block', marginRight: '5px' }}>
                        <Button
                            variant={index === activeDependetIndex ? 'contained' : 'outlined'}
                            onClick={() => changeDependent(index)}
                            style={{ marginRight: '5px' }}
                        >
                            Dependent {index + 1}
                            {props.formData?.dependent?.length > 1 && <IconButton
                                onClick={() => removeDependent(index)}
                                color="secondary"
                                size="small"
                            >
                                <CloseIcon />
                            </IconButton>}
                        </Button>

                    </div>
                ))}
            </div> : ""}
            <div className="row">
                <div className="col-sm-12 mt-5">
                    <form noValidate validated={validated} onSubmit={props.handleFormSubmit}>
                        <div className="form-group">
                            <label>Dependant First Name</label>
                            <input
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
    )
}
export { Dependents }; // Exporting as a named export
