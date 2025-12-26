'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const data = [
  { subject: 'Volume', A: 120, B: 110, fullMark: 150 },
  { subject: 'Volatility', A: 98, B: 130, fullMark: 150 },
  { subject: 'Liquidity', A: 86, B: 130, fullMark: 150 },
  { subject: 'Sentiment', A: 99, B: 100, fullMark: 150 },
  { subject: 'Momentum', A: 85, B: 90, fullMark: 150 },
  { subject: 'Dominance', A: 65, B: 85, fullMark: 150 },
];

export default function MarketPulse() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="var(--card-border)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 150]} 
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Current"
            dataKey="A"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="var(--primary)"
            fillOpacity={0.4}
          />
          <Radar
            name="Predicted"
            dataKey="B"
            stroke="#627EEA"
            strokeWidth={2}
            fill="#627EEA"
            fillOpacity={0.2}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--card-bg)', 
              borderColor: 'var(--card-border)',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
