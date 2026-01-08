import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TradeState {
    activeChartTab: string;
    activeBottomTab: string;
    activeBookTab: string;
    orderType: string;
    side: 'Long' | 'Short';
    marginType: string;
    leverage: number;
    price: string;
    amount: string;
    currentPrice: number;

    setActiveChartTab: (tab: string) => void;
    setActiveBottomTab: (tab: string) => void;
    setActiveBookTab: (tab: string) => void;
    setOrderType: (type: string) => void;
    setSide: (side: 'Long' | 'Short') => void;
    setMarginType: (type: string) => void;
    setLeverage: (leverage: number) => void;
    setPrice: (price: string) => void;
    setAmount: (amount: string) => void;
    setCurrentPrice: (price: number) => void;
}

export const useTradeStore = create<TradeState>()(
    devtools(
        (set) => ({
            activeChartTab: 'Chart',
            activeBottomTab: 'Positions',
            activeBookTab: 'Order Book',
            orderType: 'Limit',
            side: 'Long',
            marginType: 'Isolated',
            leverage: 20,
            price: '1648.35',
            amount: '100.00',
            currentPrice: 1648.35,

            setActiveChartTab: (tab) => set({ activeChartTab: tab }),
            setActiveBottomTab: (tab) => set({ activeBottomTab: tab }),
            setActiveBookTab: (tab) => set({ activeBookTab: tab }),
            setOrderType: (type) => set({ orderType: type }),
            setSide: (side) => set({ side }),
            setMarginType: (type) => set({ marginType: type }),
            setLeverage: (leverage) => set({ leverage }),
            setPrice: (price) => set({ price }),
            setAmount: (amount) => set({ amount }),
            setCurrentPrice: (price) => set({ currentPrice: price }),
        }),
        { name: 'trade-store' }
    )
);
