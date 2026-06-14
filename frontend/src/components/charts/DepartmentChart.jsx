import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from 'recharts'

const data = [
  { dept: 'Eng', burnout: 28 },
  { dept: 'Design', burnout: 26 },
  { dept: 'Sales', burnout: 31 },
  { dept: 'Marketing', burnout: 36 },
  { dept: 'Ops', burnout: 34 },
  { dept: 'Support', burnout: 22 },
]

const DepartmentChart = () => {
  return (
    <div className="glass rounded-[35px] p-8 glow h-[460px]">

      <div className="mb-10">

        <h1 className="text-3xl font-black">
          Department burnout heatmap
        </h1>

        <p className="text-gray-400 mt-3">
          Avg score · critical headcount
        </p>

      </div>

      <ResponsiveContainer width="100%" height="75%">

        <BarChart data={data}>

          <XAxis
            dataKey="dept"
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
            dataKey="burnout"
            fill="#9333EA"
            radius={[10, 10, 0, 0]}
            animationDuration={2500}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  )
}

export default DepartmentChart