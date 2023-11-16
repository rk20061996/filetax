import React, { useState } from "react";
import { Link } from 'react-router-dom';


const Contactinfo = (props) => {
    const [validated, setValidated] = useState(false);
    return (
        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
            <div className="row">
                <div className="col-sm-7">
                    <form noValidate validated={validated} onSubmit={props.handleFormSubmit}>
                        <div className="">
                            <label>Current Street address</label>
                            <input
                                type="text"
                                placeholder=""
                                required
                                value={props.formData.contact?.currentStreetAddress}
                                onChange={(e) => props.handleInputChange("contact", "currentStreetAddress", e.target.value)}

                            />
                        </div>
                        <div className="">
                            <label>Apt Number</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.aptNumber}
                                onChange={(e) => props.handleInputChange("contact", "aptNumber", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>City</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.city}
                                onChange={(e) => props.handleInputChange("contact", "city", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>State</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.state}
                                onChange={(e) => props.handleInputChange("contact", "state", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Zip Code</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.zipCode}
                                onChange={(e) => props.handleInputChange("contact", "zipCode", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Country</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.country}
                                onChange={(e) => props.handleInputChange("contact", "country", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Email ID</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.emailId}
                                onChange={(e) => props.handleInputChange("contact", "emailId", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label>Mobile Number</label>
                            <input
                                type="text"
                                placeholder=""
                                value={props.formData.contact?.mobileNumber}
                                onChange={(e) => props.handleInputChange("contact", "mobileNumber", e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
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
