import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.scss';
import Auth from '../../utils/auth';
import axios from 'axios';
import { ADD_USER } from '../../utils/mutations';

function Signup() {
    const [formState, setFormState] = useState({
      username: '',
      email: '',
      password: '',
    });
  
    const [loading, setLoading] = useState(false);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post(ADD_USER, {
          query: ADD_USER,
          variables: {
            username: formState.username,
            email: formState.email,
            password: formState.password,
          },
        });
  
        if (response.status === 200 && response.data.data.addUser.token) {
          Auth.login(response.data.data.addUser.token);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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

