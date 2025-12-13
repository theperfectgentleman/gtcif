'use client';

import React from 'react';
import { motion } from 'framer-motion';

const FloatingLeaf = ({ delay = 0, left = '50%' }) => (
    <motion.div
        className="absolute top-0 z-0 pointer-events-none text-brand-green opacity-30"
        style={{ left }}
        animate={{
            y: ['-10%', '110%'],
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,14,5.25,9,6.25S2,11.5,2,13.5a6.22,6.22,0,0,0,1.75,3.75C7,8,17,8,17,8Z" />
        </svg>
    </motion.div>
);

const FallingLeaves = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <FloatingLeaf left="10%" delay={0} />
            <FloatingLeaf left="20%" delay={8} />
            <FloatingLeaf left="30%" delay={5} />
            <FloatingLeaf left="50%" delay={2} />
            <FloatingLeaf left="70%" delay={10} />
            <FloatingLeaf left="80%" delay={3} />
            <FloatingLeaf left="90%" delay={7} />
        </div>
    );
};

export default FallingLeaves;
