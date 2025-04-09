import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/AuthSlice';
import { NavLink } from 'react-router-dom';
import logo from '../imgs/logo.png';
import { useState } from 'react';


//importing images
import hikingdude from '../imgs/pexels-ozgomz-868097 (1).jpg'
import TrialPreview from './parts/TrailPreview';
import testImg from '../imgs/pexels-adrien-olichon-1257089-3709402.jpg'
import { useEffect } from 'react';

export default function Landing() {

    const [isOnTop, setIsOnTop] = useState(true);

    const dispatch = useDispatch();
    const handleLogin = () => {
        dispatch(login());
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 10) {
                setIsOnTop(false);
            } else {
                setIsOnTop(true);;
            }
        })
    }, [])

    return (
        <div className="landing">
            <nav style={{backgroundColor: isOnTop ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)', color: isOnTop === false ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)'}} className='nav'>
                <NavLink to="/"><img src={logo}/></NavLink>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/">About Us</NavLink>
                <NavLink to="/">Explore</NavLink>
                <NavLink to="/">Home</NavLink>
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
                        <a type='primary'>start now</a>
                    </div>
                    <div className='section-image-container'>
                        <img className='section-image' src={hikingdude}/>
                    </div>
                </div>

                <div>
                    <h2 className='header'>todays top trail</h2>
                    <TrialPreview title='wellington waterfront' description='Wellington’s waterfront is a vibrant blend of urban life and stunning natural scenery. Stretching along the harbor, it features bustling cafés, art galleries, and picturesque parks. ' image={testImg} likes={1305} creatorName='steven xu'/>
                </div>
            </div>
        </div>
    );
}