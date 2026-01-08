'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Zap, Smile, ArrowUpRight as ArrowIcon } from 'lucide-react';
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

export const AboutSection = memo(() => {
    return (
        <motion.section
            {...fadeInUp}
            className="py-12 md:py-16 lg:py-32 px-4 md:px-8 max-w-[1200px] mx-auto text-left"
        >
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-white/10 rounded-[20px] text-xs md:text-sm uppercase tracking-wider mb-6 md:mb-8 border border-white/10">
                <span>01</span> About <span className="text-[#4fffa8]">*</span> Web3 dashboard
            </div>
            <h2 className="text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.3] md:leading-[1.2] font-normal text-white">
                <TextReveal text="Our team" type="word" />
                <span className="inline-flex items-center justify-center bg-[#4fffa8] text-black px-3 h-10 rounded-lg text-base font-semibold mx-2 align-middle -translate-y-1">
                    +
                </span>
                <TextReveal text="has been creating" type="word" />
                <span
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "#1a1a1a",
                        border: "1px solid #333",
                        verticalAlign: "middle",
                        transform: "translateY(-4px)",
                        margin: "0 8px",
                    }}
                >
                    <Zap size={18} fill="#fff" />
                </span>
                <TextReveal text="a unique and powerful crypto and fintech product for" type="word" />
                <span className="inline-flex items-center justify-center bg-[#4fffa8] text-black px-3 h-10 rounded-lg text-base font-semibold mx-2 align-middle -translate-y-1">
                    <span style={{ color: "#4fffa8", marginRight: 6 }}>*</span>
                    Web3 dashboard
                </span>
                <TextReveal text="5 years. A team of 20+" type="word" />
                <span
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "#fff",
                        color: "#000",
                        verticalAlign: "middle",
                        transform: "translateY(-4px)",
                        margin: "0 8px",
                    }}
                >
                    <Smile size={20} strokeWidth={2.5} />
                </span>
                <TextReveal text="people." type="word" />
            </h2>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-16 items-start"
            >
                {/* Card 1: Constant Monitoring */}
                <motion.div
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                    className="flex flex-col group/card"
                >
                    <div className="bg-white/5 backdrop-blur-sm rounded-[20px] md:rounded-[24px] h-[320px] md:h-[380px] relative overflow-hidden mb-4 md:mb-6 flex items-center justify-center border border-white/10 transition-all duration-500 group-hover:border-[#4fffa8]/30 group-hover:shadow-[0_20px_50px_rgba(79,255,168,0.1)]">
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[120px] h-[120px] border border-[#4fffa8]/20 rounded-full flex items-center justify-center">
                            <div className="w-[80px] h-[80px] border border-[#4fffa8]/40 rounded-full animate-pulse" />
                        </div>
                        <div className="absolute top-5 left-[30px] w-[60px] h-10 border border-white/10 rounded-lg bg-white/5" />
                        <div className="absolute top-5 right-[30px] w-[60px] h-10 border border-white/10 rounded-lg bg-white/5" />
                        <div className="relative">
                            <div className="absolute inset-0 blur-xl bg-[#4fffa8] opacity-20" />
                            <div className="text-[3rem] text-[#4fffa8] font-light relative">*</div>
                        </div>
                        <div className="absolute bottom-6 left-6 flex gap-2">
                            <div className="bg-[#4fffa8]/10 text-[#4fffa8] border border-[#4fffa8]/20 px-5 py-2 rounded-full font-medium text-[0.85rem]">Domain</div>
                            <div className="bg-[#4fffa8]/10 text-[#4fffa8] border border-[#4fffa8]/20 px-5 py-2 rounded-full font-medium text-[0.85rem]">Website</div>
                        </div>
                    </div>
                    <div className="px-2">
                        <h3 className="text-[1.2rem] md:text-[1.4rem] font-medium text-white mb-2">Constant monitoring</h3>
                        <p className="text-xs md:text-sm text-[#888] leading-relaxed">Monitor domains, websites, app stores and other platforms in real-time.</p>
                    </div>
                </motion.div>

                {/* Card 2: AI-based Detection */}
                <motion.div
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                    className="h-full group/card"
                >
                    <div className="bg-[#4fffa8] px-6 py-5 mb-5 rounded-[24px] flex justify-between items-center font-semibold text-[1.1rem] text-black transition-all duration-500 group-hover:shadow-[0_10px_40px_rgba(79,255,168,0.4)]">
                        <span>SHARE IT</span>
                        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
                            <ArrowIcon size={16} />
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-[20px] md:rounded-[24px] min-h-[320px] md:min-h-[370px] flex flex-col items-center justify-center relative p-6 md:p-8 mb-4 md:mb-6 border border-white/10 transition-all duration-500 group-hover:border-[#4fffa8]/30 group-hover:shadow-[0_20px_50px_rgba(79,255,168,0.1)]">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#4fffa8] blur-[80px] opacity-10" />
                        <div className="flex flex-col items-center justify-center flex-1 relative z-10">
                            <div className="text-[5rem] -mb-5 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">🎩</div>
                            <div className="text-[4rem] text-[#4fffa8] font-light leading-[0.8] animate-pulse">*</div>
                        </div>
                        <div className="bg-[#4fffa8] text-black px-8 py-3 rounded-full text-[0.9rem] font-bold mt-4 shadow-[0_0_20px_rgba(79,255,168,0.3)] relative z-10">Scam detected!</div>
                    </div>
                    <div className="px-2">
                        <h3 className="text-[1.2rem] md:text-[1.4rem] font-medium text-white mb-2">AI-based detection</h3>
                        <p className="text-xs md:text-sm text-[#888] leading-relaxed">Out of the box detection for phishing, brand infringement, scams and typosquat attacks.</p>
                    </div>
                </motion.div>

                {/* Card 3: Automatic Triage */}
                <motion.div
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                    className="flex flex-col group/card"
                >
                    <div className="bg-white/5 backdrop-blur-sm rounded-[24px] h-[380px] relative overflow-hidden mb-6 flex items-center justify-center border border-white/10 transition-all duration-500 group-hover:border-[#4fffa8]/30 group-hover:shadow-[0_20px_50px_rgba(79,255,168,0.1)]">
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] animate-[spin_10s_linear_infinite]">
                            <svg viewBox="0 0 200 200" width="100%" height="100%">
                                <defs>
                                    <path id="circlePath" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" fill="none" />
                                </defs>
                                <text fontSize="10" fill="#4fffa8" fillOpacity="0.4" letterSpacing="2">
                                    <textPath href="#circlePath">
                                        THREAT NEUTRALIZER • AUTO TRIAGE • REAL-TIME PROTECTION •
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 blur-2xl bg-[#4fffa8] opacity-30" />
                            <div className="text-[4rem] text-[#4fffa8] font-light relative z-10">*</div>
                        </div>
                        <div className="absolute bottom-12 left-[15%] bg-white/5 border border-white/10 px-5 py-2 rounded-full text-[0.75rem] text-[#888] -rotate-[15deg] backdrop-blur-md">Threat</div>
                        <div className="absolute bottom-6 left-[35%] bg-white/5 border border-white/10 px-5 py-2 rounded-full text-[0.75rem] text-[#888] rotate-[5deg] backdrop-blur-md">Threat</div>
                        <div className="absolute bottom-[60px] right-[20%] bg-[#4fffa8]/10 border border-[#4fffa8]/20 px-5 py-2 rounded-full text-[0.75rem] text-[#4fffa8] -rotate-[5deg] backdrop-blur-md">Neutralized</div>
                    </div>
                    <div className="px-2">
                        <h3 className="text-[1.2rem] md:text-[1.4rem] font-medium text-white mb-2">Automatic triage</h3>
                        <p className="text-xs md:text-sm text-[#888] leading-relaxed">Neutralize threats without human intervention using our automated response system.</p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
});

AboutSection.displayName = 'AboutSection';
