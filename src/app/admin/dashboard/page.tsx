'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, LayoutDashboard, FileText, UserPlus, LogOut, Search, Printer, Key } from 'lucide-react';
import Container from '../../../components/ui/Container';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';

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
        } catch (err) {
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
        } catch (err) {
            setResetError('An error occurred');
        }
    };

    const handleLogout = () => {
        document.cookie = 'admin_session=; Max-Age=0; path=/;';
        document.cookie = 'admin_role=; Max-Age=0; path=/;';
        router.push('/admin');
    };

    const filteredRegistrants = registrants.filter(reg => 
        reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <p className="text-3xl font-bold">{new Set(registrants.map(r => r.country)).size}</p>
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
                            <p className="text-3xl font-bold">{new Set(registrants.map(r => r.organization)).size}</p>
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
                <div className="relative">
                    <Input 
                        name="search"
                        placeholder="Search..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
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
                            {filteredRegistrants.map((reg) => (
                                <tr key={reg.id} className="hover:bg-gray-50">
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
                                            className="text-brand-green hover:text-brand-gold flex items-center gap-1"
                                            title="Print Badge"
                                        >
                                            <Printer size={16} /> Print
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredRegistrants.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">No results found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
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
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                        ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                                          u.role === 'manager' ? 'bg-blue-100 text-blue-800' : 
                                          'bg-green-100 text-green-800'}`}>
                                        {u.role}
                                    </span>
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
                            type="password"
                            value={resetPassword}
                            onChange={(e) => setResetPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <Input
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
        </div>
    );
};

export default AdminDashboard;
