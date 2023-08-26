import React from 'react';
import {Link} from 'react-router-dom';
import './footer.component.css';
import axios from 'axios';
import { ReactSession } from 'react-client-session';

class Footer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user
        };
    }

    logout = () => {

        axios.get('/users/logout', {
            username: this.state.user.username
          })
          .then((response) => {
            
                response = response.data;

                if (response.status === 0) {
                    // Success
                    ReactSession.set("user", undefined);
                    this.setState({user: undefined}, () => {
                        // propagate change
                        window.location.reload(false);
                    });
                } else if (response.status === 1) {
                    // Something went wrong logout
                    alert("Something went wrong, please try again.");
                }

            }).catch(function (error) {
                console.log(error);
                alert("Something went wrong, please try again.");
            });
    }


    render() {
        if (this.state.user) {
            return (
                <div className="footer">
                    <div className="footer-container">
                        <div className="footer-row">
                            <div className="footer-column">
                                <p className="footer-heading">Main</p>
                                <Link className="footer-link" to="/">Home</Link>
                                <Link className="footer-link" to="/ProfilePage">Personal Profile</Link>
                                <Link className="footer-link" to="/CreatePost">Create a Post</Link>
                            </div>
                            <div className="footer-column">
                                <p className="footer-heading">My Account </p>
                                <Link className="footer-link" to="/SettingsPage">Settings</Link>
                                <button className="btn btn-light mt-3" onClick={this.logout}>Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="footer">
                    <div className="footer-container">
                        <div className="footer-row">
                            <div className="footer-column">
                                <p className="footer-heading">My Account</p>
                                <Link className="footer-link" to="/LogIn">Login</Link>
                                <Link className="footer-link" to="/SignUp">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export {Footer}