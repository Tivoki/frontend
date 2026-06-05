'use client';

import { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn, useMediaQuery } from '~/shared/lib';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/shared/ui/kit/tabs';

interface ChartDataPoint {
  date: string;
  conversations: number;
  aiResolutionRate: number;
}

const MOCK_DATA: ChartDataPoint[] = [
  { date: 'May 1', conversations: 120, aiResolutionRate: 62 },
  { date: 'May 2', conversations: 138, aiResolutionRate: 64 },
  { date: 'May 3', conversations: 145, aiResolutionRate: 65 },
  { date: 'May 4', conversations: 126, aiResolutionRate: 61 },
  { date: 'May 5', conversations: 132, aiResolutionRate: 63 },
  { date: 'May 6', conversations: 151, aiResolutionRate: 66 },
  { date: 'May 7', conversations: 160, aiResolutionRate: 68 },
  { date: 'May 8', conversations: 172, aiResolutionRate: 69 },
  { date: 'May 9', conversations: 178, aiResolutionRate: 70 },
  { date: 'May 10', conversations: 166, aiResolutionRate: 68 },
  { date: 'May 11', conversations: 155, aiResolutionRate: 67 },
  { date: 'May 12', conversations: 182, aiResolutionRate: 100 },
  { date: 'May 13', conversations: 190, aiResolutionRate: 100 },
  { date: 'May 14', conversations: 210, aiResolutionRate: 120 },
];

type ChartPeriod = 7 | 14;

const PERIOD_OPTIONS: ChartPeriod[] = [7, 14];

interface ConversationChartProps {
  data?: ChartDataPoint[];
  className?: string;
}

export const ConversationChart = ({
  data = MOCK_DATA,
  className,
}: ConversationChartProps) => {
  const [period, setPeriod] = useState<ChartPeriod>(14);
  const isBelowSm = useMediaQuery('(max-width: 639px)');
  const isBelowMd = useMediaQuery('(max-width: 767px)');
  const isBelowLg = useMediaQuery('(max-width: 1023px)');
  const chartData = useMemo(() => data.slice(-period), [data, period]);
  let xAxisTickStep: 3 | 2 | 1 = 1;

  if (period === 14) {
    if (isBelowSm) {
      xAxisTickStep = 3;
    } else if (isBelowLg) {
      xAxisTickStep = 2;
    }
  } else if (period === 7 && isBelowMd) {
    xAxisTickStep = 2;
  }

  return (
    <div className={cn('border-border bg-background rounded-xl border p-4', className)}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold">
          Conversation Volume & AI Resolution Rate
        </h3>
        <Tabs
          value={String(period)}
          onValueChange={(value) => setPeriod(Number(value) as ChartPeriod)}
          className="shrink-0"
        >
          <TabsList className="border-border bg-muted border">
            {PERIOD_OPTIONS.map((option) => (
              <TabsTrigger
                key={option}
                value={String(option)}
                className="text-xs"
              >
                {option} days
              </TabsTrigger>
            ))}
          </TabsList>
          {PERIOD_OPTIONS.map((option) => (
            <TabsContent key={option} value={String(option)} className="sr-only">
              {option}-day period
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData} margin={{ top: 4, right: 12, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            tickFormatter={(value: string, index: number) =>
              index % xAxisTickStep === 0 ? value : ''
            }
            interval={0}
            padding={{ left: 12, right: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: '1px solid var(--border)',
              fontSize: 12,
            }}
            itemSorter={(item) => (item.dataKey === 'conversations' ? 0 : 1)}
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
            name="AI Resolution Rate"
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
