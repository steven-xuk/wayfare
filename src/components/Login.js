import { useDispatch } from "react-redux";
import { login } from "../redux/slices/AuthSlice.js";

export default function Login() {
    const dispatch = useDispatch();
    const handleLogin = () => {
        dispatch(login());
    };

    return (
        <div className="login">
            <h1>Login Page</h1>
            <p>Welcome to the login page!</p>
        </div>
    );
}