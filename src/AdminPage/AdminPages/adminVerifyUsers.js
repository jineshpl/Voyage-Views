import React from 'react';
import './AdminVerifyUser.style.css';
import NavBar from '../../components/navBar/navBar.component';

import { admin } from '../../info';

class AdminVerifyUser extends React.Component {
    render(){
        return (
            <div>
                <NavBar user = {admin}/>
                <div className="admin-verify-page">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h3>Verify Users</h3>
                            </div>
                        </div>
                        <div className="row verify-table">
                            <div className="col">

                                <table className="table table-striped">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">Profile</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Post Count</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">

                                            </th>
                                            <td>Mark</td>
                                            <td>Mark Otto</td>
                                            <td>Toronto</td>
                                            <td>5</td>
                                            <td>
                                                <form>
                                                    <div className="btn-group approval-btn-group" role="group">
                                                        <input type="button" value="Verify" className="btn btn-sm btn-success approval-btn"/>
                                                        <input type="button" value="Reject" className="btn btn-sm btn-danger approval-btn"/>
                                                    </div>
                                                </form>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">

                                            </th>
                                            <td>Jason1</td>
                                            <td>Jason Bourne</td>
                                            <td>Vancouver</td>
                                            <td>13</td>
                                            <td>
                                                <form>
                                                    <div className="btn-group approval-btn-group" role="group">
                                                    <input type="button" value="Verify" className="btn btn-sm btn-success approval-btn"/>
                                                        <input type="button" value="Reject" className="btn btn-sm btn-danger approval-btn"/>
                                                    </div>
                                                </form>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">

                                            </th>
                                            <td>torontoVacations</td>
                                            <td>Greg Owen</td>
                                            <td>Toronto</td>
                                            <td>8</td>
                                            <td>
                                                <form>
                                                    <div className="btn-group approval-btn-group" role="group">
                                                    <input type="button" value="Verify" className="btn btn-sm btn-success approval-btn"/>
                                                        <input type="button" value="Reject" className="btn btn-sm btn-danger approval-btn"/>
                                                    </div>
                                                </form>
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
    
            </div> )
    }
}

export {AdminVerifyUser as default};