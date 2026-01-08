'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/Portfolio.module.css';

interface StatCardProps {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    color?: string;
    index: number;
}

export const StatCard = memo<StatCardProps>(({
    label,
    value,
    change,
    trend,
    color,
    index
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`card ${styles.statCard}`}
        >
            <span className={styles.statLabel}>{label}</span>
            <span className={styles.statValue} style={{ color }}>
                {value}
            </span>
            <span style={{
                color: trend === 'up'
                    ? 'var(--success)'
                    : trend === 'down'
                        ? 'var(--danger)'
                        : 'var(--text-muted)',
                fontSize: 12,
                fontWeight: 600
            }}>
                {change}
            </span>
        </motion.div>
    );
});

StatCard.displayName = 'StatCard';
