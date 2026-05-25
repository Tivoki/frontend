'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from '~/shared/lib';

interface ChartDataPoint {
  date: string;
  conversations: number;
  aiResolutionRate: number;
}

const MOCK_DATA: ChartDataPoint[] = [
  { date: 'May 1', conversations: 120, aiResolutionRate: 62 },
  { date: 'May 3', conversations: 145, aiResolutionRate: 65 },
  { date: 'May 5', conversations: 132, aiResolutionRate: 63 },
  { date: 'May 7', conversations: 160, aiResolutionRate: 68 },
  { date: 'May 9', conversations: 178, aiResolutionRate: 70 },
  { date: 'May 11', conversations: 155, aiResolutionRate: 67 },
  { date: 'May 13', conversations: 190, aiResolutionRate: 72 },
  { date: 'May 15', conversations: 210, aiResolutionRate: 69 },
];

interface ConversationChartProps {
  data?: ChartDataPoint[];
  className?: string;
}

export const ConversationChart = ({ data = MOCK_DATA, className }: ConversationChartProps) => {
  return (
    <div className={cn('rounded-xl border border-border bg-background p-4', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Conversation Volume & AI Resolution Rate</h3>
        <span className="text-xs text-muted-foreground">Last 14 days</span>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: '1px solid hsl(var(--border))',
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="conversations"
            name="Conversations"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="aiResolutionRate"
            name="AI Resolution %"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
