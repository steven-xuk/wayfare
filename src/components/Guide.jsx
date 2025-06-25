// Guide.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import HomeNavbarAuth from "./parts/HomeNavbarAuth";
import ImageCarousel from "./parts/ImageCarousel";
import ReactDOM from "react-dom/client";

export default function Guide() {
    const { city } = useParams();
    const [data, setData] = useState(null);
    const [a, b] = useState(true)
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

    if (a) {
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
    } else {
        return (
            <div className="guide">
                <HomeNavbarAuth shadow={true} />
                <div className="container">
                    <div className="city">
                        <div className="title" style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://u.cubeupload.com/xuk/looknohands.png')"}}>
                            <h1>Wellington</h1>
                        </div>
                        <div className="overview-container">
                            <div className="overview">
                                <h2>Overview</h2>
                                <img src="https://u.cubeupload.com/xuk/looknohands.png" className="img-right desktop"/>
                                <p>
                                    Wellington nestles at the southern tip of New Zealand’s North Island, cradled between lush, rolling hills and a sweeping natural harbour. In little more than 100 square kilometres you’ll find a vibrant capital city that punches far above its weight in arts, culture and culinary delights. Start your day with a coffee from one of the hundreds of independent roasters—Wellington prides itself on having more cafés per capita than New York—and you’ll quickly understand why locals refer to it as “the coffee capital of the world.”
                                </p>
                                <img src="https://u.cubeupload.com/xuk/looknohands.png" className="img-right mobile"/>
                                <p>
                                    Beyond the espresso bar, Wellington’s creative spirit is everywhere. Te Papa Tongarewa, the national museum, offers free entry to world-class exhibitions that weave together Māori whakapapa (genealogy), natural history and contemporary art. Just a few blocks away on Cable Street, the historic Wellington Cable Car climbs the steep hillside up to Kelburn. At the top, the Botanic Garden’s terraced lawns, native-plant conservatory and rose gardens invite you to meander among kānuka forests and prize-winning begonias, all while enjoying panoramic views of the city below.
                                </p>
                            </div>
                        </div>
                        <div className="hotels-container">
                            <div className="hotels">
                                <h2>Hotels</h2>
                                <a className="hotel" href="https://trip.com">
                                    <div className="text">
                                        <h3>QT Wellington Museum Hotel</h3>
                                        <p>
                                            Your Wellington hotel room is surrounded by urban hills and harbour views, landscapes of true visual indulgence. In a capital alive with expressive aesthetic, here you can let it soak in. This unusual accommodation in Wellington is your own creative hideaway.
                                        </p>
                                        <ImageCarousel images={[
                                            'https://u.cubeupload.com/xuk/looknohands.png',
                                            'https://www.w3schools.com/howto/img_mountains_wide.jpg'
                                        ]}/>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
