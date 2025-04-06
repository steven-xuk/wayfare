import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/AuthSlice';

export default function Landing() {
    const dispatch = useDispatch();
    const handleLogin = () => {
        dispatch(login());
    };

    return (
        <div className="landing">
            <div className='hero'>

            </div>
            <div className='content'>
                
            </div>
        </div>
    );
}