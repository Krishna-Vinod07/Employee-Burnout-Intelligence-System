import {
  useEffect,
  useState,
} from 'react'

import {
  Brain,
  Activity,
  Moon,
  Flame,
} from 'lucide-react'

import { motion } from 'framer-motion'

const WellnessHabits = () => {

  // USER
  const user = JSON.parse(
    localStorage.getItem('user')
  )

  // STATES
  const [habits, setHabits] = useState([])

  const [recoveryScore, setRecoveryScore] = useState(0)

  const [aiInsight, setAiInsight] = useState(
    'Analyzing wellness telemetry...'
  )
  const [analytics, setAnalytics] =
  useState(null)
  
useEffect(() => {

  fetchWellnessData()

}, [])
  // FETCH DATA
 const fetchWellnessData = async () => {

  try {

    const moodResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/api/mood/${user.id}`
    )

    const moodData =
      await moodResponse.json()

    const activityResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/api/activity/${user.id}`
    )

    const activityData =
      await activityResponse.json()

    const analyticsResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/api/analytics/employee/${user.id}`
    )

    const analyticsData =
      await analyticsResponse.json()
      console.log(
  "Analytics API Response:",
  analyticsData
)

console.log(
  "Recommendations:",
  analyticsData?.data?.recommendations
)

    if (
      moodData.status === 'success' &&
      activityData.status === 'success'
    ) {

      const latestMood =
  moodData.data?.[0]

const latestActivity =
  activityData.data?.[0]

      const sleepScore =
        latestMood?.sleep
          ? latestMood.sleep * 10
          : 0

      const focusScore =
        latestActivity?.activityCount
          ? Math.min(
              latestActivity.activityCount / 5,
              100
            )
          : 0

      const recovery = Math.round(
        (
          latestMood.energy +
          sleepScore +
          (100 - latestMood.stress)
        ) / 3
      )

      setRecoveryScore(
        recovery
      )

      setHabits([
        {
          icon: <Moon size={26} />,
          title: 'Sleep Recovery',
          progress: sleepScore,
          value: `${latestMood.sleep} hrs`,
          gradient:
            'from-[#ff6b00] to-[#ff9d3d]',
          glow:
            'shadow-[0_0_30px_rgba(255,122,0,0.12)]'
        },

        {
          icon: <Activity size={26} />,
          title:
            'Activity Consistency',
          progress: Math.min(
            latestActivity.activeMinutes,
            100
          ),
          value:
            `${latestActivity.activeMinutes} mins`,
          gradient:
            'from-orange-500 to-amber-400',
          glow:
            'shadow-[0_0_30px_rgba(249,115,22,0.12)]'
        },

        {
          icon: <Brain size={26} />,
          title:
            'Focus Sessions',
          progress: focusScore,
          value:
            `${latestActivity.activityCount} actions`,
          gradient:
            'from-amber-400 to-orange-500',
          glow:
            'shadow-[0_0_30px_rgba(245,158,11,0.12)]'
        },

        {
          icon: <Flame size={26} />,
          title:
            'Burnout Resilience',
          progress: recovery,
          value: `${recovery}%`,
          gradient:
            recovery >= 70
              ? 'from-green-400 to-emerald-500'
              : 'from-red-400 to-orange-500',
          glow:
            'shadow-[0_0_30px_rgba(239,68,68,0.12)]'
        }

      ])

    }

    if (
      analyticsData.status === 'success'
    ) {

      setAnalytics(
        analyticsData.data
      )

      setAiInsight(

        analyticsData.data.aiInsight ||

        'AI insight unavailable.'

      )

    }

  }

  catch (error) {

    console.log(error)

  }

}

console.log("Analytics:", analytics)
console.log("Recommendations:", analytics?.recommendations)

  return (

    <div className="relative overflow-hidden glass rounded-[42px] p-10 border border-orange-500/10">

      {/* BACKGROUND GLOW */}
      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-orange-500/5 blur-[140px]" />

      {/* HEADER */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        {/* LEFT */}
        <div>

          <p className="text-orange-400 uppercase tracking-[5px] font-semibold">

            AI Wellness Intelligence

          </p>

          <h1 className="text-5xl font-bold mt-5 tracking-tight">

            Wellness Habits

          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-3xl leading-relaxed">

            AI-powered wellness analysis generated
            from emotional telemetry,
            productivity signals,
            recovery metrics,
            and behavioral patterns.

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
          className="glass px-7 py-5 rounded-3xl border border-green-500/10 h-fit"
        >

          <p className="text-gray-500 text-sm uppercase tracking-[3px] font-semibold">

            Recovery Score

          </p>

          <h2 className="text-5xl font-black mt-3 text-green-400 tracking-tight">

            {recoveryScore}

          </h2>

        </motion.div>

      </div>

      {/* GRID */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-8 mt-16">

        {habits.map((habit, index) => (

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
            whileHover={{
              y: -5,
            }}
            className={`relative overflow-hidden glass rounded-[34px] p-8 border border-white/5 hover:border-orange-500/15 transition-all duration-300 ${habit.glow}`}
          >

            {/* CARD GLOW */}
            <div className={`absolute top-[-60px] right-[-60px] w-[160px] h-[160px] rounded-full bg-gradient-to-br ${habit.gradient} opacity-10 blur-3xl`} />

            {/* TOP */}
            <div className="relative z-10 flex items-center justify-between">

              {/* ICON */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${habit.gradient} flex items-center justify-center shadow-[0_0_25px_rgba(255,122,0,0.15)]`}>

                {habit.icon}

              </div>

              {/* VALUE */}
              <h2 className="text-3xl font-bold tracking-tight">

                {habit.value}

              </h2>

            </div>

            {/* TITLE */}
            <h3 className="relative z-10 text-2xl font-bold mt-8 tracking-tight">

              {habit.title}

            </h3>

            {/* PROGRESS */}
            <div className="relative z-10 mt-8">

              {/* BAR */}
              <div className="h-4 rounded-full bg-white/5 overflow-hidden">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${habit.progress}%`,
                  }}
                  transition={{
                    duration: 1.2,
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${habit.gradient}`}
                />

              </div>

              {/* LABELS */}
              <div className="flex justify-between mt-4 text-gray-500 text-sm">

                <p>Progress</p>

                <p>{Math.round(habit.progress)}%</p>

              </div>

            </div>

            {/* LIVE STATUS */}
            <div className="relative z-10 flex items-center gap-2 mt-7">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <p className="text-green-400 text-sm">

                AI wellness monitoring active

              </p>

            </div>

          </motion.div>

        ))}

      </div>

      {/* FOOTER */}
      <motion.div
        whileHover={{
          y: -3,
        }}
        className="relative z-10 glass rounded-[34px] p-9 mt-14 border border-orange-500/10"
      >

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          {/* LEFT */}
          <div>

            <p className="text-orange-400 uppercase tracking-[4px] font-semibold">

              AI Wellness Insight

            </p>

            <h2 className="text-4xl font-bold mt-5 tracking-tight leading-tight">

              {aiInsight}

            </h2>

            <p className="text-gray-400 text-lg mt-6 leading-relaxed max-w-3xl">

              Generated using behavioral telemetry,
              activity monitoring,
              sleep recovery patterns,
              emotional wellness tracking,
              and burnout intelligence.

            </p>

          </div>

          <div className="space-y-3 max-w-md">

  <p className="text-green-400 font-bold">
    Recommendation Count:
    {analytics?.recommendations?.length || 0}
  </p>

  {
    analytics?.recommendations &&
    analytics.recommendations.length > 0 ? (

      analytics.recommendations.map(
        (item, index) => (

          <div
            key={index}
            className="glass rounded-2xl p-4 border border-orange-500/10"
          >
            <p className="text-white text-base leading-relaxed">
              {item}
            </p>
          </div>

        )
      )

    ) : (

      <p className="text-red-400">
        No recommendations found
      </p>

    )
  }

</div>
        </div>

      </motion.div>

    </div>

  )
}
  
export default WellnessHabits