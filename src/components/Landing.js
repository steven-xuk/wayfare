import { Link, NavLink } from 'react-router-dom';
import logo from '../imgs/logo.png';
import { useState } from 'react';
import hamburger from '../imgs/hamburger.png';

//importing images
import hikingdude from '../imgs/pexels-ozgomz-868097 (1).jpg'
import TrialPreview from './parts/TrailPreview';
import testImg from '../imgs/pexels-adrien-olichon-1257089-3709402.jpg'
import { useEffect } from 'react';

export default function Landing() {

    const [isOnTop, setIsOnTop] = useState(true);
    const [opacityText, setOpacityText] = useState(100);
    const [navbarIsOpen, setNavbarIsOpen] = useState(false);
    const [navbarIsVisible, setNavbarIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            setOpacityText(1 - (1.28 * scrollPosition / window.innerHeight))
            if (scrollPosition > 15) {
                setIsOnTop(false);
            } else {
                setIsOnTop(true);
            }
        })
    }, [])

    return (
        <div className="landing">
            <nav className={`nav ${isOnTop ? 'on-top' : 'scrolled'} ${navbarIsOpen ? 'open' : ''}`}>
                <NavLink to="/"><img src={logo} className={isOnTop ? '' : 'dark'} /></NavLink>
                <NavLink to="/home">Home</NavLink>
                {/* <NavLink to="/">About Us</NavLink> */}
                <NavLink to="/">Explore</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/login">Log In</NavLink>
                <button onClick={() => {setNavbarIsOpen(!navbarIsOpen);}}>
                    <img className={isOnTop ? '' : 'dark'} src={hamburger} />
                </button>
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
                        <h2 className='section-header'>What's Wayfare?</h2>
                        <p className='section-content'>Wayfare is a social media app designed for hikers, adventurers, and nature lovers who want to connect, share, and explore the great outdoors together. Whether you're scaling rugged peaks, strolling through forest trails, or just discovering a new walk in your neighborhood, Wayfare makes it easy to track your journey, post photos, and find new hiking spots recommended by the community. Users can log their hikes with GPS, upload trail conditions in real-time, and leave helpful tips or reviews for others. The app includes custom profiles, leaderboards, group challenges, and even badges for milestones like “100km Club” or “Sunrise Seeker.” </p>
                        <Link to='/signup'>Start Now</Link>
                    </div>
                    <div className='section-image-container'>
                        <img className='section-image' src={hikingdude}/>
                    </div>
                </div>

                <div className='section2'>
                    <h2 className='section-header'>Today's Top Trails:</h2>
                    <TrialPreview title='Wellington Waterfront' description='Wellington’s waterfront is a vibrant and dynamic area where the energy of urban life meets the beauty of nature. Stretching along the edge of the harbor, it offers a scenic promenade that invites both locals and visitors to stroll, cycle, or simply relax while taking in panoramic views of the water and surrounding hills.' image={testImg} likes={1305} creatorName='steven xu'/>
                </div>
            </div>
        </div>
    );
}