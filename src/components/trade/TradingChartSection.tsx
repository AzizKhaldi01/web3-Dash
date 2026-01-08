'use client';

import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import styles from '@/styles/Trade.module.css';
import { Maximize2 } from 'lucide-react';
import { useTradeStore } from '@/stores/tradeStore';

const TradeChart = dynamic(() => import('@/components/trade/TradeChart'), {
    ssr: false,
    loading: () => <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading Chart...</div>
});

interface TradingChartSectionProps {
    candleData: any;
    mounted: boolean;
}

export const TradingChartSection = memo<TradingChartSectionProps>(({ candleData, mounted }) => {
    const { activeChartTab, setActiveChartTab } = useTradeStore();

    return (
        <div className={`card ${styles.chartCard}`}>
            <div className={styles.chartControls}>
                <div className={styles.chartTabs}>
                    {['Chart', 'Depth', 'Funding', 'Details'].map(tab => (
                        <span
                            key={tab}
                            className={`${styles.chartTab} ${activeChartTab === tab ? styles.chartTabActive : ''}`}
                            onClick={() => setActiveChartTab(tab)}
                            style={{ cursor: 'pointer' }}
                        >
                            {tab}
                        </span>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div className={styles.timeFilters} style={{ background: 'none' }}>
                        {['1m', '5m', '15m', '1h', '4h', '1d', '1w'].map(t => (
                            <button key={t} className={`${styles.timeBtn} ${t === '1h' ? styles.timeBtnActive : ''}`}>{t}</button>
                        ))}
                    </div>
                    <Maximize2 size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                </div>
            </div>

            <div className={styles.chartWrapper}>
                {mounted && (
                    <TradeChart data={candleData} />
                )}
            </div>
        </div>
    );
});

TradingChartSection.displayName = 'TradingChartSection';
