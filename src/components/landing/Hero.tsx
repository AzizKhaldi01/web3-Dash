'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight as ArrowIcon } from 'lucide-react';
import { TextReveal } from '@/components/ui/TextReveal';
import dynamic from 'next/dynamic';

const FloatingLines = dynamic(() => import('@/components/landing/FloatingLines'), { ssr: false });

export const Hero = memo(() => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen text-center pt-24 md:pt-32 pb-16 px-8 relative z-[2]">
            <div className="absolute inset-0 w-full h-full -z-[1] pointer-events-none">
                <FloatingLines
                    enabledWaves={['top', 'middle', 'bottom']}
                    lineCount={[10, 15, 20]}
                    lineDistance={[8, 6, 4]}
                    bendRadius={5.0}
                    bendStrength={-0.5}
                    interactive={true}
                    parallax={true}
                    linesGradient={['#4fffa8', '#2dd4bf', '#06b6d4']}
                    mixBlendMode="screen"
                />
            </div>

            <div className="relative z-[5] flex flex-col items-center text-center px-4">
                <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-medium leading-[1.1] mb-4 md:mb-6 tracking-[-1px] md:tracking-[-2px] max-w-[1000px]">
                    <TextReveal text="The Gateway to" type="word" delay={0.2} />
                    <br />
                    <TextReveal text="Institutional Capital" type="word" delay={0.4} />
                </h1>

                <div className="text-base sm:text-lg md:text-xl mb-8 md:mb-12 max-w-[650px] leading-relaxed px-4">
                    <TextReveal text="The sole gateway for institutional DeFi access. Join us to transform your institution's financial landscape" delay={0.6} />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto px-4">
                    <Link href="/dashboard" className="w-full sm:w-auto">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ delay: 0.8 }}
                            className="w-full sm:w-auto bg-[#4fffa8] text-black px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-[0_0_30px_rgba(79,255,168,0.2)]"
                        >
                            Launch app
                        </motion.button>
                    </Link>
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ delay: 0.9 }}
                        className="hidden sm:flex w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full bg-white/5 border border-white/10 text-white items-center justify-center hover:bg-white/10 transition-all"
                    >
                        <ArrowIcon size={20} className="sm:w-6 sm:h-6 -rotate-45" />
                    </motion.button>
                </div>
            </div>
        </main>
    );
});

Hero.displayName = 'Hero';
