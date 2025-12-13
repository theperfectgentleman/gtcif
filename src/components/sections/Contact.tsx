import React from 'react';
import Container from '../ui/Container';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-20 bg-gray-100">
            <Container>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-black mb-6">Contact Us</h2>
                <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                    For inquiries related to the 1st Ghana Tree Crops Investment Fair & Exhibition (GTCIF) 2026, please reach out to us using the contact information below.
                </p>
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-8 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-gray-500 font-semibold">Email</h3>
                            <p className="mt-2 text-lg font-medium text-brand-black">info@gtcif2026.com</p>
                        </div>
                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-gray-500 font-semibold">Phone</h3>
                            <p className="mt-2 text-lg font-medium text-brand-black">+233 123 456 789</p>
                        </div>
                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-gray-500 font-semibold">Address</h3>
                            <p className="mt-2 text-lg font-medium text-brand-black">Accra International Conference Centre, Accra, Ghana</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-sm uppercase tracking-widest text-gray-500 font-semibold text-center mb-4">Follow Us</h3>
                        <div className="flex justify-center gap-6">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-green hover:opacity-90">Facebook</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-green hover:opacity-90">Twitter</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-green hover:opacity-90">Instagram</a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Contact;