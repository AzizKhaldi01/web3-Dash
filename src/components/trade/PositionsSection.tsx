'use client';

import React, { memo } from 'react';
import styles from '@/styles/Trade.module.css';
import { Chat } from '@/components/trade/Chat';
import { useTradeStore } from '@/stores/tradeStore';

const POSITIONS = [
    { pair: 'ETH-USDT', side: 'Short', size: '10.00', entry: '2,540', margin: '1,700.00', pnl: '-315.2 USDT', pnlPct: '-18.7%', color: 'var(--danger)' },
    { pair: 'ETH-USDT', side: 'Long', size: '14.39', entry: '2,177', margin: '1,750.60', pnl: '+842.1 USDT', pnlPct: '+12.4%', color: 'var(--success)' },
];

export const PositionsSection = memo(() => {
    const { activeBottomTab, setActiveBottomTab } = useTradeStore();

    return (
        <div className={`card ${styles.positionsCard}`}>
            <div className={styles.chartTabs} style={{ marginBottom: 16 }}>
                {['Positions', 'Orders', 'History', 'Chat'].map(tab => (
                    <span
                        key={tab}
                        className={`${styles.chartTab} ${activeBottomTab === tab ? styles.chartTabActive : ''}`}
                        onClick={() => setActiveBottomTab(tab)}
                        style={{ cursor: 'pointer' }}
                    >
                        {tab === 'Positions' ? 'Open Positions (2)' : tab}
                    </span>
                ))}
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {activeBottomTab === 'Chat' ? (
                    <Chat />
                ) : activeBottomTab === 'Positions' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {POSITIONS.map((pos, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '12px',
                                    background: '#1c2127',
                                    borderRadius: '8px',
                                    border: '1px solid var(--card-border)',
                                    transition: 'transform 0.2s',
                                    cursor: 'pointer'
                                }}
                                className="hover:scale-[1.01]"
                            >
                                <div style={{ display: 'flex', gap: 24 }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 700 }}>{pos.pair}</div>
                                        <div style={{ fontSize: 11, color: pos.color }}>{pos.side} {pos.size}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Entry Price</div>
                                        <div style={{ fontSize: 12 }}>{pos.entry}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Margin</div>
                                        <div style={{ fontSize: 12 }}>{pos.margin}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Unrealized PNL</div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: pos.color }}>{pos.pnl} ({pos.pnlPct})</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: 13 }}>
                        No {activeBottomTab.toLowerCase()} to display
                    </div>
                )}
            </div>
        </div>
    );
});

PositionsSection.displayName = 'PositionsSection';
