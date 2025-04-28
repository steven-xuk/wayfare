import { logout } from "../redux/slices/AuthSlice";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function Home() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.value);
    const handleLogout = () => {
        dispatch(logout());
    };
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