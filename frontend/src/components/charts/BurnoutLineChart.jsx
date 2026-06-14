import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

import { burnoutTrend } from '../../data/dashboardData'

const BurnoutLineChart = () => {

  return (

    <div className="glass rounded-[40px] p-10 h-[500px] border border-orange-500/10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">

        <div>

          <p className="text-orange-400 uppercase tracking-[4px] font-semibold">

            Workforce Analytics

          </p>

          <h1 className="text-4xl font-bold mt-3 tracking-tight">

            Burnout vs Productivity

          </h1>

        </div>

        {/* LIVE STATUS */}
        <div className="glass px-5 py-3 rounded-2xl border border-green-500/10">

          <p className="text-green-400 font-medium">
            ● Live Tracking
          </p>

        </div>

      </div>

      {/* CHART */}
      <div className="h-[400px] w-full">
       <ResponsiveContainer width="100%" height="100%">

        <LineChart data={burnoutTrend}>

          {/* GRID */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />

          {/* X AXIS */}
          <XAxis
            dataKey="week"
            stroke="#6B7280"
            tickLine={false}
            axisLine={false}
          />

          {/* Y AXIS */}
          <YAxis
            stroke="#6B7280"
            tickLine={false}
            axisLine={false}
          />

          {/* TOOLTIP */}
          <Tooltip
            contentStyle={{
              background: '#0B0B0B',
              border: '1px solid rgba(255,122,0,0.15)',
              borderRadius: '18px',
              color: '#fff',
            }}
          />

          {/* BURNOUT */}
          <Line
            type="monotone"
            dataKey="burnout"
            stroke="#ff6b00"
            strokeWidth={4}
            dot={{
              r: 4,
              fill: '#ff6b00',
            }}
            activeDot={{
              r: 7,
              fill: '#ff8c1a',
            }}
            animationDuration={2500}
          />

          {/* PRODUCTIVITY */}
          <Line
            type="monotone"
            dataKey="productivity"
            stroke="#f59e0b"
            strokeWidth={4}
            dot={{
              r: 4,
              fill: '#f59e0b',
            }}
            activeDot={{
              r: 7,
              fill: '#fbbf24',
            }}
            animationDuration={2500}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  </div>

  )
}

export default BurnoutLineChart