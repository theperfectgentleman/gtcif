'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '../../../components/ui/Container';
import Button from '../../../components/ui/Button';

type Registrant = {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
    country: string;
    registrationDate: string;
};

const AdminDashboard = () => {
    const [registrants, setRegistrants] = useState<Registrant[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchRegistrants = async () => {
            try {
                const response = await fetch('/api/admin/registrants');
                if (response.status === 401) {
                    router.push('/admin');
                    return;
                }
                const data = await response.json();
                setRegistrants(data);
            } catch (error) {
                console.error('Failed to fetch registrants', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRegistrants();
    }, [router]);

    const handlePrint = (id: number) => {
        window.open(`/admin/badge/${id}`, '_blank');
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <Container>
            <div className="flex justify-between items-center my-8">
                <h1 className="text-2xl font-bold">Registrants ({registrants.length})</h1>
                <Button onClick={() => window.location.reload()}>Refresh</Button>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {registrants.map((reg) => (
                            <tr key={reg.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {reg.title} {reg.firstName} {reg.lastName}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.organization}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.country}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button 
                                        onClick={() => handlePrint(reg.id)}
                                        className="text-brand-green hover:text-brand-gold mr-4"
                                    >
                                        Print Badge
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    );
};

export default AdminDashboard;
