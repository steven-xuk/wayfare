// src/components/TpTripComHotelWidget.jsx
import React, { useEffect, useRef, useState } from 'react';

export default function TpTripComHotelWidget({
    style = {},        // your custom container styles
    layout = 'S10409', // override the layout if needed
    lang = 'www',      // override the language subdomain
    className = '',    // any extra CSS classes
}) {
    const wrapperRef = useRef(null);
    const [isNarrow, setIsNarrow] = useState(
        typeof window !== 'undefined' && window.innerWidth < 460
    );

    // listen for viewport changes to toggle margin
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mq = window.matchMedia('(max-width: 460px)');
        const onChange = e => setIsNarrow(e.matches);

        mq.addListener(onChange);
        // initialize
        setIsNarrow(mq.matches);

        return () => mq.removeListener(onChange);
    }, []);

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
        width:        isNarrow ? '100%' : '80%',
        // horizontal margin is 0 when viewport < 460px
        margin:       isNarrow ? '2rem 0' : '2rem',
        borderRadius: '12px',
        background:   '#f9f9f9',
        boxShadow:    '0px 0px 16px rgba(0, 0, 0, 0.2)',
        overflow:     'hidden',        // ← clip child corners
        ...style,
    };

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        el.innerHTML = '';

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

        const script = document.createElement('script');
        script.async   = true;
        script.src     = src;
        script.charset = 'utf-8';
        el.appendChild(script);

        script.addEventListener('load', () => {
            const iframe = el.querySelector('iframe');
            if (!iframe) return;

            iframe.style.removeProperty('width');
            iframe.style.removeProperty('height');
            iframe.style.width        = '100%';
            const { height } =
                defaultLayoutDimensions[layout] ||
                defaultLayoutDimensions.default;
            iframe.style.height       = height;
            iframe.style.borderRadius = '12px';
            iframe.style.display      = 'block';
            iframe.style.margin       = '0 auto';
        });

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
