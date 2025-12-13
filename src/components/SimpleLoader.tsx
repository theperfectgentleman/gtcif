import React from 'react';

const SimpleLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
            <div className="flex flex-col items-center">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-brand-green rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-brand-green font-bold text-xl">GTCIF</span>
                    </div>
                </div>
                <p className="mt-4 text-brand-black font-medium animate-pulse">Loading...</p>
            </div>
        </div>
    );
};

export default SimpleLoader;
