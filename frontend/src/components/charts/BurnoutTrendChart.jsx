import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from 'recharts'

const data = [
  { week: 'W1', value: 52 },
  { week: 'W2', value: 48 },
  { week: 'W3', value: 63 },
  { week: 'W4', value: 41 },
  { week: 'W5', value: 55 },
  { week: 'W6', value: 69 },
  { week: 'W7', value: 77 },
  { week: 'W8', value: 49 },
]

const BurnoutTrendChart = () => {
  return (
    <div className="glass rounded-[35px] p-8 glow h-[420px]">

      <div className="mb-10">

        <h1 className="text-3xl font-black">
          Weekly burnout pressure
        </h1>

        <p className="text-gray-400 mt-3">
          Composite index · 8w
        </p>

      </div>

      <ResponsiveContainer width="100%" height="75%">

        <LineChart data={data}>

          <XAxis
            dataKey="week"
            stroke="#94A3B8"
          />

          <Tooltip
            contentStyle={{
              background: '#0B1023',
              border: '1px solid #9333EA',
              borderRadius: '16px',
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#C026D3"
            strokeWidth={5}
            dot={false}
            animationDuration={3000}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  )
}

export default BurnoutTrendChart