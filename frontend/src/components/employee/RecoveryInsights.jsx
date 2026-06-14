import {
  useEffect,
  useState,
} from 'react'

import {
  Brain,
  Coffee,
  Moon,
  HeartPulse,
  Flame,
} from 'lucide-react'

import { motion } from 'framer-motion'

const RecoveryInsights = () => {

  // USER
  const user = JSON.parse(
    localStorage.getItem('user')
  )

  // STATES
  const [insights, setInsights] = useState([])

  const [mainRecommendation, setMainRecommendation] =
    useState('Analyzing wellness telemetry...')

  const [recommendationDescription,
    setRecommendationDescription] = useState(
      'AI systems are evaluating behavioral patterns.'
    )

  // FETCH AI INSIGHTS
  useEffect(() => {

    fetchRecoveryInsights()

  }, [])

  const fetchRecoveryInsights = async () => {

    try {

      // FETCH MOOD DATA
      const moodResponse = await fetch(

        `${import.meta.env.VITE_API_URL}/api/mood/${user.id}`

      )

      const moodData = await moodResponse.json()

      // FETCH ACTIVITY DATA
      const activityResponse = await fetch(

        `${import.meta.env.VITE_API_URL}/api/activity/${user.id}`

      )

      const activityData =
        await activityResponse.json()

      if (

        moodData.status === 'success' &&

        activityData.status === 'success'

      ) {

        const latestMood =
          moodData.data[0]

        const latestActivity =
          activityData.data[0]

        const dynamicInsights = []

        // HIGH STRESS
        if (
          latestMood.stress >= 70
        ) {

          dynamicInsights.push({

            icon: <Coffee size={26} />,

            title:
              'Reduce workload pressure',

            description:
              'AI detected elevated stress levels and sustained workload pressure impacting emotional resilience.',

            gradient:
              'from-[#ff6b00] to-[#ff9d3d]',

            glow:
              'shadow-[0_0_30px_rgba(255,122,0,0.14)]',

          })

        }

        // LOW SLEEP
        if (
          latestMood.sleep <= 5
        ) {

          dynamicInsights.push({

            icon: <Moon size={26} />,

            title:
              'Improve sleep recovery',

            description:
              'Low sleep recovery patterns correlate strongly with burnout escalation and cognitive fatigue.',

            gradient:
              'from-amber-400 to-orange-500',

            glow:
              'shadow-[0_0_30px_rgba(245,158,11,0.12)]',

          })

        }

        // HIGH IDLE TIME
        if (
          latestActivity.idleMinutes >= 60
        ) {

          dynamicInsights.push({

            icon: <HeartPulse size={26} />,

            title:
              'Schedule recovery breaks',

            description:
              'Extended inactivity intervals may indicate emotional exhaustion and reduced engagement.',

            gradient:
              'from-red-400 to-orange-500',

            glow:
              'shadow-[0_0_30px_rgba(239,68,68,0.12)]',

          })

        }

        // CRITICAL BURNOUT
        if (
          latestMood.riskScore >= 75
        ) {

          dynamicInsights.push({

            icon: <Flame size={26} />,

            title:
              'Immediate burnout intervention',

            description:
              'Critical burnout indicators detected from behavioral telemetry and wellness analytics.',

            gradient:
              'from-red-500 to-red-700',

            glow:
              'shadow-[0_0_30px_rgba(239,68,68,0.18)]',

          })

        }

        // DEFAULT
        if (
          dynamicInsights.length === 0
        ) {

          dynamicInsights.push({

            icon: <Brain size={26} />,

            title:
              'Wellness balance stable',

            description:
              'AI systems detected stable recovery behavior and sustainable productivity patterns.',

            gradient:
              'from-green-400 to-emerald-500',

            glow:
              'shadow-[0_0_30px_rgba(34,197,94,0.18)]',

          })

        }

        setInsights(dynamicInsights)

        // MAIN RECOMMENDATION
        if (
          latestMood.riskScore >= 75
        ) {

          setMainRecommendation(
            'Immediate recovery intervention recommended'
          )

          setRecommendationDescription(
            'Critical burnout telemetry indicates urgent workload balancing and structured recovery planning.'
          )

        }

        else if (
          latestMood.stress >= 70
        ) {

          setMainRecommendation(
            'Reduce cognitive overload this week'
          )

          setRecommendationDescription(
            'AI systems identified sustained stress escalation and reduced emotional recovery efficiency.'
          )

        }

        else if (
          latestMood.sleep <= 5
        ) {

          setMainRecommendation(
            'Prioritize sleep stabilization'
          )

          setRecommendationDescription(
            'Sleep recovery analytics indicate elevated fatigue accumulation affecting resilience.'
          )

        }

        else {

          setMainRecommendation(
            'Maintain current wellness rhythm'
          )

          setRecommendationDescription(
            'Behavioral telemetry indicates healthy emotional consistency and balanced productivity.'
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
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full bg-orange-500/5 blur-[120px]" />

      {/* HEADER */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        {/* LEFT */}
        <div>

          <p className="text-orange-400 uppercase tracking-[5px] font-semibold">

            AI Recovery Engine

          </p>

          <h1 className="text-5xl font-bold mt-5 tracking-tight">

            Recovery Insights

          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-3xl leading-relaxed">

            Personalized wellness recommendations generated
            from workload patterns,
            productivity telemetry,
            emotional analytics,
            and machine learning burnout intelligence.

          </p>

        </div>

        {/* AI BADGE */}
        <motion.div
          animate={{
            y: [-4, 4, -4],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="glass px-6 py-5 rounded-3xl h-fit border border-orange-500/10"
        >

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b00] to-[#ff9d3d] flex items-center justify-center shadow-[0_0_30px_rgba(255,122,0,0.2)]">

              <Brain
                size={22}
                className="text-white"
              />

            </div>

            <div>

              <p className="text-orange-300 font-semibold tracking-wide">

                AI Active

              </p>

              <p className="text-gray-500 text-sm mt-1">

                Behavioral wellness engine

              </p>

            </div>

          </div>

        </motion.div>

      </div>

      {/* INSIGHT CARDS */}
      <div className="relative z-10 grid lg:grid-cols-3 gap-8 mt-16">

        {insights.map((item, index) => (

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
            className={`relative overflow-hidden glass rounded-[34px] p-8 border border-white/5 hover:border-orange-500/15 transition-all duration-300 ${item.glow}`}
          >

            {/* GLOW */}
            <div className={`absolute top-[-60px] right-[-60px] w-[160px] h-[160px] rounded-full bg-gradient-to-br ${item.gradient} opacity-10 blur-3xl`} />

            {/* ICON */}
            <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-[0_0_30px_rgba(255,122,0,0.15)]`}>

              {item.icon}

            </div>

            {/* TITLE */}
            <h2 className="relative z-10 text-3xl font-bold mt-8 leading-tight tracking-tight">

              {item.title}

            </h2>

            {/* DESCRIPTION */}
            <p className="relative z-10 text-gray-400 text-lg mt-6 leading-relaxed">

              {item.description}

            </p>

            {/* AI TAG */}
            <div className="relative z-10 flex items-center gap-2 mt-8">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <p className="text-green-400 text-sm">

                AI-generated recommendation

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

              AI Recommendation

            </p>

            <h2 className="text-4xl font-bold mt-5 tracking-tight leading-tight">

              {mainRecommendation}

            </h2>

            <p className="text-gray-400 mt-6 text-lg leading-relaxed max-w-3xl">

              {recommendationDescription}

            </p>

          </div>

          {/* BUTTON */}
          <button className="px-9 py-5 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff8c1a] hover:scale-105 transition-all duration-300 font-semibold h-fit shadow-[0_0_30px_rgba(255,122,0,0.15)]">

            AI Recommendations Active

          </button>

        </div>

      </motion.div>

    </div>

  )
}

export default RecoveryInsights