import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/AuthSlice.js";
import { supabase } from '../SupabaseClient'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import back from '../imgs/back.png';
import logo from '../imgs/logo.png';


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector((state) => state.auth);
    const [isPWA, setIsPWA] = useState(true);

    useEffect(() => {
        const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;

        setIsPWA(isStandalone);
    }, []);

    const handleLogin = () => {
        dispatch(login());
    };

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })


    useEffect(() => {
        if (authState.isLoggedIn === true && authState.updated === true) {
            navigate('/home')
        }
    }, [authState])

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
            handleLogin();
            console.log('Logged in successfully!', user);
            /////////////////// GO TO DASHBOARD NOW ////////////////////
            navigate('/home');
        } 
    }

    function handleChange(e){
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div className={`login ${isPWA ? 'pwa' : ''}`}>
            {isPWA && <div className='title'><img src={logo}/><h1 className='name'>Wayfare</h1></div>}
            <form onSubmit={e => loginToSupabase(e)}>
                {!isPWA && <Link to='/' className="home-link"><img src={back}/><p>Back</p></Link>}
                <h1>Login:</h1>
                <input placeholder='email' name='email' value={formData.email} onChange={e => handleChange(e)} required/>
                <input placeholder='password' name='password' type='password' value={formData.password} onChange={e => handleChange(e)} required/>
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to='/signup'>Sign up here!</Link></p>
                {/* <p className='policies'><HashLink to='/policies#privacy-policy'>Privacy Policy</HashLink>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<HashLink to='/policies'>Terms of Service</HashLink></p> */}
            </form>
        </div>
    );
}