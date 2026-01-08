'use client';

import React, { useMemo, useCallback } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import styles from '@/styles/Portfolio.module.css';
import dynamic from 'next/dynamic';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Filter, MoreHorizontal, Search } from 'lucide-react';
import { usePortfolioStore } from '@/stores/portfolioStore';
import { StatCard } from '@/components/portfolio/StatCard';
import { AssetRow } from '@/components/portfolio/AssetRow';
import { AllocationItem } from '@/components/portfolio/AllocationItem';

const AllocationChart = dynamic(() => import('@/components/dashboard/AllocationChart'), {
  ssr: false,
  loading: () => <div style={{ height: '280px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading Chart...</div>
});

const stats = [
  { label: 'Total Net Worth', value: '$106,712.79', change: '+$8,245.12 (8.4%)', trend: 'up' as const },
  { label: '24h Profit/Loss', value: '+$2,145.20', change: 'Across all assets', trend: 'up' as const, color: 'var(--success)' },
  { label: 'Best Performer', value: 'Solana', change: '+12.4% today', trend: 'up' as const },
  { label: 'Active Chains', value: '5 Web3 dashboards', change: 'ETH, BSC, POL, ARB, OP', trend: 'neutral' as const },
];

export default function PortfolioPage() {
  const { assets, searchQuery, setSearchQuery, totalNetWorth } = usePortfolioStore();

  // Memoize filtered assets based on search query
  const filteredAssets = useMemo(() => {
    if (!searchQuery.trim()) return assets;
    const query = searchQuery.toLowerCase();
    return assets.filter(asset =>
      asset.name.toLowerCase().includes(query) ||
      asset.symbol.toLowerCase().includes(query)
    );
  }, [assets, searchQuery]);

  // Memoize chart data
  const chartData = useMemo(() => ({
    labels: assets.map(a => a.symbol),
    values: assets.map(a => parseFloat(a.value.replace('$', '').replace(',', ''))),
    colors: assets.map(a => a.color)
  }), [assets]);

  // Memoize search handler
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, [setSearchQuery]);

  return (
    <MainLayout>
      <div className={styles.portfolio}>
        <div className={styles.header}>
          <div>
            <h1 className="outfit">Portfolio</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage and track your digital assets across multiple chains.</p>
          </div>
          <div className={styles.headerActions}>
            <button className={`btn-secondary ${styles.actionBtn}`}>
              <Download size={18} />
              <span className={styles.btnLabel} style={{ marginLeft: 8 }}>Export</span>
            </button>
            <button className={`btn-primary ${styles.actionBtn}`}>
              <Filter size={18} />
              <span className={styles.btnLabel} style={{ marginLeft: 8 }}>Filter</span>
            </button>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              trend={stat.trend}
              color={stat.color}
              index={i}
            />
          ))}
        </div>

        <div className={styles.mainContent}>
          <div className={`card ${styles.assetsCard}`}>
            <div className={styles.cardHeader}>
              <h3 className="outfit">Assets</h3>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Search size={14} style={{ position: 'absolute', left: 12, color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search assets..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--card-border)',
                      borderRadius: 8,
                      padding: '8px 12px 8px 32px',
                      fontSize: 13,
                      color: 'var(--foreground)',
                      width: 200
                    }}
                  />
                </div>
                <button className="iconBtn"><MoreHorizontal size={18} /></button>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[var(--card-border)] hover:bg-transparent">
                    <TableHead className="text-[var(--text-muted)] font-bold h-12 px-6">Asset</TableHead>
                    <TableHead className="text-[var(--text-muted)] font-bold h-12">Price</TableHead>
                    <TableHead className="text-[var(--text-muted)] font-bold h-12">Balance</TableHead>
                    <TableHead className="text-[var(--text-muted)] font-bold h-12">Value</TableHead>
                    <TableHead className="text-[var(--text-muted)] font-bold h-12 text-right px-6">24h Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.map((asset) => (
                    <AssetRow key={asset.symbol} asset={asset} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className={`card ${styles.allocationCard}`}>
            <h3 className="outfit" style={{ fontSize: 18 }}>Asset Allocation</h3>
            <div className={styles.chartContainer}>
              <AllocationChart data={chartData} />
            </div>
            <div className={styles.allocationList}>
              {assets.map((asset) => (
                <AllocationItem
                  key={asset.symbol}
                  asset={asset}
                  totalValue={totalNetWorth}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

