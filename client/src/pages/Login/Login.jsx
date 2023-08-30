import React, { useState } from 'react';
import "./Login.scss";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { LOGIN_USER } from '../../utils/mutations';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await LOGIN_USER(formState.email, formState.password);
            
            if (data.errors) {
                console.error('Error logging in:', data.errors[0].message);
                return;
            }

            Auth.login(data.token);
        } catch (error) {
            console.error(error.message);
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
