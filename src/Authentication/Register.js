import React from 'react';
//import '../stylesheet.css';
import './authentication.styles.css';
import {Redirect} from "react-router-dom";
import profile from '../profile.png';
import { ReactSession } from 'react-client-session';
import axios from 'axios';


class Register extends React.Component {

    state = {
    	profileImg: profile
    };

    selectImage = (event)=>{
        const file = event.target.files[0]
        this.setState({
                profileImg: URL.createObjectURL(file)
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        var userSignup = ReactSession.get("signup");

        userSignup.firstName = document.querySelector('input[type="firstName"').value;
        userSignup.lastName = document.querySelector('input[type="lastName"').value;
        userSignup.description = document.querySelector('input[type="description"').value;
        userSignup.profilePicture = this.state.profileImg;

        axios.post('/users', userSignup)
          .then(function (response) {
                response = response.data;

                if (response.status === 0) {
                    // User Created
                    ReactSession.set("signup", undefined);
                    console.log(response.currentUser);

                    ReactSession.set("user", response.currentUser);
                    window.location.reload(false);
                } else if (response.status === 1) {
                    // Something went wrong
                    alert("Something went wrong, let's try this again.");
                    ReactSession.set("signup", undefined);
                    <Redirect to="/signup"/>
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("Something went wrong, please try again.");
            });
    }

    render(){

        return (
            <div className="register-container">
                <div className="input_box">
                    <img className="navBar-logo authentication-img" src="/images/logo.png" alt="logo" />
                    <h4 className="register-header authenticate-subheader">Add Profile Picture</h4>
                        <div className="profile-img">
                            <img alt="Profile" src={this.state.profileImg}/>
                            <input className="profile-img-input" type="file" accept="image/*" onChange={this.selectImage}/>
                            <span className="profile-img-icon">
                            <i className="fa fa-picture-o text-light"></i>
                        </span>                     
                        </div> 
                        <div>
                            <input
                                type="firstName"
                                className="input"
                                placeholder="Enter First Name"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="lastName"
                                className="input"
                                placeholder="Enter Last Name"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="description"
                                className="input"
                                placeholder="Tell us something, anything"
                                required
                            />
                        </div>
                        <button className="mt-3 authenticate-button" onClick={this.handleSubmit}>Sign Up</button>
                </div>
                
            </div>
        )
    }
}

export {Register as default};