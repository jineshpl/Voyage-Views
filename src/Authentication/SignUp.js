import React, {useState} from 'react';
//import '../stylesheet.css';
import './authentication.styles.css';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { ReactSession } from 'react-client-session';


function SignUp(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(username === "" | password === ""){
            alert("Username or password empty.")
        }
        else{

            // Save username and password in signup session

            axios.get('/user/' + username, {
                username: username
              })
              .then(function (response) {
                    response = response.data;

                    if (response.status === 0) {
                        // Found User - need a different username
                        alert("Username has been taken. Please enter a different username.");
                    } else if (response.status === 1) {
                        // Save username and password in session
                        ReactSession.set("signup", {username: username, password: password, firstName: '', lastName: '', profilePicture: '', description: ''});
                        history.push('/Register');
                    } else {
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
            <div className="signup-container">
                <div className="input_box">
                    <img className="navBar-logo authentication-img" src="/images/logo.png" alt="logo" />
                    <h4 className="signup-header authenticate-subheader">Sign Up for New Account</h4>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                            type="username"
                            className="input"
                            placeholder="Enter New Username"
                            value={username}
                            onChange={handleUsername}
                            />
                        </div>
                        <div>
                            <input
                            type="password"
                            className="input"
                            placeholder="Enter New Password"
                            value={password}
                            onChange={handlePassword}
                            />
                        </div>
                        
                        <div className='row auth-button-row'>
                            <div className='col'>
                                <button type="submit" className="authenticate-button">
                                    Continue
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
}

export {SignUp as default};