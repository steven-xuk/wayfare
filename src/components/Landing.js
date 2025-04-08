import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/AuthSlice';
import { NavLink } from 'react-router-dom';

export default function Landing() {
    const dispatch = useDispatch();
    const handleLogin = () => {
        dispatch(login());
    };

    return (
        <div className="landing">
            <nav>
                <NavLink to="/" className="">Home</NavLink>
                <NavLink to="/" className="logo">Home</NavLink>
                <NavLink to="/" className="logo">Home</NavLink>
                <NavLink to="/" className="logo">Home</NavLink>
                <NavLink to="/" className="logo">Home</NavLink>
            </nav>
            <div className='hero'>
                <div className='hero-text'>
                    <h1 className='title'>Explore.</h1>
                    <h2 className='subtitle'>that's our purpose</h2>
                </div>
            </div>
            <div className='content'>

            </div>
        </div>
    );
}