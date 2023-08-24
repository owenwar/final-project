import React from 'react';
import { useState } from 'react';
import {Link} from "react-router-dom";
import "./Signup.scss"
import Auth from "../utils/auth";
import { useMutation } from '@apollo/client';

function Signup() {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);
  
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addUser({
                variables: { ...formState }
            });
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };
  
    const handleChange = (event) => {
        const { name, value } = event.target;
  
        setFormState({
            ...formState,
            [name]: value,
        });
    };
  
    return (
        <div className="signup">
            <div className="wrapper">
                <div className="title">
                    <h1>Sign Up</h1>
                </div>
                <div className="form">
                    <form onSubmit={handleFormSubmit}>
                        <div className="username">
                            <label htmlFor="username">Username</label>
                            <input
                                placeholder="Your username"
                                name="username"
                                type="username"
                                id="username"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder="Your email"
                                name="email"
                                type="email"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input
                                placeholder="Your password"
                                name="password"
                                type="password"
                                id="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="submit">
                            <button type="submit">Sign Up</button>
                        </div>
                        <div className="link">
                            <Link to="/login">Already have an account? Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;

