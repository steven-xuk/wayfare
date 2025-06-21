// src/components/TpTripComHotelWidget.jsx
import React, { useEffect, useRef } from 'react';

export default function TpTripComHotelWidget({
    style = {},        // your custom container styles
    layout = 'S10409', // override the layout if needed
    lang = 'www',      // override the language subdomain
    className = '',    // any extra CSS classes
}) {
    const wrapperRef = useRef(null);

    // default dimensions for each layout
    const defaultLayoutDimensions = {
        S606230: { width: '900px', height: '200px' },
        S4279:   { width: '320px', height: '320px' },
        S10409:  { width: '100%', height: '480px' },
        S606216: { width: '320px', height: '640px' },
        default: { width: '100%', height: '220px' },
    };

    // your existing inline container styles + overflow hidden
    const containerStyles = {
        maxWidth:     '530px',
        width:        '80%',
        margin:       '2rem',
        borderRadius: '12px',
        background:   '#f9f9f9',
        boxShadow:    '0px 0px 16px rgba(0, 0, 0, 0.2)',
        overflow:     'hidden',        // ← clip child corners
        ...style,
    };

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        // clear out anything that was there
        el.innerHTML = '';

        // build the Trip.com content.js URL
        const src = [
            'https://tpwgts.com/content',
            `?trs=426760`,
            `&shmarker=640725`,
            `&lang=${encodeURIComponent(lang)}`,
            `&layout=${encodeURIComponent(layout)}`,
            `&powered_by=true`,
            `&campaign_id=121`,
            `&promo_id=4038`
        ].join('');

        // inject their script
        const script = document.createElement('script');
        script.async   = true;
        script.src     = src;
        script.charset = 'utf-8';
        el.appendChild(script);

        // once the script loads and injects the iframe, adjust its sizing & radius
        script.addEventListener('load', () => {
            const iframe = el.querySelector('iframe');
            if (!iframe) return;

            // remove Trip.com's hardcoded width/height
            iframe.style.removeProperty('width');
            iframe.style.removeProperty('height');

            // apply 100% width, correct height, and rounded corners
            iframe.style.width        = '100%';
            const { height } =
                defaultLayoutDimensions[layout] ||
                defaultLayoutDimensions.default;
            iframe.style.height       = height;
            iframe.style.borderRadius = '12px';  // ← match container
            iframe.style.display      = 'block';
            iframe.style.margin       = '0 auto';
        });

        // cleanup on unmount
        return () => {
            if (wrapperRef.current) {
                wrapperRef.current.innerHTML = '';
            }
        };
    }, [layout, lang]);

    return (
        <div
            ref={wrapperRef}
            className={`tp-trip-com-hotel-widget ${className}`}
            style={containerStyles}
        />
    );
}
