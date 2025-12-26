'use client';

import React, { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import styles from '@/styles/Dashboard.module.css';
import {
  MoreHorizontal,
  ChevronDown,
  Plus,
  Check,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AddAssetModal } from '@/components/dashboard/AddAssetModal';
import { Skeleton, CardSkeleton, ChartSkeleton, TableRowSkeleton } from '@/components/ui/Skeleton';

const WalletChart = dynamic(() => import('@/components/dashboard/WalletChart'), {
  ssr: false,
  loading: () => <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading...</div>
});

const AllocationChart = dynamic(() => import('@/components/dashboard/AllocationChart'), {
  ssr: false,
  loading: () => <div style={{ height: '140px', width: '140px', borderRadius: '50%', border: '2px solid var(--card-border)' }} />
});

const MiniChart = dynamic(() => import('@/components/dashboard/MiniChart'), {
  ssr: false,
  loading: () => <div style={{ height: '40px', width: '80px', background: 'var(--glass)', borderRadius: 4 }} />
});

const HeatmapChart = dynamic(() => import('@/components/analytics/HeatmapChart'), {
  ssr: false,
  loading: () => <div style={{ height: '200px', width: '100%', background: 'var(--glass)', borderRadius: 12 }} />
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

const INITIAL_ASSETS = [
  { name: 'Bitcoin', symbol: 'BTC', balance: '108.61', usdValue: '$213,017.17', rate: '1 BTC = $19,509.23', profit: '+$1,237.45', profitPct: '+5%', color: '#F7931A', sparkline: [40, 45, 42, 50, 48, 55, 60] },
  { name: 'Ethereum', symbol: 'ETH', balance: '107.45', usdValue: '$31,569.20', rate: '1 ETH = $1,316.04', profit: '+$3,237.45', profitPct: '+8%', color: '#627EEA', sparkline: [30, 35, 32, 40, 38, 45, 50] },
  { name: 'Solana', symbol: 'SOL', balance: '254.12', usdValue: '$12,450.00', rate: '1 SOL = $48.97', profit: '+$450.12', profitPct: '+12%', color: '#14F195', sparkline: [20, 25, 23, 30, 28, 35, 42] },
  { name: 'Tether', symbol: 'USDT', balance: '1,568.76', usdValue: '$1,552.51', rate: '1 USDT = $0.99', profit: '-$12.45', profitPct: '-1%', color: '#26A17B', sparkline: [50, 48, 52, 50, 49, 51, 50] },
  { name: 'Ripple', symbol: 'XRP', balance: '500.00', usdValue: '$245,841.0', rate: '1 XRP = $0.45', profit: '-$37.45', profitPct: '-3%', color: '#23292F', sparkline: [20, 25, 22, 18, 20, 22, 21] },
];

const INITIAL_TRANSACTIONS = [
  { id: '0x459f73...', asset: 'Bitcoin', type: 'Deposit', network: 'Bitcoin Mainnet', status: 'Completed', date: '2022-09-11 20:53', amount: '+1.05401 BTC', color: '#F7931A' },
  { id: '0x96afab...', asset: 'Bitcoin', type: 'Deposit', network: 'Bitcoin Mainnet', status: 'Completed', date: '2022-09-09 15:21', amount: '+0.02642 BTC', color: '#F7931A' },
  { id: '0x654652...', asset: 'Debit Card', type: 'Deposit', network: 'Bank Transfer', status: 'Completed', date: '2022-09-08 16:45', amount: '+$980.97', color: '#FF5252' },
  { id: '0x3a72e9...', asset: 'Ethereum', type: 'Withdraw', network: 'Ethereum Mainnet', status: 'Completed', date: '2022-09-06 09:44', amount: '-0.0144 ETH', color: '#627EEA' },
  { id: '0x88bbcc...', asset: 'Solana', type: 'Swap', network: 'Solana Devnet', status: 'Pending', date: '2022-09-05 12:44', amount: '+12.5 SOL', color: '#14F195' },
  { id: '0xff1122...', asset: 'Bitcoin', type: 'Withdraw', network: 'Lightning', status: 'Completed', date: '2022-09-04 18:30', amount: '-0.5000 BTC', color: '#F7931A' },
  { id: '0x334455...', asset: 'Ethereum', type: 'Deposit', network: 'Arbitrum', status: 'Completed', date: '2022-09-03 14:15', amount: '+2.5 ETH', color: '#627EEA' },
  { id: '0x667788...', asset: 'Tether', type: 'Swap', network: 'Polygon', status: 'Failed', date: '2022-09-02 22:10', amount: '+500 USDT', color: '#26A17B' },
  { id: '0x99aa00...', asset: 'Ripple', type: 'Deposit', network: 'Ripple Net', status: 'Completed', date: '2022-09-01 10:05', amount: '+1000 XRP', color: '#23292F' },
  { id: '0xbbccdd...', asset: 'Ethereum', type: 'Swap', network: 'Optimism', status: 'Completed', date: '2022-08-31 08:20', amount: '+0.8 ETH', color: '#627EEA' },
  { id: '0xeeff00...', asset: 'Solana', type: 'Deposit', network: 'Solana Mainnet', status: 'Completed', date: '2022-08-30 15:40', amount: '+45.2 SOL', color: '#14F195' },
  { id: '0x112233...', asset: 'Bitcoin', type: 'Deposit', network: 'Taproot', status: 'Completed', date: '2022-08-29 11:12', amount: '+0.112 BTC', color: '#F7931A' },
  { id: '0x445566...', asset: 'Ethereum', type: 'Withdraw', network: 'Base', status: 'Completed', date: '2022-08-28 20:25', amount: '-1.2 ETH', color: '#627EEA' },
  { id: '0x778899...', asset: 'Tether', type: 'Deposit', network: 'Ethereum Mainnet', status: 'Completed', date: '2022-08-27 16:50', amount: '+250 USDT', color: '#26A17B' },
  { id: '0x001122...', asset: 'Solana', type: 'Swap', network: 'Solana Mainnet', status: 'Completed', date: '2022-08-26 13:14', amount: '+5.5 SOL', color: '#14F195' },
  { id: '0xaabbcc...', asset: 'Bitcoin', type: 'Deposit', network: 'Bitcoin Mainnet', status: 'Completed', date: '2022-08-25 09:33', amount: '+0.005 BTC', color: '#F7931A' },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState(INITIAL_ASSETS);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('1D');
  const [historyRange, setHistoryRange] = useState('1Y');
  const [activeCard, setActiveCard] = useState(0);
  const [payAmount, setPayAmount] = useState('1');
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  // Pagination & Search local state
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const currentChartData = useMemo(() => {
    return chartDataMap[timeRange] || chartDataMap['1D'];
  }, [timeRange]);

  const receiveAmount = useMemo(() => {
    const amount = parseFloat(payAmount) || 0;
    return (amount * 1316.04).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [payAmount]);

  const filteredTransactions = useMemo(() => {
    return INITIAL_TRANSACTIONS.filter(tx =>
      tx.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.network.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const handleTransfer = () => {
    setIsTransferring(true);
    setTimeout(() => {
      setIsTransferring(false);
      setTransferSuccess(true);
      setTimeout(() => setTransferSuccess(false), 3000);
    }, 1500);
  };

  const handleAddAsset = (newAsset: any) => {
    setAssets(prev => [newAsset, ...prev]);
  };

  return (
    <MainLayout>
      <div className={styles.dashboard}>
        {isLoading ? (
          <div className={styles.mainContent}>
            <div className={styles.topRow}>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} style={{ minWidth: i === 1 ? 300 : 280, height: 260 }}>
                  <CardSkeleton />
                </div>
              ))}
            </div>
            <div className={styles.contentRow}>
              <div className={styles.leftColumn}>
                <ChartSkeleton />
                <div className="card" style={{ marginTop: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Skeleton width="40%" height={24} />
                    <Skeleton width="100%" height={40} borderRadius={10} />
                    {[1, 2, 3, 4, 5].map(i => <TableRowSkeleton key={i} />)}
                  </div>
                </div>
              </div>
              <div className={styles.rightColumn}>
                <div className="card" style={{ height: 300 }}><Skeleton width="100%" height="100%" /></div>
                <div className="card" style={{ height: 400 }}><Skeleton width="100%" height="100%" /></div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.mainContent}>
            {/* Top Row - Assets */}
            <div className={styles.topRow}>
              <div className={`card ${styles.balanceCard}`}>
                <div className={styles.balanceHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 16, height: 16, border: '1px solid var(--text-muted)', borderRadius: 4 }} />
                    <span>Total Balance</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                    <span>USD</span>
                    <ChevronDown size={14} />
                  </div>
                </div>
                <div className={styles.balanceAmount}>$1,180,577.24</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 20, margin: '12px 0' }}>
                  <div style={{ width: 140, height: 140 }}>
                    <AllocationChart data={{
                      labels: ['BTC', 'ETH', 'SOL', 'Other'],
                      values: [40, 30, 20, 10],
                      colors: ['#F7931A', '#627EEA', '#14F195', '#707a8a']
                    }} />
                  </div>
                  <div className={styles.balanceLegend} style={{ flex: 1, gridTemplateColumns: '1fr', gap: 8 }}>
                    <div className={styles.legendItem}><div className={styles.dot} style={{ background: '#F7931A' }} /> BTC (40%)</div>
                    <div className={styles.legendItem}><div className={styles.dot} style={{ background: '#627EEA' }} /> ETH (30%)</div>
                    <div className={styles.legendItem}><div className={styles.dot} style={{ background: '#14F195' }} /> SOL (20%)</div>
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

              <button className={`card ${styles.addCard}`} onClick={() => setIsAddModalOpen(true)}>
                <Plus size={20} />
                <span style={{ fontSize: 11, marginTop: 4, fontWeight: 600 }}>ADD</span>
              </button>

              {assets.map((asset) => (
                <div
                  key={asset.symbol}
                  className={`card ${styles.assetCard} ${selectedAsset === asset.symbol ? styles.assetCardActive : ''}`}
                  onClick={() => setSelectedAsset(asset.symbol === selectedAsset ? null : asset.symbol)}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: asset.profit.startsWith('+') ? 'var(--success)' : 'var(--danger)' }}>
                      {asset.profit.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      <span style={{ fontWeight: 600 }}>{asset.profitPct}</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{asset.profit}</div>
                  </div>

                  <div className={styles.assetActions}>
                    <button className={styles.actionBtn}>Swap</button>
                    <button className={styles.actionBtn}>Send</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.contentRow}>
              <div className={styles.leftColumn}>
                {/* Chart Section */}
                <div className={`card ${styles.chartCard}`}>
                  <div className={styles.chartHeader}>
                    <h3 className="outfit" style={{ fontSize: 16 }}>Wallet Performance</h3>
                    <div className={styles.timeFilters}>
                      {['1D', '7D', '1M', '3M', '6M', '1Y', 'ALL'].map((t) => (
                        <button
                          key={t}
                          className={`${styles.timeBtn} ${t === timeRange ? styles.timeBtnActive : ''}`}
                          onClick={() => setTimeRange(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={styles.chartWrapper} style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: 'rgba(22, 26, 30, 0.8)', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--card-border)', fontSize: 12, backdropFilter: 'blur(4px)' }}>
                      <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Current Value</div>
                      <div style={{ fontWeight: 700 }}>$1,176,356.46 <span style={{ color: 'var(--success)' }}>+3.21%</span></div>
                    </div>
                    <WalletChart data={currentChartData} />
                  </div>
                </div>

                {/* Market Intelligence */}
                <div className={`card ${styles.chartCard}`}>
                  <div className={styles.chartHeader}>
                    <h3 className="outfit" style={{ fontSize: 16 }}>Market Intelligence</h3>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Asset Dominance (24h)</div>
                  </div>
                  <div className={styles.secondaryChartContainer} style={{ marginTop: '10px' }}>
                    <HeatmapChart />
                  </div>
                </div>

                {/* Transaction History with Pagination & Search */}
                <div className={`card ${styles.historyCard}`}>
                  <div className={styles.chartHeader}>
                    <h3 className="outfit" style={{ fontSize: 16 }}>Recent Activity</h3>
                    <div className={styles.timeFilters}>
                      {['1D', '7D', '1M', 'ALL'].map((t) => (
                        <button
                          key={t}
                          className={`${styles.timeBtn} ${t === historyRange ? styles.timeBtnActive : ''}`}
                          onClick={() => setHistoryRange(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className={styles.searchWrapper} style={{ position: 'relative' }}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                      type="text"
                      placeholder="Search assets, tx ID, networks..."
                      className={styles.searchInput}
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1); // Reset to first page on search
                      }}
                    />
                  </div>

                  <div className={styles.tableWrapper}>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-[var(--card-border)] hover:bg-transparent">
                          <TableHead className="text-[var(--text-muted)] font-medium h-10">Asset</TableHead>
                          <TableHead className={`text-[var(--text-muted)] font-medium h-10 ${styles.hideMobile}`}>Network</TableHead>
                          <TableHead className="text-[var(--text-muted)] font-medium h-10">Type</TableHead>
                          <TableHead className={`text-[var(--text-muted)] font-medium h-10 ${styles.hideMobile}`}>Status</TableHead>
                          <TableHead className="text-[var(--text-muted)] font-medium h-10 text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedTransactions.map((tx, i) => (
                          <TableRow key={i} className="border-b border-[var(--card-border)] hover:bg-[var(--glass)] transition-colors">
                            <TableCell className="py-4">
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: tx.color }} />
                                <div>
                                  <div style={{ fontWeight: 600 }}>{tx.asset}</div>
                                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{tx.id}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className={`py-4 text-[var(--text-muted)] ${styles.hideMobile}`}>{tx.network}</TableCell>
                            <TableCell className="py-4">
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                {tx.type === 'Deposit' || tx.type === 'Swap' ? <ArrowDownLeft size={14} className="text-[var(--success)]" /> : <ArrowUpRight size={14} className="text-[var(--danger)]" />}
                                <span style={{ fontSize: 13 }}>{tx.type}</span>
                              </div>
                            </TableCell>
                            <TableCell className={`py-4 ${styles.hideMobile}`}>
                              <span style={{
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: 600,
                                background: tx.status === 'Completed' ? 'rgba(14, 203, 129, 0.1)' : tx.status === 'Pending' ? 'rgba(247, 147, 26, 0.1)' : 'rgba(246, 70, 93, 0.1)',
                                color: tx.status === 'Completed' ? 'var(--success)' : tx.status === 'Pending' ? '#F7931A' : 'var(--danger)'
                              }}>
                                {tx.status}
                              </span>
                            </TableCell>
                            <TableCell className={`py-4 text-right font-semibold ${tx.amount.startsWith('+') ? 'text-[var(--success)]' : 'text-[var(--foreground)]'}`}>
                              {tx.amount}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination Controls */}
                  <div className={styles.pagination}>
                    <button
                      className={styles.pageBtn}
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.pageBtnActive : ''}`}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      className={styles.pageBtn}
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className={styles.rightColumn}>
                <div className={styles.cardSection}>
                  <div className={styles.cardHeader}>
                    <h3 className="outfit" style={{ fontSize: 16 }}>Funding Sources</h3>
                    <button className={styles.addBtn}>+ NEW</button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Virtual Card 1 */}
                    <div
                      className={styles.virtualCard}
                      style={{
                        border: activeCard === 0 ? '1px solid var(--primary)' : '1px solid transparent',
                        opacity: activeCard === 0 ? 1 : 0.7,
                      }}
                      onClick={() => setActiveCard(0)}
                    >
                      <div className={styles.cardTop}>
                        <div className={styles.mastercard}>
                          <div className={styles.mcCircle} style={{ background: '#EB001B', opacity: 0.8 }} />
                          <div className={styles.mcCircle} style={{ background: '#F79E1B', opacity: 0.8, marginLeft: -12 }} />
                        </div>
                        {activeCard === 0 && <Check size={14} className="text-[var(--success)]" />}
                      </div>
                      <div className={styles.cardNumber}>**** **** **** 4444</div>
                      <div className={styles.cardBottom}>
                        <div>
                          <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>Holder</div>
                          <div style={{ fontSize: 11, fontWeight: 600 }}>JORDAN BELFORD</div>
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>LIMIT: $250k</div>
                      </div>
                    </div>
                    {/* Card 2 */}
                    <div
                      className={styles.virtualCard}
                      style={{
                        background: 'linear-gradient(135deg, #2a2a2a 0%, #000 100%)',
                        border: activeCard === 1 ? '1px solid var(--primary)' : '1px solid transparent',
                        opacity: activeCard === 1 ? 1 : 0.7,
                      }}
                      onClick={() => setActiveCard(1)}
                    >
                      <div className={styles.cardTop}>
                        <div className={styles.mastercard}>
                          <div className={styles.mcCircle} style={{ background: '#0052FF', opacity: 0.8 }} />
                          <div className={styles.mcCircle} style={{ background: '#627EEA', opacity: 0.8, marginLeft: -12 }} />
                        </div>
                        {activeCard === 1 && <Check size={14} className="text-[var(--success)]" />}
                      </div>
                      <div className={styles.cardNumber}>**** **** **** 8888</div>
                      <div className={styles.cardBottom}>
                        <div>
                          <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>Holder</div>
                          <div style={{ fontSize: 11, fontWeight: 600 }}>MIKE PROFITS</div>
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--primary)' }}>PREMIUM</div>
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
                      <span className={styles.inputLabel}>Bal: 107.45 ETH</span>
                    </div>
                    <div className={styles.inputWrapper}>
                      <input type="number" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} />
                      <div className={styles.tokenSelector}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#627EEA' }} />
                        ETH <ChevronDown size={12} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.transferActions}>
                    <button className={styles.sendBtn} onClick={handleTransfer} disabled={isTransferring}>
                      {isTransferring ? <RefreshCw size={18} className="animate-spin mx-auto" /> : transferSuccess ? 'Success!' : 'Transfer Now'}
                    </button>
                    <button className={styles.clearBtn} onClick={() => setPayAmount('0')}>Clear</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <AddAssetModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddAsset} />
    </MainLayout>
  );
}
