import React from 'react';
import './authentication.styles.css'
//import '../stylesheet.css';
import LogIn from './LogIn';
import Register from './Register';
import SignUp from './SignUp';

function Authentication(props) {

    return (
        <div className="auth-container">
            {props.route === 'LogIn' ? (
                <LogIn AppState={props.state}/>
            ) : (props.route === 'SignUp' ? (
                <SignUp />
            ) : ( /* Register */
                <Register />
            ))
            }
        </div>
    );
}

export { Authentication as default };