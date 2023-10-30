import React from "react"
import { Link } from 'react-router-dom';
import Sidebar from'../../src/layout/sidebar'

function UploadDocument(props) {
    return (
      <div className="main d-flex w-100 h-100">
      <Sidebar isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn}/>
      <div className="mainContent container-fluid">
        <div className="card">
          <h3>Uploaded Tax Document</h3>
          <form >
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label>Choose Tax Type</label>
                  <select>
                    <option>Choose Taxtype</option>
                    <option>Client Tax Organizer Tax Year 2018</option>
                    <option>Form W-2</option>
                    <option>Form 1099-B</option>
                    <option>Form 1099-Div</option>
                    <option>Form 1099-G</option>
                    <option>Form 1098-T</option>
                    <option>Other Form-1098</option>
                    <option>Other Form-1099</option>
                    <option>Other Form/Schedules</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label>Upload Document</label>
                  <input type="file" className="input-file" placeholder=""/>
                </div>
              </div>
              <div className="btnWrapper">
                <button className="btn btn-green">Upload</button>
              </div>
            </div>
          </form>
          <table>
            <tr>
              <th>Tax Type</th>
              <th> Uploaded Documents</th>
              <th>Date</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>Form W-2</td>
              <td><a href="#">Download <span className="material-symbols-outlined"> download </span></a></td>
              <td>03-10-2023</td>
              <td>2023</td>
              <td>
               {/* <a href="#"> <span className="material-symbols-outlined"> edit </span> </a> */}
               <a href="#"> <span className="material-symbols-outlined"> delete </span> </a>
              </td>
            </tr>
          </table>
        </div>
      </div>
      </div>
    );
}

export default UploadDocument;
