'use client';

import { cn, useMediaQuery } from '~/shared/lib';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type ChartConfig,
} from '~/shared/ui/kit';
import { useMemo, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

interface ChartDataPoint {
  date: string;
  conversations: number;
  aiResolved: number;
}

const MOCK_DATA: ChartDataPoint[] = [
  { date: 'May 1', conversations: 120, aiResolved: 62 },
  { date: 'May 2', conversations: 138, aiResolved: 64 },
  { date: 'May 3', conversations: 145, aiResolved: 65 },
  { date: 'May 4', conversations: 126, aiResolved: 61 },
  { date: 'May 5', conversations: 132, aiResolved: 63 },
  { date: 'May 6', conversations: 151, aiResolved: 66 },
  { date: 'May 7', conversations: 160, aiResolved: 68 },
  { date: 'May 8', conversations: 172, aiResolved: 69 },
  { date: 'May 9', conversations: 178, aiResolved: 70 },
  { date: 'May 10', conversations: 166, aiResolved: 68 },
  { date: 'May 11', conversations: 155, aiResolved: 67 },
  { date: 'May 12', conversations: 182, aiResolved: 100 },
  { date: 'May 13', conversations: 190, aiResolved: 100 },
  { date: 'May 14', conversations: 210, aiResolved: 120 },
];

const CHART_CONFIG = {
  conversations: {
    label: 'Conversations',
    theme: { light: '#6366f1', dark: '#818cf8' },
  },
  aiResolved: {
    label: 'AI Resolved',
    theme: { light: '#059669', dark: '#34d399' },
  },
} satisfies ChartConfig;

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
        <h3 className="text-sm font-semibold">Conversation Volume & AI Resolved</h3>
        <Tabs
          value={String(period)}
          onValueChange={(value) => setPeriod(Number(value) as ChartPeriod)}
          className="shrink-0"
        >
          <TabsList className="border-border bg-muted border">
            {PERIOD_OPTIONS.map((option) => (
              <TabsTrigger key={option} value={String(option)} className="text-xs">
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

      <ChartContainer config={CHART_CONFIG} className="aspect-auto h-[200px]">
        <LineChart data={chartData} margin={{ top: 4, right: 12, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" />
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
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            type="monotone"
            dataKey="conversations"
            stroke="var(--color-conversations)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="aiResolved"
            stroke="var(--color-aiResolved)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};
