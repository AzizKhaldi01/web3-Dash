'use client';

import React, { memo, useMemo } from 'react';
import styles from '@/styles/Portfolio.module.css';
import type { Asset } from '@/stores/portfolioStore';

interface AllocationItemProps {
    asset: Asset;
    totalValue: number;
}

export const AllocationItem = memo<AllocationItemProps>(({ asset, totalValue }) => {
    const percentage = useMemo(() => {
        const value = parseFloat(asset.value.replace('$', '').replace(',', ''));
        return ((value / totalValue) * 100).toFixed(1);
    }, [asset.value, totalValue]);

    return (
        <div className={styles.allocationItem}>
            <div className={styles.allocationLabel}>
                <div className={styles.dot} style={{ background: asset.color }} />
                <span>{asset.name}</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 14 }}>
                {percentage}%
            </span>
        </div>
    );
});

AllocationItem.displayName = 'AllocationItem';
