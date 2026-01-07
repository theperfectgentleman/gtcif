"use client";

import React, { useState } from 'react';
import Button from './ui/Button';
import { 
    User, 
    Mail, 
    Phone, 
    Building2, 
    Briefcase, 
    Globe, 
    MapPin, 
    Calendar,
    CheckCircle2,
    Sprout,
    AlertCircle,
    X
} from 'lucide-react';

// Event start date: Feb 17, 2026
const EVENT_START_DATE = new Date('2026-02-17T00:00:00');
const FIELD_VISIT_DEADLINE = new Date(EVENT_START_DATE.getTime() - 5 * 24 * 60 * 60 * 1000);

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

const FIELD_VISIT_LOCATIONS = [
    {
        id: 'USIBRAS',
        name: 'USIBRAS GHANA LIMITED',
        crop: 'Cashew',
        location: 'PRAMPRAM'
    },
    {
        id: 'Wilmar',
        name: 'Wilmar Africa Limited',
        crop: 'Oil Palm',
        location: 'Tema'
    },
    {
        id: 'HPW',
        name: 'HPW GHANA',
        crop: 'Coconut',
        location: 'Nsawam'
    }
];

const JOB_TITLE_OPTIONS = [
    'Government Appointee',
    'Minister',
    'Deputy Minister',
    'Member of Parliament (MP)',
    'District Chief Executive (DCE)',
    'Municipal Chief Executive (MCE)',
    'Metropolitan Chief Executive (MCE)',
    'Chief Director',
    'Director General',
    'Assembly Member',
    'Permanent Secretary',
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
    fieldVisit: boolean;
    fieldVisitLocation: string;
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
        country: 'Ghana',
        fieldVisit: false,
        fieldVisitLocation: '',
    });

    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Check if field visit registration is closed
    const isFieldVisitClosed = new Date() > FIELD_VISIT_DEADLINE;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
             const checked = (e.target as HTMLInputElement).checked;
             setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
             setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFieldVisitChange = (isJoining: boolean) => {
        setFormData(prev => ({ 
            ...prev, 
            fieldVisit: isJoining,
            fieldVisitLocation: isJoining ? prev.fieldVisitLocation : '' // clear location if not joining
        }));
    };

    const handleLocationSelect = (locationId: string) => {
        setFormData(prev => ({ ...prev, fieldVisitLocation: locationId }));
    };

    const clearCountry = () => {
        setFormData(prev => ({ ...prev, country: '' }));
    };

    const validate = (): Errors => {
        const newErrors: Errors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        // Email is now optional
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.organization) newErrors.organization = 'Organization is required';
        if (!formData.country) newErrors.country = 'Country is required';
        
        if (formData.fieldVisit && !formData.fieldVisitLocation) {
            newErrors.fieldVisitLocation = 'Please select a location for the field visit';
        }
        
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
        <div id="register-form" className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden max-w-5xl mx-auto">
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-100 p-6 md:p-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                            <Calendar size={12} />
                            <span>Registration</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-brand-black tracking-tight leading-tight">
                            Confirm Your Attendance
                        </h2>
                        <p className="text-sm text-gray-500 font-medium mt-2">
                            Secure your spot at GTCIS 2026. Please fill in your details below.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-10">
                {errors.submit && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-sm">Registration Failed</p>
                            <p className="text-sm opacity-90">{errors.submit}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-8">
                    {/* Personal Details Section */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="bg-brand-green/5 p-2 rounded-lg text-brand-green">
                                <User size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-brand-black uppercase tracking-tight">Personal Details</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Title */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Title</label>
                                <div className="relative">
                                    <select
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full h-[50px] px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all appearance-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="Mr">Mr</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Dr">Dr</option>
                                        <option value="Prof">Prof</option>
                                        <option value="Hon">Hon</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                    </div>
                                </div>
                            </div>

                            {/* First Name */}
                            <div className="md:col-span-5">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">First Name <span className="text-red-500">*</span></label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter your first name"
                                    className={`w-full h-[50px] px-4 rounded-xl border bg-gray-50 font-medium focus:outline-none focus:ring-2 transition-all ${
                                        errors.firstName 
                                        ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                                        : 'border-gray-200 focus:ring-brand-green/20 focus:border-brand-green'
                                    }`}
                                />
                                {errors.firstName && <p className="text-xs text-red-500 font-bold mt-1">{errors.firstName}</p>}
                            </div>

                            {/* Last Name */}
                            <div className="md:col-span-5">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Last Name <span className="text-red-500">*</span></label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter your last name"
                                    className={`w-full h-[50px] px-4 rounded-xl border bg-gray-50 font-medium focus:outline-none focus:ring-2 transition-all ${
                                        errors.lastName 
                                        ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                                        : 'border-gray-200 focus:ring-brand-green/20 focus:border-brand-green'
                                    }`}
                                />
                                {errors.lastName && <p className="text-xs text-red-500 font-bold mt-1">{errors.lastName}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-100"></div>

                    {/* Contact Info */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="bg-brand-green/5 p-2 rounded-lg text-brand-green">
                                <Mail size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-brand-black uppercase tracking-tight">Contact Information</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                                <div className="relative">
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john.doe@example.com"
                                        className={`w-full h-[50px] pl-11 pr-4 rounded-xl border bg-gray-50 font-medium focus:outline-none focus:ring-2 transition-all ${
                                            errors.email 
                                            ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                                            : 'border-gray-200 focus:ring-brand-green/20 focus:border-brand-green'
                                        }`}
                                    />
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                </div>
                                {errors.email && <p className="text-xs text-red-500 font-bold mt-1">{errors.email}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+233 20 123 4567"
                                        className={`w-full h-[50px] pl-11 pr-4 rounded-xl border bg-gray-50 font-medium focus:outline-none focus:ring-2 transition-all ${
                                            errors.phone 
                                            ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                                            : 'border-gray-200 focus:ring-brand-green/20 focus:border-brand-green'
                                        }`}
                                    />
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                </div>
                                {errors.phone && <p className="text-xs text-red-500 font-bold mt-1">{errors.phone}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-100"></div>

                    {/* Professional Details */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="bg-brand-green/5 p-2 rounded-lg text-brand-green">
                                <Briefcase size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-brand-black uppercase tracking-tight">Professional Details</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Organization */}
                            <div className="md:col-span-6">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Organization <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input
                                        name="organization"
                                        value={formData.organization}
                                        onChange={handleChange}
                                        placeholder="Company or Organization Name"
                                        className={`w-full h-[50px] pl-11 pr-4 rounded-xl border bg-gray-50 font-medium focus:outline-none focus:ring-2 transition-all ${
                                            errors.organization 
                                            ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                                            : 'border-gray-200 focus:ring-brand-green/20 focus:border-brand-green'
                                        }`}
                                    />
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                </div>
                                {errors.organization && <p className="text-xs text-red-500 font-bold mt-1">{errors.organization}</p>}
                            </div>

                            {/* Job Title */}
                            <div className="md:col-span-6">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Job Title</label>
                                <div className="relative">
                                    <input
                                        name="jobTitle"
                                        value={formData.jobTitle}
                                        onChange={handleChange}
                                        placeholder="Select or type your role"
                                        list="jobTitle-options"
                                        className="w-full h-[50px] pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50 font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                                    />
                                    <datalist id="jobTitle-options">
                                        {JOB_TITLE_OPTIONS.map((title) => (
                                            <option key={title} value={title} />
                                        ))}
                                    </datalist>
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                </div>
                            </div>

                            {/* Country */}
                            <div className="md:col-span-12">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Country <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                        list="country-options"
                                        placeholder="Select or type country"
                                        className={`w-full h-[50px] pl-11 pr-10 rounded-xl border bg-gray-50 font-medium focus:outline-none focus:ring-2 transition-all ${
                                            errors.country 
                                            ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                                            : 'border-gray-200 focus:ring-brand-green/20 focus:border-brand-green'
                                        }`}
                                    />
                                    <datalist id="country-options">
                                        {COUNTRIES.map((c) => (
                                            <option key={c} value={c} />
                                        ))}
                                    </datalist>
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    {formData.country && (
                                        <button
                                            type="button"
                                            onClick={clearCountry}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                                            aria-label="Clear country"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                                {errors.country && <p className="text-xs text-red-500 font-bold mt-1">{errors.country}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-100"></div>

                    {/* Field Visit Section */}
                    <div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center space-x-2">
                                <div className="bg-brand-green/5 p-2 rounded-lg text-brand-green">
                                    <Sprout size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-brand-black uppercase tracking-tight">Field Visit</h3>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">January 21st, 2026</p>
                                </div>
                            </div>
                            
                            {/* Toggle Switch */}
                            {!isFieldVisitClosed && (
                                <div className="flex bg-gray-100 p-1 rounded-xl">
                                    <button
                                        type="button"
                                        onClick={() => handleFieldVisitChange(false)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                                            !formData.fieldVisit 
                                            ? 'bg-white text-gray-800 shadow-sm' 
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Not Attending
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleFieldVisitChange(true)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                                            formData.fieldVisit 
                                            ? 'bg-brand-green text-white shadow-sm' 
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        I Will Attend
                                    </button>
                                </div>
                            )}
                        </div>

                        {isFieldVisitClosed ? (
                            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex items-start gap-4">
                                <div className="bg-orange-100 text-orange-600 p-2 rounded-lg shrink-0">
                                    <AlertCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-orange-900 mb-1">Registration Closed</h4>
                                    <p className="text-sm text-orange-800/80 leading-relaxed">
                                        Registration for field visits ended on <span className="font-bold">{FIELD_VISIT_DEADLINE.toLocaleDateString()}</span> to allow for necessary logistical arrangements.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className={`transition-all duration-300 ${formData.fieldVisit ? 'opacity-100' : 'opacity-40 pointer-events-none grayscale'}`}>
                                <p className="text-sm font-medium text-gray-600 mb-6">
                                    Select one of the following locations to visit. Transportation will be provided.
                                </p>
                                
                                {errors.fieldVisitLocation && formData.fieldVisit && (
                                    <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-4 flex items-center">
                                        <AlertCircle size={12} className="mr-1" />
                                        Please select a location
                                    </p>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {FIELD_VISIT_LOCATIONS.map((loc) => (
                                        <div
                                            key={loc.id}
                                            onClick={() => formData.fieldVisit && handleLocationSelect(loc.id)}
                                            className={`relative group cursor-pointer rounded-2xl border transition-all duration-300 p-6 flex flex-col h-full ${
                                                formData.fieldVisitLocation === loc.id && formData.fieldVisit
                                                    ? 'bg-white border-brand-green ring-2 ring-brand-green/10 shadow-lg translate-y-[-4px]'
                                                    : 'bg-white border-gray-200 hover:border-brand-green/50 hover:shadow-md hover:translate-y-[-2px]'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-2 rounded-xl transition-colors ${
                                                    formData.fieldVisitLocation === loc.id && formData.fieldVisit
                                                    ? 'bg-brand-green text-white'
                                                    : 'bg-gray-100 text-gray-500 group-hover:bg-brand-green/10 group-hover:text-brand-green'
                                                }`}>
                                                    <Sprout size={20} />
                                                </div>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                                    formData.fieldVisitLocation === loc.id && formData.fieldVisit
                                                    ? 'border-brand-green bg-brand-green text-white'
                                                    : 'border-gray-200 group-hover:border-brand-green/50'
                                                }`}>
                                                    {formData.fieldVisitLocation === loc.id && formData.fieldVisit && <CheckCircle2 size={14} />}
                                                </div>
                                            </div>
                                            
                                            <h4 className="font-bold text-lg text-brand-black leading-tight mb-2 group-hover:text-brand-green transition-colors">
                                                {loc.name}
                                            </h4>
                                            
                                            <div className="mt-auto space-y-2 pt-4">
                                                <div className="flex items-center text-xs font-medium text-gray-500">
                                                    <Sprout size={14} className="mr-2 opacity-70" />
                                                    <span className="uppercase tracking-wider mr-2 opacity-50">Focus:</span>
                                                    <span className="text-brand-black font-bold">{loc.crop}</span>
                                                </div>
                                                <div className="flex items-center text-xs font-medium text-gray-500">
                                                    <MapPin size={14} className="mr-2 opacity-70" />
                                                    <span className="uppercase tracking-wider mr-2 opacity-50">Loc:</span>
                                                    <span className="text-brand-black font-bold">{loc.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto min-w-[300px] h-[56px] text-base"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Processing Registration...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center space-x-2">
                                <span>Confirm Registration</span>
                                <CheckCircle2 size={20} />
                            </div>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
