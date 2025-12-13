'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Bird = ({ delay = 0, duration = 20, top = '10%', scale = 1 }) => (
    <motion.div
        className="absolute z-0 pointer-events-none opacity-60"
        style={{ top, left: '-100px' }}
        animate={{
            x: ['-10vw', '110vw'],
            y: [0, -50, 0, 50, 0],
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: "linear"
        }}
    >
        <svg width={40 * scale} height={40 * scale} viewBox="0 0 24 24" fill="currentColor" className="text-brand-green">
            <path d="M21.414 4.586a2 2 0 0 0-2.828 0L12 11.172 5.414 4.586a2 2 0 0 0-2.828 2.828L9.172 14l-6.586 6.586a2 2 0 0 0 2.828 2.828L12 16.828l6.586 6.586a2 2 0 0 0 2.828-2.828L14.828 14l6.586-6.586a2 2 0 0 0 0-2.828z" opacity="0" />
            {/* Simple Bird Silhouette */}
            <path d="M23,9c0,0-4-2-7-1c0,0-3-3-6,0c0,0-3-1-5,2c0,0,4,2,6,1c0,0,3,2,5-1C16,10,20,11,23,9z" />
            <path d="M10,10c0,0-3,3-6,1c0,0,3-2,5-2C9,9,10,9,10,10z" />
        </svg>
    </motion.div>
);

const Butterfly = ({ delay = 0, top = '50%', left = '10%' }) => (
    <motion.div
        className="absolute z-0 pointer-events-none text-brand-gold opacity-40"
        style={{ top, left }}
        animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            rotate: [0, 5, -5, 0],
        }}
        transition={{
            duration: 4,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
    >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-1 5c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm-7 2c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm16 0c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z" />
        </svg>
    </motion.div>
);

const FloatingLeaf = ({ delay = 0, left = '50%' }) => (
    <motion.div
        className="absolute top-0 z-0 pointer-events-none text-brand-green opacity-20"
        style={{ left }}
        animate={{
            y: ['-10vh', '110vh'],
            rotate: [0, 360],
            x: [0, 50, -50, 0]
        }}
        transition={{
            duration: 15,
            repeat: Infinity,
            delay: delay,
            ease: "linear"
        }}
    >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,14,5.25,9,6.25S2,11.5,2,13.5a6.22,6.22,0,0,0,1.75,3.75C7,8,17,8,17,8Z" />
        </svg>
    </motion.div>
);

const NatureDecorations = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Birds flying across */}
            <Bird top="15%" duration={25} delay={0} />
            <Bird top="25%" duration={30} delay={10} scale={0.8} />
            <Bird top="8%" duration={22} delay={5} scale={0.6} />

            {/* Butterflies hovering */}
            <Butterfly top="40%" left="15%" delay={0} />
            <Butterfly top="60%" left="85%" delay={2} />
            <Butterfly top="80%" left="10%" delay={4} />
        </div>
    );
};

export default NatureDecorations;
