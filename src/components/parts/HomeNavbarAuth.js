import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/UserSlice.js';
import { useSelector } from 'react-redux';
import { supabase } from '../../SupabaseClient.js';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from '../../imgs/logo.png';
import profile from '../../imgs/profile.png';
import mountain from '../../imgs/mountain.png';

export default function HomeNavbarAuth({shadow}) {

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    if (authState.isLoggedIn === false && authState.updated === true) {
      navigate('/login')
      console.log('User not logged in, redirecting to login page1231');
    }
  }, [authState])

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
    if (authState.isLoggedIn === false && authState.updated === true) {
      navigate('/login')
      console.log('User not logged in, redirecting to login page1231');
      return
    }

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
    
    if (userData) {
      dispatch(updateUser({
        ...userData,
          date_joined: userData.created_at,
          email: data.session?.user.email,
          isAuthenticated: data.session?.user.email_confirmed_at
      }))
    } else {
      console.warn('userData is null — check UID or Users table data');
    }
  }
  
  useEffect(() => {
    getTokenData()
  }, [])
  
  return (
      <div className="home-navbar-auth">
        <nav style={{ boxShadow: shadow === true ? '0px 4px 4px rgba(0, 0, 0, 0.1)' : 'none'}}>
          <NavLink to="/home"><img src={logo} className='logo'/></NavLink>
          <p className='welcome-user'>Welcome back, {userState.username != undefined && userState.username}</p>
          <div><img src={mountain}/><p>503 KM</p></div>
          <NavLink onClick={() => {if (isAccountMenuOpen) {setIsAccountMenuOpen(false);} else {setIsAccountMenuOpen(true);}}}><img src={profile}/></NavLink>
        </nav>
        <div className={`account-menu ${isAccountMenuOpen ? 'open' : ''}`}>
          <button onClick={() => {navigate('/friends')}}>Friends</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
    </div>

  );
}