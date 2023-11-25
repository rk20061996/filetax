import React, { useState } from "react";
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

const Residency = (props) => {
    const [validated, setValidated] = useState(false);
    const [showModal, setShowModal] = useState(false);

    function formatDateToYYYYMMDD(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 as months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    const handleFormSubmit = async () => {
        // const data = await authFunc.updateTaxDocumentStatus()
        await authFunc.updateTaxResidency(props.formData)

        handleShowModal()
    }
    const handleShowModal = () => setShowModal(!showModal);

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false)
    };
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
            <div className="row">
                <button
                    disabled={!props.formData.residency?.payerStateName1 ? true : false}

                    onClick={async () => {
                        await authFunc.updateTaxResidency(props.formData)
                    }}
                    className="btn btn-warning pull-right" style={{
                        "width": "fit-content"
                    }}>Save As Draft</button>

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
                                            <input
                                                type="text"
                                                placeholder=""
                                                required
                                                value={props.formData?.residency?.payerStateName1}
                                                onChange={(e) => props.handleInputChange("residency", "payerStateName1", e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder=""
                                                required
                                                value={props.formData?.residency?.spouseStateName1}
                                                onChange={(e) => props.handleInputChange("residency", "spouseStateName1", e.target.value)}
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
                                                    value={props.formData.residency?.payerResidencyStartDate1 && props.formData.residency?.payerResidencyStartDate1 != '' ?
                                                        dayjs(formatDateToYYYYMMDD(props.formData.residency?.payerResidencyStartDate1))
                                                        : ""}
                                                    onChange={(e) => {
                                                        var datetime = new Date(e);
                                                        datetime.setHours(datetime.getHours() + 6);
                                                        console.log("dateeee", datetime)
                                                        props.handleInputChange("residency", "payerResidencyStartDate1", datetime)
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
                                                    value={props.formData.residency?.spouseResidencyStartDate1 && props.formData.residency?.spouseResidencyStartDate1 != '' ?
                                                        dayjs(formatDateToYYYYMMDD(props.formData.residency?.spouseResidencyStartDate1))
                                                        : ""}
                                                    onChange={(e) => {
                                                        var datetime = new Date(e);
                                                        datetime.setHours(datetime.getHours() + 6);
                                                        console.log("dateeee", datetime)
                                                        props.handleInputChange("residency", "spouseResidencyStartDate1", datetime)
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
                                                    value={props.formData.residency?.payerResidencyEndDate1 && props.formData.residency?.payerResidencyEndDate1 != '' ?
                                                        dayjs(formatDateToYYYYMMDD(props.formData.residency?.payerResidencyEndDate1))
                                                        : ""}
                                                    onChange={(e) => {
                                                        var datetime = new Date(e);
                                                        datetime.setHours(datetime.getHours() + 6);
                                                        console.log("dateeee", datetime)
                                                        props.handleInputChange("residency", "payerResidencyEndDate1", datetime)
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
                                                    value={props.formData.residency?.spouseResidencyEndDate1 && props.formData.residency?.spouseResidencyEndDate1 != '' ?
                                                        dayjs(formatDateToYYYYMMDD(props.formData.residency?.spouseResidencyEndDate1))
                                                        : ""}
                                                    onChange={(e) => {
                                                        var datetime = new Date(e);
                                                        datetime.setHours(datetime.getHours() + 6);
                                                        console.log("dateeee", datetime)
                                                        props.handleInputChange("residency", "spouseResidencyEndDate1", datetime)
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="columntax">
                                            <input
                                                type="text"
                                                placeholder=""
                                                required
                                                value={props.formData?.residency?.payerRentPaidAnnual1}
                                                onChange={(e) => props.handleInputChange("residency", "payerRentPaidAnnual1", e.target.value)}
                                            />
                                            <input
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
                                            <input
                                                type="text"
                                                placeholder=""
                                                required
                                                value={props.formData?.residency?.payerStateName2}
                                                onChange={(e) => props.handleInputChange("residency", "payerStateName2", e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder=""
                                                required
                                                value={props.formData?.residency?.spouseStateName2}
                                                onChange={(e) => props.handleInputChange("residency", "spouseStateName2", e.target.value)}
                                            />
                                        </div>
                                        <div className="columntax">
                                            {/* <input
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.payerResidencyStartDate2)}
                                                onChange={(e) => props.handleInputChange("residency", "payerResidencyStartDate2", e.target.value)}
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
                                                    value={props.formData.residency?.payerResidencyStartDate2 && props.formData.residency?.payerResidencyStartDate2 != '' ?
                                                        dayjs(formatDateToYYYYMMDD(props.formData.residency?.payerResidencyStartDate2))
                                                        : ""}
                                                    onChange={(e) => {
                                                        var datetime = new Date(e);
                                                        datetime.setHours(datetime.getHours() + 6);
                                                        console.log("dateeee", datetime)
                                                        props.handleInputChange("residency", "payerResidencyStartDate2", datetime)
                                                    }}
                                                />
                                            </LocalizationProvider>
                                            {/* <input
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.spouseResidencyStartDate2)}
                                                onChange={(e) => props.handleInputChange("residency", "spouseResidencyStartDate2", e.target.value)}
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
                                                    value={props.formData.residency?.spouseResidencyStartDate2 && props.formData.residency?.spouseResidencyStartDate2 != '' ?
                                                        dayjs(formatDateToYYYYMMDD(props.formData.residency?.spouseResidencyStartDate2))
                                                        : ""}
                                                    onChange={(e) => {
                                                        var datetime = new Date(e);
                                                        datetime.setHours(datetime.getHours() + 6);
                                                        console.log("dateeee", datetime)
                                                        props.handleInputChange("residency", "spouseResidencyStartDate2", datetime)
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="columntax">
                                            {/* <input
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.payerResidencyEndDate2)}
                                                onChange={(e) => props.handleInputChange("residency", "payerResidencyEndDate2", e.target.value)}
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
                                                    value={props.formData.residency?.payerResidencyEndDate2 && props.formData.residency?.payerResidencyEndDate2 != '' ?
                                                        dayjs(formatDateToYYYYMMDD(props.formData.residency?.payerResidencyEndDate2))
                                                        : ""}
                                                    onChange={(e) => {
                                                        var datetime = new Date(e);
                                                        datetime.setHours(datetime.getHours() + 6);
                                                        console.log("dateeee", datetime)
                                                        props.handleInputChange("residency", "payerResidencyEndDate2", datetime)
                                                    }}
                                                />
                                            </LocalizationProvider>
                                            {/* <input
                                                type="date"
                                                placeholder=""
                                                required
                                                value={formatDateToYYYYMMDD(props.formData?.residency?.spouseResidencyEndDate2)}
                                                onChange={(e) => props.handleInputChange("residency", "spouseResidencyEndDate2", e.target.value)}
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
                                                    value={props.formData.residency?.spouseResidencyEndDate2 && props.formData.residency?.spouseResidencyEndDate2 != '' ?
                                                        dayjs(formatDateToYYYYMMDD(props.formData.residency?.spouseResidencyEndDate2))
                                                        : ""}
                                                    onChange={(e) => {
                                                        var datetime = new Date(e);
                                                        datetime.setHours(datetime.getHours() + 6);
                                                        console.log("dateeee", datetime)
                                                        props.handleInputChange("residency", "spouseResidencyEndDate2", datetime)
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="columntax">
                                            <input
                                                type="text"
                                                placeholder=""
                                                required
                                                value={props.formData?.residency?.payerRentPaidAnnual2}
                                                onChange={(e) => props.handleInputChange("residency", "payerRentPaidAnnual2", e.target.value)}
                                            />
                                            <input
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
                        <div className="row">
                            <div className="col-sm-12">
                                <button onClick={() => { handleFormSubmit() }} type="button" data-bs-dismiss="modal" aria-label="Close" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
// type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
export { Residency }; // Exporting as a named export
