import { logout } from "../redux/slices/AuthSlice";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { supabase } from '../SupabaseClient.js';
import { useEffect, useState } from "react";

export default function Home() {

  const [userDataObj, setUserDataObj] = useState()

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.value);
    async function handleLogout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Logout error:', error.message);
        } else {
          console.log('Logged out successfully!');
          // No need to manually dispatch logout() because App.js handles it automatically
        }
    }

    async function getTokenData() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
        return null;
      }

      const { data: userData, error: userError } = await supabase
        .from('Users')      
        .select('*')
        .eq('UID', data.session?.user.user_metadata.display_name)
        .single();
    
      if (userError) {
        console.error('Error fetching row:', userError);
      }
      if (userData){
        // console.log('Fetched row:', userData);
      }
      
      setUserDataObj({
        ...userData,
        date_joined: userData.created_at,
        email: data.session?.user.email,
        isAuthenticated: data.session?.user.email_confirmed_at
      })
    }
    
    useEffect(() => {
      getTokenData()
    }, [])


    console.log(isLoggedIn);
    return (
        <div className="Home">
            <h1>Home Page</h1>
            <p>Welcome to the home page, {userDataObj != undefined && userDataObj.username}</p>
            <p>{isLoggedIn === true ? 'logged in' : 'not logged in'}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>

    );
}