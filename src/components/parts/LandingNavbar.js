import logo from '../../imgs/logo.png';
import hamburger from '../../imgs/hamburger.png';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function LandingNavbar({isMainPage}) {
    const [isOnTop, setIsOnTop] = useState(true);
    const [navbarIsOpen, setNavbarIsOpen] = useState(false);
    const [navbarIsVisible, setNavbarIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 18) {
                setIsOnTop(false);
            } else {
                setIsOnTop(true);
            }
        })
    }, [])

    return (
        <div className="landing-navbar">
            <nav className={`nav ${isOnTop && isMainPage ? 'on-top' : 'scrolled'} ${navbarIsOpen? 'open' : ''}`} style={{position: isMainPage ? 'fixed' : 'block'}}>
                <NavLink to="/"><img src={logo} className={isOnTop && isMainPage ? '' : 'dark'} /></NavLink>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/download">Download</NavLink>
                <NavLink to="/explore">Explore</NavLink>
                <NavLink to="/login">Log In</NavLink>
                <button onClick={() => {setNavbarIsOpen(!navbarIsOpen);}}>
                    <img className={isOnTop && isMainPage ? '' : 'dark'} src={hamburger} />
                </button>
            </nav>
        </div>
    );
}