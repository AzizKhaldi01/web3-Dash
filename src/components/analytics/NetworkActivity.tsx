'use client';

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const data = [
    { time: '00:00', users: 400, txs: 240, gas: 120 },
    { time: '04:00', users: 300, txs: 139, gas: 110 },
    { time: '08:00', users: 200, txs: 980, gas: 229 },
    { time: '12:00', users: 278, txs: 390, gas: 200 },
    { time: '16:00', users: 189, txs: 480, gas: 218 },
    { time: '20:00', users: 239, txs: 380, gas: 250 },
    { time: '23:59', users: 349, txs: 430, gas: 210 },
];

export default function NetworkActivity() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorTxs" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#627EEA" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#627EEA" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--card-bg)',
                            borderColor: 'var(--card-border)',
                            borderRadius: '12px',
                            fontSize: '12px',
                            backdropFilter: 'blur(8px)'
                        }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--text-muted)' }} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--card-border)" />
                    <Area
                        type="monotone"
                        dataKey="users"
                        stroke="var(--primary)"
                        fillOpacity={1}
                        fill="url(#colorUsers)"
                        strokeWidth={3}
                    />
                    <Area
                        type="monotone"
                        dataKey="txs"
                        stroke="#627EEA"
                        fillOpacity={1}
                        fill="url(#colorTxs)"
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
