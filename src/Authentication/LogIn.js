import React, { useState } from 'react';
import './authentication.styles.css';
//import '../stylesheet.css'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { ReactSession } from 'react-client-session';

function LogIn(AppState) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (username === "" | password === "") {
            
            alert("Username or password empty. Please make sure both are entered to login.")
        }
        else {
            // Get list of users from server
            // Code below requires server call
            // Add currently logged in user to server


            // Username and password provided
            // action="/users/login" method="POST"
            axios.post('/users/login', {
                username: username,
                password: password
              })
              .then(function (response) {
                    response = response.data;

                    if (response.status === 0) {
                        // Success
                        ReactSession.set("user", response.currentUser);
                        AppState.AppState.setState({"user": response.currentUser}, () => {

                            // Check if admin
                            if (response.isAdmin) {
                                history.push('/AdminPage');
                            } else {
                                history.push('/');
                            }
                        });
                        
                    } else if (response.status === 1) {
                        // User password combination incorrect
                        alert("The username entered is incorrect. Please enter your username or sign up if you do not have one :)");
                    } else if (response.status === 2) {
                        // Password is incorrect
                        alert("The password you entered is incorrect, please try again.");
                    } else if (response.status === 3) {
                        // Something went wrong
                        alert("Something went wrong, please try again.");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert("Something went wrong, please try again.");
                });
        }
    }

    return (
        <div className="login-container">
            <div className="input_box">
                <img className="navBar-logo authentication-img" src="/images/logo.png" alt="logo" />

                <form className="authenticate-form" onSubmit={handleLoginSubmit}>

                    <div>
                        <input
                            type="username"
                            className="input"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsername}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            value={password}
                            onChange={handlePassword}
                            required
                        />
                    </div>

                    <div className='row auth-button-row'>
                        <div className='col'>
                            <button type="submit" className="authenticate-button">
                                Login
                            </button>
                        </div>
                    </div>
                    <div className='row auth-no-account-row'>
                        <div className='col'>
                            <h5 className="authenticate-subheader">Don't have an account?</h5>
                            <Link to="/SignUp">
                                <button className="authenticate-button">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export { LogIn as default };