import { logout } from "../redux/slices/AuthSlice";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { supabase } from '../SupabaseClient.js';

export default function Home() {
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
    console.log(isLoggedIn);
    return (
        <div className="Home">
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>
            <p>{isLoggedIn === true ? 'logged in' : 'not logged in'}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>

    );
}