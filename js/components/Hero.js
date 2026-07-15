import React, { useState, useEffect } from 'react';
import { motion as realMotion } from 'framer-motion';
import { mobileMotionProxy, isMobileDevice } from './motionShim.js';
const motion = isMobileDevice ? mobileMotionProxy : realMotion;

const e = React.createElement;

export function Hero() {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return e('section', { id: 'home', className: 'relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal' },

        e('video', {
            key: isMobile ? 'mobile-video' : 'desktop-video',
            className: 'absolute inset-0 w-full h-full object-cover z-0',
            autoPlay: true,
            loop: true,
            muted: true,
            playsInline: true,
            preload: 'auto',
            src: isMobile ? './images/mobile_interface.mp4?v=1783942897' : './images/animation.mp4',
            style: { willChange: 'transform', transform: 'translateZ(0)' },
        }),

        e('div', { className: 'absolute inset-0 z-[1]', style: { background: isMobile
            ? 'linear-gradient(to bottom, rgba(26,26,26,0.6) 0%, rgba(26,26,26,0.7) 50%, rgba(26,26,26,0.95) 100%)'
            : 'linear-gradient(to bottom, rgba(26,26,26,0.45) 0%, rgba(26,26,26,0.55) 60%, rgba(26,26,26,0.95) 100%)'
        } }),

        !isMobile ? e('div', { className: 'absolute inset-0 z-[2]', style: { backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", opacity: 0.03 } }) : null,

        !isMobile ? e('svg', { className: 'absolute bottom-0 left-0 right-0 z-[3]', viewBox: '0 0 1440 80', fill: 'none', preserveAspectRatio: 'none', style: { width: '100%', height: '80px' } },
            e('path', { d: 'M0 40C120 10 240 60 360 35C480 10 600 55 720 30C840 5 960 50 1080 35C1200 20 1320 55 1440 40V80H0Z', fill: '#D62828', opacity: '0.18' }),
            e('path', { d: 'M0 55C180 20 300 65 480 45C660 25 780 60 960 42C1140 24 1260 58 1440 45V80H0Z', fill: '#E85D04', opacity: '0.10' })
        ) : null,

        e('div', { className: 'relative z-10 max-w-5xl mx-auto px-5 sm:px-6 text-center', style: { paddingTop: isMobile ? '130px' : '160px' } },

            e(motion.div, {
                className: 'inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full mb-6 sm:mb-8',
                style: { background: 'rgba(0,0,0,0.45)', backdropFilter: isMobile ? 'none' : 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' },
                initial: { opacity: 0, y: 15 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.2 },
            },
                e('span', { className: 'w-2 h-2 rounded-full bg-accent animate-pulse' }),
                e('span', { className: 'text-xs sm:text-sm font-medium text-cream tracking-wide' }, isMobile ? 'Premium Paint Manufacturer' : 'Premium Industrial Paint Manufacturer — Rajkot, Gujarat')
            ),

            e(motion.h1, {
                className: 'font-outfit font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4 sm:mb-6',
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.3 },
            },
                e('span', { style: { color: '#fff', textShadow: '0 3px 16px rgba(0,0,0,0.7)' } }, "Coating Rajkot's"),
                e('br'),
                e('span', { style: { color: '#fff', textShadow: '0 3px 16px rgba(0,0,0,0.7)' } }, 'Industries with '),
                e('span', { className: 'gradient-text', style: { filter: isMobile ? 'none' : 'drop-shadow(0 0 18px rgba(214,40,40,0.7))' } }, 'Trust'),
                e('br'),
                e('span', { className: 'font-bold', style: { color: 'rgba(245,241,232,0.85)', fontSize: isMobile ? '50%' : '55%', textShadow: '0 2px 12px rgba(0,0,0,0.6)' } }, 'Since 2019 | ISO Certified')
            ),

            e(motion.p, {
                className: 'text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 font-medium leading-relaxed px-2',
                style: { color: 'rgba(245,241,232,0.88)', textShadow: '0 2px 8px rgba(0,0,0,0.8)' },
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.5 },
            }, isMobile
                ? 'Industrial-grade finishes engineered for durability. Trusted by 500+ businesses across India.'
                : 'Delivering industrial-grade finishes that stand the test of time. From Hammertone to Powder Coating — engineered for durability, trusted by 500+ businesses across Gujarat.'
            ),

            e(motion.div, {
                className: 'flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center',
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.6 },
            },
                e(motion.button, {
                    onClick: () => scrollTo('products'),
                    className: 'group w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 bg-accent text-cream font-semibold text-base sm:text-lg rounded-xl flex items-center justify-center gap-2',
                    style: { transition: 'all 0.3s' },
                    whileHover: isMobile ? {} : { scale: 1.06, boxShadow: '0 0 35px rgba(214,40,40,0.65)' },
                    whileTap: { scale: 0.96 },
                },
                    'View Products',
                    e('svg', { className: 'w-5 h-5 transition-transform group-hover:translate-x-1', viewBox: '0 0 20 20', fill: 'currentColor' },
                        e('path', { fillRule: 'evenodd', d: 'M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z', clipRule: 'evenodd' })
                    )
                ),
                e(motion.button, {
                    onClick: () => scrollTo('enquiry'),
                    className: 'w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 text-cream font-semibold text-base sm:text-lg rounded-xl',
                    style: { background: 'rgba(0,0,0,0.4)', backdropFilter: isMobile ? 'none' : 'blur(10px)', border: '2px solid rgba(245,241,232,0.3)', transition: 'all 0.3s' },
                    whileHover: isMobile ? {} : { scale: 1.06, borderColor: 'rgba(214,40,40,0.8)' },
                    whileTap: { scale: 0.96 },
                }, 'Get a Quote')
            ),

            !isMobile ? e(motion.div, {
                className: 'mt-16 flex flex-col items-center gap-1',
                animate: { y: [0, 10, 0] },
                transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
            },
                e('div', {
                    className: 'w-6 h-10 rounded-full flex justify-center pt-2',
                    style: { border: '2px solid rgba(245,241,232,0.45)', background: 'rgba(0,0,0,0.3)' }
                },
                    e(motion.div, {
                        className: 'w-1.5 h-1.5 rounded-full bg-accent',
                        animate: { y: [0, 16, 0], opacity: [1, 0.2, 1] },
                        transition: { duration: 2.2, repeat: Infinity },
                    })
                ),
                e('span', { className: 'text-xs text-cream/40 tracking-widest uppercase mt-1' }, 'Scroll')
            ) : null
        )
    );
}




