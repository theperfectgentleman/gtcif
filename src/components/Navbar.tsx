"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Button from './ui/Button';
import { X, Search, CheckCircle, AlertCircle } from 'lucide-react';

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<
        | { found: true; registrant: { firstName: string; lastName: string; organization: string } }
        | { found: false }
        | null
    >(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setResult(null);
        setLoading(true);

        try {
            const res = await fetch('/api/check-registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Something went wrong');
            } else {
                setResult(data);
            }
        } catch {
            setError('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setQuery('');
        setResult(null);
        setError('');
    };

    return (
        <>
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

                        {/* CTA Buttons - Right Aligned */}
                        <div className="hidden md:flex items-center gap-3">
                            <Button href="/register" variant="primary" size="medium" className="no-underline shadow-lg hover:shadow-xl transition-all font-bold bg-brand-green hover:bg-green-700 text-white px-6 py-2.5 transform hover:scale-105">
                                Register Now
                            </Button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-brand-green hover:text-green-800 font-medium text-sm border border-brand-green rounded-full px-4 py-2 transition-colors flex items-center gap-2"
                            >
                                <Search size={16} /> Confirm Registration
                            </button>
                        </div>

                        {/* Mobile menu button placeholder */}
                        <div className="md:hidden flex items-center gap-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-brand-green p-2"
                            >
                                <Search size={20} />
                            </button>
                            <button className="text-gray-700 hover:text-brand-green focus:outline-none">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Check Registration Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all scale-100 p-6 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-xl font-bold text-brand-green mb-2">Check Registration Status</h3>
                        <p className="text-gray-600 text-sm mb-6">Enter your email address or phone number to verify if your registration is confirmed.</p>

                        {!result ? (
                            <form onSubmit={handleCheck} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email or Phone</label>
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-shadow"
                                        placeholder="e.g. user@example.com"
                                        required
                                    />
                                </div>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-brand-green text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        'Check Status'
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-4">
                                {result.found ? (
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">Registration Confirmed!</h4>
                                        <p className="text-gray-600 text-sm mb-6">
                                            We found a registration for <strong>{result.registrant.firstName} {result.registrant.lastName}</strong> from {result.registrant.organization}.
                                        </p>
                                        <p className="text-xs text-brand-gold bg-yellow-50 px-3 py-2 rounded border border-yellow-100 mb-6">
                                            Your spot is secured. We look forward to seeing you!
                                        </p>
                                        <button
                                            onClick={closeModal}
                                            className="text-brand-green font-medium hover:underline"
                                        >
                                            Close
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                            <AlertCircle className="w-8 h-8 text-red-500" />
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">No Registration Found</h4>
                                        <p className="text-gray-600 text-sm mb-6">
                                            We couldn&apos;t find a registration matching &quot;{query}&quot;.
                                        </p>
                                        <div className="flex gap-3 w-full">
                                            <button
                                                onClick={() => setResult(null)}
                                                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                                            >
                                                Try Again
                                            </button>
                                            <Link
                                                href="/register"
                                                onClick={closeModal}
                                                className="flex-1 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700 font-medium text-center shadow-md"
                                            >
                                                Register Now
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;