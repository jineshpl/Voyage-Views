import React from 'react';
//import '../stylesheet.css';
import './SettingsPage.style.css';
import NavBar from '../components/navBar/navBar.component';
import { Footer } from '../components/footer/footer.component';
import axios from 'axios';
import { ReactSession } from 'react-client-session';

class SettingsPage extends React.Component {

	constructor(props) {
        super(props);

        this.state = {
            user: this.props.user
        }; 
    }

	handleUpdateSubmit = (e) => {
		e.preventDefault();

		const userID = document.querySelector('input[name="id"').value;

		const userUpdate = {
			firstName: document.querySelector('input[name="firstName"').value || document.querySelector('input[name="firstName"').placeholder,
			lastName: document.querySelector('input[name="lastName"').value || document.querySelector('input[name="lastName"').placeholder,
			description: document.querySelector('input[name="description"').value || document.querySelector('input[name="description"').placeholder
		}

		axios.patch('/users/' + userID, userUpdate)
          .then(function (response) {
                response = response.data;

                if (response.status === 0) {
                    // User Updated
                    console.log(response);
					ReactSession.set("user", response.user);
					window.location.reload(false);
                } else if (response.status === 1) {
                    // Something went wrong
                    alert("Wrong user data sent to server. Please try again");
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("Something went wrong, please try again.");
            });

	}

	handlePasswordSubmit = (e) => {
		e.preventDefault();

		const userID = document.querySelector('input[name="id"').value;

		const userUpdate = {
			username: this.state.user.username,
			currentPassword: document.querySelector('input[name="currentPassword"').value,
			newPassword: document.querySelector('input[name="newPassword"').value,
			retypeNewPassword: document.querySelector('input[name="retypeNewPassword"').value
		}

		if (userUpdate.newPassword === userUpdate.retypeNewPassword) {

			const regex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{4,}$");

			if (regex.test(userUpdate.newPassword)) {

				axios.patch('/user/password/' + userID, userUpdate)
				.then(function (response) {
						response = response.data;

						if (response.status === 0) {
							// User Updated
							alert("Password updated successfully!");

							// Empty inputs
							document.querySelector('input[name="currentPassword"').value = '';
							document.querySelector('input[name="newPassword"').value = '';
							document.querySelector('input[name="retypeNewPassword"').value = '';
						} else if (response.status === 1) {
							// Something went wrong
							alert("Wrong user data sent to server. Please try again.");
						} else if (response.status === 2) {
							// Wrong password
							alert("The current password entered is incorrect. Please try again.");
						}
					})
					.catch(function (error) {
						console.log(error);
						alert("Something went wrong, please try again.");
					});

				
			} else {
				alert("New password must include at least one number and one letter. Minimum 4 characters.");
			}

		} else {
			alert("New passwords do not match. Make sure you retype your password correctly");
		}

		

	}

    render(){
        return (
        <div>
            <NavBar  user={this.state.user} />
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
										{ this.state.user.verified ? (
											<button className="btn settings-btn-verify">Verified! <i className="fas fa-star"></i></button>
										) : (
											<button className="btn settings-btn-verify">Verify Me</button>
										) }
                                        
                                    </li>
                                </ul>
                            </div>

                        </div>

                        <div className="col-lg-9">

							<div className="settings-header">
								<h2>Settings</h2>
							</div>

							<form action="#changeUserSettings" onSubmit={this.handleUpdateSubmit}>
								<input name="id" value={this.state.user._id} style={{display: "none"}} readOnly/>
								<div className="settings-form-input row">
							        <label className="col-lg-3 col-form-label"><strong>Username</strong></label>
							        <div className="col-lg-9">
							            <p className="nav-link">{this.state.user.username}</p>
							        </div>
							    </div>
							    <div className="settings-form-input row">
							        <label className="col-lg-3 col-form-label"><strong>First name</strong></label>
							        <div className="col-lg-9">
							            <input className="form-control" type="text" name="firstName" placeholder={this.state.user.firstName} />
							        </div>
							    </div>
							    <div className="settings-form-input row">
							        <label className="col-lg-3 col-form-label"><strong>Last name</strong></label>
							        <div className="col-lg-9">
							            <input className="form-control" type="text" name="lastName" placeholder={this.state.user.lastName} />
							        </div>
							    </div>
								<div className="settings-form-input row">
							        <label className="col-lg-3 col-form-label"><strong>Description</strong></label>
							        <div className="col-lg-9">
							            <input className="form-control" type="text" name="description" placeholder={this.state.user.description} />
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

                            <form action="#changeUserSettings" onSubmit={this.handlePasswordSubmit}>
								<input name="id" value={this.state.user._id} style={{display: "none"}} readOnly/>
							    <div className="settings-form-input row">
							        <label className="col-lg-3 col-form-label"><strong>Current Password</strong></label>
							        <div className="col-lg-9">
							            <input className="form-control" name="currentPassword" type="password" placeholder="Enter your current password..." required/>
							        </div>
							    </div>
							    <div className="settings-form-input row">
							        <label className="col-lg-3 col-form-label"><strong>New Password</strong></label>
							        <div className="col-lg-9">
							            <input className="form-control" name="newPassword" type="password" placeholder="Remember, passwords must include numbers and letters" required/>
							        </div>
							    </div>
                                <div className="settings-form-input row">
							        <label className="col-lg-3 col-form-label"><strong>Confirm Password</strong></label>
							        <div className="col-lg-9">
							            <input className="form-control" name="retypeNewPassword" type="password" placeholder="Re-enter new password" required/>
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
			<Footer user={this.state.user}/>
        </div> )
    }
}

export {SettingsPage as default};