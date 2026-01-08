'use client';

import React, { memo } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from '@/styles/Swap.module.css';

interface SwapInputProps {
    label: string;
    amount: string;
    token: { symbol: string; color: string; balance: string };
    onAmountChange?: (amount: string) => void;
    readOnly?: boolean;
}

export const SwapInput = memo<SwapInputProps>(({
    label,
    amount,
    token,
    onAmountChange,
    readOnly = false
}) => {
    return (
        <div className={styles.tokenInput}>
            <div className={styles.inputRow}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    Balance: {token.balance} {token.symbol}
                </span>
            </div>
            <div className={styles.inputRow}>
                <input
                    type="number"
                    className={styles.amountInput}
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => onAmountChange?.(e.target.value)}
                    readOnly={readOnly}
                />
                <button className={styles.tokenSelect}>
                    <div
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            background: token.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 10,
                            fontWeight: 700,
                            color: 'white'
                        }}
                    >
                        {token.symbol[0]}
                    </div>
                    {token.symbol}
                    <ChevronDown size={16} />
                </button>
            </div>
        </div>
    );
});

SwapInput.displayName = 'SwapInput';
