import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Low', value: 75 },
  { name: 'Moderate', value: 20 },
  { name: 'High', value: 5 },
]

const COLORS = [
  '#22C55E',
  '#F59E0B',
  '#EF4444',
]

const RiskDistribution = () => {
  return (
    <div className="glass rounded-[35px] p-8 glow h-[460px]">

      <div>

        <h1 className="text-3xl font-black">
          Risk distribution
        </h1>

        <p className="text-gray-400 mt-3">
          All employees
        </p>

      </div>

      <div className="h-[320px] mt-10">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}

            </Pie>

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-8 mt-4">

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500" />
          <p>Low</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500" />
          <p>Moderate</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <p>High</p>
        </div>

      </div>

    </div>
  )
}

export default RiskDistribution