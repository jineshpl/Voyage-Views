import React from 'react';
import {Link} from "react-router-dom";
import './navBar.style.css';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            user: this.props.user
        }
    }

    render(){
        // must have user passed in as prop
        // const user = this.props.user;
        // how to pass this url to div?
        //const imageLocation = this.props.user.profilePic


        return (
            <div id="navigationBar" className="navBar">
                <div className="navBar-container">
                    {/* <!-- Boostrap navigation bar - brand and toggle together for mobile views --> */}
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/">
                                <img className="navBar-logo" src="/images/logo.png" alt="logo" />
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    {this.state.user ? (
                                        <li className="nav-item">
                                            <Link to='/CreatePost' className="nav-link" aria-current="page">
                                                Create Post
                                            </Link>
                                        </li>
                                    ) : ('')
                                    }
                                    <li className="nav-item">
                                        {this.state.user ? (
                                                <Link to='/SettingsPage' className="btn navBar-btn">
                                                    My Account
                                                </Link>
                                            ) : (
                                                <div className='navBar-user-btn'>
                                                    <Link to='/Signup' className="btn navBar-btn">
                                                        Signup
                                                    </Link>
                                                    <Link to='/Login' className="btn navBar-btn">
                                                        Login 
                                                    </Link>
                                                </div>
                                            )
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>          
                </div>
            </div>

        )
    }
}

export {NavBar as default};