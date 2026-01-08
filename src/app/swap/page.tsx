'use client';

import React, { useCallback } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import styles from '@/styles/Swap.module.css';
import { Settings, ArrowDown, Info, RefreshCw } from 'lucide-react';
import { useSwapStore } from '@/stores/swapStore';
import { SwapInput } from '@/components/swap/SwapInput';

export default function SwapPage() {
  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    exchangeRate,
    setFromAmount,
    switchTokens
  } = useSwapStore();

  const handleSwitch = useCallback(() => {
    switchTokens();
  }, [switchTokens]);

  const handleAmountChange = useCallback((val: string) => {
    setFromAmount(val);
  }, [setFromAmount]);

  return (
    <MainLayout>
      <div className={styles.swapContainer}>
        <div className={`card ${styles.swapCard}`}>
          <div className={styles.swapHeader}>
            <h2 className="outfit">Swap</h2>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="iconBtn"><RefreshCw size={18} /></button>
              <button className="iconBtn"><Settings size={18} /></button>
            </div>
          </div>

          <SwapInput
            label="You pay"
            amount={fromAmount}
            token={fromToken}
            onAmountChange={handleAmountChange}
          />

          <button className={styles.switchBtn} onClick={handleSwitch}>
            <ArrowDown size={20} />
          </button>

          <SwapInput
            label="You receive"
            amount={toAmount}
            token={toToken}
            readOnly={true}
          />

          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span>Exchange Rate</span>
              <span style={{ color: 'var(--foreground)' }}>
                1 {fromToken.symbol} = {exchangeRate} {toToken.symbol}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                Price Impact <Info size={12} />
              </span>
              <span style={{ color: 'var(--success)' }}>&lt; 0.01%</span>
            </div>
            <div className={styles.detailRow}>
              <span>Web3 dashboard Fee</span>
              <span style={{ color: 'var(--foreground)' }}>~$4.20</span>
            </div>
          </div>

          <button className={`btn-primary ${styles.swapBtn}`} disabled={!fromAmount}>
            {fromAmount ? 'Swap Assets' : 'Enter an amount'}
          </button>
        </div>

        <div style={{ marginTop: 32, width: 480 }}>
          <div className={`card`} style={{ padding: 20 }}>
            <h4 className="outfit" style={{ marginBottom: 16 }}>Recent Swaps</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[1, 2].map(i => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ padding: 8, background: 'var(--secondary)', borderRadius: 8 }}>
                      <RefreshCw size={14} color="var(--primary)" />
                    </div>
                    <div>
                      <div>ETH to WBTC</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>2 hours ago</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600 }}>0.5 ETH</div>
                    <div style={{ fontSize: 12, color: 'var(--success)' }}>Completed</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

