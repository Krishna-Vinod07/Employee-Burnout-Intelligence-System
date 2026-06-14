import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from 'recharts'

const data = [
  { week: 'W1', burnout: 52, productivity: 66 },
  { week: 'W2', burnout: 51, productivity: 68 },
  { week: 'W3', burnout: 63, productivity: 60 },
  { week: 'W4', burnout: 43, productivity: 76 },
  { week: 'W5', burnout: 52, productivity: 68 },
  { week: 'W6', burnout: 65, productivity: 66 },
  { week: 'W7', burnout: 74, productivity: 53 },
  { week: 'W8', burnout: 50, productivity: 71 },
]

const ForecastChart = () => {
  return (
    <div className="glass rounded-[35px] p-8 glow h-[500px]">

      <div className="mb-10">

        <h1 className="text-3xl font-black">
          AI forecasting · burnout trajectory
        </h1>

        <p className="text-gray-400 mt-3">
          Observed vs ML prediction
        </p>

      </div>

      <ResponsiveContainer width="100%" height="78%">

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
            dataKey="burnout"
            stroke="#9333EA"
            strokeWidth={4}
            dot={false}
            animationDuration={3000}
          />

          <Line
            type="monotone"
            dataKey="productivity"
            stroke="#06B6D4"
            strokeWidth={4}
            dot={false}
            animationDuration={3000}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  )
}

export default ForecastChart