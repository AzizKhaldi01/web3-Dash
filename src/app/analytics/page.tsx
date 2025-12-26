'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import dynamic from 'next/dynamic';
import styles from './Analytics.module.css';
import { Activity, Globe, Zap, BarChart3, Filter } from 'lucide-react';
import { Skeleton, CardSkeleton, ChartSkeleton } from '@/components/ui/Skeleton';

const NetworkActivity = dynamic(() => import('@/components/analytics/NetworkActivity'), { ssr: false });
const MarketPulse = dynamic(() => import('@/components/analytics/MarketPulse'), { ssr: false });
const HeatmapChart = dynamic(() => import('@/components/analytics/HeatmapChart'), { ssr: false });
const FlowAnalysis = dynamic(() => import('@/components/analytics/FlowAnalysis'), { ssr: false });

export default function AnalyticsPage() {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <MainLayout>
            <div className={styles.analyticsContainer}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Market Analytics</h1>
                        <p className={styles.cardSubtitle}>Real-time on-chain data and market intelligence</p>
                    </div>
                    {!isLoading && (
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button className="btn-secondary" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Filter size={16} /> Filter
                            </button>
                            <button className="btn-primary" style={{ padding: '8px 16px' }}>Export CSV</button>
                        </div>
                    )}
                </div>

                {isLoading ? (
                    <div className={styles.grid}>
                        <div className={styles.largeCard}><ChartSkeleton /></div>
                        <div className={styles.sideCard}><ChartSkeleton /></div>
                        <div className={styles.midCard}><ChartSkeleton /></div>
                        <div className={styles.midCard}><ChartSkeleton /></div>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {/* Main Network Activity */}
                        <div className={`card ${styles.largeCard}`}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <h3 className={styles.cardTitle}>Network Activity</h3>
                                    <span className={styles.cardSubtitle}>Total Users and Transactions (24h)</span>
                                </div>
                                <Activity className="text-[var(--primary)]" size={20} />
                            </div>
                            <div className={styles.chartContainer}>
                                <NetworkActivity />
                            </div>
                        </div>

                        {/* Market Pulse */}
                        <div className={`card ${styles.sideCard}`}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <h3 className={styles.cardTitle}>Market Pulse</h3>
                                    <span className={styles.cardSubtitle}>Sentiment and Liquidity Radar</span>
                                </div>
                                <Zap className="text-yellow-500" size={20} />
                            </div>
                            <div className={styles.chartContainer}>
                                <MarketPulse />
                            </div>
                        </div>

                        {/* Flow Analysis */}
                        <div className={`card ${styles.midCard}`}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <h3 className={styles.cardTitle}>Cross-Chain Flow</h3>
                                    <span className={styles.cardSubtitle}>Volume migration between networks</span>
                                </div>
                                <Globe className="text-blue-500" size={20} />
                            </div>
                            <div className={styles.secondaryChartContainer}>
                                <FlowAnalysis />
                            </div>
                        </div>

                        {/* Asset Heatmap */}
                        <div className={`card ${styles.midCard}`}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <h3 className={styles.cardTitle}>Asset Dominance</h3>
                                    <span className={styles.cardSubtitle}>Market capitalization breakdown</span>
                                </div>
                                <BarChart3 className="text-[var(--primary)]" size={20} />
                            </div>
                            <div className={styles.secondaryChartContainer}>
                                <HeatmapChart />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
