import React, { useState, useEffect } from 'react';
import { motion as realMotion } from 'framer-motion';
import { mobileMotionProxy, isMobileDevice } from './motionShim.js';
const motion = isMobileDevice ? mobileMotionProxy : realMotion;

const e = React.createElement;

const shadeCatalog = {
    'Coated Finish': [
        { name: 'Amee Grey', code: 'CF-01', hex: '#E0E0E0' }, { name: 'Syemence Grey', code: 'CF-02', hex: '#D3D3D3' }, { name: 'Mushroom', code: 'CF-03', hex: '#BCAAA4' }, { name: 'Ash Grey', code: 'CF-04', hex: '#B0BEC5' }, { name: 'Dawn', code: 'CF-05', hex: '#FFF59D' }, { name: 'Sandal Wood', code: 'CF-06', hex: '#D7CCC8' }, { name: 'Biscuit', code: 'CF-07', hex: '#FFE0B2' }, { name: 'Tango', code: 'CF-08', hex: '#FFCC80' }, { name: 'Silver Grey', code: 'CF-09', hex: '#CFD8DC' }, { name: 'New Silver', code: 'CF-010', hex: '#ECEFF1' }, { name: 'Light Grey', code: 'CF-011', hex: '#E0E0E0' }, { name: 'Wild Rose', code: 'CF-012', hex: '#F48FB1' }, { name: 'Deep Pink', code: 'CF-013', hex: '#EC407A' }, { name: 'Burgundy', code: 'CF-014', hex: '#880E4F' }, { name: 'G. Brown', code: 'CF-015', hex: '#5D4037' }, { name: 'Pink', code: 'CF-016', hex: '#F8BBD0' }, { name: 'Falsa', code: 'CF-017', hex: '#4A148C' }, { name: 'Narangi', code: 'CF-018', hex: '#FF9800' }, { name: 'Red Glow', code: 'CF-019', hex: '#E53935' }, { name: 'Orange', code: 'CF-020', hex: '#FF9800' }, { name: 'Aqva Blue', code: 'CF-021', hex: '#4DD0E1' }, { name: 'Azure Blue', code: 'CF-022', hex: '#0277BD' }, { name: 'Aqva Green', code: 'CF-023', hex: '#4DB6AC' }, { name: 'Forest Green', code: 'CF-024', hex: '#2E7D32' }, { name: 'Lovender', code: 'CF-025', hex: '#BA68C8' }, { name: 'Magenta', code: 'CF-026', hex: '#D500F9' }, { name: 'Cherry', code: 'CF-027', hex: '#C2185B' }, { name: 'Brown', code: 'CF-028', hex: '#795548' }, { name: 'A.D. Grey', code: 'CF-029', hex: '#9E9E9E' }, { name: 'Black', code: 'CF-030', hex: '#212121' }, { name: 'Classic Grey', code: 'CF-031', hex: '#757575' }, { name: 'Prince Grey', code: 'CF-032', hex: '#616161' }, { name: 'Pitch', code: 'CF-033', hex: '#000000' }, { name: 'Lemon', code: 'CF-034', hex: '#FFF176' }, { name: 'Purple', code: 'CF-035', hex: '#9C27B0' }, { name: 'Rose Wood', code: 'CF-036', hex: '#3E2723' }, { name: 'Peacock Blue', code: 'CF-037', hex: '#006064' }, { name: 'Antique Green', code: 'CF-038', hex: '#1B5E20' }, { name: 'Medium Grey', code: 'CF-039', hex: '#757575' }, { name: 'Safe Grey', code: 'CF-040', hex: '#9E9E9E' }, { name: 'M. Red', code: 'CF-041', hex: '#D32F2F' }, { name: 'Military Green', code: 'CF-042', hex: '#33691E' }, { name: 'Walnut Brown', code: 'CF-043', hex: '#4E342E' }, { name: 'Pearl White', code: 'CF-044', hex: '#F5F5F5' }, { name: 'Mint Green', code: 'CF-045', hex: '#81C784' }, { name: 'Nilgiri Blue', code: 'CF-046', hex: '#1565C0' }, { name: 'Vip Blue', code: 'CF-047', hex: '#0D47A1' }, { name: 'Fire Orange', code: 'CF-048', hex: '#FF3D00' }, { name: 'Royal White', code: 'CF-049', hex: '#FAFAFA' }, { name: 'T.A. Grey', code: 'CF-050', hex: '#78909C' }, { name: 'P.O. Red', code: 'CF-051', hex: '#C62828' }, { name: 'Rose', code: 'CF-052', hex: '#F06292' }, { name: 'Phiroza', code: 'CF-053', hex: '#26C6DA' }, { name: 'Maroon', code: 'CF-054', hex: '#880E4F' }, { name: 'Ivory', code: 'CF-055', hex: '#FFFFF0' }, { name: 'Brust Of Lime', code: 'CF-056', hex: '#CDDC39' }, { name: 'Middle Yellow', code: 'CF-057', hex: '#FFEB3B' }, { name: 'Raspberry', code: 'CF-058', hex: '#E91E63' }, { name: 'Ultra Blue', code: 'CF-059', hex: '#2962FF' }, { name: 'Bright Red', code: 'CF-060', hex: '#FF0000' }
    ],
    'Metallic Finish': [
        { name: 'Honda Red', hex: '#D50000' }, { name: 'Jade Green', hex: '#00BFA5' }, { name: 'Sandal Wood', hex: '#A1887F' }, { name: 'Honey Gold', hex: '#FFAB00' }, { name: 'H.P. Grey', hex: '#90A4AE' }, { name: 'Gold Dust', hex: '#FFD54F' }
    ],
    'Hammer Tone Finish': [
        { name: 'Crimson', hex: '#B71C1C' }, { name: 'Emerald Green', hex: '#00C853' }, { name: 'Brown', hex: '#5D4037' }, { name: 'Copper', hex: '#BF360C' }, { name: 'Bright Blue', hex: '#2979FF' }, { name: 'Deep Grey', hex: '#424242' }, { name: 'Bronze', hex: '#8D6E63' }, { name: 'Deep Blue', hex: '#0D47A1' }, { name: 'Mid Grey', hex: '#757575' }, { name: 'Pale Gold', hex: '#FFE082' }, { name: 'Purple', hex: '#AA00FF' }, { name: 'Silver Ash', hex: '#CFD8DC' }
    ],
    'Synthetic Enamel & Furniture Enamel': [
        { name: 'Off White', hex: '#FAF9F6' }, { name: 'Nickel Grey', hex: '#9E9E9E' }, { name: 'Phiroza', hex: '#00BCD4' }, { name: 'Pale Cream', hex: '#FFF9C4' }, { name: 'T.R. Green', hex: '#388E3C' }, { name: 'Oxford Blue', hex: '#1A237E' }, { name: 'Golden Yellow', hex: '#FFC107' }, { name: 'Tata Mimosa', hex: '#FDD835' }, { name: 'P.O. Red', hex: '#D32F2F' }, { name: 'Light Beige', hex: '#F5F5DC' }, { name: 'Wild Lilac', hex: '#CE93D8' }, { name: 'T.R. Red', hex: '#C62828' }, { name: 'Golden Brown', hex: '#8D6E63' }, { name: 'Purple', hex: '#7B1FA2' }, { name: 'Cherry', hex: '#D81B60' }, { name: 'Mid Buff', hex: '#FFCC80' }, { name: 'Sky Blue', hex: '#81D4FA' }, { name: 'Love', hex: '#E91E63' }, { name: 'N Sand Stone', hex: '#D7CCC8' }, { name: 'Light Adm. Grey', hex: '#B0BEC5' }, { name: 'Olive Green 220', hex: '#827717' }, { name: 'Mushroom', hex: '#A1887F' }, { name: 'Smok Grey', hex: '#78909C' }, { name: 'Mountain Grey', hex: '#546E7A' }, { name: 'Brown', hex: '#6D4C41' }, { name: 'Dawn Glow', hex: '#FF8A65' }, { name: 'Sand Stone', hex: '#BCAAA4' }, { name: 'Blue Clover', hex: '#0288D1' }, { name: 'T.A. Grey', hex: '#607D8B' }, { name: 'S.C. Grey', hex: '#455A64' }, { name: 'New Nickel Grey', hex: '#9E9E9E' }, { name: 'T.A. Grey 628', hex: '#546E7A' }, { name: 'Safe Grey', hex: '#757575' }, { name: 'Tata Grey', hex: '#616161' }, { name: 'Light Grey 631', hex: '#E0E0E0' }, { name: 'Steel Grey', hex: '#78909C' }
    ]
};

function ShadeSelector({ value, onChange }) {
    const [activeTab, setActiveTab] = useState(Object.keys(shadeCatalog)[0]);
    const shades = shadeCatalog[activeTab];

    return e('div', { className: 'mb-8 w-full min-w-0' },
        e('div', { className: 'mb-4' },
            e('label', { className: 'block text-sm font-medium text-cream/70 mb-3' }, 'Select Paint Shade (Optional)'),
            e('div', { className: 'flex overflow-x-auto pb-2 gap-2 snap-x scrollbar-hide' },
                ...Object.keys(shadeCatalog).map(cat => 
                    e('button', {
                        key: cat, type: 'button',
                        onClick: () => setActiveTab(cat),
                        className: "snap-start shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border " + (activeTab === cat ? "bg-accent text-cream border-accent shadow-md" : "bg-charcoal-lighter/30 text-cream/60 border-charcoal hover:bg-charcoal-lighter/70 hover:text-cream")
                    }, cat)
                )
            )
        ),
        e('div', { className: 'grid grid-cols-[repeat(auto-fit,minmax(85px,1fr))] gap-2 sm:gap-3 max-h-48 sm:max-h-64 overflow-y-auto pr-1 w-full' },
            ...shades.map(shade => {
                const shadeId = shade.code ? shade.code + ' - ' + shade.name : shade.name;
                const isSelected = value === (shadeId + ' (' + activeTab + ')');
                return e('div', {
                    key: shade.name,
                    onClick: () => isSelected ? onChange('') : onChange(shadeId + ' (' + activeTab + ')'),
                    className: "cursor-pointer rounded-xl overflow-hidden border-2 transition-all " + (isSelected ? "border-accent ring-2 ring-accent/30" : "border-charcoal-lighter hover:border-cream/30"),
                },
                    e('div', { className: 'h-10 sm:h-16 w-full flex items-center justify-center relative', style: { backgroundColor: shade.hex } },
                        isSelected ? e('div', { className: 'absolute inset-0 bg-black/30 flex items-center justify-center' },
                            e('svg', { className: 'w-8 h-8 text-white drop-shadow-md', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 3 }, e('path', { d: 'M5 13l4 4L19 7' }))
                        ) : null
                    ),
                    e('div', { className: 'p-1.5 sm:p-2 bg-charcoal-lighter/40 text-center' },
                        e('div', { className: 'text-[9px] sm:text-xs font-bold text-cream truncate' }, shade.name),
                        shade.code ? e('div', { className: 'text-[8px] sm:text-[10px] text-cream/50 mt-0.5' }, shade.code) : null
                    )
                );
            })
        ),
        e('p', { className: 'text-[11px] text-cream/40 mt-3 italic text-center' }, 'Note: Shades are shown for reference only. Actual color may vary slightly depending on screen display.')
    );
}
console.log('ENQUIRY_VERSION: v3 - FormSubmit + WhatsApp active');

const productList = ['Hammertone Finish', 'Stipple Finish', 'Enamel Paints', 'Silver Paints', 'Industrial Paints', 'High Glossy Enamel Paints', 'Powder Coating Finish Paints'];
const quantityList = ['1L', '4L', '20L', 'Bulk Order'];

function FormInput({ label, type, required, value, onChange, placeholder }) {
    return e('div', { className: 'mb-4' },
        e('label', { className: 'block text-sm font-medium text-cream/70 mb-1.5' }, label, required ? e('span', { className: 'text-accent ml-1' }, '*') : null),
        e('input', { type: type || 'text', value, onChange: (ev) => onChange(ev.target.value), placeholder, required,
            className: 'w-full px-4 py-3 bg-charcoal-lighter/50 border border-charcoal-lighter rounded-xl text-cream placeholder-cream/30 transition-all duration-300 text-sm' })
    );
}

function FormSelect({ label, required, value, onChange, options, placeholder }) {
    return e('div', { className: 'mb-4' },
        e('label', { className: 'block text-sm font-medium text-cream/70 mb-1.5' }, label, required ? e('span', { className: 'text-accent ml-1' }, '*') : null),
        e('select', { value, onChange: (ev) => onChange(ev.target.value), required,
            className: 'w-full px-4 py-3 bg-charcoal-lighter/50 border border-charcoal-lighter rounded-xl text-cream transition-all duration-300 text-sm appearance-none cursor-pointer',
            style: { backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%23888'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' },
        },
            e('option', { value: '', className: 'bg-charcoal' }, placeholder),
            ...options.map(opt => e('option', { key: opt, value: opt, className: 'bg-charcoal' }, opt))
        )
    );
}

export function Enquiry({ selectedProduct, selectedQuantity }) {
    const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', product: '', quantity: '', shade: '', message: '' });
    const [submitState, setSubmitState] = useState('idle');
    const [errors, setErrors] = useState({});

    useEffect(() => { if (selectedProduct) setForm(f => ({ ...f, product: selectedProduct })); }, [selectedProduct]);
    useEffect(() => { if (selectedQuantity) setForm(f => ({ ...f, quantity: selectedQuantity })); }, [selectedQuantity]);

    const updateField = (field) => (value) => { setForm(f => ({ ...f, [field]: value })); if (errors[field]) setErrors(er => ({ ...er, [field]: null })); };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.phone.trim()) newErrors.phone = 'Phone is required';
        else if (!/^[0-9]{10}$/.test(form.phone.trim())) newErrors.phone = 'Enter valid 10-digit number';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (!validate()) return;
        setSubmitState('loading');

        const whatsappNumber = '919316165826';
        let msg = '*--- NEW ENQUIRY ---*\n';
        msg += '*Aman Paint Industries*\n\n';
        msg += '*Name:* ' + form.name.trim() + '\n';
        msg += '*Phone:* ' + form.phone.trim() + '\n';
        if (form.email.trim()) msg += '*Email:* ' + form.email.trim() + '\n';
        if (form.city.trim()) msg += '*City:* ' + form.city.trim() + '\n';
        if (form.product) msg += '*Product:* ' + form.product + '\n';
        if (form.quantity) msg += '*Quantity:* ' + form.quantity + '\n';
        if (form.shade) msg += '*Selected Shade:* ' + form.shade + '\n';
        if (form.message.trim()) msg += '\n*Message:*\n' + form.message.trim() + '\n';
        msg += '\n_Sent from amanpaint.com_';

        const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(msg);

        const emailData = {
            name: form.name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim() || 'Not provided',
            city: form.city.trim() || 'Not provided',
            product: form.product || 'Not specified',
            quantity: form.quantity || 'Not specified',
            shade: form.shade || 'Not specified',
            message: form.message.trim() || 'No message',
            _subject: 'New Enquiry - ' + (form.product || 'General') + ' | ' + form.name.trim(),
            _template: 'table',
            _captcha: 'false',
        };

        fetch('https://formsubmit.co/ajax/amanpaint.ind@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(emailData),
        })
        .then(r => r.json())
        .then(data => { console.log('Email sent:', data); })
        .catch(err => { console.log('Email fallback - WhatsApp still sent:', err); });

        setTimeout(() => {
            setSubmitState('success');
            window.open(whatsappUrl, '_blank');
            setTimeout(() => {
                setSubmitState('idle');
                setForm({ name: '', phone: '', email: '', city: '', product: '', quantity: '', shade: '', message: '' });
            }, 3000);
        }, 1500);
    };

    const SubmitBtn = () => {
        if (submitState === 'loading') return e(motion.button, { type: 'button', className: 'w-full py-4 bg-accent rounded-xl flex items-center justify-center',
            animate: { scale: [1, 0.95, 1] }, transition: { duration: 1, repeat: Infinity } },
            e('div', { className: 'w-6 h-6 border-2 border-cream/30 border-t-cream rounded-full animate-spin' }));
        if (submitState === 'success') return e(motion.button, { type: 'button', className: 'w-full py-4 bg-green-600 rounded-xl flex items-center justify-center gap-2 text-cream font-semibold',
            initial: { scale: 0.9 }, animate: { scale: 1 } },
            e('svg', { className: 'w-6 h-6', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
                e(motion.path, { d: 'M5 13l4 4L19 7', initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.5 } })),
            'Sent to WhatsApp!');
        return e(motion.button, { type: 'submit', className: 'w-full py-4 bg-accent text-cream font-semibold text-lg rounded-xl hover:bg-accent-dark transition-colors duration-300 flex items-center justify-center gap-3',
            whileHover: { scale: 1.02, boxShadow: '0 0 30px rgba(214,40,40,0.3)' }, whileTap: { scale: 0.98 } },
            e('svg', { className: 'w-6 h-6', viewBox: '0 0 24 24', fill: 'currentColor' },
                e('path', { d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' })
            ),
            'Submit via WhatsApp'
        );
    };

    return e('section', { id: 'enquiry', className: 'relative py-24 sm:py-32 overflow-hidden' },
        e('div', { className: 'absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent' }),
        
        e('div', { className: 'max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 relative z-10 w-full' },
            e(motion.div, { className: 'text-center mb-16 px-4 sm:px-0', initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } },
                e('span', { className: 'text-accent font-medium text-sm tracking-[0.2em] uppercase' }, 'Get In Touch'),
                e('h2', { className: 'font-outfit font-bold text-3xl sm:text-4xl md:text-5xl mt-3 mb-4' }, 'Get a ', e('span', { className: 'gradient-text' }, 'Quote')),
                e('div', { className: 'w-20 h-1 bg-accent mx-auto rounded-full' }),
                e('p', { className: 'text-cream/50 max-w-xl mx-auto mt-6' }, "Fill out the form and your enquiry will be sent directly to us on WhatsApp for a quick response.")
            ),
            e(motion.div, { className: 'grid lg:grid-cols-5 gap-8 lg:gap-12', initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 } },
                e('div', { className: 'lg:col-span-3 w-full min-w-0' },
                    e('form', { onSubmit: handleSubmit, className: 'card-gradient border-y sm:border-x border-charcoal-lighter sm:rounded-2xl p-4 sm:p-8 w-full max-w-full overflow-hidden m-0' },
                        e('div', { className: 'grid sm:grid-cols-2 gap-x-4' },
                            e('div', null, e(FormInput, { label: 'Full Name', required: true, value: form.name, onChange: updateField('name'), placeholder: 'Enter your name' }),
                                errors.name ? e('p', { className: 'text-accent text-xs -mt-3 mb-3' }, errors.name) : null),
                            e('div', null, e(FormInput, { label: 'Phone Number', type: 'tel', required: true, value: form.phone, onChange: updateField('phone'), placeholder: '10-digit mobile number' }),
                                errors.phone ? e('p', { className: 'text-accent text-xs -mt-3 mb-3' }, errors.phone) : null)
                        ),
                        e('div', { className: 'grid sm:grid-cols-2 gap-x-4' },
                            e(FormInput, { label: 'Email', type: 'email', value: form.email, onChange: updateField('email'), placeholder: 'your@email.com' }),
                            e(FormInput, { label: 'City / Location', value: form.city, onChange: updateField('city'), placeholder: 'e.g., Rajkot' })
                        ),
                        e('div', { className: 'grid sm:grid-cols-2 gap-x-4' },
                            e(FormSelect, { label: 'Product Interested In', value: form.product, onChange: updateField('product'), options: productList, placeholder: 'Select Product' }),
                            e(FormSelect, { label: 'Quantity Requirement', value: form.quantity, onChange: updateField('quantity'), options: quantityList, placeholder: 'Select Quantity' })
                        ),
                        e(ShadeSelector, { value: form.shade, onChange: updateField('shade') }),
                        e('div', { className: 'mb-6' },
                            e('label', { className: 'block text-sm font-medium text-cream/70 mb-1.5' }, 'Message (Optional)'),
                            e('textarea', { value: form.message, onChange: (ev) => updateField('message')(ev.target.value), rows: 4, placeholder: 'Tell us more about your specific requirements...',
                                className: 'w-full px-4 py-3 bg-charcoal-lighter/50 border border-charcoal-lighter rounded-xl text-cream placeholder-cream/30 transition-all duration-300 text-sm resize-none' })
                        ),
                        e(SubmitBtn, null)
                    )
                ),
                e('div', { className: 'lg:col-span-2 space-y-6 w-full min-w-0 m-0' },
                    e('div', { className: 'card-gradient border-y sm:border-x border-charcoal-lighter sm:rounded-2xl p-5 sm:p-8 h-full flex flex-col justify-center w-full m-0' },
                        e('h3', { className: 'font-outfit font-bold text-2xl text-cream mb-6' }, 'Contact Information'),
                        
                        e('div', { className: 'flex items-start gap-4 mb-6' },
                            e('div', { className: 'w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0' },
                                e('svg', { className: 'w-6 h-6 text-accent', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
                                    e('path', { d: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z' })
                                )
                            ),
                            e('div', null,
                                e('p', { className: 'text-sm text-cream/50 mb-1 uppercase tracking-wider' }, 'Phone'),
                                e('a', { href: 'tel:+919316165826', className: 'text-lg text-cream font-medium hover:text-accent transition-colors' }, '+91 93161 65826')
                            )
                        ),
                        
                        e('div', { className: 'flex items-start gap-4 mb-6' },
                            e('div', { className: 'w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0' },
                                e('svg', { className: 'w-6 h-6', viewBox: '0 0 24 24', fill: '#25D366' },
                                    e('path', { d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' })
                                )
                            ),
                            e('div', null,
                                e('p', { className: 'text-sm text-cream/50 mb-1 uppercase tracking-wider' }, 'WhatsApp'),
                                e('a', { href: 'https://wa.me/919316165826', target: '_blank', className: 'text-lg text-cream font-medium hover:text-[#25D366] transition-colors' }, '+91 93161 65826')
                            )
                        ),
                        
                        e('div', { className: 'flex items-start gap-4 mb-6' },
                            e('div', { className: 'w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0' },
                                e('svg', { className: 'w-6 h-6 text-accent', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
                                    e('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
                                    e('polyline', { points: '22,6 12,13 2,6' })
                                )
                            ),
                            e('div', null,
                                e('p', { className: 'text-sm text-cream/50 mb-1 uppercase tracking-wider' }, 'Email'),
                                e('a', { href: 'mailto:amanpaint.ind@gmail.com', className: 'text-lg text-cream font-medium hover:text-accent transition-colors' }, 'amanpaint.ind@gmail.com')
                            )
                        ),
                        
                        e('div', { className: 'flex items-start gap-4' },
                            e('div', { className: 'w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0' },
                                e('svg', { className: 'w-6 h-6 text-accent', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
                                    e('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z' }),
                                    e('circle', { cx: '12', cy: '10', r: '3' })
                                )
                            ),
                            e('div', null,
                                e('p', { className: 'text-sm text-cream/50 mb-1 uppercase tracking-wider' }, 'Address'),
                                e('p', { className: 'text-cream leading-relaxed' }, 'Jaliyan Building, Near Rahul Travels, Juna Morbi Road, Rajkot - 360003')
                            )
                        )
                    )
                )
            )
        )
    );
}










