'use client';

import React, { memo } from 'react';
import styles from '@/styles/Trade.module.css';
import { ChevronDown } from 'lucide-react';
import { useTradeStore } from '@/stores/tradeStore';

export const TradingPanel = memo(() => {
    const {
        orderType,
        setOrderType,
        side,
        setSide,
        marginType,
        setMarginType,
        leverage,
        setLeverage,
        price,
        setPrice,
        amount,
        setAmount,
    } = useTradeStore();

    return (
        <div className={styles.tradingPanel}>
            <div className={styles.orderTypeToggle}>
                {['Isolated', 'Cross'].map(t => (
                    <button
                        key={t}
                        className={`${styles.typeBtn} ${marginType === t ? styles.typeBtnActive : ''}`}
                        onClick={() => setMarginType(t)}
                    >
                        {t}
                    </button>
                ))}
                <div style={{ width: 1, background: 'var(--card-border)', margin: '4px 0' }} />
                <button className={styles.typeBtn} style={{ color: 'var(--primary)' }}>{leverage}x</button>
            </div>

            <div className={styles.sideToggle}>
                <button
                    className={`${styles.sideBtn} ${side === 'Long' ? styles.longActive : ''}`}
                    onClick={() => setSide('Long')}
                >
                    Long
                </button>
                <button
                    className={`${styles.sideBtn} ${side === 'Short' ? styles.shortActive : ''}`}
                    onClick={() => setSide('Short')}
                >
                    Short
                </button>
            </div>

            <div className={styles.orderTypeToggle}>
                {['Market', 'Limit', 'Stop'].map(t => (
                    <button
                        key={t}
                        className={`${styles.typeBtn} ${orderType === t ? styles.typeBtnActive : ''}`}
                        onClick={() => setOrderType(t)}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className={styles.inputField}>
                <div className={styles.inputLabel}>
                    <span>Order Price</span>
                    <span>Limit</span>
                </div>
                <div className={styles.inputWrapper}>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>USDT</span>
                </div>
            </div>

            <div className={styles.inputField}>
                <div className={styles.inputLabel}>
                    <span>Leverage</span>
                    <span>{leverage}x</span>
                </div>
                <div className={styles.leverageSlider} onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const pct = Math.round((x / rect.width) * 100);
                    setLeverage(Math.max(1, Math.min(125, pct)));
                }}>
                    <div className={styles.sliderHandle} style={{ left: `${(leverage / 125) * 100}%` }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)' }}>
                    <span>1x</span>
                    <span>25x</span>
                    <span>50x</span>
                    <span>75x</span>
                    <span>100x</span>
                    <span>125x</span>
                </div>
            </div>

            <div className={styles.inputField}>
                <div className={styles.inputLabel}>
                    <span>Position Amount</span>
                    <span>Available: 90,000 USDT</span>
                </div>
                <div className={styles.inputWrapper}>
                    <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
                        USDT <ChevronDown size={12} />
                    </div>
                </div>
            </div>

            <button
                className={styles.placeOrderBtn}
                style={{
                    background: side === 'Long' ? 'var(--success)' : 'var(--danger)',
                    color: side === 'Long' ? '#000' : '#fff'
                }}
            >
                {side} ETH
            </button>

            <div className={styles.marginInfo}>
                <div className={styles.infoRow}>
                    <span>Margin Balance</span>
                    <span className={styles.infoValue}>101,200</span>
                </div>
                <div className={styles.infoRow}>
                    <span>USDT Wallet balance</span>
                    <span className={styles.infoValue}>100,000</span>
                </div>
                <div className={styles.infoRow}>
                    <span>Unrealized PNL</span>
                    <span className={styles.infoValue} style={{ color: 'var(--success)' }}>+8,000 / +12%</span>
                </div>
                <div className={styles.infoRow}>
                    <span>Free Margin</span>
                    <span className={styles.infoValue}>90,000 USDT</span>
                </div>
            </div>
        </div>
    );
});

TradingPanel.displayName = 'TradingPanel';
