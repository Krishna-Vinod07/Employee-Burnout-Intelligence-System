import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

import {
  useEffect,
  useState,
} from 'react'

import { motion } from 'framer-motion'

const ProductivityTimeline = () => {

  // USER
  const user = JSON.parse(
    localStorage.getItem('user')
  )

  // STATE
  const [productivityData, setProductivityData] = useState([])

  // FETCH DATA
  useEffect(() => {

    fetchMoodHistory()

  }, [])

  const fetchMoodHistory = async () => {

    try {

      const response = await fetch(
        `http://127.0.0.1:5000/api/mood/${user.id}`
      )

      const data = await response.json()

      if (data.status === 'success') {

        const formattedData = data.data
          .slice(0, 7)
          .reverse()
          .map((item, index) => ({

            day: `Day ${index + 1}`,

            productivity: item.energy,

            stress: item.stress,

          }))

        setProductivityData(formattedData)

      }

    } catch (error) {

      console.log(error)

    }

  }

  // CALCULATE FOCUS SCORE
  const focusScore =
    productivityData.length > 0

      ? Math.round(

          productivityData.reduce(
            (acc, item) => acc + item.productivity,
            0
          ) / productivityData.length

        )

      : 0

  return (

    <div className="relative overflow-hidden glass rounded-[42px] p-10 border border-orange-500/10">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-orange-500/5 blur-[120px]" />

      {/* HEADER */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        {/* LEFT */}
        <div>

          <p className="text-orange-400 uppercase tracking-[5px] font-semibold">

            Performance Intelligence

          </p>

          <h1 className="text-5xl font-bold mt-5 tracking-tight">

            Productivity Timeline

          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-3xl leading-relaxed">

            AI-tracked focus patterns,
            productivity consistency,
            and burnout correlation
            across your weekly workflow.

          </p>

        </div>

        {/* SCORE */}
        <motion.div
          animate={{
            y: [-4, 4, -4],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="glass px-7 py-5 rounded-3xl h-fit border border-orange-500/10"
        >

          <p className="text-gray-500 uppercase tracking-[3px] text-sm font-semibold">

            Focus Score

          </p>

          <h2 className="text-5xl font-black text-orange-400 mt-3 tracking-tight">

            {focusScore}

          </h2>

        </motion.div>

      </div>

      {/* CHART */}
      <div className="relative z-10 h-[430px] mt-16">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={productivityData}>

            {/* GRADIENTS */}
            <defs>

              <linearGradient
                id="productivityGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#ff6b00"
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor="#ff6b00"
                  stopOpacity={0}
                />

              </linearGradient>

              <linearGradient
                id="stressGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#f59e0b"
                  stopOpacity={0.4}
                />

                <stop
                  offset="95%"
                  stopColor="#f59e0b"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            {/* GRID */}
            <CartesianGrid
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />

            {/* X AXIS */}
            <XAxis
              dataKey="day"
              stroke="#666"
              tickLine={false}
              axisLine={false}
            />

            {/* Y AXIS */}
            <YAxis
              stroke="#666"
              tickLine={false}
              axisLine={false}
            />

            {/* TOOLTIP */}
            <Tooltip
              contentStyle={{
                background: '#0f0f0f',
                border: '1px solid rgba(255,122,0,0.15)',
                borderRadius: '18px',
                color: '#fff',
              }}
            />

            {/* PRODUCTIVITY */}
            <Area
              type="monotone"
              dataKey="productivity"
              stroke="#ff6b00"
              fillOpacity={1}
              fill="url(#productivityGradient)"
              strokeWidth={4}
            />

            {/* STRESS */}
            <Area
              type="monotone"
              dataKey="stress"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#stressGradient)"
              strokeWidth={4}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      {/* FOOTER CARDS */}
      <div className="relative z-10 grid lg:grid-cols-3 gap-8 mt-16">

        <InsightCard
          title="Peak Productivity"
          value={
            productivityData.length > 0
              ? `${Math.max(
                  ...productivityData.map(
                    item => item.productivity
                  )
                )}%`
              : '--'
          }
          subtitle="Highest focus performance recorded"
        />

        <InsightCard
          title="Average Stress"
          value={
            productivityData.length > 0
              ? `${Math.round(
                  productivityData.reduce(
                    (acc, item) => acc + item.stress,
                    0
                  ) / productivityData.length
                )}%`
              : '--'
          }
          subtitle="AI-tracked workload pressure"
        />

        <InsightCard
          title="AI Observation"
          value={
            focusScore >= 70
              ? 'Healthy Focus'
              : 'Recovery Needed'
          }
          subtitle="Generated from recent wellness patterns"
        />

      </div>

    </div>

  )
}

/* FOOTER CARD */
const InsightCard = ({
  title,
  value,
  subtitle,
}) => {

  return (

    <motion.div
      whileHover={{
        y: -4,
      }}
      className="glass rounded-[30px] p-7 border border-white/5 hover:border-orange-500/15 transition-all duration-300"
    >

      <p className="text-gray-500 uppercase tracking-[3px] text-xs font-semibold">

        {title}

      </p>

      <h2 className="text-3xl font-bold mt-5 tracking-tight text-white">

        {value}

      </h2>

      <p className="text-gray-400 mt-4 leading-relaxed">

        {subtitle}

      </p>

    </motion.div>

  )
}

export default ProductivityTimeline