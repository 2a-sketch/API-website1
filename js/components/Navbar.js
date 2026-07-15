import React, { useState, useEffect } from 'react';
import { motion as realMotion, AnimatePresence as realAnimatePresence } from 'framer-motion';
import { mobileMotionProxy, mobileAnimatePresenceShim, isMobileDevice } from './motionShim.js';
const motion = isMobileDevice ? mobileMotionProxy : realMotion;
const AnimatePresence = isMobileDevice ? mobileAnimatePresenceShim : realAnimatePresence;

const e = React.createElement;

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    const sections = ['contact', 'enquiry', 'about', 'products', 'home'];
                    for (const id of sections) {
                        const el = document.getElementById(id);
                        if (el && el.getBoundingClientRect().top <= 150) {
                            setActiveSection(id);
                            break;
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    const links = [
        { label: 'Home', id: 'home' },
        { label: 'Products', id: 'products' },
        { label: 'About', id: 'about' },
        { label: 'Enquiry', id: 'enquiry' },
        { label: 'Contact', id: 'contact' },
    ];

    return e(motion.nav, {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-charcoal/90 backdrop-blur-xl shadow-2xl shadow-black/30 py-3' : 'bg-transparent py-5'}`,
        initial: { y: -100 },
        animate: { y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' },
    },
        e('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between' },
            e(motion.div, {
                className: 'flex items-center cursor-pointer',
                onClick: () => scrollTo('home'),
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
            },
                e('img', { src: './images/logo.png?v=1783771304', alt: 'Aman Paint Industries Logo', className: 'h-16 sm:h-24 object-contain drop-shadow-2xl' })
            ),
            e('div', { className: 'hidden md:flex items-center gap-1' },
                ...links.map(link =>
                    e(motion.button, {
                        key: link.id,
                        onClick: () => scrollTo(link.id),
                        className: `relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${activeSection === link.id ? 'text-accent' : 'text-cream/70 hover:text-cream'}`,
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.95 },
                    },
                        link.label,
                        activeSection === link.id ? e(motion.div, {
                            className: 'absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-accent rounded-full',
                            layoutId: 'activeNav',
                            transition: { type: 'spring', stiffness: 300, damping: 30 },
                        }) : null
                    )
                ),
                e(motion.button, {
                    onClick: () => scrollTo('enquiry'),
                    className: 'ml-4 px-5 py-2 bg-accent text-cream text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors duration-300',
                    whileHover: { scale: 1.05, boxShadow: '0 0 20px rgba(214,40,40,0.4)' },
                    whileTap: { scale: 0.95 },
                }, 'Get a Quote')
            ),
            e('button', {
                className: 'md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-[60]',
                onClick: () => setMobileOpen(!mobileOpen),
            },
                e('span', { className: `block w-6 h-0.5 bg-cream transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}` }),
                e('span', { className: `block w-6 h-0.5 bg-cream transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}` }),
                e('span', { className: `block w-6 h-0.5 bg-cream transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}` })
            )
        ),
        e(AnimatePresence, null,
            mobileOpen ? e(motion.div, {
                key: 'mobile-menu',
                className: 'md:hidden fixed inset-0 top-0 bg-charcoal/98 backdrop-blur-2xl z-50 flex flex-col items-center justify-center gap-6',
                initial: { x: '100%' },
                animate: { x: 0 },
                exit: { x: '100%' },
                transition: { type: 'spring', damping: 25, stiffness: 200 },
            },
                ...links.map((link, i) =>
                    e(motion.button, {
                        key: link.id,
                        onClick: () => scrollTo(link.id),
                        className: `text-2xl font-outfit font-semibold ${activeSection === link.id ? 'text-accent' : 'text-cream/80'} hover:text-accent transition-colors`,
                        initial: { opacity: 0, x: 50 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: i * 0.1, duration: 0.3 },
                    }, link.label)
                ),
                e(motion.button, {
                    onClick: () => scrollTo('enquiry'),
                    className: 'mt-4 px-8 py-3 bg-accent text-cream text-lg font-semibold rounded-xl',
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.5 },
                    whileTap: { scale: 0.95 },
                }, 'Get a Quote')
            ) : null
        )
    );
}








