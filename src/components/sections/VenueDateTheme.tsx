"use client";

import React, { useEffect, useState } from 'react';
import Container from '../ui/Container';

type StatItemProps = {
    label: string;
    value: number | string;
    suffix?: string;
    isNumber?: boolean;
    delay?: number;
};

const StatItem: React.FC<StatItemProps> = ({ label, value, suffix, isNumber = true, delay = 0 }) => {
    const [count, setCount] = useState(0);
    const numericValue = typeof value === 'number' ? value : 0;

    useEffect(() => {
        if (!isNumber) return;
        
        let frameId: number;
        const duration = 2000;
        const start = performance.now() + delay;

        const tick = (now: number) => {
            if (now < start) {
                frameId = requestAnimationFrame(tick);
                return;
            }
            const progress = Math.min((now - start) / duration, 1);
            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);
            
            const current = Math.floor(ease * numericValue);
            setCount(current);
            if (progress < 1) {
                frameId = requestAnimationFrame(tick);
            }
        };

        frameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameId);
    }, [numericValue, isNumber, delay]);

    return (
        <div className="group flex flex-col items-center justify-center p-6 transition-all duration-300 cursor-default">
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight transform transition-transform duration-300 group-hover:scale-110 group-hover:text-brand-gold drop-shadow-sm">
                {isNumber ? count.toLocaleString() : value}
                {suffix}
            </div>
            <div className="text-sm md:text-base font-bold text-white/70 uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-white">
                {label}
            </div>
        </div>
    );
};

const VenueDateTheme = () => {
    return (
        <section className="relative z-20 bg-brand-green w-full py-12 border-t border-white/10 shadow-2xl">
             {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <Container className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y md:divide-y-0 lg:divide-x divide-white/20">
                    {/* Date */}
                    <StatItem 
                        value="Feb 17-20" 
                        label="Date (2026)" 
                        isNumber={false}
                    />

                    {/* Venue */}
                    <StatItem 
                        value="AICC" 
                        label="Accra, Ghana" 
                        isNumber={false}
                    />

                    {/* Attendees */}
                    <StatItem 
                        value={10000} 
                        label="Attendees" 
                        suffix="+" 
                        delay={200}
                    />

                    {/* Exhibitors */}
                    <StatItem 
                        value={450} 
                        label="Exhibitors" 
                        suffix="+" 
                        delay={400}
                    />
                </div>
            </Container>
        </section>
    );
};

export default VenueDateTheme;