import React from 'react';
import { Radar, RadarChart as RChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface Props {
  data: Array<{ subject: string; A: number }>;
}

export const RadarChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-48">
      <ResponsiveContainer>
        <RChart data={data} outerRadius={70}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
          <Radar name="Score" dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
        </RChart>
      </ResponsiveContainer>
    </div>
  );
};

