'use client';

import React, { memo, useMemo } from 'react';
import styles from '@/styles/Dashboard.module.css';

interface TimeFilterProps {
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
}

export const TimeFilter = memo<TimeFilterProps>(({ options, selected, onSelect }) => {
    const buttons = useMemo(() =>
        options.map((option) => (
            <button
                key={option}
                className={`${styles.timeBtn} ${option === selected ? styles.timeBtnActive : ''}`}
                onClick={() => onSelect(option)}
            >
                {option}
            </button>
        )),
        [options, selected, onSelect]
    );

    return <div className={styles.timeFilters}>{buttons}</div>;
});

TimeFilter.displayName = 'TimeFilter';
