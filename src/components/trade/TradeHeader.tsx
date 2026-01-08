'use client';

import React, { memo } from 'react';
import styles from '@/styles/Trade.module.css';
import { ChevronDown, Info, Settings, Activity } from 'lucide-react';
import { useTradeStore } from '@/stores/tradeStore';

export const TradeHeader = memo(() => {
    const currentPrice = useTradeStore((state) => state.currentPrice);

    return (
        <div className={styles.assetHeader}>
            <div className={styles.pairInfo}>
                <div className={styles.pairName}>
                    <span style={{ color: 'var(--success)' }}>{currentPrice.toFixed(2)}</span>
                    ETH-USDT
                    <ChevronDown size={16} />
                </div>
                <div className={styles.pairType}>
                    Perpetual <Activity size={12} style={{ display: 'inline', marginLeft: 4 }} />
                </div>
            </div>

            <div className={styles.metric}>
                <span className={styles.metricLabel}>Mark</span>
                <span className={styles.metricValue}>{currentPrice.toFixed(2)}</span>
            </div>
            <div className={styles.metric}>
                <span className={styles.metricLabel}>Index</span>
                <span className={styles.metricValue}>{(currentPrice - 0.05).toFixed(2)}</span>
            </div>
            <div className={styles.metric}>
                <span className={styles.metricLabel}>Funding / Countdown</span>
                <span className={styles.metricValue} style={{ color: 'var(--primary)' }}>0.0044% / 00:38:34</span>
            </div>
            <div className={styles.metric}>
                <span className={styles.metricLabel}>24H Change</span>
                <span className={styles.metricValue} style={{ color: 'var(--danger)' }}>-11.60 -0.44%</span>
            </div>
            <div className={styles.metric}>
                <span className={styles.metricLabel}>24H High / Low</span>
                <span className={styles.metricValue}>1,677 / 1,635</span>
            </div>
            <div className={styles.metric}>
                <span className={styles.metricLabel}>24H Volume</span>
                <span className={styles.metricValue}>335K / 804M</span>
            </div>
            <div className={styles.headerActions}>
                <Info size={18} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                <Settings size={18} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </div>
        </div>
    );
});

TradeHeader.displayName = 'TradeHeader';
