"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Container from '../ui/Container';
import Button from '../ui/Button';

const Background: React.FC = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <section ref={ref} id="background" className="relative py-32 overflow-hidden">
            {/* Parallax Background */}
            <div className="absolute inset-0 z-0">
                <motion.div style={{ y }} className="relative w-full h-[140%] -top-[20%]">
                     <Image
                        src="/gt_images/palm1.jpg"
                        alt="Palm plantation background"
                        fill
                        className="object-cover"
                    />
                </motion.div>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/80" />
            </div>

            <Container className="relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 drop-shadow-lg">
                    Background of the Event
                </h2>
                <div className="space-y-8 text-xl md:text-2xl text-gray-200 font-medium leading-relaxed max-w-4xl mx-auto drop-shadow-md mb-12">
                    <p>
                        The 1st Ghana Tree Crops Investment Summit (GTCIS) 2026 is a landmark event designed to position Ghana as a global powerhouse in the tree crop sector. Under the theme "Sustainable Growth Through Tree Crop Investments : Resetting and Building Ghana’s Green Economy", we aim to attract significant investment and modernize agriculture for economic transformation.
                    </p>
                </div>
                
                <div className="flex justify-center">
                    <Button href="/about" variant="primary" size="large" className="bg-brand-green hover:bg-green-700 text-white border-2 border-transparent hover:border-brand-gold">
                        Read More
                    </Button>
                </div>
            </Container>
        </section>
    );
};

export default Background;