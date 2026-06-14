import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { subject: 'Mood', A: 65 },
  { subject: 'Sleep', A: 82 },
  { subject: 'Focus', A: 71 },
  { subject: 'Balance', A: 60 },
  { subject: 'Energy', A: 74 },
  { subject: 'Social', A: 69 },
]

const WellnessRadar = () => {
  return (
    <div className="glass rounded-[35px] p-8 glow h-[420px]">

      <div className="mb-10">

        <h1 className="text-3xl font-black">
          Wellness radar
        </h1>

        <p className="text-gray-400 mt-3">
          6-dim self-report + sensors
        </p>

      </div>

      <ResponsiveContainer width="100%" height="75%">

        <RadarChart data={data}>

          <PolarGrid stroke="#ffffff20" />

          <PolarAngleAxis
            dataKey="subject"
            stroke="#94A3B8"
          />

          <Radar
            dataKey="A"
            stroke="#9333EA"
            fill="#9333EA"
            fillOpacity={0.5}
          />

        </RadarChart>

      </ResponsiveContainer>

    </div>
  )
}

export default WellnessRadar