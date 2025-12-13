"use client";

import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

const COUNTRIES = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo (Brazzaville)',
    'Congo (Kinshasa)',
    'Costa Rica',
    "Cote d'Ivoire",
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czechia',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
    'Other',
];

const JOB_TITLE_OPTIONS = [
    'Programme Officer',
    'Program Officer',
    'Project Officer',
    'Project Manager',
    'Project Coordinator',
    'Portfolio Manager',
    'Technical Advisor',
    'Chief of Party',
    'Country Director',
    'Regional Director',
    'Executive Director',
    'Managing Director',
    'Chief Executive Officer (CEO)',
    'Director',
    'Deputy Director',
    'Head of Programmes',
    'Head of Programs',
    'Partnerships Manager',
    'Stakeholder Engagement Officer',
    'Monitoring, Evaluation and Learning (MEL) Officer',
    'Monitoring & Evaluation (M&E) Officer',
    'Research Officer',
    'Policy Analyst',
    'Policy Officer',
    'Agronomist',
    'Extension Officer',
    'Value Chain Specialist',
    'Investment Officer',
    'Private Sector Development Specialist',
    'Grants Manager',
    'Procurement Specialist',
    'Finance Officer',
    'Operations Manager',
    'Communications Officer',
    'Advocacy Officer',
    'Gender Specialist',
    'Safeguards Specialist',
    'Data Analyst',
    'Consultant',
];

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
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Registration failed';
            setErrors({ submit: message });
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
                    <div className="w-full">
                        <input
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            placeholder="Select or type your role"
                            list="jobTitle-options"
                            className="w-full border rounded-md p-2 bg-white/90 focus:outline-none focus:ring-2 focus:ring-brand-gold border-gray-300"
                        />
                        <datalist id="jobTitle-options">
                            {JOB_TITLE_OPTIONS.map((title) => (
                                <option key={title} value={title} />
                            ))}
                        </datalist>
                    </div>
                </div>

                {/* Country */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                    <div className="w-full">
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            className={`w-full border rounded-md p-2 bg-white/90 focus:outline-none focus:ring-2 focus:ring-brand-gold ${
                                errors.country ? 'border-red-500' : 'border-gray-300'
                            }`}
                            aria-invalid={!!errors.country}
                            aria-describedby={errors.country ? 'country-error' : undefined}
                        >
                            <option value="">Select Country</option>
                            {COUNTRIES.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        {errors.country ? (
                            <p id="country-error" className="mt-1 text-sm text-red-600">
                                {errors.country}
                            </p>
                        ) : null}
                    </div>
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
