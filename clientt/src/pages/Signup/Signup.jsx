import {useState} from 'react';
import {Link} from "react-router-dom";
import "./Signup.scss"
import Auth from "../utils/auth";

function Signup() {
    const [formState, setFormState] = useState({ email: '', password: '' });
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

