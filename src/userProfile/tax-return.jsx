import React from "react"
import { Link } from 'react-router-dom';
import Sidebar from'../../src/layout/sidebar'

function TaxReturn(props) {
    return (
      <div className="main d-flex w-100 h-100">
      <Sidebar isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn}/>
      <div className="mainContent container-fluid">
        <div className="card">
          <h3>Tax Return</h3>
          <div className="d-flex topWrap">
              <p>Show 
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                entries
              </p>
              <p>Search <input type="search" /> </p>
          </div>
          <table>
            <tr>
              <th>S.No</th>
              <th>Document Name</th>
              <th>Document Tax Document</th>
              <th>Date</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Doc name</td>
              <td>11</td>
              <td>03-10-2023</td>
            </tr>
          </table>
          <div className="navWrap">
            <p>Showing 0 to 0 of 0 entries</p>
            <ul className="list-unstyled">
              <li><a href="#">Previous</a></li>
              <li><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">Next</a></li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    );
}

export default TaxReturn;
