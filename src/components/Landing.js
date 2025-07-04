import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

//importing images
import hikingdude from '../imgs/pexels-ozgomz-868097 (1).jpg'
import TrialPreview from './parts/TrailPreview';
import testImg from '../imgs/pexels-adrien-olichon-1257089-3709402.jpg'
import LandingNavbar from './parts/LandingNavbar';

export default function Landing() {
    const [opacityText, setOpacityText] = useState(1);

    const lastOpacity = useRef(opacityText);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            const raw = 1 - (1.28 * scrollY / window.innerHeight);
            const next = Math.min(1, Math.max(0, raw));

            if (Math.abs(next - lastOpacity.current) >= 0.02) {
                lastOpacity.current = next;
                setOpacityText(next);
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="landing">
            <LandingNavbar isMainPage={true}/>
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
                        <p className='section-content'>Wayfare is a social media app designed for hikers, adventurers, and nature lovers who want to connect, share, and explore the great outdoors together. Whether you're scaling rugged peaks, strolling through forest trails, or just discovering a new walk in your neighborhood, Wayfare makes it easy to track your journey, post photos, and find new hiking spots recommended by the community. Users can log their hikes with GPS, upload trail conditions in real-time, and leave helpful tips or reviews for others. The app includes custom profiles, leaderboards, group challenges, and badges for milestones.</p>
                        <Link to='/signup'>Start Now</Link>
                    </div>
                    <div className='section-image-container'>
                        <img className='section-image' src={hikingdude}/>
                    </div>
                </div>

                <div className='section2'>
                    <h2 className='section-header'>Today's Top Trails:</h2>
                    <TrialPreview title='Wellington Waterfront' description='Wellington’s waterfront is a vibrant and dynamic area where the energy of urban life meets the beauty of nature. Stretching along the edge of the harbor, it offers a scenic promenade that invites both locals and visitors to stroll, cycle, or simply relax while taking in panoramic views of the water and surrounding hills.' image={testImg} likes={1305} creatorName='steven xu' trail_link={'/home'} difficulty={'9'}/>
                </div>
            </div>
        </div>
    );
}