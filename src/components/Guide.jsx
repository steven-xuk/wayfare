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

    // 1) Fetch the city JSON on mount / when slug changes
    useEffect(() => {
        fetch(`https://travel-guides.xuk.workers.dev/api/cities/${city}`)
            .then(res => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
            .then(setData)
            .catch(console.error);
    }, [city]);

    // 2) Once `data.html` is injected, mount each carousel
    useEffect(() => {
        if (!data) return;
        const host = hostRef.current;
        if (!host) return;

        const roots = [];
        host.querySelectorAll(".carousel-placeholder").forEach(el => {
            const images = JSON.parse(el.getAttribute("data-carousel-images"));
            const root = ReactDOM.createRoot(el);
            root.render(<ImageCarousel images={images} />);
            roots.push(root);
        });

        return () => roots.forEach(r => r.unmount());
    }, [data]);

    if (!data) return <p>Loading…</p>;

    return (
        <div className="guide">
            <HomeNavbarAuth shadow={true} />

            <div className="container">
                {/* replace the entire static .city block with this */}
                <div
                    ref={hostRef}
                    className="city"
                    dangerouslySetInnerHTML={{ __html: data.html }}
                />
            </div>
        </div>
    );
}
