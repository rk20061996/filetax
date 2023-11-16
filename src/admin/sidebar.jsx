import React from "react"
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="SlideNav">
                <div className="logo">
                    <img src="images/footer-logo.png" alt="" className="w-100" />
                </div>
                <div className="prfileWrap">
                    <p>Hello Admin 
                        {/* <a href="profile.html"> \
                    <span className="material-symbols-outlined"> person </span> </a>  */}
                    </p>
                </div>
                <ul className="list-unstyled">
                    <li><a href="home.html" className="active"><span className="material-symbols-outlined"> home </span> Dashboard</a></li>
                    <li>
                        <fieldset>
                            <details open>
                                <summary>Status</summary>
                                <ul>
                                    <li>
                                        <label><input type="checkbox" name="fc" value="red" checked />All Clients</label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" name="fc" value="orange" />Ready for preparation</label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" name="fc" value="yellow" />In Progress </label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" name="fc" value="green" />Summary Sent</label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" name="fc" value="blue" checked />Pending Recieved </label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" name="fc" value="purple" />Draft</label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" name="fc" value="magenta" />Ready for e-file</label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" name="fc" value="lightpink" />Accepted</label>
                                    </li>
                                </ul>
                            </details>
                        </fieldset>
                    </li>
                </ul>
            </div>
    );
}

export default Sidebar;
