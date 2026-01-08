'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowUpRight as ArrowIcon } from 'lucide-react';
import { TextReveal } from '@/components/ui/TextReveal';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
};

export const FeaturesGrid = memo(() => {
    return (
        <motion.section
            {...fadeInUp}
            className="py-24 px-8 max-w-[1200px] mx-auto"
        >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-[20px] text-sm uppercase tracking-wider mb-8 border border-white/10">
                <span>02</span> Features
            </div>
            <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.2] font-normal text-white mb-16">
                <TextReveal text="Advanced tools for" type="word" className="inline-block mr-3" />
                <span className="inline-flex items-center justify-center bg-[#1a1a1a] border border-[#333] text-white px-3 h-10 rounded-lg text-base font-semibold mx-2 align-middle -translate-y-1">
                    <TextReveal text="Modern" type="char" delay={0.5} />
                </span>
                <TextReveal text="traders." type="word" className="inline-block ml-3" delay={0.8} />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto md:h-[600px]">
                {/* Large Feature 1 */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="md:col-span-3 md:row-span-2 bg-white/5 border border-white/10 rounded-[32px] p-8 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#4fffa8] blur-[100px] opacity-10 -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity" />
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="w-12 h-12 rounded-2xl bg-[#4fffa8]/20 flex items-center justify-center text-[#4fffa8] mb-6">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-4">AI-Powered Analytics</h3>
                        <p className="text-[#888] leading-relaxed mb-8 max-w-[300px]">
                            Get deep insights into market trends with our proprietary AI models that track whale movements and social sentiment in real-time.
                        </p>
                        <div className="mt-auto">
                            <div className="flex gap-2 mb-4">
                                <div className="h-1 w-12 bg-[#4fffa8] rounded-full" />
                                <div className="h-1 w-8 bg-white/10 rounded-full" />
                                <div className="h-1 w-8 bg-white/10 rounded-full" />
                            </div>
                            <span className="text-sm text-white/40">Real-time processing active</span>
                        </div>
                    </div>
                </motion.div>

                {/* Small Feature 2 */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="md:col-span-3 bg-white/5 border border-white/10 rounded-[32px] p-8 relative overflow-hidden group"
                >
                    <div className="relative z-10 flex items-center justify-between h-full">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Multi-Chain Support</h3>
                            <p className="text-[#888] text-sm max-w-[200px]">Manage assets across 15+ EVM and non-EVM chains seamlessly.</p>
                        </div>
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-[#1a1a1a] border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold">
                                    {i === 4 ? '+12' : 'Ξ'}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Small Feature 3 */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="md:col-span-3 bg-white/5 border border-white/10 rounded-[32px] p-8 relative overflow-hidden group"
                >
                    <div className="relative z-10 flex items-center justify-between h-full">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Smart Alerts</h3>
                            <p className="text-[#888] text-sm max-w-[200px]">Never miss a move with personalized price and volume notifications.</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-[#4fffa8] transition-colors">
                            <ArrowIcon size={20} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
});

FeaturesGrid.displayName = 'FeaturesGrid';
