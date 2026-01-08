'use client';

import React, { memo } from 'react';
import { MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';
import styles from '@/styles/Dashboard.module.css';
import dynamic from 'next/dynamic';
import type { DashboardAsset } from '@/stores/dashboardStore';

const MiniChart = dynamic(() => import('@/components/dashboard/MiniChart'), {
    ssr: false,
    loading: () => <div style={{ height: '40px', width: '80px', background: 'var(--glass)', borderRadius: 4 }} />
});

interface AssetCardProps {
    asset: DashboardAsset;
    isSelected: boolean;
    onSelect: (symbol: string) => void;
}

export const AssetCard = memo<AssetCardProps>(({ asset, isSelected, onSelect }) => {
    const isProfit = asset.profit.startsWith('+');

    return (
        <div
            className={`card ${styles.assetCard} ${isSelected ? styles.assetCardActive : ''}`}
            onClick={() => onSelect(asset.symbol)}
        >
            <div className={styles.assetHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className={styles.assetIcon} style={{ background: asset.color }}>
                        {asset.symbol[0]}
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{asset.name}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{asset.rate}</div>
                    </div>
                </div>
                <MoreHorizontal size={16} color="var(--text-muted)" />
            </div>

            <div className={styles.assetMain}>
                <div>
                    <div className={styles.assetValue}>{asset.balance} {asset.symbol}</div>
                    <div className={styles.assetSubValue}>{asset.usdValue}</div>
                </div>
                <div className={styles.miniChartContainer}>
                    <MiniChart color={asset.color} data={asset.sparkline} />
                </div>
            </div>

            <div className={styles.assetProfit}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    color: isProfit ? 'var(--success)' : 'var(--danger)'
                }}>
                    {isProfit ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span style={{ fontWeight: 600 }}>{asset.profitPct}</span>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                    {asset.profit}
                </div>
            </div>

            <div className={styles.assetActions}>
                <button className={styles.actionBtn}>Swap</button>
                <button className={styles.actionBtn}>Send</button>
            </div>
        </div>
    );
});

AssetCard.displayName = 'AssetCard';
