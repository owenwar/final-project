import React from 'react';
import { useState } from 'react';
import {Link} from "react-router-dom";
import "./Signup.scss"
import Auth from "../utils/auth";

function Signup() {
    const [formState, setFormState] = useState({ email: '', password: '', username: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                email: formState.email, 
                password: formState.password
                username: formState.username
            }
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };
}

return (
    <div className="container my-1">
        <Link to="/login">
            ← Go to Login
        </Link>

        <h2>Signup</h2>
        <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2">
                <label htmlFor="username">Username:</label>
                <input
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                />
            </div>
            <div className="flex-row space-between my-2">
                <label htmlFor="email">Email:</label>
                <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                />
            </div>
            <div className="flex-row space-between my-2">
                <label htmlFor="pwd">Password:</label>
                <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                />
                </div>
                {error ? (
                    <div>
                        <p className="error-text">The provided credentials are incorrect</p>
                    </div>
                ) : null}
            <div className="flex-row flex-end">
                <button type="submit">
                    Submit
                </button>
            </div>
        </form>
    </div>
);

export default Signup;

