import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/AuthSlice';
import { NavLink } from 'react-router-dom';

//importing other stuff
import Button from './parts/Button'

//importing images
import hikingdude from '../imgs/pexels-ozgomz-868097 (1).jpg'

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
                <div className='section'>
                    <div className='section-content-container'>
                        <h2 className='section-header'>what is wayfare?</h2>
                        <p className='section-content'>Wayfare is a social media app designed for hikers, adventurers, and nature lovers who want to connect, share, and explore the great outdoors together. Whether you're scaling rugged peaks, strolling through forest trails, or just discovering a new walk in your neighborhood, Wayfare makes it easy to track your journey, post photos, and find new hiking spots recommended by the community. Users can log their hikes with GPS, upload trail conditions in real-time, and leave helpful tips or reviews for others. The app includes custom profiles, leaderboards, group challenges, and even badges for milestones like “100km Club” or “Sunrise Seeker.” </p>
                        <Button type='primary' content='start now'/>
                    </div>
                    <div className='section-image-container'>
                        <img className='section-image' src={hikingdude}/>
                    </div>

                </div>
            </div>
        </div>
    );
}