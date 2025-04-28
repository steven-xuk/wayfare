import { useDispatch } from "react-redux";
import { login } from "../redux/slices/AuthSlice.js";
import { supabase } from '../SupabaseClient'
import { useState } from "react";


export default function Login() {
    const dispatch = useDispatch();
    const handleLogin = () => {
        dispatch(login());
    };

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })



    async function loginToSupabase(e) {
        e.preventDefault()

        const email = formData.email
        const password = formData.password

        const { user, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (loginError) {
            // Display error message
            console.log(loginError.message);
        } else {
            console.log('Logged in successfully!', user);
            /////////////////// GO TO DASHBOARD NOW ////////////////////
        }
    }

    function handleChange(e){
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div className="login">
            <h1>Login Page</h1>
            <p>Welcome to the login page!</p>
            <form onSubmit={e => loginToSupabase(e)}>
                <input placeholder='email' name='email' value={formData.email} onChange={e => handleChange(e)}/>
                <input placeholder='password' name='password' type='password' value={formData.password} onChange={e => handleChange(e)}/>
                <button type='submit'>login</button>
            </form>
        </div>
    );
}