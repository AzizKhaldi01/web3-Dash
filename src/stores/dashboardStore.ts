import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface DashboardAsset {
    name: string;
    symbol: string;
    balance: string;
    usdValue: string;
    rate: string;
    profit: string;
    profitPct: string;
    color: string;
    sparkline: number[];
}

export interface Transaction {
    id: string;
    asset: string;
    type: string;
    date: string;
    amount: string;
    color: string;
}

interface DashboardState {
    assets: DashboardAsset[];
    transactions: Transaction[];
    timeRange: string;
    historyRange: string;
    activeCard: number;
    payAmount: string;
    isTransferring: boolean;
    transferSuccess: boolean;
    selectedAsset: string | null;
    isAddModalOpen: boolean;

    // Actions
    setAssets: (assets: DashboardAsset[]) => void;
    addAsset: (asset: DashboardAsset) => void;
    setTimeRange: (range: string) => void;
    setHistoryRange: (range: string) => void;
    setActiveCard: (cardIndex: number) => void;
    setPayAmount: (amount: string) => void;
    setIsTransferring: (transferring: boolean) => void;
    setTransferSuccess: (success: boolean) => void;
    setSelectedAsset: (symbol: string | null) => void;
    setIsAddModalOpen: (open: boolean) => void;
    handleTransfer: () => void;
}

const INITIAL_ASSETS: DashboardAsset[] = [
    { name: 'Bitcoin', symbol: 'BTC', balance: '108.61', usdValue: '$213,017.17', rate: '1 BTC = $19,509.23', profit: '+$1,237.45', profitPct: '+5%', color: '#F7931A', sparkline: [40, 45, 42, 50, 48, 55, 60] },
    { name: 'Ethereum', symbol: 'ETH', balance: '107.45', usdValue: '$31,569.20', rate: '1 ETH = $1,316.04', profit: '+$3,237.45', profitPct: '+8%', color: '#627EEA', sparkline: [30, 35, 32, 40, 38, 45, 50] },
    { name: 'Tether', symbol: 'USDT', balance: '1,568.76', usdValue: '$1,552.51', rate: '1 USDT = $0.99', profit: '-$12.45', profitPct: '-1%', color: '#26A17B', sparkline: [50, 48, 52, 50, 49, 51, 50] },
    { name: 'Ripple', symbol: 'XRP', balance: '500.00', usdValue: '$245,841.0', rate: '1 XRP = $0.45', profit: '-$37.45', profitPct: '-3%', color: '#23292F', sparkline: [20, 25, 22, 18, 20, 22, 21] },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
    { id: '0000000000000000000000459f73...', asset: 'Bitcoin', type: 'Deposit', date: '2022-09-11 20:53', amount: '+1.05401 BTC', color: '#F7931A' },
    { id: '96afab209aab982cf4bef872ad...', asset: 'Bitcoin', type: 'Deposit', date: '2022-09-09 15:21', amount: '+0.02642 BTC', color: '#F7931A' },
    { id: '654652485KL', asset: 'Debit Card', type: 'Deposit', date: '2022-09-08 16:45', amount: '+$980.97', color: '#FF5252' },
    { id: '0x3a72e9b4e4bf6702db7...', asset: 'Ethereum', type: 'Deposit', date: '2022-09-06 09:44', amount: '+0.0144 ETH', color: '#627EEA' },
];

export const useDashboardStore = create<DashboardState>()(
    devtools(
        persist(
            (set, get) => ({
                assets: INITIAL_ASSETS,
                transactions: INITIAL_TRANSACTIONS,
                timeRange: '1D',
                historyRange: '1Y',
                activeCard: 0,
                payAmount: '1',
                isTransferring: false,
                transferSuccess: false,
                selectedAsset: null,
                isAddModalOpen: false,

                setAssets: (assets) => set({ assets }),

                addAsset: (asset) => set((state) => ({
                    assets: [asset, ...state.assets]
                })),

                setTimeRange: (range) => set({ timeRange: range }),

                setHistoryRange: (range) => set({ historyRange: range }),

                setActiveCard: (cardIndex) => set({ activeCard: cardIndex }),

                setPayAmount: (amount) => set({ payAmount: amount }),

                setIsTransferring: (transferring) => set({ isTransferring: transferring }),

                setTransferSuccess: (success) => set({ transferSuccess: success }),

                setSelectedAsset: (symbol) => set({ selectedAsset: symbol }),

                setIsAddModalOpen: (open) => set({ isAddModalOpen: open }),

                handleTransfer: () => {
                    set({ isTransferring: true });
                    setTimeout(() => {
                        set({ isTransferring: false, transferSuccess: true });
                        setTimeout(() => set({ transferSuccess: false }), 3000);
                    }, 1500);
                },
            }),
            { name: 'dashboard-storage' }
        ),
        { name: 'dashboard-store' }
    )
);
