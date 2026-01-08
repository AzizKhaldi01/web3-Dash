'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight as ArrowIcon } from 'lucide-react';
import { TextReveal } from '@/components/ui/TextReveal';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } }
};

export const Investors = memo(() => {
    return (
        <motion.section
            {...fadeInUp}
            className="py-24 px-8 w-full flex flex-col items-center justify-center text-left"
        >
            <div className="flex items-left gap-4 mb-6">
                <span className="text-sm text-white/40">02</span>
                <div className="px-5 py-1.5 bg-white/10 rounded-full text-sm border border-white/10">
                    Investors of <span className="text-[#4fffa8]">*</span> Web3 dashboard
                </div>
            </div>

            <h2 className="text-[2.2rem] leading-tight font-normal text-white mb-14 text-center">
                <TextReveal text="Our investors of" type="word" />
                <span className="text-white/80 mx-2">*</span>
                <TextReveal text="Web3 dashboard project" type="word" />
            </h2>

            <div className="flex flex-col lg:flex-row items-center gap-10">
                <button className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 transition">
                    <ArrowLeft size={20} />
                </button>

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center items-center gap-8"
                >
                    <motion.div
                        variants={fadeInUp}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/60 cursor-pointer transition-colors hover:border-[#4fffa8]/50"
                    >
                        <span className="text-2xl">⛵</span>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/60 cursor-pointer transition-colors hover:border-[#4fffa8]/50"
                    >
                        <span className="text-2xl">❖</span>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/60 cursor-pointer transition-colors hover:border-[#4fffa8]/50"
                    >
                        <span className="text-2xl">🦅</span>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        whileHover={{ scale: 1.1 }}
                        className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#4fffa8] flex items-center justify-center text-black relative shadow-[0_0_40px_rgba(79,255,168,0.35)] cursor-pointer"
                    >
                        <span className="text-xl font-extrabold tracking-tight rotate-[-5deg]">
                            SLICE
                        </span>
                        <div className="absolute bottom-3 right-3 w-8 h-8 bg-black rounded-full flex items-center justify-center">
                            <ArrowIcon size={16} className="text-white" />
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/70 cursor-pointer transition-colors hover:border-[#4fffa8]/50"
                    >
                        <span className="text-sm font-medium">Petal</span>
                    </motion.div>
                </motion.div>

                <button className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 transition">
                    <ArrowRight size={20} />
                </button>
            </div>
        </motion.section>
    );
});

Investors.displayName = 'Investors';
