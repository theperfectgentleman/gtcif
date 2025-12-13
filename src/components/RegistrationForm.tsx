"use client";

import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

type RegistrationFormProps = {
    onSuccess?: () => void;
};

type FormData = {
    name: string;
    email: string;
    phone: string;
    organization: string;
};

type Errors = Partial<Record<keyof FormData | 'submit', string>>;

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        organization: '',
    });

    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = (): Errors => {
        const newErrors: Errors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.organization) newErrors.organization = 'Organization is required';
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage('Registration successful!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    organization: '',
                });
                onSuccess?.();
            } else {
                const errorData: unknown = await response.json().catch(() => null);

                let submitMessage = 'Registration failed. Please try again.';
                if (errorData && typeof errorData === 'object') {
                    const data = errorData as Record<string, unknown>;
                    const error = data.error;
                    const message = data.message;
                    const errors = data.errors;

                    if (typeof error === 'string') submitMessage = error;
                    else if (typeof message === 'string') submitMessage = message;
                    else if (Array.isArray(errors) && errors.every((e) => typeof e === 'string')) {
                        submitMessage = errors.join(', ');
                    }
                }

                setErrors({
                    submit: submitMessage,
                });
            }
        } catch {
            setErrors({ submit: 'An error occurred. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
            <h2 className="text-xl font-semibold">Register for the Event</h2>
            {successMessage && <p className="text-green-700">{successMessage}</p>}
            {errors.submit && <p className="text-red-700">{errors.submit}</p>}
            <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
            />
            <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
            />
            <Input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
            />
            <Input
                type="text"
                name="organization"
                placeholder="Organization"
                value={formData.organization}
                onChange={handleChange}
                error={errors.organization}
                required
            />
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting…' : 'Register'}
            </Button>
        </form>
    );
};

export default RegistrationForm;