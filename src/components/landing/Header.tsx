'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    scrolled: boolean;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
}

export const Header = memo(({ scrolled, mobileMenuOpen, setMobileMenuOpen }: HeaderProps) => {
    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-4 md:px-6 lg:px-16 transition-all duration-300 ${scrolled ? 'py-3 md:py-4 bg-black/80 backdrop-blur-lg border-b border-white/5' : 'py-4 md:py-6 bg-transparent'}`}>
                <div className="flex-1">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 md:gap-4"
                    >
                        <div className="inline-flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 border border-white/10 rounded-[30px] text-xs md:text-sm font-medium">
                            <span className="text-[#4fffa8]">*</span> Web3 dashboard
                        </div>
                        <div className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest text-white/40">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fffa8] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4fffa8]"></span>
                            </span>
                            Live Status
                        </div>
                    </motion.div>
                </div>
                <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
                    <Link href="#" className=" no-underline text-[0.85rem] transition-colors hover:text-[#4fffa8] tracking-[0.5px]">About</Link>
                    <Link href="#" className=" no-underline text-[0.85rem] transition-colors hover:text-[#4fffa8] tracking-[0.5px]">Products</Link>
                    <Link href="#" className=" no-underline text-[0.85rem] transition-colors hover:text-[#4fffa8] tracking-[0.5px]">Solutions</Link>
                    <Link href="#" className=" no-underline text-[0.85rem] transition-colors hover:text-[#4fffa8] tracking-[0.5px]">Company</Link>
                </nav>
                <div className="flex-1 flex justify-end items-center gap-3 md:gap-4">
                    <Link href="/dashboard" className="hidden sm:block">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#4fffa8] text-black px-4 md:px-6 py-2 md:py-2.5 rounded-[20px] font-medium border border-[#4fffa8] cursor-pointer transition-all hover:bg-[#4fffa8]/90 text-[0.75rem] md:text-[0.85rem] shadow-[0_0_20px_rgba(79,255,168,0.2)]"
                        >
                            Launch App
                        </motion.button>
                    </Link>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-[72px] left-0 right-0 z-[99] bg-black/95 backdrop-blur-lg border-b border-white/5 md:hidden"
                    >
                        <nav className="flex flex-col px-6 py-6 gap-4">
                            <Link href="#" className="text-white no-underline text-base transition-colors hover:text-[#4fffa8] py-2">About</Link>
                            <Link href="#" className="text-white no-underline text-base transition-colors hover:text-[#4fffa8] py-2">Products</Link>
                            <Link href="#" className="text-white no-underline text-base transition-colors hover:text-[#4fffa8] py-2">Solutions</Link>
                            <Link href="#" className="text-white no-underline text-base transition-colors hover:text-[#4fffa8] py-2">Company</Link>
                            <Link href="/dashboard" className="mt-4">
                                <button className="w-full bg-[#4fffa8] text-black px-6 py-3 rounded-[20px] font-medium border border-[#4fffa8] transition-all hover:bg-[#4fffa8]/90 text-base shadow-[0_0_20px_rgba(79,255,168,0.2)]">
                                    Launch App
                                </button>
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
});

Header.displayName = 'Header';
