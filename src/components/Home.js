import { logout } from "../redux/slices/AuthSlice";
import { useDispatch } from 'react-redux';

export default function Home() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <div className="Home">
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>

    );
}