'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight as ArrowIcon } from 'lucide-react';

interface BackToTopProps {
    scrolled: boolean;
}

export const BackToTop = memo(({ scrolled }: BackToTopProps) => {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#4fffa8] text-black flex items-center justify-center shadow-[0_0_20px_rgba(79,255,168,0.3)] z-[100] cursor-pointer hover:scale-110 transition-transform"
        >
            <ArrowIcon size={20} className="-rotate-90" />
        </motion.button>
    );
});

BackToTop.displayName = 'BackToTop';
