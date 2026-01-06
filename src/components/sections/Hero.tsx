"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import Countdown from '../Countdown';
import Button from '../ui/Button';

const HERO_IMAGES = [
    '/gt_images/cashew1.jpg',
    '/gt_images/coconut1.jpg',
    '/gt_images/conference1.jpg',
    '/gt_images/conference2.jpg',
    '/gt_images/conference3.jpg',
    '/gt_images/conference4.jpg',
    '/gt_images/palm1.jpg',
    '/gt_images/palm2.jpg',
    '/gt_images/palm_drone.jpg',
];

const Hero: React.FC = () => {
    const reduceMotion = useReducedMotion();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [nextImageIndex, setNextImageIndex] = useState<number | null>(null);
    const [nextLoaded, setNextLoaded] = useState(false);

    useEffect(() => {
        // Randomly pick one image on load
        setCurrentImageIndex(Math.floor(Math.random() * HERO_IMAGES.length));
    }, []);

    useEffect(() => {
        const intervalMs = 6500;

        const interval = setInterval(() => {
            setNextLoaded(false);
            setNextImageIndex((prev) => {
                const base = prev ?? currentImageIndex;
                return (base + 1) % HERO_IMAGES.length;
            });
        }, intervalMs);

        return () => clearInterval(interval);
    }, [currentImageIndex, reduceMotion]);

    useEffect(() => {
        if (nextImageIndex === null) return;
        if (reduceMotion) {
            setCurrentImageIndex(nextImageIndex);
            setNextImageIndex(null);
            return;
        }

        if (!nextLoaded) return;
        const id = window.setTimeout(() => {
            setCurrentImageIndex(nextImageIndex);
            setNextImageIndex(null);
            setNextLoaded(false);
        }, 900);

        return () => window.clearTimeout(id);
    }, [nextImageIndex, nextLoaded, reduceMotion]);

    return (
        <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 bg-gray-900">
                <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: 1, scale: reduceMotion ? 1 : 1.08 }}
                    transition={{
                        opacity: { duration: 0.8 },
                        scale: { duration: 18, ease: 'easeOut' },
                    }}
                >
                    <Image
                        src={HERO_IMAGES[currentImageIndex]}
                        alt="Hero Background"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover scale-x-[-1]"
                    />
                </motion.div>

                {nextImageIndex !== null ? (
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: nextLoaded ? 1 : 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.9 }}
                    >
                        <Image
                            src={HERO_IMAGES[nextImageIndex]}
                            alt="Hero Background"
                            fill
                            sizes="100vw"
                            className="object-cover scale-x-[-1]"
                            onLoadingComplete={() => setNextLoaded(true)}
                        />
                    </motion.div>
                ) : null}

                {/* Premium overlays: vignette + brand-tinted gradient */}
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40 z-10" />
            </div>

            <div className="container mx-auto px-4 relative z-20">
                <div className="max-w-3xl pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                        <p className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-white/80 font-semibold">
                            Ghana Tree Crops Investment Summit
                        </p>
                        <h1 className="mt-4 text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                            <span className="text-brand-green bg-white/10 px-3 py-1 rounded-md backdrop-blur-sm">Green Revolution</span>
                        </h1>
                        <p className="text-sm md:text-base text-gray-100 mb-10 max-w-3xl leading-relaxed font-medium">
                            A strategic reset for sustainable economic prosperity.
                        </p>
                    </motion.div>
                    
                    <div className="mb-12">
                        <Countdown targetDate={new Date('2026-02-17T00:00:00Z')} />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Button href="/register" variant="primary" size="large" className="px-10 py-4 rounded-md font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 no-underline">
                            Register Now
                        </Button>
                        <Button href="#programme" variant="outline" size="large" className="border-2 border-white text-white hover:bg-white hover:text-brand-black px-10 py-4 rounded-md font-bold uppercase tracking-widest backdrop-blur-sm transition-all transform hover:-translate-y-1 no-underline">
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;