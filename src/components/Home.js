import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { supabase } from '../SupabaseClient.js';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from '../imgs/logo.png';
import profile from '../imgs/profile.png';
import mountain from '../imgs/mountain.png';

export default function Home() {

  const [userDataObj, setUserDataObj] = useState()
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.value);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn])

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
    if (!isLoggedIn ) {
      navigate('/login')
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
      <div className="home">
        <nav>
          <NavLink to="/"><img src={logo}/></NavLink>
          <p className='welcome-user'>Welcome back, {userDataObj != undefined && userDataObj.username}</p>
          <div><img src={mountain}/><p>503 KM</p></div>
          <NavLink onClick={() => {if (isAccountMenuOpen) {setIsAccountMenuOpen(false);} else {setIsAccountMenuOpen(true);}}}><img src={profile}/></NavLink>
        </nav>
        <div className={`account-menu ${isAccountMenuOpen ? 'open' : ''}`}>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className='content'>
          <div className='grid'>
            <Link to='/explore' className='card'>
              <p>Explore Walks</p>
            </Link>
            <Link to='/friends' className='card'>
              <p>Friends</p>
            </Link>
            <Link to='/create-post' className='card'>
              <p>Create a Post</p>
            </Link>
            <Link to='/create-walk' className='card'>
              <p>Create a Walk</p>
            </Link>
          </div>
        </div>
    </div>

  );
}