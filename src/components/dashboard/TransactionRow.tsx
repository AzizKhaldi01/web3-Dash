'use client';

import React, { memo } from 'react';
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import styles from '@/styles/Dashboard.module.css';
import type { Transaction } from '@/stores/dashboardStore';

interface TransactionRowProps {
    transaction: Transaction;
}

export const TransactionRow = memo<TransactionRowProps>(({ transaction }) => {
    const isDeposit = transaction.type === 'Deposit';
    const isPositive = transaction.amount.startsWith('+');

    return (
        <TableRow className="border-b border-[var(--card-border)] hover:bg-[var(--glass)] transition-colors">
            <TableCell className="py-4">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: transaction.color }} />
                    <span style={{ fontWeight: 500 }}>{transaction.asset}</span>
                </div>
            </TableCell>
            <TableCell className={`py-4 text-[var(--text-muted)] underline cursor-pointer ${styles.hideMobile}`}>
                {transaction.id}
            </TableCell>
            <TableCell className="py-4">
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {isDeposit ? (
                        <ArrowDownLeft size={14} className="text-[var(--success)]" />
                    ) : (
                        <ArrowUpRight size={14} className="text-[var(--danger)]" />
                    )}
                    <span style={{ fontSize: 13 }}>{transaction.type}</span>
                </div>
            </TableCell>
            <TableCell className={`py-4 text-[var(--text-muted)] ${styles.hideMobile}`}>
                {transaction.date}
            </TableCell>
            <TableCell className={`py-4 text-right font-semibold ${isPositive ? 'text-[var(--success)]' : 'text-[var(--foreground)]'
                }`}>
                {transaction.amount}
            </TableCell>
        </TableRow>
    );
});

TransactionRow.displayName = 'TransactionRow';
