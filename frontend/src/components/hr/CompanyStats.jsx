
import {
  Users,
  ShieldAlert,
  Activity,
  HeartPulse,
} from 'lucide-react'

import { motion } from 'framer-motion'

import { useEffect, useState } from 'react'

const CompanyStats = () => {

  const [stats, setStats] = useState([])

  const [loading, setLoading] = useState(true)

  // ==========================================
  // FETCH HR ANALYTICS
  // ==========================================

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const response = await fetch(

          'http://127.0.0.1:5000/api/hr/overview'

        )

        const result = await response.json()

        const data = result.data

        // ==========================================
        // DYNAMIC AI STATS
        // ==========================================

        const dynamicStats = [

          {
            icon: <Users size={28} />,

            title: 'Total Employees',

            value:
              data.totalEmployees || 0,

            subtitle:
              `${data.highRiskEmployees || 0} high risk employees`,

            gradient:
              'from-cyan-500 to-blue-500',

            glow:
              'shadow-[0_0_30px_rgba(6,182,212,0.12)]',
          },

          {
            icon: <ShieldAlert size={28} />,

            title: 'Burnout Risk',

            value:
              `${data.riskScore || 0}%`,

            subtitle:
              `${data.overallBurnoutRisk || 'Low'} workforce risk`,

            gradient:
              'from-red-500 to-orange-500',

            glow:
              'shadow-[0_0_30px_rgba(239,68,68,0.12)]',
          },

          {
            icon: <Activity size={28} />,

            title: 'Productivity Score',

            value:
              data.averageEnergy || 0,

            subtitle:
              'AI productivity analytics',

            gradient:
              'from-orange-400 to-amber-400',

            glow:
              'shadow-[0_0_30px_rgba(255,122,0,0.12)]',
          },

          {
            icon: <HeartPulse size={28} />,

            title: 'Wellness Health',

            value:
              `${100 - (data.averageStress || 0)}%`,

            subtitle:
              'Live wellness monitoring',

            gradient:
              'from-green-500 to-emerald-500',

            glow:
              'shadow-[0_0_30px_rgba(34,197,94,0.12)]',
          },

        ]

        setStats(dynamicStats)

        setLoading(false)

      }

      catch (error) {

        console.log(error)

        setLoading(false)

      }

    }

    fetchStats()

  }, [])

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

      {stats.map((item, index) => (

        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.08,
          }}
          whileHover={{
            y: -5,
          }}
          className={`relative overflow-hidden glass rounded-[36px] p-8 border border-white/5 hover:border-orange-500/10 transition-all duration-300 ${item.glow}`}
        >

          {/* BACKGROUND GLOW */}
          <div className={`absolute top-[-70px] right-[-70px] w-[180px] h-[180px] rounded-full bg-gradient-to-br ${item.gradient} opacity-10 blur-3xl`} />

          {/* ICON */}
          <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.05)]`}>

            {item.icon}

          </div>

          {/* TITLE */}
          <p className="relative z-10 text-gray-500 uppercase tracking-[3px] text-xs font-semibold mt-8">

            {item.title}

          </p>

          {/* VALUE */}
          <h1 className="relative z-10 text-6xl font-black mt-5 tracking-tight">

            {loading ? '...' : item.value}

          </h1>

          {/* SUBTITLE */}
          <p className="relative z-10 text-gray-400 mt-4 text-lg leading-relaxed">

            {item.subtitle}

          </p>

          {/* STATUS */}
          <div className="relative z-10 flex items-center gap-2 mt-6">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <p className="text-green-400 text-sm">

              Live AI analytics

            </p>

          </div>

        </motion.div>

      ))}

    </div>

  )
}

export default CompanyStats

