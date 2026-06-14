import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from 'recharts'

const data = [
  { day: 'Mon', hours: 10 },
  { day: 'Tue', hours: 11 },
  { day: 'Wed', hours: 9 },
  { day: 'Thu', hours: 12 },
  { day: 'Fri', hours: 7 },
  { day: 'Sat', hours: 5 },
  { day: 'Sun', hours: 4 },
]

const DailyHoursChart = () => {
  return (
    <div className="glass rounded-[35px] p-8 glow h-[420px]">

      <div className="mb-10">

        <h1 className="text-3xl font-black">
          Daily work hours
        </h1>

        <p className="text-gray-400 mt-3">
          Active hours · last 7 days
        </p>

      </div>

      <ResponsiveContainer width="100%" height="75%">

        <BarChart data={data}>

          <XAxis
            dataKey="day"
            stroke="#94A3B8"
          />

          <Tooltip
            contentStyle={{
              background: '#0B1023',
              border: '1px solid #9333EA',
              borderRadius: '16px',
            }}
          />

          <Bar
            dataKey="hours"
            fill="#9333EA"
            radius={[10, 10, 0, 0]}
            animationDuration={2500}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  )
}

export default DailyHoursChart