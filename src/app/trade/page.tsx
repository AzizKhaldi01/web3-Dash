'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import styles from '@/styles/Trade.module.css';
import { useTradeStore } from '@/stores/tradeStore';

// Extracted Components
import { TradeHeader } from '@/components/trade/TradeHeader';
import { TradingChartSection } from '@/components/trade/TradingChartSection';
import { PositionsSection } from '@/components/trade/PositionsSection';
import { OrderBookSection } from '@/components/trade/OrderBookSection';
import { TradingPanel } from '@/components/trade/TradingPanel';

const INITIAL_CANDLE_DATA = {
  x: [
    '2023-12-26 14:00:00', '2023-12-26 14:15:00', '2023-12-26 14:30:00', '2023-12-26 14:45:00',
    '2023-12-26 15:00:00', '2023-12-26 15:15:00', '2023-12-26 15:30:00', '2023-12-26 15:45:00'
  ],
  open: [1640.00, 1642.50, 1645.20, 1644.80, 1648.35, 1647.20, 1646.50, 1648.10],
  high: [1643.20, 1646.00, 1647.50, 1649.00, 1650.50, 1648.80, 1647.90, 1649.50],
  low: [1639.50, 1641.80, 1644.00, 1643.50, 1647.10, 1646.00, 1645.20, 1647.30],
  close: [1642.50, 1645.20, 1644.80, 1648.35, 1647.20, 1646.50, 1648.10, 1648.35],
};

export default function TradePage() {
  const { currentPrice, setCurrentPrice } = useTradeStore();
  const [mounted, setMounted] = useState(false);
  const [candleData, setCandleData] = useState(INITIAL_CANDLE_DATA);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = currentPrice + (Math.random() - 0.5) * 2;
      setCurrentPrice(newPrice);

      // Update the last candle in the chart
      setCandleData(prev => {
        const newData = { ...prev };
        const lastIdx = newData.close.length - 1;
        newData.close[lastIdx] = newPrice;
        if (newPrice > newData.high[lastIdx]) newData.high[lastIdx] = newPrice;
        if (newPrice < newData.low[lastIdx]) newData.low[lastIdx] = newPrice;
        return { ...newData };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [currentPrice, setCurrentPrice]);

  return (
    <MainLayout>
      <div className={styles.trade}>
        <TradeHeader />

        <div className={styles.chartSection}>
          <TradingChartSection candleData={candleData} mounted={mounted} />
          <PositionsSection />
        </div>

        <OrderBookSection />
        <TradingPanel />
      </div>
    </MainLayout>
  );
}

