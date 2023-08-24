import React from 'react'
import "./Login.scss"
import {Link} from "react-router-dom";
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from "../../utils/auth";


const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);
  
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e)
        }
    };
  
    const handleChange = (event) => {
        const { name, value } = event.target;
  
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return(
        <div className="login">
            <div className="wrapper">
                <div className="title">
                    <h1>Sign In</h1>
                </div>
                <div className="form">
                    <form onSubmit={handleFormSubmit}>
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
                        <div className="button">
                            <button type="submit">Sign In</button>
                        </div>
                        <div className="link">
                            <Link to="/signup">Create an account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
  
}
export default Login;
