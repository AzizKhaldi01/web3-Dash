'use client';

import React, { memo } from 'react';
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import styles from '@/styles/Portfolio.module.css';
import type { Asset } from '@/stores/portfolioStore';

interface AssetRowProps {
    asset: Asset;
}

export const AssetRow = memo<AssetRowProps>(({ asset }) => {
    const isPositive = asset.change.startsWith('+');

    return (
        <TableRow className="border-b border-[var(--card-border)] hover:bg-[var(--glass)] transition-colors">
            <TableCell className="py-5 px-6">
                <div className={styles.assetName}>
                    <div className={styles.assetIcon} style={{ background: asset.color }}>
                        {asset.symbol[0]}
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{asset.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
                            {asset.symbol}
                        </div>
                    </div>
                </div>
            </TableCell>
            <TableCell className="py-5 font-medium">{asset.price}</TableCell>
            <TableCell className="py-5 font-medium">
                {asset.balance} {asset.symbol}
            </TableCell>
            <TableCell className="py-5 font-bold text-[15px]">{asset.value}</TableCell>
            <TableCell
                className={`py-5 text-right px-6 ${isPositive ? 'text-[var(--success)]' : 'text-[var(--danger)]'
                    }`}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    justifyContent: 'flex-end',
                    fontWeight: 700
                }}>
                    {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {asset.change}
                </div>
            </TableCell>
        </TableRow>
    );
});

AssetRow.displayName = 'AssetRow';
