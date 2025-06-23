// ImageCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';

export default function ImageCarousel({
    images = [],
    autoPlay = true,
    autoPlayTime = 3000
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!autoPlay || images.length <= 1) return;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setCurrentIndex(idx => (idx + 1) % images.length);
        }, autoPlayTime);
        return () => clearTimeout(timeoutRef.current);
    }, [currentIndex, autoPlay, autoPlayTime, images.length]);

    const prevSlide = () =>
        setCurrentIndex(idx => (idx - 1 + images.length) % images.length);
    const nextSlide = () =>
        setCurrentIndex(idx => (idx + 1) % images.length);

    return (
        <div className="image-carousel">
            <div className="container">
                <div
                    className="slides"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((src, i) => (
                        <div className="slide" key={i}>
                            <img src={src} alt={`Slide ${i + 1}`} />
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    className="arrow prev"
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        prevSlide();
                    }}
                    aria-label="Previous"
                >
                    ‹
                </button>
                <button
                    type="button"
                    className="arrow next"
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        nextSlide();
                    }}
                    aria-label="Next"
                >
                    ›
                </button>

                <div className="dots">
                    {images.map((_, i) => (
                        <span
                            key={i}
                            className={`dot${i === currentIndex ? ' active' : ''}`}
                            onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurrentIndex(i);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
