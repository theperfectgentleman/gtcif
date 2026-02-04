'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Registrant = {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    organization: string;
    jobTitle: string;
    country: string;
    confRole?: string;
};

const BadgePage = () => {
    const params = useParams();
    const [registrant, setRegistrant] = useState<Registrant | null>(null);
    const [loading, setLoading] = useState(true);
    const [showRole, setShowRole] = useState(true);
    const [roleText, setRoleText] = useState('DELEGATE');

    useEffect(() => {
        const fetchRegistrant = async () => {
            try {
                const response = await fetch(`/api/admin/registrants/${params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setRegistrant(data);
                    if (data.confRole) {
                        setRoleText(data.confRole.toUpperCase());
                    }
                }
            } catch (error) {
                console.error('Error fetching registrant', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchRegistrant();
        }
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (!registrant) return <div>Registrant not found</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 print:bg-white print:p-0">
            <div className="no-print mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Badge Settings</h3>

                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="showRole"
                            checked={showRole}
                            onChange={(e) => setShowRole(e.target.checked)}
                            className="w-4 h-4 text-brand-green rounded border-gray-300 focus:ring-brand-green"
                        />
                        <label htmlFor="showRole" className="text-sm font-medium text-gray-700">Display Role on Badge</label>
                    </div>

                    {showRole && (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Conference Role</label>
                            <select
                                value={roleText}
                                onChange={(e) => setRoleText(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                            >
                                <option value="DELEGATE">DELEGATE</option>
                                <option value="PARTICIPANT">PARTICIPANT</option>
                                <option value="MEDIA">MEDIA</option>
                                <option value="SPEAKER">SPEAKER</option>
                                <option value="VIP">VIP</option>
                                <option value="ORGANIZER">ORGANIZER</option>
                                <option value="EXHIBITOR">EXHIBITOR</option>
                            </select>
                        </div>
                    )}

                    <div className="pt-2">
                        <button
                            onClick={() => window.print()}
                            className="w-full bg-brand-green text-white px-4 py-3 rounded-lg font-bold hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                            Print Badge
                        </button>
                    </div>
                </div>
            </div>

            {/* Badge Container - Standard A6 size approx */}
            <div className="w-[105mm] h-[148mm] bg-white shadow-lg print:shadow-none border border-gray-200 print:border-0 flex flex-col relative overflow-hidden">
                {/* Header / Branding */}
                <div className="h-1/3 bg-brand-green relative">
                    <div className="absolute inset-0 opacity-20 bg-[url('/gt_images/cocoa-bg.jpg')] bg-cover bg-center"></div>
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-4 text-center">
                        <h1 className="text-xl font-bold leading-tight">GTCIS 2026</h1>
                        <p className="text-xs mt-1">Ghana Tree Crops Investment Summit</p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {registrant.firstName} {registrant.lastName}
                    </h2>
                    <p className="text-xl text-gray-600 font-medium mb-6">
                        {registrant.jobTitle}
                    </p>
                    <div className="w-full border-t-2 border-brand-gold my-4"></div>
                    <h3 className="text-2xl font-bold text-brand-green">
                        {registrant.organization}
                    </h3>
                    <p className="text-lg text-gray-500 mt-2">{registrant.country}</p>
                </div>

                {/* Footer */}
                <div className="h-12 bg-brand-gold flex items-center justify-center">
                    {showRole && (
                        <p className="text-brand-green font-bold text-sm tracking-widest">{roleText}</p>
                    )}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page {
                        size: A6 portrait;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        background: white;
                    }
                    .no-print {
                        display: none;
                    }
                }
            `}} />
        </div>
    );
};

export default BadgePage;
