'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, LayoutDashboard, FileText, UserPlus, LogOut, Search, Printer, Key, Trash2, Mail, CheckCircle, XCircle, Eye } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';

type Registrant = {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string;
    organization: string;
    jobTitle?: string;
    country: string;
    fieldVisit?: boolean;
    fieldVisitLocation?: string;
    registrationDate: string;
    emailSent?: boolean;
    emailSentAt?: string;
};

type User = {
    id: number;
    username: string;
    role: string;
    createdAt: string;
};

const AdminDashboard = () => {
    const [registrants, setRegistrants] = useState<Registrant[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [role, setRole] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Email & Selection State
    const [selectedRegistrants, setSelectedRegistrants] = useState<Set<number>>(new Set());
    const [emailSending, setEmailSending] = useState(false);
    const [bulkActionStatus, setBulkActionStatus] = useState('');

    // New User Form State
    const [newUserUsername, setNewUserUsername] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserRole, setNewUserRole] = useState('media');
    const [userError, setUserError] = useState('');
    const [userSuccess, setUserSuccess] = useState('');

    // Password Reset State
    const [resetUserId, setResetUserId] = useState<number | null>(null);
    const [resetUsername, setResetUsername] = useState('');
    const [resetPassword, setResetPassword] = useState('');
    const [resetConfirm, setResetConfirm] = useState('');
    const [resetError, setResetError] = useState('');
    const [resetSuccess, setResetSuccess] = useState('');

    // Registrant Detail View State
    const [selectedRegistrant, setSelectedRegistrant] = useState<Registrant | null>(null);

    // Filter, Sort, and Pagination State
    const [countryFilter, setCountryFilter] = useState('');
    const [emailStatusFilter, setEmailStatusFilter] = useState('');
    const [fieldVisitFilter, setFieldVisitFilter] = useState('');
    const [sortColumn, setSortColumn] = useState<keyof Registrant | ''>('registrationDate');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    const router = useRouter();

    useEffect(() => {
        // Get role from cookie
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
        };
        const currentRole = getCookie('admin_role');
        setRole(currentRole || '');

        const fetchData = async () => {
            try {
                // Fetch Registrants
                const regResponse = await fetch('/api/admin/registrants');
                if (regResponse.status === 401) {
                    router.push('/admin');
                    return;
                }
                const regData = await regResponse.json();
                setRegistrants(regData);

                // Fetch Users if Admin
                if (currentRole === 'admin') {
                    const userResponse = await fetch('/api/admin/users');
                    if (userResponse.ok) {
                        const userData = await userResponse.json();
                        setUsers(userData);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    const handlePrint = (id: number) => {
        window.open(`/admin/badge/${id}`, '_blank');
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setUserError('');
        setUserSuccess('');

        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: newUserUsername,
                    password: newUserPassword,
                    role: newUserRole
                })
            });

            const data = await res.json();
            if (res.ok) {
                setUserSuccess('User created successfully');
                setNewUserUsername('');
                setNewUserPassword('');
                // Refresh users list
                const userResponse = await fetch('/api/admin/users');
                const userData = await userResponse.json();
                setUsers(userData);
            } else {
                setUserError(data.error || 'Failed to create user');
            }
        } catch {
            setUserError('An error occurred');
        }
    };

    const openResetModal = (user: User) => {
        setResetUserId(user.id);
        setResetUsername(user.username);
        setResetPassword('');
        setResetConfirm('');
        setResetError('');
        setResetSuccess('');
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetError('');
        setResetSuccess('');

        if (resetPassword !== resetConfirm) {
            setResetError('Passwords do not match');
            return;
        }

        try {
            const res = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: resetUserId,
                    password: resetPassword
                })
            });

            if (res.ok) {
                setResetSuccess('Password updated successfully');
                setTimeout(() => setResetUserId(null), 1500);
            } else {
                setResetError('Failed to update password');
            }
        } catch {
            setResetError('An error occurred');
        }
    };

    const handleRoleChange = async (userId: number, newRole: string) => {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: userId,
                    role: newRole
                })
            });

            if (res.ok) {
                setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
            } else {
                alert('Failed to update role');
            }
        } catch {
            alert('An error occurred');
        }
    };

    const handleDeleteUser = async (userId: number) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            const res = await fetch(`/api/admin/users?id=${userId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setUsers(users.filter(u => u.id !== userId));
            } else {
                alert('Failed to delete user');
            }
        } catch {
            alert('An error occurred');
        }
    };

    const handleLogout = () => {
        document.cookie = 'admin_session=; Max-Age=0; path=/;';
        document.cookie = 'admin_role=; Max-Age=0; path=/;';
        router.push('/admin');
    };

    const handleDeleteRegistrant = async (id: number) => {
        if (!confirm('Are you sure you want to delete this registrant?')) return;

        try {
            const res = await fetch(`/api/admin/registrants/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setRegistrants(registrants.filter(r => r.id !== id));
            } else {
                alert('Failed to delete registrant');
            }
        } catch {
            alert('An error occurred');
        }
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSelected = new Set(selectedRegistrants);
        if (e.target.checked) {
            paginatedRegistrants.forEach(r => newSelected.add(r.id));
        } else {
            paginatedRegistrants.forEach(r => newSelected.delete(r.id));
        }
        setSelectedRegistrants(newSelected);
    };

    const handleSelectOne = (id: number) => {
        const newSelected = new Set(selectedRegistrants);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRegistrants(newSelected);
    };

    const handleSendEmails = async (sendToAllPending = false) => {
        if (!sendToAllPending && selectedRegistrants.size === 0) return;

        const count = sendToAllPending ? 'all pending' : selectedRegistrants.size;
        if (!confirm(`Are you sure you want to send confirmation emails to ${count} registrants?`)) return;

        setEmailSending(true);
        setBulkActionStatus('Sending emails...');

        try {
            const res = await fetch('/api/admin/emails/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ids: Array.from(selectedRegistrants),
                    sendToAllPending
                })
            });

            const data = await res.json();

            if (res.ok) {
                setBulkActionStatus(data.message);
                setSelectedRegistrants(new Set()); // Clear selection
                // Refresh data to show updated status
                const regResponse = await fetch('/api/admin/registrants');
                const regData = await regResponse.json();
                setRegistrants(regData);
            } else {
                setBulkActionStatus(`Error: ${data.error}`);
            }
        } catch (error) {
            setBulkActionStatus('Failed to send emails');
            console.error(error);
        } finally {
            setEmailSending(false);
            // Clear status after 5 seconds
            setTimeout(() => setBulkActionStatus(''), 5000);
        }
    };

    // Helper: Generate CSV and download
    const downloadCSV = (data: Registrant[], filename: string) => {
        const headers = [
            'ID', 'Title', 'First Name', 'Last Name', 'Email', 'Phone',
            'Organization', 'Job Title', 'Country', 'Field Visit', 'Field Visit Location',
            'Registration Date', 'Email Sent', 'Email Sent At'
        ];

        const csvRows = [
            headers.join(','),
            ...data.map(reg => [
                reg.id,
                reg.title || '',
                reg.firstName,
                reg.lastName,
                reg.email || '',
                reg.phone,
                `"${reg.organization}"`, // Quoted in case of commas
                reg.jobTitle || '',
                reg.country,
                reg.fieldVisit ? 'Yes' : 'No',
                reg.fieldVisitLocation || '',
                new Date(reg.registrationDate).toLocaleString(),
                reg.emailSent ? 'Yes' : 'No',
                reg.emailSentAt ? new Date(reg.emailSentAt).toLocaleString() : ''
            ].join(','))
        ];

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleExportAll = () => {
        downloadCSV(filteredAndSortedRegistrants, `registrants_all_${new Date().toISOString().split('T')[0]}.csv`);
    };

    const handleExportFieldVisit = () => {
        const fieldVisitRegistrants = registrants.filter(reg => reg.fieldVisit);
        downloadCSV(fieldVisitRegistrants, `field_visit_participants_${new Date().toISOString().split('T')[0]}.csv`);
    };

    const handleSort = (column: keyof Registrant) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
        setCurrentPage(1); // Reset to first page when sorting
    };

    // Get unique countries for filter dropdown
    const uniqueCountries = Array.from(new Set(registrants.map(r => r.country).filter(Boolean))).sort();

    // Apply all filters
    const filteredRegistrants = registrants.filter(reg => {
        // Search filter
        const matchesSearch = (
            (reg.firstName ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (reg.lastName ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (reg.organization ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (reg.email ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (reg.phone ?? '').toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Country filter
        const matchesCountry = !countryFilter || reg.country === countryFilter;

        // Email status filter
        const matchesEmailStatus = !emailStatusFilter ||
            (emailStatusFilter === 'sent' && reg.emailSent) ||
            (emailStatusFilter === 'pending' && !reg.emailSent);

        // Field visit filter
        const matchesFieldVisit = !fieldVisitFilter ||
            (fieldVisitFilter === 'yes' && reg.fieldVisit) ||
            (fieldVisitFilter === 'no' && !reg.fieldVisit);

        return matchesSearch && matchesCountry && matchesEmailStatus && matchesFieldVisit;
    });

    // Apply sorting
    const filteredAndSortedRegistrants = [...filteredRegistrants].sort((a, b) => {
        if (!sortColumn) return 0;

        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        // Handle null/undefined
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        // Compare values
        let comparison = 0;
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
            comparison = aValue - bValue;
        } else {
            comparison = String(aValue).localeCompare(String(bValue));
        }

        return sortDirection === 'asc' ? comparison : -comparison;
    });

    // Apply pagination
    const totalPages = Math.ceil(filteredAndSortedRegistrants.length / pageSize);
    const paginatedRegistrants = filteredAndSortedRegistrants.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div></div>;

    const renderDashboard = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-brand-green">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Registrants</p>
                            <p className="text-3xl font-bold">{registrants.length}</p>
                        </div>
                        <Users className="text-brand-green w-8 h-8 opacity-50" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-brand-gold">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Countries Represented</p>
                            <p className="text-3xl font-bold">{new Set(registrants.map(r => r.country).filter(Boolean)).size}</p>
                        </div>
                        <div className="bg-brand-gold rounded-full p-2 bg-opacity-20 text-brand-gold">
                            🌍
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Organizations</p>
                            <p className="text-3xl font-bold">{new Set(registrants.map(r => r.organization).filter(Boolean)).size}</p>
                        </div>
                        <div className="bg-blue-500 rounded-full p-2 bg-opacity-20 text-blue-500">
                            🏢
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Registrations Preview */}
            <div className="bg-white rounded-lg shadow mt-8">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Recent Registrations</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {registrants.slice(0, 5).map((reg) => (
                        <div key={reg.id} className="px-6 py-4 flex justify-between hover:bg-gray-50">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{reg.title} {reg.firstName} {reg.lastName}</p>
                                <p className="text-sm text-gray-500">{reg.organization}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                                {new Date(reg.registrationDate).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderRegistrantList = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Registrants</h2>
            </div>

            {/* Filters and Export Row */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    {/* Search */}
                    <div className="lg:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Search</label>
                        <div className="relative">
                            <Input
                                name="search"
                                placeholder="Name, email, phone, org..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                className="pl-10"
                            />
                            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Country Filter */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
                        <select
                            value={countryFilter}
                            onChange={(e) => { setCountryFilter(e.target.value); setCurrentPage(1); }}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring focus:ring-brand-green focus:ring-opacity-50 p-2 border text-sm"
                        >
                            <option value="">All Countries</option>
                            {uniqueCountries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>

                    {/* Email Status Filter */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Email Status</label>
                        <select
                            value={emailStatusFilter}
                            onChange={(e) => { setEmailStatusFilter(e.target.value); setCurrentPage(1); }}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring focus:ring-brand-green focus:ring-opacity-50 p-2 border text-sm"
                        >
                            <option value="">All</option>
                            <option value="sent">Sent</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>

                    {/* Field Visit Filter */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Field Visit</label>
                        <select
                            value={fieldVisitFilter}
                            onChange={(e) => { setFieldVisitFilter(e.target.value); setCurrentPage(1); }}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring focus:ring-brand-green focus:ring-opacity-50 p-2 border text-sm"
                        >
                            <option value="">All</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    {/* Export Buttons */}
                    <div className="flex flex-col gap-2">
                        <Button onClick={handleExportAll} variant="outline" className="text-xs py-1">
                            📥 Export All ({filteredAndSortedRegistrants.length})
                        </Button>
                        <Button onClick={handleExportFieldVisit} variant="outline" className="text-xs py-1">
                            🚌 Field Visit ({registrants.filter(r => r.fieldVisit).length})
                        </Button>
                    </div>
                </div>

                {/* Active Filters Display */}
                {(countryFilter || emailStatusFilter || fieldVisitFilter || searchTerm) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        <span className="text-xs text-gray-600">Active filters:</span>
                        {searchTerm && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                Search: &quot;{searchTerm}&quot; <button onClick={() => setSearchTerm('')} className="ml-1 font-bold">×</button>
                            </span>
                        )}
                        {countryFilter && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                Country: {countryFilter} <button onClick={() => setCountryFilter('')} className="ml-1 font-bold">×</button>
                            </span>
                        )}
                        {emailStatusFilter && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                Email: {emailStatusFilter} <button onClick={() => setEmailStatusFilter('')} className="ml-1 font-bold">×</button>
                            </span>
                        )}
                        {fieldVisitFilter && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                Field Visit: {fieldVisitFilter} <button onClick={() => setFieldVisitFilter('')} className="ml-1 font-bold">×</button>
                            </span>
                        )}
                        <button
                            onClick={() => { setSearchTerm(''); setCountryFilter(''); setEmailStatusFilter(''); setFieldVisitFilter(''); }}
                            className="text-xs text-red-600 hover:text-red-800 font-medium"
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </div>

            {/* Bulk Actions Bar */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 font-medium">Bulk Actions:</span>
                    {selectedRegistrants.size > 0 ? (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{selectedRegistrants.size} selected</span>
                    ) : (
                        <span className="text-sm text-gray-400 italic">Select items to enable</span>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => handleSendEmails(false)}
                        variant="primary"
                        disabled={selectedRegistrants.size === 0 || emailSending}
                        className="text-sm py-1 px-3"
                    >
                        <Mail size={16} className="mr-2" />
                        {emailSending ? 'Sending...' : 'Send to Selected'}
                    </Button>
                    <Button
                        onClick={() => handleSendEmails(true)}
                        variant="outline"
                        disabled={emailSending}
                        className="text-sm py-1 px-3"
                    >
                        <Mail size={16} className="mr-2" />
                        Send to All Pending
                    </Button>
                </div>
            </div>
            {bulkActionStatus && (
                <div className={`p-3 rounded text-sm ${bulkActionStatus.startsWith('Error') || bulkActionStatus.startsWith('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {bulkActionStatus}
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={paginatedRegistrants.length > 0 && paginatedRegistrants.every(r => selectedRegistrants.has(r.id))}
                                        className="h-4 w-4 text-brand-green border-gray-300 rounded focus:ring-brand-green"
                                    />
                                </th>
                                <th
                                    onClick={() => handleSort('firstName')}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Name {sortColumn === 'firstName' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                    onClick={() => handleSort('organization')}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Organization {sortColumn === 'organization' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                    onClick={() => handleSort('country')}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Country {sortColumn === 'country' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                    onClick={() => handleSort('email')}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Email {sortColumn === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                    onClick={() => handleSort('emailSent')}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Status {sortColumn === 'emailSent' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedRegistrants.map((reg) => (
                                <tr key={reg.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedRegistrants.has(reg.id)}
                                            onChange={() => handleSelectOne(reg.id)}
                                            className="h-4 w-4 text-brand-green border-gray-300 rounded focus:ring-brand-green"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {reg.title} {reg.firstName} {reg.lastName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.organization}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.country}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {reg.emailSent ? (
                                            <div className="flex items-center text-green-600 font-medium" title="Email confirmation sent">
                                                <CheckCircle size={18} className="mr-1" /> Sent
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-gray-400 font-medium" title="Not Sent">
                                                <XCircle size={18} className="mr-1" /> Pending
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedRegistrant(reg)}
                                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                title="View Details"
                                            >
                                                <Eye size={16} /> View
                                            </button>
                                            <button
                                                onClick={() => handlePrint(reg.id)}
                                                className="text-brand-green hover:text-brand-gold flex items-center gap-1"
                                                title="Print Badge"
                                            >
                                                <Printer size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteRegistrant(reg.id)}
                                                className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                                title="Delete Registrant"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedRegistrants.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-10 text-center text-gray-500">No results found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {filteredAndSortedRegistrants.length > 0 && (
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-700">
                                Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                                <span className="font-medium">{Math.min(currentPage * pageSize, filteredAndSortedRegistrants.length)}</span> of{' '}
                                <span className="font-medium">{filteredAndSortedRegistrants.length}</span> results
                            </span>
                            <select
                                value={pageSize}
                                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                                className="rounded-md border-gray-300 text-sm p-1"
                            >
                                <option value={10}>10 per page</option>
                                <option value={25}>25 per page</option>
                                <option value={50}>50 per page</option>
                                <option value={100}>100 per page</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                First
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => p - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            <span className="text-sm text-gray-700">
                                Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                            </span>

                            <button
                                onClick={() => setCurrentPage(p => p + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Last
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderUserManagement = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">User Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Create User Form */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><UserPlus size={20} /> Create New User</h3>
                    {userError && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded text-sm">{userError}</div>}
                    {userSuccess && <div className="p-3 mb-4 bg-green-100 text-green-700 rounded text-sm">{userSuccess}</div>}

                    <form onSubmit={handleCreateUser} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <Input
                                name="newUsername"
                                value={newUserUsername}
                                onChange={(e) => setNewUserUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <Input
                                type="password"
                                name="newPassword"
                                value={newUserPassword}
                                onChange={(e) => setNewUserPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select
                                value={newUserRole}
                                onChange={(e) => setNewUserRole(e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring focus:ring-brand-green focus:ring-opacity-50 p-2 border"
                            >
                                <option value="media">Media (Badge Printing Only)</option>
                                <option value="manager">Manager (View Stats & Data)</option>
                                <option value="admin">Admin (Full Access)</option>
                            </select>
                        </div>
                        <Button type="submit" className="w-full">Create User</Button>
                    </form>
                </div>

                {/* User List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Existing Users</h3>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {users.map((u) => (
                            <li key={u.id} className="px-6 py-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{u.username}</p>
                                    <select
                                        value={u.role}
                                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                        className={`mt-1 text-xs font-medium capitalize rounded border-0 py-0.5 pl-2 pr-6 cursor-pointer focus:ring-2 focus:ring-brand-green sm:text-xs
                                            ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                u.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'}`}
                                    >
                                        <option value="media">media</option>
                                        <option value="manager">manager</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-sm text-gray-500">
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </div>
                                    <button
                                        onClick={() => openResetModal(u)}
                                        className="p-1 text-gray-400 hover:text-brand-green transition-colors"
                                        title="Reset Password"
                                    >
                                        <Key size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(u.id)}
                                        className="p-1 text-red-400 hover:text-red-600 transition-colors"
                                        title="Delete User"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Password Reset Modal */}
            <Modal
                isOpen={!!resetUserId}
                onClose={() => setResetUserId(null)}
                title={`Reset Password for ${resetUsername}`}
            >
                <form onSubmit={handlePasswordReset} className="space-y-4">
                    {resetError && <div className="p-3 bg-red-100 text-red-700 rounded text-sm">{resetError}</div>}
                    {resetSuccess && <div className="p-3 bg-green-100 text-green-700 rounded text-sm">{resetSuccess}</div>}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <Input
                            name="newPassword"
                            type="password"
                            value={resetPassword}
                            onChange={(e) => setResetPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <Input
                            name="confirmPassword"
                            type="password"
                            value={resetConfirm}
                            onChange={(e) => setResetConfirm(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setResetUserId(null)}>Cancel</Button>
                        <Button type="submit">Reset Password</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white min-h-screen flex-shrink-0">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-xl font-bold text-brand-gold">GTCIS Admin</h1>
                </div>
                <nav className="p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-brand-green text-white' : 'hover:bg-gray-800 text-gray-400'}`}
                    >
                        <LayoutDashboard size={20} /> Dashboard
                    </button>

                    <button
                        onClick={() => setActiveTab('registrants')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'registrants' ? 'bg-brand-green text-white' : 'hover:bg-gray-800 text-gray-400'}`}
                    >
                        <FileText size={20} /> Registrants
                    </button>

                    {role === 'admin' && (
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-brand-green text-white' : 'hover:bg-gray-800 text-gray-400'}`}
                        >
                            <Users size={20} /> Users
                        </button>
                    )}
                </nav>
                <div className="p-4 mt-auto border-t border-gray-800 absolute bottom-0 w-64">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'registrants' && renderRegistrantList()}
                {activeTab === 'users' && role === 'admin' && renderUserManagement()}
            </div>

            {/* Registrant Details Modal */}
            <Modal
                isOpen={!!selectedRegistrant}
                onClose={() => setSelectedRegistrant(null)}
                title="Registrant Details"
            >
                {selectedRegistrant && (
                    <div className="space-y-6">
                        {/* Personal Information */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Personal Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Title</label>
                                    <p className="text-sm font-medium text-gray-900">{selectedRegistrant.title || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Full Name</label>
                                    <p className="text-sm font-medium text-gray-900">
                                        {selectedRegistrant.firstName} {selectedRegistrant.lastName}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Email</label>
                                    <p className="text-sm font-medium text-gray-900">{selectedRegistrant.email || 'Not provided'}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Phone</label>
                                    <p className="text-sm font-medium text-gray-900">{selectedRegistrant.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Professional Information */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Professional Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Organization</label>
                                    <p className="text-sm font-medium text-gray-900">{selectedRegistrant.organization}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Job Title</label>
                                    <p className="text-sm font-medium text-gray-900">{selectedRegistrant.jobTitle || 'Not specified'}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Country</label>
                                    <p className="text-sm font-medium text-gray-900">{selectedRegistrant.country}</p>
                                </div>
                            </div>
                        </div>

                        {/* Field Visit Information */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Field Visit</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Interested in Field Visit</label>
                                    <p className="text-sm font-medium">
                                        {selectedRegistrant.fieldVisit ? (
                                            <span className="text-green-600 font-semibold">Yes</span>
                                        ) : (
                                            <span className="text-gray-500">No</span>
                                        )}
                                    </p>
                                </div>
                                {selectedRegistrant.fieldVisit && selectedRegistrant.fieldVisitLocation && (
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase">Preferred Location</label>
                                        <p className="text-sm font-medium text-gray-900">{selectedRegistrant.fieldVisitLocation}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Registration Status */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Registration Status</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Registration Date</label>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(selectedRegistrant.registrationDate).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Email Confirmation</label>
                                    <p className="text-sm font-medium">
                                        {selectedRegistrant.emailSent ? (
                                            <span className="flex items-center text-green-600">
                                                <CheckCircle size={16} className="mr-1" /> Sent
                                                {selectedRegistrant.emailSentAt && (
                                                    <span className="text-xs ml-2 text-gray-500">
                                                        ({new Date(selectedRegistrant.emailSentAt).toLocaleDateString()})
                                                    </span>
                                                )}
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-gray-500">
                                                <XCircle size={16} className="mr-1" /> Not Sent
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button
                                variant="outline"
                                onClick={() => handlePrint(selectedRegistrant.id)}
                            >
                                <Printer size={16} className="mr-2" />
                                Print Badge
                            </Button>
                            <Button onClick={() => setSelectedRegistrant(null)}>
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AdminDashboard;
