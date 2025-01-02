import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/Components/ui/chart';
import { TBookingStatus } from '@/shared/models/bookinginterfaces';
import {
  IDashboardChartData,
  IDashboardStatistics,
} from '@/shared/models/dashboardinterfaces';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { chartConfig } from '../models/chartConfig';

interface IDashboardChart {
  chartData: IDashboardChartData[];
  statistics: IDashboardStatistics;
}

export default function DashboardChart({ chartData }: IDashboardChart) {
  return (
    <div className="">
      <ChartContainer className="max-h-[311px] w-full" config={chartConfig}>
        <AreaChart
          data={chartData}
          height={350}
          margin={{
            left: 12,
            right: 12,
            top: 12,
            bottom: 12,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            {(
              Object.entries(chartConfig) as [
                TBookingStatus,
                (typeof chartConfig)[TBookingStatus],
              ][]
            ).map(([key, config]) => (
              <linearGradient
                key={key}
                id={`fill${key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={config.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={config.color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
          {(Object.keys(chartConfig) as TBookingStatus[]).map(key => (
            <Area
              key={key}
              dataKey={key}
              type="monotone"
              fill={`url(#fill${key})`}
              fillOpacity={0.4}
              stroke={chartConfig[key].color}
              strokeWidth={2}
              stackId="1"
            />
          ))}
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
