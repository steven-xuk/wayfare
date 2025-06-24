// Guide.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import HomeNavbarAuth from "./parts/HomeNavbarAuth";
import ImageCarousel from "./parts/ImageCarousel";
import ReactDOM from "react-dom/client";

export default function Guide() {
    const { city } = useParams();
    const [data, setData] = useState(null);
    const hostRef = useRef(null);

    // 1) Fetch the city JSON
    useEffect(() => {
        fetch(`https://travel-guides.xuk.workers.dev/api/cities/${city}`)
            .then(res => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
            .then(setData)
            .catch(console.error);
    }, [city]);

    // 2) Once HTML is in, mount each carousel into its placeholder
    useEffect(() => {
        if (!data) return;
        const host = hostRef.current;
        if (!host) return;

        const roots = Array.from(
            host.querySelectorAll(".carousel-placeholder")
        ).map(el => {
            const images = JSON.parse(el.getAttribute("data-carousel-images"));
            const root = ReactDOM.createRoot(el);
            root.render(<ImageCarousel images={images} />);
            return root;
        });

        // defer unmounts to the next tick so we don't unmount mid-render
        return () => {
            roots.forEach(root => {
                setTimeout(() => {
                    try { root.unmount(); } catch {}
                }, 0);
            });
        };
    }, [data]);

    if (!data) {
        return (
            <div className="guide">
                <HomeNavbarAuth shadow={true} />
                <div className="container">
                    <p>Loading…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="guide">
            <HomeNavbarAuth shadow={true} />
            <div className="container">
                {/* inject the entire .city HTML in one go */}
                <div
                    ref={hostRef}
                    dangerouslySetInnerHTML={{ __html: data.html }}
                />
            </div>
        </div>
    );
}
