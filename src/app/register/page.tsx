'use client';

import React, { useState } from 'react';
import RegistrationForm from '../../components/RegistrationForm';
import Container from '../../components/ui/Container';

const RegisterPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleRegistrationSuccess = () => {
        setIsSubmitted(true);
    };

    return (
        <Container>
            <h1 className="text-2xl font-bold text-center my-8">Register for the 1st Ghana Tree Crops Investment Fair & Exhibition</h1>
            {isSubmitted ? (
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Thank you for registering!</h2>
                    <p>You will receive a confirmation email shortly.</p>
                </div>
            ) : (
                <RegistrationForm onSuccess={handleRegistrationSuccess} />
            )}
        </Container>
    );
};

export default RegisterPage;