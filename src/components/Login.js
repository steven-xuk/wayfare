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
        name: '',
        password: ''
    })



    async function loginToSupabase(e) {
        e.preventDefault()

        const { data, error } = await supabase
            .from('Users') 
            .select('*')

        if (error) {
            console.error('Error fetching users:', error)
            console.log('Failed to fetch users')
        } else {
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.name == formData.name && element.password == formData.password){
                    console.log('logged in sucsessfully!!')
                }                
            }
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
                <input placeholder='name' name='name' value={formData.name} onChange={e => handleChange(e)}/>
                <input placeholder='password' name='password' type='password' value={formData.password} onChange={e => handleChange(e)}/>
                <button type='submit'>login</button>
            </form>
        </div>
    );
}