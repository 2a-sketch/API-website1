import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const e = React.createElement;

function AnimatedCounter({ target, suffix, duration }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const dur = duration || 2000;
    const suf = suffix || '';

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const increment = target / (dur / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else { setCount(Math.floor(start)); }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target, dur]);

    return e('span', { ref }, count + suf);
}

const stats = [
    {
        icon: e('svg', { className: 'w-10 h-10', viewBox: '0 0 24 24', fill: 'none', stroke: '#D62828', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
            e('circle', { cx: 12, cy: 12, r: 10 }), e('polyline', { points: '12 6 12 12 16 14' })),
        target: 7, suffix: '+', label: 'Years of Excellence', desc: 'Pioneering industrial paint solutions since 2019',
    },
    {
        icon: e('svg', { className: 'w-10 h-10', viewBox: '0 0 24 24', fill: 'none', stroke: '#E85D04', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
            e('path', { d: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' }), e('circle', { cx: 9, cy: 7, r: 4 }), e('path', { d: 'M23 21v-2a4 4 0 00-3-3.87' }), e('path', { d: 'M16 3.13a4 4 0 010 7.75' })),
        target: 500, suffix: '+', label: 'Happy Clients', desc: 'Trusted by industries across Gujarat and beyond',
    },
    {
        icon: e('svg', { className: 'w-10 h-10', viewBox: '0 0 24 24', fill: 'none', stroke: '#D62828', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
            e('path', { d: 'M12 2L2 7l10 5 10-5-10-5z' }), e('path', { d: 'M2 17l10 5 10-5' }), e('path', { d: 'M2 12l10 5 10-5' })),
        target: 7, suffix: '', label: 'Product Ranges', desc: 'Comprehensive finish solutions for every need',
    },
    {
        icon: e('svg', { className: 'w-10 h-10', viewBox: '0 0 24 24', fill: 'none', stroke: '#E85D04', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
            e('rect', { x: 1, y: 3, width: 15, height: 13, rx: 2 }), e('polygon', { points: '16 8 20 8 23 11 23 16 16 16 16 8' }), e('circle', { cx: 5.5, cy: 18.5, r: 2.5 }), e('circle', { cx: 18.5, cy: 18.5, r: 2.5 })),
        target: 100, suffix: '%', label: 'Pan-India Delivery', desc: 'Complete coverage across the nation',
    },
];

export function About() {
    const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
    const cardVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

    return e('section', { id: 'about', className: 'relative py-24 sm:py-32 overflow-hidden' },
        e('div', { className: 'absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30' }),
        e('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
            e(motion.div, {
                className: 'text-center mb-16',
                initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-50px' }, transition: { duration: 0.6 },
            },
                e('span', { className: 'text-accent font-medium text-sm tracking-[0.2em] uppercase' }, 'Why Choose Us'),
                e('h2', { className: 'font-outfit font-bold text-3xl sm:text-4xl md:text-5xl mt-3 mb-4' },
                    e('span', { className: 'text-cream' }, 'Built on '),
                    e('span', { className: 'gradient-text' }, 'Quality & Trust')
                ),
                e('div', { className: 'w-20 h-1 bg-accent mx-auto rounded-full' }),
                e('p', { className: 'text-cream/50 max-w-2xl mx-auto mt-6 text-base sm:text-lg leading-relaxed' },
                    "Aman Paint Industries has been Rajkot's trusted name in industrial coatings. From factory floors to architectural marvels, our finishes are engineered for extreme durability and aesthetic excellence.")
            ),
            e(motion.div, {
                className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
                variants: containerVariants, initial: 'hidden', whileInView: 'visible',
                viewport: { once: true, margin: '-50px' },
            },
                ...stats.map((stat, i) =>
                    e(motion.div, {
                        key: i, className: 'card-gradient border border-charcoal-lighter rounded-2xl p-8 text-center hover:border-accent/30 transition-all duration-500 group relative overflow-hidden',
                        variants: cardVariants,
                    },
                        e('div', { className: 'absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' }),
                        e('div', { className: 'relative z-10' },
                            e('div', { className: 'inline-flex items-center justify-center w-16 h-16 rounded-xl bg-charcoal-lighter/50 mb-5 group-hover:scale-110 transition-transform duration-300' }, stat.icon),
                            e('div', { className: 'font-outfit font-black text-4xl sm:text-5xl gradient-text mb-2' }, e(AnimatedCounter, { target: stat.target, suffix: stat.suffix })),
                            e('h3', { className: 'font-outfit font-semibold text-lg text-cream mb-2' }, stat.label),
                            e('p', { className: 'text-cream/40 text-sm leading-relaxed' }, stat.desc)
                        )
                    )
                )
            ),
            e(motion.div, {
                className: 'mt-20 grid md:grid-cols-2 gap-12 items-center',
                initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-50px' }, transition: { duration: 0.8 },
            },
                e('div', null,
                    e('h3', { className: 'font-outfit font-bold text-2xl sm:text-3xl mb-6' },
                        "Rajkot's Most Trusted ", e('span', { className: 'gradient-text' }, 'Paint Manufacturer')),
                    e('p', { className: 'text-cream/60 leading-relaxed mb-4' },
                        'Founded in 2019, Aman Paint Industries has grown from a small workshop in Rajkot to a full-scale manufacturing facility serving clients across Gujarat. We specialize in industrial-grade finishes that combine durability with superior aesthetics.'),
                    e('p', { className: 'text-cream/60 leading-relaxed mb-6' },
                        "Our team of experienced chemists and engineers develop formulations that withstand extreme conditions — from heavy industrial machinery to architectural facades exposed to Gujarat's harsh climate."),
                    e('div', { className: 'flex flex-wrap gap-3' },
                        ...['ISO Certified', 'Eco-Friendly', 'Custom Formulations', 'Bulk Orders'].map(tag =>
                            e('span', { key: tag, className: 'px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium' }, tag)))
                ),
                e('div', { className: 'relative h-64 sm:h-80' },
                    ...[{ color: '#D62828', rotate: -6, x: 0 }, { color: '#E85D04', rotate: -2, x: 20 }, { color: '#8D99AE', rotate: 3, x: 40 }, { color: '#1a1a1a', rotate: 7, x: 60 }, { color: '#F5F1E8', rotate: 11, x: 80 }].map((swatch, i) =>
                        e(motion.div, {
                            key: i, className: 'absolute top-1/2 left-1/2 w-32 h-44 sm:w-40 sm:h-52 rounded-2xl shadow-2xl border border-white/10',
                            style: { background: swatch.color, transform: `translate(-50%, -50%) translateX(${swatch.x - 40}px) rotate(${swatch.rotate}deg)`, zIndex: 5 - i },
                            
                        })
                    )
                )
            )
        )
    );
}





