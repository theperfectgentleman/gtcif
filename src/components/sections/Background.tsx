"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Container from '../ui/Container';

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
                <div className="space-y-8 text-xl md:text-2xl text-gray-200 font-medium leading-relaxed max-w-5xl mx-auto drop-shadow-md">
                    <p>
                        In line with the Government of Ghana’s Resetting Agenda, led by His Excellency John Dramani Mahama, the Tree Crops Development Authority (TCDA) seeks to highlight its commitment to the Government of Ghana’s Agriculture for Economic Transformation Agenda (AETA).
                    </p>
                    <p>
                        This event presents a unique opportunity to engage key stakeholders and attract new investment into the industry. The National Tree Crops Investment Fair & Business Forum aims to drive investments, raise awareness, promote the sector, and strengthen collaboration among diverse partners.
                    </p>
                    <p className="text-white font-semibold">
                        Join us as we showcase the value and potential of tree crops as a significant contributor to Ghana’s economy.
                    </p>
                </div>
            </Container>
        </section>
    );
};

export default Background;