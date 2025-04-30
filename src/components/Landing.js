import { Link, NavLink } from 'react-router-dom';
import logo from '../imgs/logo.png';
import { useState } from 'react';

//importing images
import hikingdude from '../imgs/pexels-ozgomz-868097 (1).jpg'
import TrialPreview from './parts/TrailPreview';
import testImg from '../imgs/pexels-adrien-olichon-1257089-3709402.jpg'
import { useEffect } from 'react';

export default function Landing() {

    const [isOnTop, setIsOnTop] = useState(true);
    const [opacityText, setOpacityText] = useState(100);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            console.log(1 - (scrollPosition / window.innerHeight))
            setOpacityText(1 - (1.38 * scrollPosition / window.innerHeight))
            if (scrollPosition > 15) {
                setIsOnTop(false);
            } else {
                setIsOnTop(true);
            }
        })
    }, [])

    return (
        <div className="landing">
            <nav className={`nav ${isOnTop ? 'on-top' : 'scrolled'}`}>
                <NavLink to="/"><img src={logo} className={isOnTop ? '' : 'dark'} /></NavLink>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/">About Us</NavLink>
                <NavLink to="/">Explore</NavLink>
                <NavLink to="/signup">Sign in</NavLink>
            </nav>
            <div className='hero'>
                <div className='hero-text'>
                    <h1 className='title'>Explore.</h1>
                    <h2 className='subtitle'>that's our purpose</h2>
                </div>
                <div className='scrollToExplore-container' style={{opacity: opacityText}}>
                    <p className='scrollToExplore-text'>scroll to explore</p>
                    <div className='arrow'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div className='content'>
                <div className='section'>
                    <div className='section-content-container'>
                        <h2 className='section-header'>What is Wayfare?</h2>
                        <p className='section-content'>Wayfare is a social media app designed for hikers, adventurers, and nature lovers who want to connect, share, and explore the great outdoors together. Whether you're scaling rugged peaks, strolling through forest trails, or just discovering a new walk in your neighborhood, Wayfare makes it easy to track your journey, post photos, and find new hiking spots recommended by the community. Users can log their hikes with GPS, upload trail conditions in real-time, and leave helpful tips or reviews for others. The app includes custom profiles, leaderboards, group challenges, and even badges for milestones like “100km Club” or “Sunrise Seeker.” </p>
                        <Link to='/signup'>Start Now</Link>
                    </div>
                    <div className='section-image-container'>
                        <img className='section-image' src={hikingdude}/>
                    </div>
                </div>

                <div>
                    <h2 className='header'>Todays Top Trail</h2>
                    <TrialPreview title='wellington waterfront' description='Wellington’s waterfront is a vibrant blend of urban life and stunning natural scenery. Stretching along the harbor, it features bustling cafés, art galleries, and picturesque parks. ' image={testImg} likes={1305} creatorName='steven xu'/>
                </div>
            </div>
        </div>
    );
}