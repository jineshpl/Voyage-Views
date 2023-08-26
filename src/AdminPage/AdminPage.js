import React from 'react';
//import '../stylesheet.css'
import './AdminSettingsPage.style.css';
import NavBar from '../components/navBar/navBar.component';
import {Link} from "react-router-dom";

import { admin } from '../info';

class AdminPage extends React.Component {
    render(){
        return (
            <div>
                <NavBar user = {admin}/>
                <div className="settings-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 mt-4 mt-lg-0">
    
                                <div className="d-flex justify-content-center mb-4">
                                    <div className="settings-profile-img">
                                        <img alt="Profile" src="/images/profile.png" />
                                        <input type="file" id="file" className="settings-profile-img-input" />
                                        <span className="settings-chage-profile-img-icon">
                                            <i className="fas fa-camera text-light"></i>
                                        </span>
                                    </div>
                                </div>
    
                                <div className="user-setting-options mt-2" id="user-setting-options">
                                    <ul className="nav nav-list flex-column mb-5">
                                        <li className="nav-item verify-button">
                                            <Link to='/AdminPage/verifyusers' className="btn settings-btn-verify">
                                                Verify Users
                                            </Link>
                                        </li>
                                        <li className="nav-item verify-button">
                                            <button className="btn settings-btn-verify">Approve Posts</button>
                                        </li>
                                        <li className="nav-item verify-button">
                                            <button className="btn settings-btn-verify">User Accounts</button>
                                        </li>
                                    </ul>
                                </div>
    
                            </div>
    
                            <div className="col-lg-9">
    
                                <div className="settings-header">
                                    <h2>Settings</h2>
                                </div>
    
                                <form action="#changeUserSettings">
                                    <div className="settings-form-input row">
                                        <label className="col-lg-3 col-form-label"><strong>First name</strong></label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" placeholder="Admin" />
                                        </div>
                                    </div>
                                    <div className="settings-form-input row">
                                        <label className="col-lg-3 col-form-label"><strong>Last name</strong></label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" placeholder="Admin" />
                                        </div>
                                    </div>
                                    <div className="settings-form-input row">
                                        <label className="col-lg-3 col-form-label"><strong>Email</strong></label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="email" placeholder="Admin@email.com" />
                                        </div>
                                    </div>
                                    <div className="settings-form-input row">
                                        <label className="col-lg-3 col-form-label"><strong>Address</strong></label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" placeholder="Street" />
                                        </div>
                                    </div>
                                    <div className="settings-form-input row">
                                        <label className="col-lg-3 col-form-label"></label>
                                        <div className="col-lg-6">
                                            <input className="form-control" type="text" placeholder="City" />
                                        </div>
                                        <div className="col-lg-3">
                                            <input className="form-control" type="text" placeholder="Province" />
                                        </div>
                                    </div>
                                    
                                    <div className="settings-form-input row">
                                        <div className="col-lg">
                                            <input type="submit" defaultValue="Update Profile" className="btn btn-primary" />
                                        </div>
                                    </div>
                                </form>
    
                                <div className="settings-header">
                                    <h4>Change Password</h4>
                                </div>
    
                                <form action="#changeUserSettings">
                                    <div className="settings-form-input row">
                                        <label className="col-lg-3 col-form-label"><strong>Current Password</strong></label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="password" placeholder="Enter your current password..." />
                                        </div>
                                    </div>
                                    <div className="settings-form-input row">
                                        <label className="col-lg-3 col-form-label"><strong>New Password</strong></label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="password" placeholder="Remember, passwords must include numbers and letters" />
                                        </div>
                                    </div>
                                    <div className="settings-form-input row">
                                        <label className="col-lg-3 col-form-label"><strong>Confirm Password</strong></label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="password" placeholder="Re-enter new password" />
                                        </div>
                                    </div>
                                    <div className="settings-form-input row">
                                        <div className="col-lg">
                                            <input type="submit" defaultValue="Change Password" className="btn btn-primary" />
                                        </div>
                                    </div>
                                </form>
    
                            </div>
    
                        </div>
                    </div>
                </div>
    
            </div> )
    }
}

export {AdminPage as default};