'use client';

import React, { useMemo, useCallback } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import styles from '@/styles/Dashboard.module.css';
import {
  ChevronDown,
  Plus,
  Check,
  RefreshCw,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useDashboardStore } from '@/stores/dashboardStore';
import { AddAssetModal } from '@/components/dashboard/AddAssetModal';
import { AssetCard } from '@/components/dashboard/AssetCard';
import { TransactionRow } from '@/components/dashboard/TransactionRow';
import { TimeFilter } from '@/components/dashboard/TimeFilter';

const WalletChart = dynamic(() => import('@/components/dashboard/WalletChart'), {
  ssr: false,
  loading: () => <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading...</div>
});

const AllocationChart = dynamic(() => import('@/components/dashboard/AllocationChart'), {
  ssr: false,
  loading: () => <div style={{ height: '140px', width: '140px', borderRadius: '50%', border: '2px solid var(--card-border)' }} />
});

const chartDataMap: Record<string, any[]> = {
  '1D': [
    { time: '04:00', value: 400000 },
    { time: '06:00', value: 450000 },
    { time: '08:00', value: 420000 },
    { time: '10:00', value: 500000 },
    { time: '12:00', value: 480000 },
    { time: '14:00', value: 550000 },
    { time: '16:00', value: 600000 },
    { time: '18:00', value: 580000 },
    { time: '20:00', value: 700000 },
    { time: '00:00', value: 650000 },
  ],
  '7D': [
    { time: 'Mon', value: 400000 },
    { time: 'Tue', value: 480000 },
    { time: 'Wed', value: 450000 },
    { time: 'Thu', value: 520000 },
    { time: 'Fri', value: 600000 },
    { time: 'Sat', value: 580000 },
    { time: 'Sun', value: 650000 },
  ],
  '1M': [
    { time: 'Week 1', value: 400000 },
    { time: 'Week 2', value: 550000 },
    { time: 'Week 3', value: 500000 },
    { time: 'Week 4', value: 650000 },
  ],
  'ALL': [
    { time: '2021', value: 100000 },
    { time: '2022', value: 400000 },
    { time: '2023', value: 650000 },
  ]
};

const TIME_RANGES = ['1D', '7D', '1M', '3M', '6M', '1Y', 'ALL'];



setTimeout(() => {

}, 2000);


export default function DashboardPage() {
  const {
    assets,
    transactions,
    timeRange,
    historyRange,
    activeCard,
    payAmount,
    isTransferring,
    transferSuccess,
    selectedAsset,
    isAddModalOpen,
    addAsset,
    setTimeRange,
    setHistoryRange,
    setActiveCard,
    setPayAmount,
    setSelectedAsset,
    setIsAddModalOpen,
    handleTransfer,
  } = useDashboardStore();

  // Memoize chart data based on selected time range
  const currentChartData = useMemo(() =>
    chartDataMap[timeRange] || chartDataMap['1D'],
    [timeRange]
  );

  // Memoize receive amount calculation
  const receiveAmount = useMemo(() => {
    const amount = parseFloat(payAmount) || 0;
    return (amount * 1316.04).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, [payAmount]);

  // Memoize allocation chart data
  const allocationData = useMemo(() => ({
    labels: ['BTC', 'ETH', 'USDT', 'Other'],
    values: [40, 30, 20, 10],
    colors: ['#F7931A', '#627EEA', '#26A17B', '#707a8a']
  }), []);

  // Memoized callbacks
  const handleAssetSelect = useCallback((symbol: string) => {
    setSelectedAsset(symbol === selectedAsset ? null : symbol);
  }, [selectedAsset, setSelectedAsset]);

  const handlePayAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPayAmount(e.target.value);
  }, [setPayAmount]);

  const handleClearAmount = useCallback(() => {
    setPayAmount('0');
  }, [setPayAmount]);

  const handleAddAsset = useCallback((newAsset: any) => {
    addAsset(newAsset);
  }, [addAsset]);

  const handleCloseModal = useCallback(() => {
    setIsAddModalOpen(false);
  }, [setIsAddModalOpen]);

  const handleOpenModal = useCallback(() => {
    setIsAddModalOpen(true);
  }, [setIsAddModalOpen]);

  return (
    <MainLayout>
      <div className={styles.dashboard}>
        <div className={styles.mainContent}>
          {/* Top Row */}
          <div className={styles.topRow}>
            <div className={`card ${styles.balanceCard}`}>
              <div className={styles.balanceHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 16, height: 16, border: '1px solid var(--text-muted)', borderRadius: 4 }} />
                  <span>Balance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                  <span>USD</span>
                  <ChevronDown size={14} />
                </div>
              </div>
              <div className={styles.balanceAmount}>$1,180,577.24</div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 20, margin: '12px 0' }}>
                <div style={{ width: 140, height: 140 }}>
                  <AllocationChart data={allocationData} />
                </div>
                <div className={styles.balanceLegend} style={{ flex: 1, gridTemplateColumns: '1fr', gap: 8 }}>
                  <div className={styles.legendItem}><div className={styles.dot} style={{ background: '#F7931A' }} /> BTC (40%)</div>
                  <div className={styles.legendItem}><div className={styles.dot} style={{ background: '#627EEA' }} /> ETH (30%)</div>
                  <div className={styles.legendItem}><div className={styles.dot} style={{ background: '#26A17B' }} /> USDT (20%)</div>
                  <div className={styles.legendItem}><div className={styles.dot} style={{ background: '#707a8a' }} /> Other (10%)</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 12, borderTop: '1px solid var(--card-border)' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Profit today <ChevronDown size={10} /></div>
                  <div style={{ color: 'var(--success)', fontSize: 14, fontWeight: 600 }}>+$4,245.45</div>
                </div>
                <div style={{ color: 'var(--success)', fontSize: 14, fontWeight: 600 }}>+14.5%</div>
              </div>

            </div>

            <button className={`card ${styles.addCard}`} onClick={handleOpenModal}>
              <Plus size={20} />
              <span style={{ fontSize: 11, marginTop: 4, fontWeight: 600 }}>ADD</span>
            </button>

            {assets.map((asset) => (
              <AssetCard
                key={asset.symbol}
                asset={asset}
                isSelected={selectedAsset === asset.symbol}
                onSelect={handleAssetSelect}
              />
            ))}

          </div>
          <div className={styles.contentRow}>

            <div className={styles.leftColumn}>
              {/* Chart Section */}
              <div className={`card ${styles.chartCard}`}>
                <div className={styles.chartHeader}>
                  <h3 className="outfit" style={{ fontSize: 16 }}>My Wallets</h3>
                  <TimeFilter
                    options={TIME_RANGES}
                    selected={timeRange}
                    onSelect={setTimeRange}
                  />
                </div>
                <div style={{ height: '300px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: 'rgba(22, 26, 30, 0.8)', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--card-border)', fontSize: 12, backdropFilter: 'blur(4px)' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>My Balance</div>
                    <div style={{ fontWeight: 700 }}>$1,176,356.46 <span style={{ color: 'var(--success)' }}>+3.21%</span></div>
                  </div>
                  <WalletChart data={currentChartData} />
                </div>
              </div>

              {/* Transaction History */}
              <div className={`card ${styles.historyCard}`}>
                <div className={styles.chartHeader}>
                  <h3 className="outfit" style={{ fontSize: 16 }}>Transaction history</h3>
                  <TimeFilter
                    options={TIME_RANGES}
                    selected={historyRange}
                    onSelect={setHistoryRange}
                  />
                </div>
                <div className={styles.tableWrapper}>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-[var(--card-border)] hover:bg-transparent">
                        <TableHead className="text-[var(--text-muted)] font-medium h-10">Crypto trade</TableHead>
                        <TableHead className={`text-[var(--text-muted)] font-medium h-10 ${styles.hideMobile}`}>ID</TableHead>
                        <TableHead className="text-[var(--text-muted)] font-medium h-10">Type</TableHead>
                        <TableHead className={`text-[var(--text-muted)] font-medium h-10 ${styles.hideMobile}`}>Date</TableHead>
                        <TableHead className="text-[var(--text-muted)] font-medium h-10 text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx, i) => (
                        <TransactionRow key={i} transaction={tx} />
                      ))}
                    </TableBody>
                  </Table>
                </div>

              </div>
            </div>
            {/* Right Column */}
            <div className={styles.rightColumn}>
              <div className={styles.cardSection}>
                <div className={styles.cardHeader}>
                  <h3 className="outfit" style={{ fontSize: 16 }}>My Card</h3>
                  <button className={styles.addBtn} onClick={() => alert('Add Card functionality coming soon!')}>+ ADD</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div
                    className={styles.virtualCard}
                    style={{
                      border: activeCard === 0 ? '1px solid var(--primary)' : '1px solid transparent',
                      opacity: activeCard === 0 ? 1 : 0.5,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setActiveCard(0)}
                  >
                    <div className={styles.cardTop}>
                      <div className={styles.mastercard}>
                        <div className={styles.mcCircle} style={{ background: '#EB001B', opacity: 0.8 }} />
                        <div className={styles.mcCircle} style={{ background: '#F79E1B', opacity: 0.8, marginLeft: -12 }} />
                      </div>
                      {activeCard === 0 && (
                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={10} color="#000" strokeWidth={4} />
                        </div>
                      )}
                    </div>
                    <div className={styles.cardNumber}>1111 2222 3333 4444</div>
                    <div className={styles.cardBottom}>
                      <div>
                        <div style={{ fontSize: 8, color: 'var(--text-muted)', marginBottom: 2 }}>Card holder</div>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>JORDAN BELFORD</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 8, color: 'var(--text-muted)', marginBottom: 2 }}>Expiry</div>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>01/23</div>
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>PERSONAL</div>
                    </div>
                  </div>

                  <div
                    className={styles.virtualCard}
                    style={{
                      border: activeCard === 1 ? '1px solid var(--primary)' : '1px solid transparent',
                      opacity: activeCard === 1 ? 1 : 0.5,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setActiveCard(1)}
                  >
                    <div className={styles.cardTop}>
                      <div className={styles.mastercard}>
                        <div className={styles.mcCircle} style={{ background: '#EB001B', opacity: 0.8 }} />
                        <div className={styles.mcCircle} style={{ background: '#F79E1B', opacity: 0.8, marginLeft: -12 }} />
                      </div>
                      {activeCard === 1 && (
                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={10} color="#000" strokeWidth={4} />
                        </div>
                      )}
                    </div>
                    <div className={styles.cardNumber}>4444 3333 2222 1111</div>
                    <div className={styles.cardBottom}>
                      <div>
                        <div style={{ fontSize: 8, color: 'var(--text-muted)', marginBottom: 2 }}>Card holder</div>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>MIKE PROFITS</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 8, color: 'var(--text-muted)', marginBottom: 2 }}>Expiry</div>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>01/23</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`card ${styles.quickTransfer}`}>
                <h3 className="outfit" style={{ fontSize: 16 }}>Quick Transfer</h3>
                <div className={styles.inputGroup}>
                  <div className={styles.inputWrapper}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#F7931A', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>B</div>
                    <input type="text" defaultValue="0xf616...7f7e" style={{ color: 'var(--text-muted)' }} />
                    <ChevronDown size={14} color="var(--text-muted)" />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span className={styles.inputLabel}>You pay</span>
                    <span className={styles.inputLabel}>Balance: 107.45 ETH</span>
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      type="number"
                      value={payAmount}
                      onChange={handlePayAmountChange}
                    />
                    <div className={styles.tokenSelector}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#627EEA' }} />
                      ETH
                      <ChevronDown size={12} />
                    </div>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span className={styles.inputLabel}>You receive</span>
                    <span className={styles.inputLabel}>1 ETH = $1,316.04</span>
                  </div>
                  <div className={styles.inputWrapper}>
                    <input type="text" value={receiveAmount} readOnly />
                    <div className={styles.tokenSelector}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#26A17B' }} />
                      USD
                      <ChevronDown size={12} />
                    </div>
                  </div>
                </div>

                <div className={styles.transferActions}>
                  <button
                    className={styles.sendBtn}
                    onClick={handleTransfer}
                    disabled={isTransferring}
                  >
                    {isTransferring ? (
                      <RefreshCw size={18} className="animate-spin mx-auto" />
                    ) : transferSuccess ? (
                      'Success!'
                    ) : (
                      'Send Now'
                    )}
                  </button>
                  <button className={styles.clearBtn} onClick={handleClearAmount}>Clear</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <AddAssetModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddAsset}
      />
    </MainLayout>

  );
}
