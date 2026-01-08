'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
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

export const Footer = memo(() => {
    return (
        <footer className="border-t border-white/10 pt-20 pb-10 px-8 bg-[#020202]">
            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-16"
            >
                <motion.div variants={fadeInUp} className="flex flex-col gap-4">
                    <div className="text-2xl font-bold tracking-widest text-[#4fffa8] uppercase mb-2">
                        <TextReveal text="BlockTrade" type="char" />
                    </div>
                    <p className="text-[#888] leading-relaxed max-w-[300px]">Professional Web3 analytics and trading dashboard for the modern investor.</p>
                    <div className="flex gap-4 mt-8">
                        {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                            <Link key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#4fffa8] hover:border-[#4fffa8] hover:bg-[#4fffa8]/5 transition-all">
                                <Icon size={18} />
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {[
                    { title: 'Platform', links: ['Dashboard', 'Trade', 'Portfolio', 'Analytics'] },
                    { title: 'Resources', links: ['Documentation', 'API Reference', 'Security', 'Terms of Use'] },
                    { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] }
                ].map((col, i) => (
                    <motion.div variants={fadeInUp} key={i} className="[&>h4]:text-white [&>h4]:font-semibold [&>h4]:mb-6 [&>ul]:list-none [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-3 [&>ul>li>a]:text-[#888] [&>ul>li>a]:transition-all [&>ul>li>a:hover]:text-[#4fffa8] [&>ul>li>a:hover]:pl-1">
                        <h4>{col.title}</h4>
                        <ul>
                            {col.links.map((link, j) => (
                                <li key={j}><Link href="#">{link}</Link></li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
            <div className="max-w-[1200px] mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 justify-between text-[#666] text-sm">
                <div>© 2026 BlockTrade. All rights reserved.</div>
                <div className="flex gap-8">
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';
