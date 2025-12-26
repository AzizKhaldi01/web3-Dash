'use client';

import React from 'react';
import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

export default function FlowAnalysis() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Plot
                data={[{
                    type: "sankey",
                    orientation: "h",
                    node: {
                        pad: 15,
                        thickness: 20,
                        line: {
                            color: "black",
                            width: 0.5
                        },
                        label: ["Ethereum", "Solana", "L2s", "Binance", "Coinbase", "Kraken", "DeFi Pools"],
                        color: ["#627EEA", "#14F195", "#8247E5", "#F3BA2F", "#0052FF", "#5841D8", "#00e676"]
                    },
                    link: {
                        source: [0, 1, 0, 2, 3, 4, 1, 2, 0],
                        target: [6, 6, 6, 6, 0, 0, 1, 2, 4],
                        value: [8, 4, 2, 8, 4, 2, 5, 3, 1],
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }]}
                layout={{
                    autosize: true,
                    margin: { t: 5, b: 5, l: 5, r: 5 },
                    paper_bgcolor: 'transparent',
                    plot_bgcolor: 'transparent',
                    font: {
                        color: '#707a8a',
                        size: 10
                    }
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
                config={{ displayModeBar: false }}
            />
        </div>
    );
}
