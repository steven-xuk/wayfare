import { supabase } from '../SupabaseClient'
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import { HashLink } from 'react-router-hash-link';
import back from '../imgs/back.png';
import logo from '../imgs/logo.png';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [hasSignedUp, setHasSignedUp] = useState(false)
    const [isPWA, setIsPWA] = useState(true);

    useEffect(() => {
        const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;

        setIsPWA(isStandalone);
    }, []);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        friends: [],
        kilometers: 0
    })

    async function submitUser(e){
        e.preventDefault()

        //checking for blank values
        if (formData.name != '' && formData.email != '' && formData.password != ''){
        
            //generate a UUID for the user
            const UUID = uuidv4()

            //signing the user up in the auth section
            const { user, userError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                //using the displayname for a UUID
                options: {
                    data: {
                        display_name: UUID,  // Store the display name here
                    }
                }
            })
            
            if (userError) {
                console.log(userError.message)
            } else {
                console.log('Check your email for the confirmation email!')
            }


            //storing user data
            const { data, error } = await supabase
            .from('Users')
            .insert([
              {
                kilometers: 0,
                friends: [],
                username: formData.username,
                UID: UUID
              }
            ])
      
            if (error) {
                console.error(error)
                console.log('Failed to sign up.')
            } else {
                console.log(data)
                console.log('Signed up successfully!')
                setHasSignedUp(true)


            /////////////// GO TO DASHBOARD NOW ///////////////////////////////////////////
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

    if (hasSignedUp) {
        return (
            <div className={`signup ${isPWA ? 'pwa' : ''}`}>
                <form onSubmit={e => submitUser(e)}>
                    <Link to='/login' className="home-link"><img src={back}/><p>Back</p></Link>
                    <h2>Please check your mailbox for a confirmation email.</h2>
                    <h3>Thanks for signing up!</h3>
                    <p>Already have an account? <HashLink to='/login'>Log in here!</HashLink></p>
                    <p className='policies'><HashLink to='/policies#privacy-policy'>Privacy Policy</HashLink>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<HashLink to='/policies'>Terms of Service</HashLink></p>
                </form>
            </div>
        )
    } else {
        return (
            <div className={`signup ${isPWA ? 'pwa' : ''}`}>
                {isPWA && <div className='title'><img src={logo}/><h1 className='name'>Wayfare</h1></div>}
                <form onSubmit={e => submitUser(e)}>
                    {!isPWA && <Link to='/' className="home-link"><img src={back}/><p>Back</p></Link>}
                    <h1>Sign Up:</h1>
                    <input placeholder='username' name='username' value={formData.username} onChange={e => handleChange(e)}/>
                    <input placeholder='email' name='email' type='email' value={formData.email} onChange={e => handleChange(e)}/>
                    <input placeholder='create a password' name='password' type='password' value={formData.password} onChange={e => handleChange(e)} minLength={6}/>
                    <button type='submit'>Sign Up!</button>
                    <p>Already have an account? <HashLink to='/login'>Log in here!</HashLink></p>
                    {/* <p className='policies'><HashLink to='/policies#privacy-policy'>Privacy Policy</HashLink>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<HashLink to='/policies'>Terms of Service</HashLink></p> */}
                </form>
            </div>
        );
    }
}