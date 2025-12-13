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
    const items = React.useMemo(() => [...logos, ...logos], [logos]);

    return (
        <div className={className} aria-label="Organizers logos">
            <div className="overflow-hidden">
                <div className="flex w-max gap-4 animate-logoMarquee motion-reduce:animate-none">
                    {items.map((logo, index) => (
                        <div
                            key={`${logo.alt}-${index}`}
                            className="shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/3"
                        >
                            <div className="h-24 w-[16rem] sm:w-[14rem] md:w-[16rem] rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center px-4">
                                <div className="relative h-14 w-full">
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        fill
                                        sizes="(min-width: 768px) 16rem, 14rem"
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogoSlider;
