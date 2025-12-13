"use client";

import Image, { type StaticImageData } from 'next/image';
import React from 'react';

type LogoItem = {
    src: StaticImageData;
    alt: string;
};

type LogoSliderProps = {
    logos: LogoItem[];
    className?: string;
};

const LogoSlider: React.FC<LogoSliderProps> = ({ logos, className }) => {
    const pageSize = 4;
    const totalPages = Math.max(1, Math.ceil(logos.length / pageSize));
    const [page, setPage] = React.useState(0);
    const [isFading, setIsFading] = React.useState(false);

    React.useEffect(() => {
        if (logos.length <= pageSize) return;

        const intervalMs = 3200;
        const fadeMs = 350;

        const id = setInterval(() => {
            setIsFading(true);
            window.setTimeout(() => {
                setPage((prev) => (prev + 1) % totalPages);
                setIsFading(false);
            }, fadeMs);
        }, intervalMs);

        return () => {
            clearInterval(id);
        };
    }, [logos.length, totalPages]);

    const visible = React.useMemo(() => {
        if (logos.length === 0) return [] as LogoItem[];
        const start = page * pageSize;
        return Array.from({ length: Math.min(pageSize, logos.length) }, (_, i) => logos[(start + i) % logos.length]);
    }, [logos, page]);

    return (
        <div className={className} aria-label="Organizers logos">
            <div
                className={`grid grid-cols-2 sm:grid-cols-4 gap-4 transition-opacity duration-300 motion-reduce:transition-none ${
                    isFading ? 'opacity-0' : 'opacity-100'
                }`}
            >
                {visible.map((logo) => (
                    <div key={logo.alt} className="rounded-xl bg-white border border-gray-200 shadow-sm h-24 flex items-center justify-center px-4">
                        <div className="relative h-14 w-full">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                fill
                                sizes="(min-width: 640px) 25vw, 50vw"
                                className="object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogoSlider;
