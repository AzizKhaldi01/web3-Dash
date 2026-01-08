'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
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

export const Roadmap = memo(() => {
    return (
        <motion.section
            {...fadeInUp}
            className="py-16 md:py-32 px-8 max-w-[1200px] mx-auto text-left"
        >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-[20px] text-sm uppercase tracking-wider mb-8 border border-white/10">
                <span>03</span> Roadmap
            </div>
            <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.2] font-normal text-white">
                <TextReveal text="The future of" type="word" />
                <span className="inline-flex items-center justify-center bg-[#4fffa8] text-black px-3 h-10 rounded-lg text-base font-semibold mx-2 align-middle -translate-y-1">
                    <TextReveal text="Trading" type="char" delay={0.5} />
                </span>
                <TextReveal text="." type="char" delay={0.8} />
            </h2>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 relative before:content-[''] before:absolute before:top-[7px] before:left-0 before:w-full before:h-[2px] before:bg-white/10 before:hidden lg:before:block"
            >
                {[
                    { date: 'Q1 2026', title: 'Beta Launch', desc: 'Public beta launch with core portfolio and swap features.' },
                    { date: 'Q2 2026', title: 'Pro Trading', desc: 'Institutional-grade trading tools and advanced charting.' },
                    { date: 'Q3 2026', title: 'AI Analytics', desc: 'Predictive analytics and whale tracking system.' },
                    { date: 'Q4 2026', title: 'Mobile App', desc: 'Native iOS and Android applications for trading on the go.' }
                ].map((item, i) => (
                    <motion.div variants={fadeInUp} key={i} className="relative pt-8">
                        <div className="w-4 h-4 bg-[#4fffa8] rounded-full absolute top-0 left-0 border-[3px] border-[#050505]" />
                        <div className="text-[#4fffa8] font-semibold mb-2 text-sm">{item.date}</div>
                        <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                        <p className="text-[#888] text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
});

Roadmap.displayName = 'Roadmap';
