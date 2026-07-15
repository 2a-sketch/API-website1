import React, { useState } from 'react';
import { motion as realMotion } from 'framer-motion';
import { mobileMotionProxy, isMobileDevice } from './motionShim.js';
const motion = isMobileDevice ? mobileMotionProxy : realMotion;

const e = React.createElement;

const products = [
    { name: 'Hammertone Finish', desc: 'Textured metallic finish ideal for industrial machinery, toolboxes, and equipment casings.', image: './images/hemmertone.png', swatch: ['#4A5568', '#2D3748', '#718096'] },
    { name: 'Stipple Finish', desc: 'Multi-toned textured coating for decorative and protective industrial applications.', image: './images/stipple.png', swatch: ['#5B4A3F', '#8B7355', '#D4A574'] },
    { name: 'Enamel Paints', desc: 'Smooth, hard-wearing enamel coating for machinery, pipes, and structural steel.', image: './images/enamel.png', swatch: ['#2B6CB0', '#E53E3E', '#38A169'] },
    { name: 'Silver Paints', desc: 'Brilliant metallic silver finish for heat-resistant and decorative industrial use.', image: './images/silver.png', swatch: ['#A0AEC0', '#E2E8F0', '#718096'] },
    { name: 'Industrial Paints', desc: 'Heavy-duty protective coatings for factories, plants, and heavy machinery.', image: './images/industrial.png', swatch: ['#E85D04', '#DD6B20', '#C05621'] },
    { name: 'High Glossy Enamel Paints', desc: 'Ultra-smooth, mirror-like gloss finish for premium equipment and showroom applications.', image: './images/high glowsy.png', swatch: ['#D62828', '#1A202C', '#F5F1E8'] },
    { name: 'Powder Coating Finish Paints', desc: 'Durable powder-applied finish for corrosion resistance and long-lasting surface protection.', image: './images/powder coating.png', swatch: ['#2D3748', '#E85D04', '#8D99AE'] },
];

function ProductCard({ product, onEnquiry, index }) {
    const [selectedQty, setSelectedQty] = useState('4L');
    const quantities = ['1L', '4L', '20L'];

    return e(motion.div, {
        className: 'card-gradient border border-charcoal-lighter rounded-2xl overflow-hidden group relative',
        initial: { opacity: 0, y: 60 }, whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-30px' },
        transition: { duration: 0.4, delay: index * 0.05 },
        
    },
        e('div', { className: 'absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' }),

        e('div', { className: 'relative overflow-hidden bg-charcoal-lighter/30 flex items-center justify-center', style: { height: '220px' } },
            e(motion.div, { className: 'absolute top-4 right-4 flex gap-1.5 z-10' },
                ...product.swatch.map((c, i) =>
                    e(motion.div, {
                        key: i, className: 'w-5 h-5 rounded-full border-2 border-white/20 shadow-md',
                        style: { background: c }, whileHover: { scale: 1.3 },
                        
                    })
                )
            ),
            e(motion.img, {
                src: product.image,
                alt: product.name,
                className: 'w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl',
                style: { maxHeight: '210px' },
            })
        ),

        e('div', { className: 'p-6 relative z-10' },
            e('h3', { className: 'font-outfit font-bold text-xl text-cream mb-2 group-hover:text-accent transition-colors duration-300' }, product.name),
            e('p', { className: 'text-cream/50 text-sm leading-relaxed mb-4' }, product.desc),
            e('div', { className: 'mb-4' },
                e('span', { className: 'text-xs text-cream/40 uppercase tracking-wider block mb-2' }, 'Select Quantity'),
                e('div', { className: 'flex gap-2' },
                    ...quantities.map(qty =>
                        e('button', {
                            key: qty, onClick: () => setSelectedQty(qty),
                            className: `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedQty === qty ? 'bg-accent text-cream shadow-lg shadow-accent/20' : 'bg-charcoal-lighter text-cream/60 hover:text-cream hover:bg-charcoal-lighter/80'}`,
                        }, qty)
                    )
                )
            ),
            e(motion.button, {
                onClick: () => onEnquiry(product.name, selectedQty),
                className: 'w-full py-3 bg-charcoal-lighter border border-accent/30 text-accent font-semibold rounded-xl hover:bg-accent hover:text-cream transition-all duration-300 flex items-center justify-center gap-2',
                whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 },
            },
                'Enquire Now',
                e('svg', { className: 'w-4 h-4', viewBox: '0 0 20 20', fill: 'currentColor' },
                    e('path', { fillRule: 'evenodd', d: 'M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z', clipRule: 'evenodd' })
                )
            )
        )
    );
}

export function Products({ onEnquiry }) {
    return e('section', { id: 'products', className: 'relative py-24 sm:py-32 overflow-hidden' },
        e('div', { className: 'absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent' }),
        
        
        e('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10' },
            e(motion.div, {
                className: 'text-center mb-16',
                initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 },
                viewport: { once: true }, transition: { duration: 0.6 },
            },
                e('span', { className: 'text-accent font-medium text-sm tracking-[0.2em] uppercase' }, 'Our Products'),
                e('h2', { className: 'font-outfit font-bold text-3xl sm:text-4xl md:text-5xl mt-3 mb-4' },
                    'Our ', e('span', { className: 'gradient-text' }, 'Product Range')),
                e('div', { className: 'w-20 h-1 bg-accent mx-auto rounded-full' }),
                e('p', { className: 'text-cream/50 max-w-2xl mx-auto mt-6 text-base sm:text-lg' },
                    'From protective industrial coatings to premium decorative finishes — every product is engineered for excellence.')
            ),
            e('div', { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' },
                ...products.map((product, i) => e(ProductCard, { key: product.name, product, onEnquiry, index: i }))
            )
        )
    );
}



