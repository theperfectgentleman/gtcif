import React from 'react';
import Link from 'next/link';
import Button from './ui/Button';

const Navbar = () => {
    return (
        <nav className="bg-white bg-opacity-85 backdrop-blur-md border-b border-black border-opacity-5 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 no-underline">
                            <span className="text-2xl font-bold text-brand-green tracking-tight">GTCIS</span>
                            <span className="text-2xl font-light text-brand-black">2026</span>
                        </Link>
                    </div>

                    {/* Navigation Links - Centered */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="no-underline text-gray-700 hover:text-brand-green font-semibold transition-colors duration-300 border-b-2 border-transparent hover:border-brand-gold pb-1">
                            Home
                        </Link>
                        <Link href="/about" className="no-underline text-gray-700 hover:text-brand-green font-semibold transition-colors duration-300 border-b-2 border-transparent hover:border-brand-gold pb-1">
                            About
                        </Link>
                        <Link href="#programme" className="no-underline text-gray-700 hover:text-brand-green font-semibold transition-colors duration-300 border-b-2 border-transparent hover:border-brand-gold pb-1">
                            Programme
                        </Link>
                        <Link href="#venue" className="no-underline text-gray-700 hover:text-brand-green font-semibold transition-colors duration-300 border-b-2 border-transparent hover:border-brand-gold pb-1">
                            Venue & Date
                        </Link>
                        <Link href="#contact" className="no-underline text-gray-700 hover:text-brand-green font-semibold transition-colors duration-300 border-b-2 border-transparent hover:border-brand-gold pb-1">
                            Contact
                        </Link>
                    </div>

                    {/* CTA Button - Right Aligned */}
                    <div className="hidden md:flex items-center">
                        <Button href="/register" variant="primary" size="medium" className="no-underline shadow-md hover:shadow-lg transition-all">
                            Register Now
                        </Button>
                    </div>

                    {/* Mobile menu button placeholder */}
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-700 hover:text-brand-green focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;