'use client';

import React from 'react';
import { Header } from './Header';
import { Ticker } from './Ticker';
import styles from './MainLayout.module.css';
import { BottomNav } from './BottomNav';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <BottomNav />
      <Ticker />
    </div>
  );
}

