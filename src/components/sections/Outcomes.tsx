"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Container from '../ui/Container';

const Outcomes = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <section ref={ref} id="outcomes" className="relative py-32 overflow-hidden">
            {/* Parallax Background */}
            <div className="absolute inset-0 z-0">
                <motion.div style={{ y }} className="relative w-full h-[140%] -top-[20%]">
                     <Image
                        src="/gt_images/cocoa1.jpg"
                        alt="Cocoa farm background"
                        fill
                        className="object-cover"
                    />
                </motion.div>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/80" />
            </div>

            <Container className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 drop-shadow-lg">
                    Expected Outcomes
                </h2>
                <p className="text-xl md:text-2xl text-center text-gray-200 mb-16 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                    The Investment Summit seeks to achieve the following outcomes:
                </p>
                
                <div className="max-w-4xl mx-auto">
                    <ul className="grid gap-6 w-fit mx-auto">
                        {[
                            "Increased investment in the tree crop sector.",
                            "Enhanced collaboration among stakeholders in the industry.",
                            "Improved awareness of the potential of tree crops in contributing to Ghana's economy.",
                            "Strengthened partnerships between public and private sectors.",
                            "Promotion of sustainable practices in tree crop production and processing."
                        ].map((item, index) => (
                            <li key={index} className="group flex items-start gap-4">
                                <span className="mt-2.5 h-2.5 w-2.5 rounded-full bg-brand-gold flex-shrink-0 shadow-[0_0_8px_rgba(255,215,0,0.6)] group-hover:scale-150 transition-transform duration-300" />
                                <p className="text-xl md:text-2xl text-white leading-relaxed font-medium drop-shadow-sm group-hover:text-brand-gold transition-colors duration-300">
                                    {item}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </section>
    );
};

export default Outcomes;