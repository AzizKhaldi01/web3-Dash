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

const pulse = {
    animate: {
        boxShadow: [
            "0 0 0 0px rgba(79, 255, 168, 0)",
            "0 0 0 15px rgba(79, 255, 168, 0.1)",
            "0 0 0 0px rgba(79, 255, 168, 0)"
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" as const
        }
    }
};

export const TradeSection = memo(() => {
    return (
        <motion.section
            {...fadeInUp}
            className="py-20 px-8 max-w-[1200px] mx-auto"
        >
            <h2 className="text-[2rem] md:text-[2.5rem] leading-tight font-medium text-white mb-12 max-w-[600px]">
                <TextReveal text="Trade Crypto And Gain Exposure To Other Asset Classes." type="word" />
            </h2>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
                {/* Card 1: Identity Verification */}
                <motion.div variants={fadeInUp} className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 flex flex-col items-start hover:border-[#4fffa8]/30 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-[#4fffa8]/20 flex items-center justify-center text-[#4fffa8] mb-6 group-hover:scale-110 transition-transform">
                        <div className="w-4 h-4 border-2 border-current rounded-full flex items-center justify-center">
                            <div className="w-2 h-1 border-l-2 border-b-2 border-current rotate-[-45deg] -mt-0.5" />
                        </div>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">Complete Identity Verification</h3>
                    <p className="text-[#888] text-sm leading-relaxed mb-8">
                        Complete your identity verification seamlessly to unlock full access to trading, withdrawals, and advanced account security features.
                    </p>
                    <button className="mt-auto px-6 py-2 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                        Verify
                    </button>
                </motion.div>

                {/* Card 2: 2FA */}
                <motion.div variants={fadeInUp} className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 flex flex-col items-start hover:border-[#4fffa8]/30 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-[#4fffa8]/20 flex items-center justify-center text-[#4fffa8] mb-6 group-hover:scale-110 transition-transform">
                        <div className="w-4 h-5 border-2 border-current rounded-sm flex items-center justify-center relative">
                            <div className="absolute -top-1.5 w-3 h-3 border-t-2 border-l-2 border-r-2 border-current rounded-t-full" />
                        </div>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">2-factor Authentication (2FA)</h3>
                    <p className="text-[#888] text-sm leading-relaxed mb-8">
                        Enable 2-Factor Authentication (2FA) to add an extra layer of security, ensuring your account stays safe from unauthorized access.
                    </p>
                    <button className="mt-auto px-6 py-2 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                        Enable
                    </button>
                </motion.div>

                {/* Card 3: Start Trading */}
                <motion.div variants={fadeInUp} className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 flex flex-col items-start hover:border-[#4fffa8]/30 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-[#4fffa8]/20 flex items-center justify-center text-[#4fffa8] mb-6 group-hover:scale-110 transition-transform">
                        <div className="w-4 h-4 border-2 border-current rounded-full flex items-center justify-center">
                            <div className="w-2 h-1 border-l-2 border-b-2 border-current rotate-[-45deg] -mt-0.5" />
                        </div>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">Start Trading Instantly</h3>
                    <p className="text-[#888] text-sm leading-relaxed mb-8">
                        Buy crypto with just one click. Offering a fast, easy, and secure way to start trading digital assets immediately.
                    </p>
                    <button className="mt-auto px-6 py-2 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                        Buy Crypto
                    </button>
                </motion.div>

                {/* Card 4: VIP Level */}
                <motion.div variants={fadeInUp} className="bg-[#1a1a1a] p-6 rounded-3xl border border-white/5 flex flex-col hover:border-[#4fffa8]/30 transition-colors">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2 text-white font-medium">
                            <div className="w-5 h-5 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-xs">V</div>
                            VIP Lv. 0
                        </div>
                        <span className="text-xs text-[#4fffa8] cursor-pointer">View more &gt;</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#888] mb-2">
                        <span>Spot fee rate</span>
                        <span>Futures fee rate</span>
                    </div>
                    <div className="flex justify-between text-sm text-white font-medium mb-6">
                        <div className="flex gap-4">
                            <span>0.22 %</span>
                            <span>0.22 %</span>
                        </div>
                        <div className="flex gap-4">
                            <span>0.02 %</span>
                            <span>0.05 %</span>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <div className="flex justify-between text-xs text-[#888] mb-2">
                            <span>KCS holdings</span>
                            <span>1 of 2</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-[#4fffa8] rounded-full" />
                        </div>
                        <p className="text-[10px] text-[#666] mt-2">Increase your KCS holdings to upgrade next level.</p>
                    </div>
                </motion.div>

                {/* Card 5: Wallet Balance */}
                <motion.div
                    variants={fadeInUp}
                    className="bg-[#4fffa8] p-6 rounded-3xl border border-white/5 flex flex-col relative overflow-hidden group"
                >
                    <motion.div
                        variants={pulse}
                        animate="animate"
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                    />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                    <div className="flex gap-2 mb-6 relative z-10">
                        <button className="px-3 py-1 bg-black/20 rounded text-xs font-medium hover:bg-black/30 transition-colors">Buy crypto</button>
                        <button className="px-3 py-1 bg-black/20 rounded text-xs font-medium hover:bg-black/30 transition-colors">Deposit</button>
                        <button className="px-3 py-1 bg-black/20 rounded text-xs font-medium hover:bg-black/30 transition-colors">Withdraw</button>
                    </div>

                    <div className="mt-auto relative z-10">
                        <div className="text-xs text-white/70 mb-1">Total asset</div>
                        <div className="text-2xl font-bold text-white mb-1">0.17554271 BTC</div>
                        <div className="text-sm text-white/70">≈ $5,375.37 USD</div>
                    </div>

                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                        <span className="text-2xl">₿</span>
                    </div>
                </motion.div>

                {/* Card 6: Deposit Methods */}
                <motion.div variants={fadeInUp} className="bg-[#1a1a1a] p-6 rounded-3xl border border-white/5 flex flex-col hover:border-[#4fffa8]/30 transition-colors">
                    <h3 className="text-white font-medium mb-6">Deposit or buy crypto through these methods.</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group/item">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#4fffa8]/20 flex items-center justify-center text-[#4fffa8]">
                                    <div className="w-4 h-3 bg-current rounded-sm" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-white">Buy Crypto</div>
                                    <div className="text-xs text-[#666]">Visa, Mastercard, etc.</div>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[#666] group-hover/item:border-white/30 group-hover/item:text-white transition-all">
                                <span className="text-xs">→</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group/item">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#4fffa8]/20 flex items-center justify-center text-[#4fffa8]">
                                    <div className="w-4 h-4 rounded-full border-2 border-current" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-white">Deposit</div>
                                    <div className="text-xs text-[#666]">Deposit crypto directly</div>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[#666] group-hover/item:border-white/30 group-hover/item:text-white transition-all">
                                <span className="text-xs">→</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
});

TradeSection.displayName = 'TradeSection';
