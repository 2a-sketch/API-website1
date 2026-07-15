import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Navbar } from './components/Navbar.js?v=1784092464';
import { Hero } from './components/Hero.js?v=1784092464';
import { About } from './components/About.js?v=1784092464';
import { Products } from './components/Products.js?v=1784092464';
import { Enquiry } from './components/Enquiry.js?v=1784092464';
import { Testimonials } from './components/Testimonials.js?v=1784092464';
import { Footer } from './components/Footer.js?v=1784092464';
import { WhatsAppButton } from './components/WhatsAppButton.js?v=1784092464';

const e = React.createElement;

function App() {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState('');

    const handleProductEnquiry = (productName, quantity) => {
        setSelectedProduct(productName);
        setSelectedQuantity(quantity);
        setTimeout(() => {
            document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return e('div', null,
        e(Navbar, null),
        e(Hero, null),
        e(About, null),
        e(Products, { onEnquiry: handleProductEnquiry }),
        e(Enquiry, { selectedProduct, selectedQuantity }),
        e(Testimonials, null),
        e(Footer, null),
        e(WhatsAppButton, null)
    );
}

const root = createRoot(document.getElementById('root'));
root.render(e(App));


























