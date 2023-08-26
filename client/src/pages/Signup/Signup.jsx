import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.scss';
import Auth from '../../utils/auth';
import axios from 'axios'; // Import Axios

function Signup() {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/signup', formState); // Send POST request using Axios

      if (response.status === 200) {
        Auth.login(response.data.token);
      }
    } catch (error) {
      console.error(error);
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
                        <div className="firstname">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                placeholder="Your first name"
                                name="firstName"
                                type="firstName"
                                id="firstName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="lastname">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                placeholder="Your last name"
                                name="lastName"
                                type="lastName"
                                id="lastName"
                                onChange={handleChange}
                            />
                        </div>
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

