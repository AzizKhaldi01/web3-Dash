'use client';

import React, { memo, useMemo, useEffect, useState } from 'react';
import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

export interface AllocationChartProps {
  data: {
    labels: string[];
    values: number[];
    colors: string[];
  };
}

const AllocationChart = memo<AllocationChartProps>(({ data }) => {
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    setRevision(prev => prev + 1);
  }, [data]);

  const chartData = useMemo(() => [{
    values: data.values,
    labels: data.labels,
    type: 'pie' as const,
    hole: 0.7,
    marker: {
      colors: data.colors
    },
    textinfo: 'none' as const,
    hoverinfo: 'label+percent' as const,
    showlegend: false
  }], [data.values, data.labels, data.colors]);

  const layout = useMemo(() => ({
    autosize: true,
    margin: { t: 0, b: 0, l: 0, r: 0 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    transition: {
      duration: 500,
      easing: 'cubic-in-out' as const
    },
    uirevision: 'true'
  }), []);

  const config = useMemo(() => ({
    displayModeBar: false
  }), []);

  return (
    <Plot
      revision={revision}
      data={chartData}
      layout={layout}
      useResizeHandler={true}
      style={{ width: '100%', height: '100%' }}
      config={config}
    />
  );
});

AllocationChart.displayName = 'AllocationChart';

export default AllocationChart;
