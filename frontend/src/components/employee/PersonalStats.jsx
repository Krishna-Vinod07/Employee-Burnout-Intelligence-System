import {
  useEffect,
  useState,
} from 'react'

import { motion } from 'framer-motion'

const PersonalStats = () => {

  // USER
  const user = JSON.parse(
    localStorage.getItem('user')
  )

  // STATES
  const [stats, setStats] = useState([])

  // FETCH ANALYTICS
  useEffect(() => {

    fetchPersonalStats()

  }, [])

  const fetchPersonalStats = async () => {

    try {

      // ANALYTICS
      const analyticsResponse = await fetch(

        `http://127.0.0.1:5000/api/analytics/employee/${user.id}`

      )

      const analyticsData =
        await analyticsResponse.json()

      // LATEST MOOD
      const moodResponse = await fetch(

        `http://127.0.0.1:5000/api/mood/latest/${user.id}`

      )

      const moodData =
        await moodResponse.json()

      if (

        analyticsData.status === 'success' &&

        moodData.status === 'success'

      ) {

        const analytics =
          analyticsData.data

        const latestMood =
          moodData.data

        // DYNAMIC STATS
        const dynamicStats = [

          {
            title: 'Stress Level',

            value:
              `${analytics.averageStress}%`,

            subtitle:

              analytics.averageStress >= 75

                ? 'Critical burnout stress detected'

                : analytics.averageStress >= 55

                ? 'Elevated workload pressure'

                : 'Healthy stress balance maintained',

            gradient:
              analytics.averageStress >= 75

                ? 'from-red-500 to-red-700'

                : 'from-[#ff6b00] to-[#ff9d3d]',

            glow:
              'shadow-[0_0_30px_rgba(255,122,0,0.15)]',
          },

          {
            title: 'Sleep Quality',

            value:
              `${latestMood.sleep * 10}%`,

            subtitle:

              latestMood.sleep <= 5

                ? 'Recovery cycle instability detected'

                : 'Healthy recovery consistency',

            gradient:
              latestMood.sleep <= 5

                ? 'from-red-400 to-orange-500'

                : 'from-amber-400 to-orange-500',

            glow:
              'shadow-[0_0_30px_rgba(245,158,11,0.15)]',
          },

          {
            title: 'Focus Score',

            value:
              `${analytics.focusScore}%`,

            subtitle:

              analytics.focusScore >= 70

                ? 'Stable productivity rhythm'

                : 'Cognitive fatigue affecting focus',

            gradient:
              analytics.focusScore >= 70

                ? 'from-green-400 to-emerald-500'

                : 'from-orange-400 to-orange-600',

            glow:
              'shadow-[0_0_30px_rgba(249,115,22,0.15)]',
          },

          {
            title: 'Energy Recovery',

            value:
              `${analytics.averageEnergy}%`,

            subtitle:

              analytics.averageEnergy >= 70

                ? 'Strong recovery resilience'

                : 'Recovery efficiency needs improvement',

            gradient:
              analytics.averageEnergy >= 70

                ? 'from-green-400 to-emerald-500'

                : 'from-red-400 to-orange-500',

            glow:
              'shadow-[0_0_30px_rgba(239,68,68,0.12)]',
          },

        ]

        setStats(dynamicStats)

      }

    }

    catch (error) {

      console.log(error)

    }

  }

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">

      {stats.map((item, index) => (

        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
          whileHover={{
            y: -6,
          }}
          className={`relative overflow-hidden glass rounded-[34px] p-8 border border-white/5 hover:border-orange-500/20 transition-all duration-300 ${item.glow}`}
        >

          {/* BACKGROUND GLOW */}
          <div className={`absolute top-[-60px] right-[-60px] w-[140px] h-[140px] rounded-full bg-gradient-to-br ${item.gradient} opacity-10 blur-3xl`} />

          {/* TOP LABEL */}
          <p className="text-gray-500 uppercase tracking-[4px] text-xs font-semibold relative z-10">

            {item.title}

          </p>

          {/* VALUE */}
          <div className="mt-7 flex items-end gap-3 relative z-10">

            <h1 className={`text-6xl font-black bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent tracking-tight`}>

              {item.value}

            </h1>

          </div>

          {/* DIVIDER */}
          <div className="w-full h-[1px] bg-white/5 mt-6 relative z-10" />

          {/* SUBTITLE */}
          <p className="text-gray-400 mt-5 leading-relaxed relative z-10">

            {item.subtitle}

          </p>

          {/* LIVE INDICATOR */}
          <div className="flex items-center gap-2 mt-6 relative z-10">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <p className="text-green-400 text-sm">

              Real-time AI monitoring

            </p>

          </div>

        </motion.div>

      ))}

    </div>

  )
}

export default PersonalStats