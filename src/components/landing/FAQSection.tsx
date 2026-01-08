'use client';

import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { TextReveal } from '@/components/ui/TextReveal';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
};

export const FAQSection = memo(() => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className='flex flex-col lg:flex-row w-full items-center justify-center mx-auto max-w-[1200px] gap-12'>
            <div className="w-full max-w-[400px] h-[400px] lg:h-[600px] relative pointer-events-none mt-8 lg:mt-0 order-2 lg:order-1">
                <Spline
                    scene="https://prod.spline.design/Y1RACMlfues-TBhe/scene.splinecode"
                />
            </div>
            <motion.section
                {...fadeInUp}
                className="py-16 md:py-32 px-8 w-full lg:max-w-[600px] text-left order-1 lg:order-2"
            >
                <div className="flex flex-col justify-center mb-16">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-[20px] text-sm uppercase tracking-wider mb-8 border border-white/10">
                            <span>04</span> FAQ
                        </div>
                        <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.2] font-normal text-white">
                            <TextReveal text="Common" type="word" />
                            <span className="inline-flex items-center justify-center bg-[#1a1a1a] border border-[#333] text-white px-3 h-10 rounded-lg text-base font-semibold mx-2 align-middle -translate-y-1">
                                <TextReveal text="Questions" type="char" delay={0.5} />
                            </span>
                            <TextReveal text="." type="char" delay={0.8} />
                        </h2>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {[
                        { q: 'Is BlockTrade secure?', a: 'Yes, BlockTrade is a non-custodial platform. We never have access to your private keys or funds.' },
                        { q: 'Which chains are supported?', a: 'We currently support Ethereum, Binance Smart Chain, Polygon, Arbitrum, and Optimism.' },
                        { q: 'Are there any fees?', a: 'Portfolio tracking is free. We charge a small 0.1% fee on swaps to maintain the platform.' }
                    ].map((item, i) => (
                        <div key={i} className="border-b border-white/10 py-6 cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                            <div className="flex justify-between items-center text-xl font-medium text-white">
                                {item.q}
                                {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                            </div>
                            {openFaq === i && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="text-[#888] mt-4 leading-relaxed overflow-hidden"
                                >
                                    {item.a}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
});

FAQSection.displayName = 'FAQSection';
