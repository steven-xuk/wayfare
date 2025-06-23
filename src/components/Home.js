import { Link } from "react-router-dom";
import HomeNavbarAuth from './parts/HomeNavbarAuth.js';

export default function Home() {
  return (
      <div className="home">
        <HomeNavbarAuth shadow={false} />
        <div className='content'>
          <div className='grid'>
            <Link to='/explore' className='card'>
              <p>Explore Walks</p>
            </Link>
            <Link to='/travel-guides' className='card'>
              <p>Travel Guides</p>
            </Link>
            <Link to='/create-post' className='card'>
              <p>Create a Post</p>
            </Link>
            <Link to='/create-walk' className='card'>
              <p>Create a Walk</p>
            </Link>
          </div>
        </div>
    </div>

  );
}