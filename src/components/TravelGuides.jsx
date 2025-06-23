// TravelGuides.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeNavbarAuth from "./parts/HomeNavbarAuth";

export default function TravelGuides() {
    const [manifest, setManifest] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://travel-guides.xuk.workers.dev/api/manifests/cities")
            .then(res => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
            .then(setManifest)
            .catch(err => {
                console.error(err);
                setError("Failed to load city list.");
            });
    }, []);

    if (error) {
        return (
            <div className="travel-guides">
                <HomeNavbarAuth shadow={true} />
                <div className="container">
                    <p className="error">{error}</p>
                </div>
            </div>
        );
    }

    if (!manifest) {
        return (
            <div className="travel-guides">
                <HomeNavbarAuth shadow={true} />
                <div className="container">
                    <p>Loading cities…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="travel-guides">
            <HomeNavbarAuth shadow={true} />
            <div className="container">
                <h1>Travel Guides</h1>
                <div className="city-list">
                    {manifest.cities.map(city => (
                        <Link
                            key={city.slug}
                            to={`/guide/${city.slug}`}
                            className="city-card"
                            style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url('${city.mainImage}')`}}
                        >
                            {/* <img
                                src={city.mainImage}
                                alt={city.name}
                            /> */}
                            <h3>{city.name}</h3>
                            {/* <p>{city.description}</p> */}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
