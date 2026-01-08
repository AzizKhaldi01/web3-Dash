'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
};

export const CTASection = memo(() => {
    return (
        <motion.section
            {...fadeInUp}
            className="py-32 px-8 max-w-[1200px] mx-auto text-center relative overflow-hidden"
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#4fffa8] blur-[150px] opacity-5 rounded-full pointer-events-none" />

            <div className="relative z-10">
                <h2 className="text-[3rem] md:text-[5rem] font-light leading-[1] mb-8 tracking-[-2px]">
                    Ready to <span className="text-[#4fffa8]">elevate</span> your<br />
                    trading experience?
                </h2>
                <p className="text-[#888] text-lg mb-12 max-w-[600px] mx-auto">
                    Join 93m+ users and start managing your Web3 portfolio with professional-grade tools today.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link href="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#4fffa8] text-black px-10 py-4 rounded-full font-semibold text-lg shadow-[0_0_30px_rgba(79,255,168,0.3)]"
                        >
                            Get Started Now
                        </motion.button>
                    </Link>
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 rounded-full font-semibold text-lg border border-white/10 text-white transition-colors"
                    >
                        View Documentation
                    </motion.button>
                </div>
            </div>
        </motion.section>
    );
});

CTASection.displayName = 'CTASection';
