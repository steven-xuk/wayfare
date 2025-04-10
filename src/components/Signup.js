import React, { useState } from 'react';

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        password: '',
    })

    function submitUser(){
        //no
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

            <form onSubmit={submitUser()}>
                <input placeholder='name' name='name' value={formData.name} onChange={e => handleChange(e)}/>
                <input placeholder='email' name='email' type='email' value={formData.email} onChange={e => handleChange(e)}/>
                <input placeholder='age' name='age' type='number' value={formData.age} onChange={e => handleChange(e)}/>
                <input placeholder='create a password' name='password' type='password' value={formData.password} onChange={e => handleChange(e)}/>
            </form>

        </div>
    );
}