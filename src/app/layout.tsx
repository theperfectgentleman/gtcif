import React from 'react';
import './globals.css';

import Navbar from '../components/Navbar';
import Footer from '../components/sections/Footer';
import AppShell from '../components/AppShell';
import NatureDecorations from '../components/NatureDecorations';

export const metadata = {
    title: 'GTCIF 2026',
    description: '1st Ghana Tree Crops Investment Fair & Exhibition (GTCIF) 2026',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning className="relative">
                <AppShell>
                    <NatureDecorations />
                    <div className="flex min-h-screen flex-col relative z-10">
                        <Navbar />
                        <main className="flex-grow">{children}</main>
                        <Footer />
                    </div>
                </AppShell>
            </body>
        </html>
    );
}