'use client';

import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    {
        name: 'Top Movers',
        children: [
            { name: 'BTC', size: 400, color: '#F7931A' },
            { name: 'ETH', size: 300, color: '#627EEA' },
            { name: 'SOL', size: 200, color: '#14F195' },
            { name: 'MATIC', size: 150, color: '#8247E5' },
            { name: 'LINK', size: 120, color: '#2A5ADA' },
            { name: 'DOT', size: 110, color: '#E6007A' },
            { name: 'AVAX', size: 100, color: '#E84142' },
            { name: 'UNI', size: 90, color: '#FF007A' },
            { name: 'AAVE', size: 80, color: '#B6509E' },
        ],
    },
];

const CustomizedContent = (props: any) => {
    const { x, y, width, height, index, name, color } = props;

    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: color,
                    stroke: 'var(--card-bg)',
                    strokeWidth: 2,
                    strokeOpacity: 1,
                }}
            />
            {width > 30 && height > 30 && (
                <text
                    x={x + width / 2}
                    y={y + height / 2}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={12}
                    fontWeight={600}
                >
                    {name}
                </text>
            )}
        </g>
    );
};

export default function HeatmapChart() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
                <Treemap
                    data={data}
                    dataKey="size"
                    aspectRatio={4 / 3}
                    stroke="#fff"
                    fill="#8884d8"
                    content={<CustomizedContent />}
                >
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--card-bg)',
                            borderColor: 'var(--card-border)',
                            borderRadius: '8px',
                            color: '#fff'
                        }}
                    />
                </Treemap>
            </ResponsiveContainer>
        </div>
    );
}
