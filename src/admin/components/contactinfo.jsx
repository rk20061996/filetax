import React, { useState } from "react";
import { Link } from 'react-router-dom';
import authFunc from '../../serviceApi/admin';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Contactinfo = (props) => {
    const [validated, setValidated] = useState(false);
    const [successMessage, setsuccessMessage] = useState(false);

    return (
        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
           {successMessage && <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert onClose={() => { }}>Saved to Draft!</Alert>

            </Stack>}
            <button
                disabled = {!props.formData.contact?.currentStreetAddress?true:false}
                onClick={async() => {
                    setsuccessMessage(true);

                    await authFunc.updateTaxContact(props.formData)
                    setTimeout(
                        () => setsuccessMessage(false),
                        2000
                    );
                }}
                className="btn btn-warning pull-right" style={{
                    "width": "fit-content"
                }}>Save As Draft</button>
            <div className="row singleForm">
            <div className="col-sm-12 mt-5">
                    <form noValidate validated={validated} onSubmit={props.handleFormSubmit}>
                        <div className="form-group">
                            <label>Current Street address</label>
                            <input
                                type="text"
                                placeholder=""
                                required
                                value={props.formData.contact?.currentStreetAddress}
                                onChange={(e) => props.handleInputChange("contact", "currentStreetAddress", e.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label>Apt Number</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.aptNumber}
                                onChange={(e) => props.handleInputChange("contact", "aptNumber", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.city}
                                onChange={(e) => props.handleInputChange("contact", "city", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.state}
                                onChange={(e) => props.handleInputChange("contact", "state", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Zip Code</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.zipCode}
                                onChange={(e) => props.handleInputChange("contact", "zipCode", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.country}
                                onChange={(e) => props.handleInputChange("contact", "country", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email ID</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.emailId}
                                onChange={(e) => props.handleInputChange("contact", "emailId", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.mobileNumber}
                                onChange={(e) => props.handleInputChange("contact", "mobileNumber", e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Work Number</label>
                            <input
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
        </div>
    )
}
export { Contactinfo }; // Exporting as a named export
