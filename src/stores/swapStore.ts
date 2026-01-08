import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface SwapState {
    fromToken: { symbol: string; color: string; balance: string };
    toToken: { symbol: string; color: string; balance: string };
    fromAmount: string;
    toAmount: string;
    exchangeRate: number;

    // Actions
    setFromAmount: (amount: string) => void;
    setFromToken: (token: { symbol: string; color: string; balance: string }) => void;
    setToToken: (token: { symbol: string; color: string; balance: string }) => void;
    switchTokens: () => void;
}

export const useSwapStore = create<SwapState>()(
    devtools(
        (set) => ({
            fromToken: { symbol: 'ETH', color: '#627EEA', balance: '1.24' },
            toToken: { symbol: 'WBTC', color: '#F7931A', balance: '0.00' },
            fromAmount: '',
            toAmount: '',
            exchangeRate: 0.052,

            setFromAmount: (amount) => set((state) => ({
                fromAmount: amount,
                toAmount: amount ? (parseFloat(amount) * state.exchangeRate).toFixed(4) : ''
            })),

            setFromToken: (token) => set({ fromToken: token }),

            setToToken: (token) => set({ toToken: token }),

            switchTokens: () => set((state) => ({
                fromToken: state.toToken,
                toToken: state.fromToken,
                fromAmount: state.toAmount,
                toAmount: state.fromAmount
            })),
        }),
        { name: 'swap-store' }
    )
);
