import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Asset {
    name: string;
    symbol: string;
    balance: string;
    value: string;
    price: string;
    change: string;
    color: string;
}

interface PortfolioState {
    assets: Asset[];
    searchQuery: string;
    isLoading: boolean;
    totalNetWorth: number;

    // Actions
    setAssets: (assets: Asset[]) => void;
    setSearchQuery: (query: string) => void;
    setIsLoading: (loading: boolean) => void;
    addAsset: (asset: Asset) => void;
    removeAsset: (symbol: string) => void;
    updateAsset: (symbol: string, updates: Partial<Asset>) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
    devtools(
        (set, get) => ({
            assets: [
                { name: 'Bitcoin', symbol: 'BTC', balance: '1.24', value: '$52,384.32', price: '$42,245.45', change: '+2.4%', color: '#F7931A' },
                { name: 'Ethereum', symbol: 'ETH', balance: '15.5', value: '$34,804.47', price: '$2,245.45', change: '+5.1%', color: '#627EEA' },
                { name: 'Solana', symbol: 'SOL', balance: '120.0', value: '$11,424.00', price: '$95.20', change: '+12.4%', color: '#14F195' },
                { name: 'Polygon', symbol: 'MATIC', balance: '5000.0', value: '$4,250.00', price: '$0.85', change: '-1.2%', color: '#8247E5' },
                { name: 'Chainlink', symbol: 'LINK', balance: '250.0', value: '$3,850.00', price: '$15.40', change: '+3.8%', color: '#2A5ADA' },
            ],
            searchQuery: '',
            isLoading: false,
            totalNetWorth: 106712.79,

            setAssets: (assets) => set({ assets }),

            setSearchQuery: (query) => set({ searchQuery: query }),

            setIsLoading: (loading) => set({ isLoading: loading }),

            addAsset: (asset) => set((state) => ({
                assets: [asset, ...state.assets]
            })),

            removeAsset: (symbol) => set((state) => ({
                assets: state.assets.filter(a => a.symbol !== symbol)
            })),

            updateAsset: (symbol, updates) => set((state) => ({
                assets: state.assets.map(a =>
                    a.symbol === symbol ? { ...a, ...updates } : a
                )
            })),
        }),
        { name: 'portfolio-store' }
    )
);
