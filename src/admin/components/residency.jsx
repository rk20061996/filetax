import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import userProfile from "../../serviceApi/userprofile";
import { Modal, Button } from 'react-bootstrap';
import authFunc from '../../serviceApi/admin';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextField } from '@material-ui/core';
import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Residency = (props) => {
    const [validated, setValidated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setsuccessMessage] = useState(false);

    function formatDateToYYYYMMDD(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 as months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    const handleFormSubmit = async () => {
        const data = await userProfile.updateTaxDocumentStatus()
        await userProfile.updateTaxResidency(props.formData)

        handleShowModal()
    }
    const handleShowModal = () => setShowModal(!showModal);

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false)
    };
    const addResidency = () => {
        // Your logic to add a new dependent form
        // For example, you can create a new dependent object and add it to the formData array
        // props.handleAddDependent();
        // setCurrentDependentIndex(activeDependetIndex + 1);
        // settotalDependet(totalDependet + 1)
        if (props.formData.residency.length < 6) {
            const dependetn = props.formData.residency
            dependetn.push({})
            // setactiveDependetIndex(dependetn.length - 1)

            props.setFormData({ ...props.formData, contact: props.formData.contact, primaryTaxPayer: props.formData.primaryTaxPayer, dependent: props.formData.dependent, residency: dependetn })
        }


    };
    const handleInputChange = (index, field, value) => {
        const data = props.formData.residency
        data[index][field] = value
        props.setFormData({ ...props.formData, contact: props.formData.contact, primaryTaxPayer: props.formData.primaryTaxPayer, dependent: props.formData.dependent, residency: data })
    };
    useEffect(() => {
        // console.log("propos.dependent", props.formData)

        // settotalDependet(props.formData.dependent.length)
        if(props.formData.residency.length === 0){
            const dependetn = props.formData.residency
            dependetn.push({})
            // setactiveDependetIndex(dependetn.length - 1)

            props.setFormData({ ...props.formData, contact: props.formData.contact, primaryTaxPayer: props.formData.primaryTaxPayer, dependent: props.formData.dependent, residency: dependetn })
        }
    }, [props.formData])
    return (
        <div className="tab-pane fade" id="residency-tab-pane" role="tabpanel" aria-labelledby="residency-tab" tabIndex="0">
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Congrats! Tax Document has been saved.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
            {successMessage && <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert onClose={() => { }}>Saved to Draft!</Alert>

            </Stack>}
            <div className="row">
                <button
                disabled={!props.formData.residency[0]?.payerStateName1 ? true : false}

                    onClick={async () => {
                        setsuccessMessage(true);
                        await authFunc.updateTaxResidency(props.formData)
                        setTimeout(
                            () => setsuccessMessage(false),
                            2000
                        );
                    }}
                    className="btn btn-warning pull-right" style={{
                        "width": "fit-content"
                    }}>Save As Draft</button>
                <button
                    disabled={props.formData.residency.length > 5}
                    onClick={addResidency}
                    className="btn btn-primary pull-right" style={{ float: 'right',"width": "fit-content" }}>Add Residency</button>
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
                                                        type="text"
                                                        placeholder=""
                                                        required
                                                        value={props.formData?.residency?.[index].payerStateName1 || ""}
                                                        onChange={(e) => handleInputChange(index, "payerStateName1", e.target.value)}
                                                    />
                                                    <input
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
                                                        type="text"
                                                        placeholder=""
                                                        required
                                                        value={props.formData.residency?.[index].payerRentPaidAnnual1 || ""}
                                                        // value={props.formData?.residency?.payerRentPaidAnnual1 && props.formData.residency.payerRentPaidAnnual1[index]}
                                                        // value={dayjs(formatDateToYYYYMMDD(props.formData.residency?.[index].payerRentPaidAnnual1)) || ""}
                                                        onChange={(e) => handleInputChange(index, "payerRentPaidAnnual1", e.target.value)}
                                                    />

                                                    <input
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
            <div className="row">
                <div className="col-sm-12">
                    <button onClick={() => { handleFormSubmit() }} type="button" data-bs-dismiss="modal" aria-label="Close" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    )
}
// type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
export { Residency }; // Exporting as a named export
