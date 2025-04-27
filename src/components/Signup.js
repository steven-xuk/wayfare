import { Link } from 'react-router-dom';
import { supabase } from '../SupabaseClient'
import React, { useState } from 'react';


export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        friends: [],
        kilometers: 0
    })

    async function submitUser(e){
        e.preventDefault()

        //checking for blank values
        if (formData.name != '' && formData.email != '' && formData.password != ''){
            //submit new user to supabase
            const { data, error } = await supabase
                .from('Users')
                .insert([formData])
    
            if (error) {
                console.error(error)
                console.log('Failed to sign up.')
            } else {
                console.log('Signed up successfully!')
            }
        }
        else{
            alert('please provide values for everything')
        }

    }

    function handleChange(e) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }
    
    return (
        <div className="signup">
            <h1>Signup Page</h1>
            <p>Welcome to the signup page!</p>

            <form onSubmit={e => submitUser(e)}>
                <input placeholder='name' name='name' value={formData.name} onChange={e => handleChange(e)}/>
                <input placeholder='email' name='email' type='email' value={formData.email} onChange={e => handleChange(e)}/>
                <input placeholder='create a password' name='password' type='password' value={formData.password} onChange={e => handleChange(e)}/>
                <button type='submit'>sign up!</button>
            </form>
            <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
    );
}