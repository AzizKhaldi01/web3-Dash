'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Wallet,
    LineChart,
    BarChart3,
    Settings,
    Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './BottomNav.module.css';

const navItems = [
    { icon: LayoutDashboard, label: 'Home', href: '/' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: LineChart, label: 'Trade', href: '/trade' },
    { icon: Wallet, label: 'Portfolio', href: '/portfolio' },
    { icon: Users, label: 'Affiliate', href: '/affiliate' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className={styles.bottomNav}>
            <div className={styles.container}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                        >
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className={styles.iconWrapper}
                            >
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            </motion.div>
                            <span className={styles.label}>{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className={styles.indicator}
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
