import React from 'react';
import { motion } from 'framer-motion';

const e = React.createElement;

export function Footer() {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return e('footer', { id: 'contact', className: 'relative pt-20 pb-10 bg-[#111] overflow-hidden' },
        e('div', { className: 'absolute inset-0 noise-overlay' }),
        e('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10' },
            e('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16' },
                e('div', { className: 'lg:col-span-1' },
                    e('div', { className: 'flex items-center cursor-pointer mb-6 w-fit', onClick: () => scrollTo('home') },
                        e('img', { src: './images/logo.png?v=1783771304', alt: 'Aman Paint Industries Logo', className: 'h-20 sm:h-28 object-contain drop-shadow-2xl' })
                    ),
                    e('p', { className: 'text-cream/50 text-sm leading-relaxed mb-6' }, 'Premium industrial paint manufacturer based in Rajkot, Gujarat. Delivering unmatched durability and aesthetic excellence for industrial applications since 2019.'),
                    e('div', { className: 'flex gap-4' },
                        ...['facebook', 'twitter', 'linkedin', 'instagram'].map(social => 
                            e('a', { key: social, href: '#', className: 'w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-cream/50 hover:bg-accent hover:text-cream transition-colors duration-300' },
                                e('span', { className: 'text-xs uppercase' }, social.substring(0, 2))
                            )
                        )
                    )
                ),
                
                e('div', null,
                    e('h4', { className: 'font-outfit font-semibold text-lg text-cream mb-6' }, 'Quick Links'),
                    e('ul', { className: 'space-y-3' },
                        ...['Home', 'About', 'Products', 'Enquiry', 'Contact'].map(link => 
                            e('li', { key: link },
                                e('button', { onClick: () => scrollTo(link.toLowerCase()), className: 'text-cream/50 hover:text-accent transition-colors text-sm flex items-center gap-2 group' },
                                    e('span', { className: 'w-1 h-1 rounded-full bg-accent/0 group-hover:bg-accent transition-colors' }),
                                    link
                                )
                            )
                        )
                    )
                ),
                
                e('div', null,
                    e('h4', { className: 'font-outfit font-semibold text-lg text-cream mb-6' }, 'Products'),
                    e('ul', { className: 'space-y-3' },
                        ...['Hammertone Finish', 'Stipple Finish', 'Enamel Paints', 'Powder Coating'].map(link => 
                            e('li', { key: link },
                                e('button', { onClick: () => scrollTo('products'), className: 'text-cream/50 hover:text-accent transition-colors text-sm flex items-center gap-2 group' },
                                    e('span', { className: 'w-1 h-1 rounded-full bg-accent/0 group-hover:bg-accent transition-colors' }),
                                    link
                                )
                            )
                        )
                    )
                ),
                
                e('div', null,
                    e('h4', { className: 'font-outfit font-semibold text-lg text-cream mb-6' }, 'Newsletter'),
                    e('p', { className: 'text-cream/50 text-sm mb-4' }, 'Subscribe to get the latest updates on new product launches and industrial finishing tips.'),
                    e('form', { className: 'flex gap-2', onSubmit: (e) => e.preventDefault() },
                        e('input', { type: 'email', placeholder: 'Email address', className: 'w-full px-4 py-2 bg-charcoal border border-charcoal-lighter rounded-lg text-cream text-sm focus:outline-none focus:border-accent' }),
                        e('button', { type: 'submit', className: 'px-4 py-2 bg-accent text-cream rounded-lg text-sm font-semibold hover:bg-accent-dark transition-colors' }, 'Subscribe')
                    )
                )
            ),
            
            e('div', { className: 'pt-8 border-t border-charcoal-lighter flex flex-col md:flex-row items-center justify-between gap-4' },
                e('p', { className: 'text-cream/40 text-sm' }, `© ${new Date().getFullYear()} Aman Paint Industries. All rights reserved.`),
                e('div', { className: 'flex gap-6' },
                    e('a', { href: '#', className: 'text-cream/40 hover:text-cream text-sm transition-colors' }, 'Privacy Policy'),
                    e('a', { href: '#', className: 'text-cream/40 hover:text-cream text-sm transition-colors' }, 'Terms of Service')
                )
            )
        )
    );
}








