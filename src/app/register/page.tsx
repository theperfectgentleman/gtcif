'use client';

import React, { useState } from 'react';
import RegistrationForm from '../../components/RegistrationForm';
import Container from '../../components/ui/Container';
import { CheckCircle2, Calendar } from 'lucide-react';
import Link from 'next/link';

const RegisterPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleRegistrationSuccess = () => {
        setIsSubmitted(true);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10 md:py-20">
            <Container>
                {/* We remove the standalone title as the form has its own header now */}
                
                {isSubmitted ? (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-8 md:p-12 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-brand-green" />
                        </div>
                        <h2 className="text-3xl font-black text-brand-black mb-4">Registration Successful!</h2>
                        <p className="text-gray-600 text-lg mb-8">
                            Thank you for registering for the 1st Ghana Tree Crops Investment Summit. 
                            We have received your details and look forward to seeing you.
                        </p>
                        
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-8 inline-block w-full text-left">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="bg-brand-gold/10 p-3 rounded-xl text-brand-gold-dark">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Event Date</p>
                                    <p className="text-lg font-bold text-brand-black">February 17-20, 2026</p>
                                </div>
                            </div>
                            {/* <p className="text-sm text-gray-500">
                                A confirmation email has been sent to your provided email address.
                            </p> */}
                        </div>
                        
                        <div className="flex justify-center">
                            <Link 
                                href="/" 
                                className="inline-flex items-center justify-center px-8 py-4 bg-brand-green text-white font-bold rounded-xl hover:bg-brand-green-dark transition-colors"
                            >
                                Return to Homepage
                            </Link>
                        </div>
                    </div>
                ) : (
                    <RegistrationForm onSuccess={handleRegistrationSuccess} />
                )}
            </Container>
        </div>
    );
};

export default RegisterPage;