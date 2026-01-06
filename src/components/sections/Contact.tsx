import React from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="relative overflow-hidden bg-[#0f172a]">
            {/* Pre-Footer CTA Section */}
            <Container className="py-16">
                <div className="bg-[#1e293b] rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green opacity-10 rounded-full -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gold opacity-10 rounded-full -ml-24 -mb-24" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="md:w-2/3">
                            <span className="text-brand-green font-bold tracking-widest uppercase text-sm mb-4 block">
                                Invest in the Future
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Sustainable Growth Through{' '}
                                <span className="text-brand-gold italic font-serif">Strategic Partnerships</span>
                            </h2>
                            <p className="text-gray-300 text-lg max-w-xl">
                                Join us at the Accra International Conference Centre to be part of the $600M transformation of Ghana&apos;s tree crop sector.
                            </p>
                        </div>
                        <div className="md:w-1/3 flex flex-col gap-4">
                            <Button
                                href="/register"
                                className="bg-brand-green hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all text-center shadow-lg no-underline"
                            >
                                Register Now
                            </Button>
                            <Button
                                href="/about"
                                variant="outline"
                                className="border-2 border-gray-600 hover:border-white text-white font-bold py-4 px-8 rounded-xl transition-all text-center no-underline"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Main Footer Content */}
            <div className="pt-20 pb-10">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
                        {/* Brand/About */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center font-bold text-xl text-white">
                                    G
                                </div>
                                <span className="text-2xl font-bold tracking-tight uppercase text-white">
                                    GTCIS <span className="text-brand-green">2026</span>
                                </span>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                The definitive platform for investments in Ghana&apos;s tree crop sector. Paving the way for sustainable growth and industrial transformation.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block text-white">
                                Summit Links
                            </h4>
                            <ul className="space-y-4">
                                <li>
                                    <a href="/about" className="text-gray-400 hover:text-brand-green hover:translate-x-1 transition-all inline-flex items-center">
                                        <span className="mr-2 text-brand-green">›</span> About the Summit
                                    </a>
                                </li>
                                <li>
                                    <a href="#programme" className="text-gray-400 hover:text-brand-green hover:translate-x-1 transition-all inline-flex items-center">
                                        <span className="mr-2 text-brand-green">›</span> Event Programme
                                    </a>
                                </li>
                                <li>
                                    <a href="#audience" className="text-gray-400 hover:text-brand-green hover:translate-x-1 transition-all inline-flex items-center">
                                        <span className="mr-2 text-brand-green">›</span> Who Should Attend
                                    </a>
                                </li>
                                <li>
                                    <a href="/register" className="text-gray-400 hover:text-brand-green hover:translate-x-1 transition-all inline-flex items-center">
                                        <span className="mr-2 text-brand-green">›</span> Register Now
                                    </a>
                                </li>
                                <li>
                                    <a href="#background" className="text-gray-400 hover:text-brand-green hover:translate-x-1 transition-all inline-flex items-center">
                                        <span className="mr-2 text-brand-green">›</span> Background
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block text-white">
                                Get In Touch
                            </h4>
                            <ul className="space-y-5">
                                <li className="flex items-start text-gray-400">
                                    <svg className="w-5 h-5 mt-1 mr-3 text-brand-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Accra International Conference Centre, Accra, Ghana</span>
                                </li>
                                <li className="flex items-center text-gray-400">
                                    <svg className="w-5 h-5 mr-3 text-brand-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href="mailto:info@gtcif2026.com" className="hover:text-white transition-colors">
                                        info@gtcif2026.com
                                    </a>
                                </li>
                                <li className="flex items-center text-gray-400">
                                    <svg className="w-5 h-5 mr-3 text-brand-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>+233 123 456 789</span>
                                </li>
                                <li className="flex items-center text-gray-400 pt-2">
                                    <svg className="w-5 h-5 mr-3 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <span className="font-semibold text-white">Event Dates</span>
                                        <span className="ml-2">February 17–20, 2026</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Copyright */}
                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                        <p>&copy; 2026 Tree Crops Development Authority. All Rights Reserved.</p>
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default Contact;