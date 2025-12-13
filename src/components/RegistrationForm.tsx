"use client";

import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

type RegistrationFormProps = {
    onSuccess?: () => void;
};

type FormData = {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    organization: string;
    jobTitle: string;
    country: string;
    dietaryRequirements: string;
    accessibilityNeeds: string;
};

type Errors = Partial<Record<keyof FormData | 'submit', string>>;

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        jobTitle: '',
        country: '',
        dietaryRequirements: '',
        accessibilityNeeds: '',
    });

    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = (): Errors => {
        const newErrors: Errors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.organization) newErrors.organization = 'Organization is required';
        if (!formData.country) newErrors.country = 'Country is required';
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

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            setErrors({ submit: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-brand-green mb-6 text-center">Conference Registration</h2>
            
            {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                    {errors.submit}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <select
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 bg-white/90 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    >
                        <option value="">Select Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Dr">Dr</option>
                        <option value="Prof">Prof</option>
                        <option value="Hon">Hon</option>
                    </select>
                </div>

                {/* Empty div to balance grid if needed, or just span full width for some */}
                <div className="hidden md:block"></div>

                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        placeholder="First Name"
                        required
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        placeholder="Last Name"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="john.doe@example.com"
                        required
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        placeholder="+233 20 123 4567"
                        required
                    />
                </div>

                {/* Organization */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization / Company *</label>
                    <Input
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        error={errors.organization}
                        placeholder="Organization Name"
                        required
                    />
                </div>

                {/* Job Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <Input
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="e.g. Director, Manager"
                    />
                </div>

                {/* Country */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                    <Input
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        error={errors.country}
                        placeholder="Country of Residence"
                        required
                    />
                </div>

                {/* Dietary Requirements */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Requirements</label>
                    <Input
                        name="dietaryRequirements"
                        value={formData.dietaryRequirements}
                        onChange={handleChange}
                        placeholder="e.g. Vegetarian, Halal, Allergies"
                    />
                </div>

                {/* Accessibility Needs */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Accessibility Needs</label>
                    <textarea
                        name="accessibilityNeeds"
                        value={formData.accessibilityNeeds}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 bg-white/90 focus:outline-none focus:ring-2 focus:ring-brand-gold h-24"
                        placeholder="Please let us know if you have any specific accessibility requirements."
                    />
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-1/3"
                >
                    {isSubmitting ? 'Registering...' : 'Register Now'}
                </Button>
            </div>
        </form>
    );
};

export default RegistrationForm;
