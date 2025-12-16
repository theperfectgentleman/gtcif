"use client";

import React, { useEffect, useMemo, useState } from 'react';
import type { CountdownProps } from '@/types';

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const targetMs = useMemo(() => targetDate.getTime(), [targetDate]);
    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        setMounted(true);
        setTimeLeft(Math.max(0, targetMs - Date.now()));

        const timer = window.setInterval(() => {
            setTimeLeft(Math.max(0, targetMs - Date.now()));
        }, 1000);

        return () => window.clearInterval(timer);
    }, [targetMs]);

    // Avoid SSR/CSR mismatches by not rendering a time snapshot on the server.
    if (!mounted) return null;

    const formatTimeLeft = (time: number) => {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const { days, hours, minutes, seconds } = formatTimeLeft(timeLeft);

    return (
            <div className="mt-10">
                <h2 className="text-sm uppercase tracking-widest text-white/80 mb-4 font-semibold">Countdown to GTCIS 2026</h2>

                <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg w-24 h-24 shadow-lg">
                        <div className="text-3xl font-bold text-white">{days}</div>
                        <div className="text-xs uppercase tracking-widest text-brand-gold font-semibold mt-1">Days</div>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg w-24 h-24 shadow-lg">
                        <div className="text-3xl font-bold text-white">{hours}</div>
                        <div className="text-xs uppercase tracking-widest text-brand-gold font-semibold mt-1">Hours</div>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg w-24 h-24 shadow-lg">
                        <div className="text-3xl font-bold text-white">{minutes}</div>
                        <div className="text-xs uppercase tracking-widest text-brand-gold font-semibold mt-1">Mins</div>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg w-24 h-24 shadow-lg">
                        <div className="text-3xl font-bold text-white">{seconds}</div>
                        <div className="text-xs uppercase tracking-widest text-brand-gold font-semibold mt-1">Secs</div>
                    </div>
                </div>
            </div>
    );
};

export default Countdown;