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
};

const BadgePage = () => {
    const params = useParams();
    const [registrant, setRegistrant] = useState<Registrant | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegistrant = async () => {
            try {
                const response = await fetch(`/api/admin/registrants/${params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setRegistrant(data);
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
            <div className="no-print mb-4">
                <button 
                    onClick={() => window.print()}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Print Badge
                </button>
            </div>

            {/* Badge Container - Standard A6 size approx */}
            <div className="w-[105mm] h-[148mm] bg-white shadow-lg print:shadow-none border border-gray-200 print:border-0 flex flex-col relative overflow-hidden">
                {/* Header / Branding */}
                <div className="h-1/3 bg-brand-green relative">
                    <div className="absolute inset-0 opacity-20 bg-[url('/gt_images/cocoa-bg.jpg')] bg-cover bg-center"></div>
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-4 text-center">
                        <h1 className="text-xl font-bold leading-tight">GTCIF 2026</h1>
                        <p className="text-xs mt-1">Ghana Tree Crops Investment Fair</p>
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
                    <p className="text-brand-green font-bold text-sm">DELEGATE</p>
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
