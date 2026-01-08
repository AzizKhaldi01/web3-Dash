'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { TextReveal } from '@/components/ui/TextReveal';
import dynamic from 'next/dynamic';

const DashboardPreview = dynamic(() => import('@/components/landing/DashboardPreview'), { ssr: false });

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
};

const floating = {
    animate: {
        y: [0, -15, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut" as const
        }
    }
};

export const ExchangePreview = memo(() => {
    return (
        <motion.section
            {...fadeInUp}
            className="py-20 px-8 max-w-[1200px] mx-auto text-center"
        >
            <h2 className="text-[2rem] md:text-[3rem] leading-tight font-medium text-white mb-6">
                <TextReveal text="Your Favourite Crypto Exchange,&#10;Plus A Whole Lot More!" type="word" />
            </h2>
            <div className="text-[#888] max-w-[800px] mx-auto mb-16 text-lg">
                <TextReveal text="Discover everything you expect from your favorite crypto exchange, plus innovative tools and features designed to elevate your trading experience." type="word" />
            </div>

            <motion.div
                variants={floating}
                animate="animate"
                className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f0f] aspect-[16/9] group"
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div className="scale-[0.55] origin-top-left w-[181.8%] h-[181.8%] pointer-events-none select-none p-8">
                        <DashboardPreview />
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
});

ExchangePreview.displayName = 'ExchangePreview';
