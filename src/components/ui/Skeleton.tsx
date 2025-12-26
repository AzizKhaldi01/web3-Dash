'use client';

import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    className?: string;
    variant?: 'pulse' | 'shimmer';
}

export function Skeleton({
    width,
    height,
    borderRadius,
    className = '',
    variant = 'shimmer'
}: SkeletonProps) {
    const style: React.CSSProperties = {
        width: width,
        height: height,
        borderRadius: borderRadius,
    };

    return (
        <div
            className={`${styles.skeleton} ${variant === 'pulse' ? styles.pulse : ''} ${className}`}
            style={style}
        />
    );
}

// Pre-defined skeletons for common layout items
export function CardSkeleton() {
    return (
        <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton width="40%" height={20} />
                <Skeleton width={20} height={20} borderRadius="50%" />
            </div>
            <Skeleton width="60%" height={32} />
            <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                <Skeleton width="100%" height={36} borderRadius={8} />
                <Skeleton width="100%" height={36} borderRadius={8} />
            </div>
        </div>
    );
}

export function TableRowSkeleton() {
    return (
        <div style={{ display: 'flex', gap: '16px', padding: '16px 0', borderBottom: '1px solid var(--card-border)' }}>
            <Skeleton width={32} height={32} borderRadius={8} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Skeleton width="30%" height={14} />
                <Skeleton width="20%" height={10} />
            </div>
            <Skeleton width="15%" height={20} />
            <Skeleton width="15%" height={20} />
        </div>
    );
}

export function ChartSkeleton() {
    return (
        <div className="card" style={{ height: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton width="120px" height={20} />
                <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} width={30} height={20} />)}
                </div>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '8px', paddingBottom: '20px' }}>
                {[...Array(12)].map((_, i) => (
                    <Skeleton
                        key={i}
                        width="100%"
                        height={`${Math.floor(Math.random() * 60) + 20}%`}
                    />
                ))}
            </div>
        </div>
    );
}
