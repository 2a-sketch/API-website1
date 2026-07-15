import React, { useState, useEffect } from 'react';
import { motion as realMotion, AnimatePresence as realAnimatePresence } from 'framer-motion';
import { mobileMotionProxy, mobileAnimatePresenceShim, isMobileDevice } from './motionShim.js';
const motion = isMobileDevice ? mobileMotionProxy : realMotion;
const AnimatePresence = isMobileDevice ? mobileAnimatePresenceShim : realAnimatePresence;

const e = React.createElement;

const defaultTestimonials = [
    { name: 'Rajesh Patel', role: 'Plant Manager, TechForge Industries', text: 'Aman Paint has transformed our factory floors. Their Hammertone finish withstands the heaviest machinery wear and tear without chipping. Exceptional quality and durability.', rating: 5 },
    { name: 'Sanjay Desai', role: 'Director, Gujarat Structurals', text: 'We have been using Aman Paint\'s enamel coatings for our structural steel projects for over a decade. Their consistency in color and corrosion resistance is unmatched in the market.', rating: 5 },
    { name: 'Amit Shah', role: 'Operations Head, Machineworks Rajkot', text: 'The stipple finish from Aman Paint gives our equipment a premium look while providing the industrial-grade protection we need. Delivery is always on time.', rating: 5 },
    { name: 'Vikram Singh', role: 'CEO, MetalCoat Solutions', text: 'Their powder coating finishes are incredibly robust. We\'ve tested many brands, but Aman Paint consistently delivers the best adhesion and longevity for extreme environments.', rating: 5 },
    { name: 'Prakash Mehta', role: 'Procurement Officer, AutoParts Gujarat', text: 'Outstanding customer service combined with superior paint quality. Their team helped us customize a specific silver finish for our high-heat engine components.', rating: 5 },
];

function StarRating({ rating, onRate, interactive }) {
    return e('div', { className: 'flex gap-1' },
        [1,2,3,4,5].map(star =>
            e('svg', {
                key: star,
                className: `w-5 h-5 ${interactive ? 'cursor-pointer transition-transform hover:scale-125' : ''} ${star <= rating ? 'text-accent' : 'text-charcoal-lighter'}`,
                fill: 'currentColor',
                viewBox: '0 0 20 20',
                onClick: interactive ? () => onRate(star) : undefined,
            },
                e('path', { d: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' })
            )
        )
    );
}

function ReviewCard({ review, index }) {
    return e(motion.div, {
        className: 'card-gradient border border-charcoal-lighter rounded-2xl p-6 sm:p-8 hover:border-accent/30 transition-colors duration-300',
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: index * 0.1 },
    },
        e('div', { className: 'flex items-center justify-between mb-4' },
            e(StarRating, { rating: review.rating }),
            review.date ? e('span', { className: 'text-xs text-cream/30' }, review.date) : null
        ),
        e('p', { className: 'text-cream/80 leading-relaxed mb-6 italic' }, '"' + review.text + '"'),
        e('div', { className: 'flex items-center gap-3' },
            e('div', { className: 'w-10 h-10 rounded-full bg-charcoal flex items-center justify-center border border-accent/30 font-outfit font-bold text-accent text-lg' },
                review.name.charAt(0).toUpperCase()
            ),
            e('div', null,
                e('h4', { className: 'font-outfit font-semibold text-cream' }, review.name),
                review.role ? e('p', { className: 'text-xs text-cream/40' }, review.role) : null
            )
        )
    );
}

export function Testimonials() {
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: '', role: '', text: '', rating: 5 });
    const [submitState, setSubmitState] = useState('idle');

    useEffect(() => {
        try {
            const saved = localStorage.getItem('aman_paint_reviews');
            if (saved) {
                setReviews(JSON.parse(saved));
            }
        } catch (e) {}
    }, []);

    const allReviews = [...defaultTestimonials, ...reviews];

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (!form.name.trim() || !form.text.trim()) return;
        setSubmitState('loading');

        const newReview = {
            name: form.name.trim(),
            role: form.role.trim() || '',
            text: form.text.trim(),
            rating: form.rating,
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        };

        const whatsappNumber = '919316165826';
        let msg = '*--- NEW REVIEW ---*\n';
        msg += '*Aman Paint Industries*\n\n';
        msg += '*Customer:* ' + newReview.name + '\n';
        if (newReview.role) msg += '*Company:* ' + newReview.role + '\n';
        msg += '*Rating:* ' + '★'.repeat(newReview.rating) + '☆'.repeat(5 - newReview.rating) + ' (' + newReview.rating + '/5)\n';
        msg += '*Review:* ' + newReview.text + '\n';
        msg += '\n_Submitted on ' + newReview.date + '_';
        const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(msg);

        setTimeout(() => {
            const updatedReviews = [...reviews, newReview];
            setReviews(updatedReviews);
            try { localStorage.setItem('aman_paint_reviews', JSON.stringify(updatedReviews)); } catch (e) {}
            setSubmitState('success');
            window.open(whatsappUrl, '_blank');
            setTimeout(() => {
                setSubmitState('idle');
                setShowForm(false);
                setForm({ name: '', role: '', text: '', rating: 5 });
            }, 2500);
        }, 1000);
    };

    return e('section', { id: 'reviews', className: 'py-24 sm:py-32 overflow-hidden relative' },
        e('div', { className: 'absolute inset-0 noise-overlay' }),
        e('div', { className: 'absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent' }),

        e('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10' },
            e(motion.div, {
                className: 'text-center mb-16',
                initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 },
                viewport: { once: true }, transition: { duration: 0.6 },
            },
                e('span', { className: 'text-accent font-medium text-sm tracking-[0.2em] uppercase' }, 'Customer Reviews'),
                e('h2', { className: 'font-outfit font-bold text-3xl sm:text-4xl md:text-5xl mt-3 mb-4' },
                    'What Our ', e('span', { className: 'gradient-text' }, 'Clients Say')
                ),
                e('div', { className: 'w-20 h-1 bg-accent mx-auto rounded-full' }),
                e('p', { className: 'text-cream/50 max-w-xl mx-auto mt-6' },
                    'Trusted by 500+ businesses across India. Here\'s what our clients have to say about our products and services.'
                )
            ),

            e('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12' },
                ...allReviews.map((review, i) => e(ReviewCard, { key: 'review-' + i, review, index: i }))
            ),

            e('div', { className: 'text-center' },
                !showForm ?
                    e(motion.button, {
                        onClick: () => setShowForm(true),
                        className: 'inline-flex items-center gap-3 px-8 py-4 bg-accent text-cream font-semibold text-lg rounded-xl hover:bg-accent-dark transition-colors duration-300',
                        whileHover: { scale: 1.05, boxShadow: '0 0 30px rgba(214,40,40,0.4)' },
                        whileTap: { scale: 0.95 },
                    },
                        e('svg', { className: 'w-6 h-6', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
                            e('path', { d: 'M12 20h9' }),
                            e('path', { d: 'M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z' })
                        ),
                        'Write a Review'
                    )
                : null,

                e(AnimatePresence, null,
                    showForm ? e(motion.div, {
                        key: 'review-form',
                        className: 'max-w-2xl mx-auto mt-8',
                        initial: { opacity: 0, y: 40, scale: 0.95 },
                        animate: { opacity: 1, y: 0, scale: 1 },
                        exit: { opacity: 0, y: -30, scale: 0.95 },
                        transition: { duration: 0.5 },
                    },
                        e('form', { onSubmit: handleSubmit, className: 'card-gradient border border-charcoal-lighter rounded-2xl p-6 sm:p-8 text-left' },
                            e('div', { className: 'flex items-center justify-between mb-6' },
                                e('h3', { className: 'font-outfit font-bold text-xl text-cream' }, 'Share Your Experience'),
                                e('button', {
                                    type: 'button',
                                    onClick: () => setShowForm(false),
                                    className: 'text-cream/40 hover:text-cream transition-colors text-2xl leading-none',
                                }, '\u00D7')
                            ),

                            e('div', { className: 'mb-5' },
                                e('label', { className: 'block text-sm font-medium text-cream/70 mb-2' }, 'Your Rating'),
                                e(StarRating, { rating: form.rating, onRate: (r) => setForm(f => ({...f, rating: r})), interactive: true })
                            ),

                            e('div', { className: 'grid sm:grid-cols-2 gap-4 mb-4' },
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-cream/70 mb-1.5' }, 'Your Name ', e('span', { className: 'text-accent' }, '*')),
                                    e('input', {
                                        type: 'text', required: true, value: form.name,
                                        onChange: (ev) => setForm(f => ({...f, name: ev.target.value})),
                                        placeholder: 'Enter your name',
                                        className: 'w-full px-4 py-3 bg-charcoal-lighter/50 border border-charcoal-lighter rounded-xl text-cream placeholder-cream/30 transition-all duration-300 text-sm',
                                    })
                                ),
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-cream/70 mb-1.5' }, 'Company / Role (Optional)'),
                                    e('input', {
                                        type: 'text', value: form.role,
                                        onChange: (ev) => setForm(f => ({...f, role: ev.target.value})),
                                        placeholder: 'e.g., Factory Manager, ABC Industries',
                                        className: 'w-full px-4 py-3 bg-charcoal-lighter/50 border border-charcoal-lighter rounded-xl text-cream placeholder-cream/30 transition-all duration-300 text-sm',
                                    })
                                )
                            ),

                            e('div', { className: 'mb-6' },
                                e('label', { className: 'block text-sm font-medium text-cream/70 mb-1.5' }, 'Your Review ', e('span', { className: 'text-accent' }, '*')),
                                e('textarea', {
                                    required: true, rows: 4, value: form.text,
                                    onChange: (ev) => setForm(f => ({...f, text: ev.target.value})),
                                    placeholder: 'Share your experience with our products and services...',
                                    className: 'w-full px-4 py-3 bg-charcoal-lighter/50 border border-charcoal-lighter rounded-xl text-cream placeholder-cream/30 transition-all duration-300 text-sm resize-none',
                                })
                            ),

                            submitState === 'loading' ?
                                e(motion.button, { type: 'button', className: 'w-full py-4 bg-accent rounded-xl flex items-center justify-center',
                                    animate: { scale: [1, 0.95, 1] }, transition: { duration: 1, repeat: Infinity } },
                                    e('div', { className: 'w-6 h-6 border-2 border-cream/30 border-t-cream rounded-full animate-spin' })
                                )
                            : submitState === 'success' ?
                                e(motion.button, { type: 'button', className: 'w-full py-4 bg-green-600 rounded-xl flex items-center justify-center gap-2 text-cream font-semibold',
                                    initial: { scale: 0.9 }, animate: { scale: 1 } },
                                    e('svg', { className: 'w-6 h-6', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
                                        e('path', { d: 'M5 13l4 4L19 7' })
                                    ),
                                    'Review Submitted!'
                                )
                            :
                                e(motion.button, {
                                    type: 'submit',
                                    className: 'w-full py-4 bg-accent text-cream font-semibold text-lg rounded-xl hover:bg-accent-dark transition-colors duration-300',
                                    whileHover: { scale: 1.02, boxShadow: '0 0 30px rgba(214,40,40,0.3)' },
                                    whileTap: { scale: 0.98 },
                                }, 'Submit Review')
                        )
                    ) : null
                )
            )
        )
    );
}


