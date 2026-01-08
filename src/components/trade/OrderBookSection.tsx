'use client';

import React, { memo } from 'react';
import styles from '@/styles/Trade.module.css';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronDown, TrendingUp } from 'lucide-react';
import { useTradeStore } from '@/stores/tradeStore';

const ASKS = [
    { price: '1,700.50', size: '15.00', sum: '13.06M', depth: 80 },
    { price: '1,680.25', size: '1.06K', sum: '114.17M', depth: 65 },
    { price: '1,660.00', size: '1.5K', sum: '46.72M', depth: 50 },
    { price: '1,655.75', size: '521.5', sum: '960.47K', depth: 40 },
    { price: '1,652.10', size: '86.71', sum: '6.74M', depth: 30 },
    { price: '1,650.45', size: '75.51', sum: '1.47M', depth: 20 },
    { price: '1,649.80', size: '39.08', sum: '741.06K', depth: 15 },
    { price: '1,648.90', size: '864.86', sum: '226.06M', depth: 10 },
];

const BIDS = [
    { price: '1,647.35', size: '96.00', sum: '16.06M', depth: 10 },
    { price: '1,645.20', size: '4.56K', sum: '78.41M', depth: 25 },
    { price: '1,642.15', size: '19.72', sum: '341.71M', depth: 40 },
    { price: '1,640.00', size: '8.52K', sum: '961.22M', depth: 55 },
    { price: '1,638.50', size: '131.10', sum: '721.58M', depth: 70 },
    { price: '1,635.75', size: '14.79K', sum: '42.06M', depth: 85 },
    { price: '1,632.40', size: '56.78K', sum: '44.99M', depth: 90 },
    { price: '1,630.10', size: '12.12K', sum: '91.27M', depth: 95 },
];

const TRADES = [
    { price: '1,648.35', size: '0.452', time: '14:22:01', side: 'buy' },
    { price: '1,648.30', size: '1.205', time: '14:21:58', side: 'sell' },
    { price: '1,648.35', size: '0.012', time: '14:21:55', side: 'buy' },
    { price: '1,648.40', size: '5.000', time: '14:21:50', side: 'buy' },
    { price: '1,648.25', size: '0.890', time: '14:21:45', side: 'sell' },
    { price: '1,648.35', size: '2.145', time: '14:21:42', side: 'buy' },
];

export const OrderBookSection = memo(() => {
    const { activeBookTab, setActiveBookTab, currentPrice } = useTradeStore();

    return (
        <div className={styles.orderBook}>
            <div className={`card`} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className={styles.chartTabs} style={{ marginBottom: 4 }}>
                    {['Order Book', 'Market Trades'].map(tab => (
                        <span
                            key={tab}
                            className={`${styles.chartTab} ${activeBookTab === tab ? styles.chartTabActive : ''}`}
                            onClick={() => setActiveBookTab(tab)}
                            style={{ cursor: 'pointer', fontSize: 12 }}
                        >
                            {tab}
                        </span>
                    ))}
                </div>

                {activeBookTab === 'Order Book' ? (
                    <>
                        <div className={styles.bookHeader}>
                            <div style={{ display: 'flex', gap: 8, fontSize: 11, color: 'var(--text-muted)' }}>
                                <span>Precision</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#1c2127', padding: '2px 6px', borderRadius: 4 }}>
                                    <span>0.01</span>
                                    <ChevronDown size={12} />
                                </div>
                            </div>
                        </div>
                        <Table className={styles.bookTable}>
                            <TableHeader>
                                <TableRow className="border-none hover:bg-transparent">
                                    <TableHead className="h-8 text-[var(--text-muted)] font-medium text-[11px]">Price (USDT)</TableHead>
                                    <TableHead className="h-8 text-[var(--text-muted)] font-medium text-[11px] text-right">Size (ETH)</TableHead>
                                    <TableHead className="h-8 text-[var(--text-muted)] font-medium text-[11px] text-right">Sum (USDT)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ASKS.map((row, i) => (
                                    <TableRow key={i} className="border-none hover:bg-[var(--glass)] relative group h-6 cursor-pointer">
                                        <TableCell className="py-1 text-[var(--danger)] text-[11px] z-10">{row.price}</TableCell>
                                        <TableCell className="py-1 text-right text-[11px] z-10">{row.size}</TableCell>
                                        <TableCell className="py-1 text-right text-[11px] z-10">{row.sum}</TableCell>
                                        <div
                                            className={styles.depthBar}
                                            style={{
                                                width: `${row.depth}%`,
                                                background: 'var(--danger)',
                                                position: 'absolute',
                                                right: 0,
                                                top: 0,
                                                bottom: 0,
                                                zIndex: 0,
                                                opacity: 0.1,
                                                pointerEvents: 'none'
                                            }}
                                        />
                                    </TableRow>
                                ))}
                                <TableRow className="border-none hover:bg-transparent">
                                    <TableCell colSpan={3} className="py-4 text-center">
                                        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                            {currentPrice.toFixed(2)}
                                            <TrendingUp size={16} />
                                        </div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Index: {(currentPrice - 0.05).toFixed(2)}</div>
                                    </TableCell>
                                </TableRow>
                                {BIDS.map((row, i) => (
                                    <TableRow key={i} className="border-none hover:bg-[var(--glass)] relative group h-6 cursor-pointer">
                                        <TableCell className="py-1 text-[var(--success)] text-[11px] z-10">{row.price}</TableCell>
                                        <TableCell className="py-1 text-right text-[11px] z-10">{row.size}</TableCell>
                                        <TableCell className="py-1 text-right text-[11px] z-10">{row.sum}</TableCell>
                                        <div
                                            className={styles.depthBar}
                                            style={{
                                                width: `${row.depth}%`,
                                                background: 'var(--success)',
                                                position: 'absolute',
                                                right: 0,
                                                top: 0,
                                                bottom: 0,
                                                zIndex: 0,
                                                opacity: 0.1,
                                                pointerEvents: 'none'
                                            }}
                                        />
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </>
                ) : (
                    <Table className={styles.bookTable}>
                        <TableHeader>
                            <TableRow className="border-none hover:bg-transparent">
                                <TableHead className="h-8 text-[var(--text-muted)] font-medium text-[11px]">Price (USDT)</TableHead>
                                <TableHead className="h-8 text-[var(--text-muted)] font-medium text-[11px] text-right">Size (ETH)</TableHead>
                                <TableHead className="h-8 text-[var(--text-muted)] font-medium text-[11px] text-right">Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {TRADES.map((trade, i) => (
                                <TableRow key={i} className="border-none hover:bg-[var(--glass)] h-6 cursor-pointer">
                                    <TableCell className={`py-1 text-[11px] ${trade.side === 'buy' ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
                                        {trade.price}
                                    </TableCell>
                                    <TableCell className="py-1 text-right text-[11px]">{trade.size}</TableCell>
                                    <TableCell className="py-1 text-right text-[11px] text-[var(--text-muted)]">{trade.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
});

OrderBookSection.displayName = 'OrderBookSection';
