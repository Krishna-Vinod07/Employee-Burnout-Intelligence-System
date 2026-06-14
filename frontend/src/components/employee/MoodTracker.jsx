import {
  useEffect,
  useState,
} from 'react'

import { motion } from 'framer-motion'

const MoodTracker = () => {

  // USER
  const user = JSON.parse(
    localStorage.getItem('user')
  )

  // STATE
  const [moods, setMoods] = useState([])

  const [averageMood, setAverageMood] = useState(0)

  const [aiInsight, setAiInsight] = useState(
    'Analyzing emotional wellness...'
  )

  const [peakMood, setPeakMood] = useState('--')

  const [lowestMood, setLowestMood] = useState('--')

  // FETCH MOOD DATA
  useEffect(() => {

    fetchMoodData()

  }, [])

  const fetchMoodData = async () => {

    try {

      const response = await fetch(

        `http://127.0.0.1:5000/api/mood/${user.id}`

      )

      const data = await response.json()

      if (data.status === 'success') {

        // FORMAT LAST 5 RECORDS
        const formattedMoods = data.data
          .slice(0, 5)
          .reverse()
          .map((item, index) => ({

            day: `Day ${index + 1}`,

            value: item.energy,

            stress: item.stress,

            riskScore: item.riskScore,

            mood: item.mood,

            color:

              item.riskScore >= 75

                ? 'from-red-500 to-orange-500'

                : item.riskScore >= 55

                ? 'from-orange-500 to-amber-400'

                : 'from-[#ff6b00] to-[#ff9d3d]'

          }))

        setMoods(formattedMoods)

        // AVERAGE MOOD
        const avgMood = Math.round(

          formattedMoods.reduce(
            (acc, item) => acc + item.value,
            0
          ) / formattedMoods.length

        )

        setAverageMood(avgMood)

        // PEAK MOOD
        const peak = formattedMoods.reduce(

          (prev, current) =>

            prev.value > current.value
              ? prev
              : current

        )

        setPeakMood(
          `${peak.day} (${peak.value}%)`
        )

        // LOWEST MOOD
        const low = formattedMoods.reduce(

          (prev, current) =>

            prev.value < current.value
              ? prev
              : current

        )

        setLowestMood(
          `${low.day} (${low.value}%)`
        )

        // AI INSIGHT
        const avgStress = Math.round(

          formattedMoods.reduce(
            (acc, item) => acc + item.stress,
            0
          ) / formattedMoods.length

        )

        const avgRisk = Math.round(

          formattedMoods.reduce(
            (acc, item) => acc + item.riskScore,
            0
          ) / formattedMoods.length

        )

        if (avgRisk >= 75) {

          setAiInsight(
            'Critical emotional fatigue detected'
          )

        }

        else if (avgStress >= 70) {

          setAiInsight(
            'Stress escalation pattern observed'
          )

        }

        else if (avgMood >= 70) {

          setAiInsight(
            'Healthy emotional recovery trend'
          )

        }

        else {

          setAiInsight(
            'Moderate emotional fluctuation detected'
          )

        }

      }

    }

    catch (error) {

      console.log(error)

    }

  }

  return (

    <div className="relative overflow-hidden glass rounded-[42px] p-10 border border-orange-500/10">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-100px] right-[-100px] w-[260px] h-[260px] rounded-full bg-orange-500/5 blur-[120px]" />

      {/* HEADER */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        <div>

          <p className="text-orange-400 uppercase tracking-[5px] font-semibold">

            Emotional Wellness Intelligence

          </p>

          <h1 className="text-5xl font-bold mt-5 tracking-tight">

            AI Mood Tracker

          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-3xl leading-relaxed">

            Real-time emotional analytics powered by
            behavioral telemetry, wellness tracking,
            and machine learning burnout intelligence.

          </p>

        </div>

        {/* STATUS */}
        <motion.div
          animate={{
            y: [-4, 4, -4],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="glass px-6 py-4 rounded-2xl border border-green-500/10"
        >

          <div className="flex items-center gap-3">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <p className="text-green-400 font-medium">

              AI emotional analysis active

            </p>

          </div>

        </motion.div>

      </div>

      {/* CHART */}
      <div className="relative z-10 flex items-end justify-between gap-6 mt-20 h-[320px]">

        {moods.map((mood, index) => (

          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            className="flex flex-col items-center flex-1"
          >

            {/* BAR */}
            <div className="w-full flex justify-center">

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                className={`w-16 rounded-t-[24px] bg-gradient-to-t ${mood.color} shadow-[0_0_30px_rgba(255,122,0,0.15)] relative overflow-hidden`}
                style={{
                  height: `${mood.value * 2.6}px`,
                }}
              >

                {/* SHINE */}
                <div className="absolute inset-0 bg-white/10 opacity-30" />

              </motion.div>

            </div>

            {/* VALUE */}
            <p className="text-2xl font-bold mt-6 text-orange-300">

              {mood.value}%

            </p>

            {/* DAY */}
            <p className="text-gray-500 mt-2 tracking-wide">

              {mood.day}

            </p>

          </motion.div>

        ))}

      </div>

      {/* FOOTER INSIGHTS */}
      <div className="relative z-10 grid md:grid-cols-3 gap-6 mt-16">

        <InsightCard
          title="Peak Emotional State"
          value={peakMood}
          subtitle="Highest emotional wellness detected"
        />

        <InsightCard
          title="Lowest Emotional State"
          value={lowestMood}
          subtitle="Potential fatigue period detected"
        />

        <InsightCard
          title="AI Emotional Insight"
          value={aiInsight}
          subtitle="Generated using behavioral + wellness analytics"
        />

      </div>

      {/* EMOTIONAL SCORE */}
      <div className="relative z-10 mt-14 glass rounded-[32px] p-8 border border-orange-500/10">

        <p className="text-gray-500 uppercase tracking-[4px] text-sm font-semibold">

          Emotional Stability Score

        </p>

        <h1 className="text-7xl font-black text-orange-400 mt-5">

          {averageMood}%

        </h1>

        <p className="text-gray-400 text-lg mt-6">

          Calculated using mood consistency,
          energy levels, stress patterns,
          and burnout telemetry analysis.

        </p>

      </div>

    </div>

  )
}

/* INSIGHT CARD */
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

      <h2 className="text-3xl font-bold mt-5 tracking-tight text-white leading-snug">

        {value}

      </h2>

      <p className="text-gray-400 mt-4 leading-relaxed">

        {subtitle}

      </p>

    </motion.div>

  )
}

export default MoodTracker