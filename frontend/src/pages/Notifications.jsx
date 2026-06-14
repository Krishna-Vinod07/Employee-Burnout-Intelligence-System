import DashboardLayout from '../layouts/DashboardLayout'

import {
  AlertTriangle,
  CheckCircle2,
  Brain,
  Activity,
  ShieldAlert,
  Moon,
  Flame,
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

import { motion } from 'framer-motion'

const Notifications = () => {

  // USER
  const user = JSON.parse(
    localStorage.getItem('user')
  )

  // STATES
  const [notifications, setNotifications] =
    useState([])

  const [settings, setSettings] =
    useState(null)

  const [stats, setStats] = useState({

    critical: 0,

    warnings: 0,

    resolved: 0,

    unread: 0,

  })

  // FETCH NOTIFICATIONS
  useEffect(() => {

    fetchNotifications()

  }, [])

  const fetchNotifications = async () => {

    try {

      // SETTINGS
      const settingsResponse = await fetch(

        `http://127.0.0.1:5000/api/settings/${user.id}`

      )

      const settingsData =
        await settingsResponse.json()

      // ANALYTICS
      const analyticsResponse = await fetch(

        `http://127.0.0.1:5000/api/analytics/employee/${user.id}`

      )

      const analyticsData =
        await analyticsResponse.json()

      // MOOD
      const moodResponse = await fetch(

        `http://127.0.0.1:5000/api/mood/latest/${user.id}`

      )

      const moodData =
        await moodResponse.json()

      // ACTIVITY
      const activityResponse = await fetch(

        `http://127.0.0.1:5000/api/activity/${user.id}`

      )

      const activityData =
        await activityResponse.json()

      if (

        analyticsData.status === 'success' &&

        moodData.status === 'success' &&

        activityData.status === 'success' &&

        settingsData.status === 'success'

      ) {

        const analytics =
          analyticsData.data

        const latestMood =
          moodData.data

        const latestActivity =
          activityData?.data?.[0] || {
          idleMinutes: 0,
          activeMinutes: 0,
          activityCount: 0,
          sessionDuration: 0
  }

        const userSettings =
          settingsData.data

        setSettings(userSettings)

        const dynamicNotifications = []

        // CRITICAL BURNOUT
        if (
          latestMood.riskScore >= 75
        ) {

          dynamicNotifications.push({

            icon:
              <Flame size={28} />,

            title:
              'Critical burnout escalation detected',

            description:
              'Machine learning systems identified severe burnout indicators from behavioral telemetry and emotional analytics.',

            time:
              'Real-time',

            severity:
              'critical',

            unread: true,

          })

        }

        // STRESS ALERT
        if (

          latestMood.stress >=
          userSettings.threshold

        ) {

          dynamicNotifications.push({

            icon:
              <AlertTriangle size={28} />,

            title:
              'Elevated stress instability detected',

            description:
              'AI systems detected sustained workload pressure and emotional fatigue escalation patterns.',

            time:
              '5 min ago',

            severity:
              'warning',

            unread: true,

          })

        }

        // LOW SLEEP
        if (
          latestMood.sleep <= 5
        ) {

          dynamicNotifications.push({

            icon:
              <Moon size={28} />,

            title:
              'Sleep recovery degradation observed',

            description:
              'Sleep recovery analytics indicate increasing fatigue accumulation and reduced cognitive resilience.',

            time:
              '15 min ago',

            severity:
              'warning',

            unread: true,

          })

        }

        // LOW FOCUS
        if (
          analytics.focusScore < 60
        ) {

          dynamicNotifications.push({

            icon:
              <Brain size={28} />,

            title:
              'Focus consistency decreasing',

            description:
              'Behavioral telemetry indicates reduced concentration stability and productivity rhythm disruption.',

            time:
              '30 min ago',

            severity:
              'warning',

            unread: false,

          })

        }

        // HIGH IDLE TIME
        if (
          (latestActivity?.idleMinutes || 0) >= 60
        ) {

          dynamicNotifications.push({

            icon:
              <Activity size={28} />,

            title:
              'Extended inactivity intervals detected',

            description:
              'Productivity monitoring systems observed prolonged inactivity patterns impacting engagement metrics.',

            time:
              '1 hour ago',

            severity:
              'info',

            unread: false,

          })

        }

        // POSITIVE RECOVERY
        if (
          analytics.averageEnergy >= 75
        ) {

          dynamicNotifications.push({

            icon:
              <CheckCircle2 size={28} />,

            title:
              'Recovery resilience improving',

            description:
              'AI systems detected improved emotional recovery efficiency and sustainable productivity behavior.',

            time:
              '2 hours ago',

            severity:
              'success',

            unread: false,

          })

        }

        // DEFAULT ALERT
        if (
          dynamicNotifications.length === 0
        ) {

          dynamicNotifications.push({

            icon:
              <ShieldAlert size={28} />,

            title:
              'AI wellness systems stable',

            description:
              'No critical burnout anomalies detected. Behavioral and emotional telemetry remain within healthy ranges.',

            time:
              'Live',

            severity:
              'success',

            unread: false,

          })

        }

        // CRITICAL ONLY FILTER
        let filteredNotifications =
          dynamicNotifications

        if (
          userSettings.criticalOnly
        ) {

          filteredNotifications =
            dynamicNotifications.filter(

              item =>
                item.severity ===
                'critical'

            )

        }

        setNotifications(
          filteredNotifications
        )

        // STATS
        const criticalCount =
          filteredNotifications.filter(

            item =>
              item.severity === 'critical'

          ).length

        const warningCount =
          filteredNotifications.filter(

            item =>
              item.severity === 'warning'

          ).length

        const resolvedCount =
          filteredNotifications.filter(

            item =>
              item.severity === 'success'

          ).length

        const unreadCount =
          filteredNotifications.filter(

            item =>
              item.unread

          ).length

        setStats({

          critical:
            criticalCount,

          warnings:
            warningCount,

          resolved:
            resolvedCount,

          unread:
            unreadCount,

        })

      }

    }

    catch (error) {

      console.log(error)

    }

  }

  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

        <div>

          <p className="text-orange-400 uppercase tracking-[5px] font-semibold">

            Adaptive AI Notification Center

          </p>

          <h1 className="text-7xl font-black mt-5 leading-tight">

            Alerts & Intelligence

          </h1>

          <p className="text-gray-400 text-xl mt-6 max-w-4xl leading-relaxed">

            Personalized AI-generated burnout alerts,
            adaptive behavioral intelligence,
            wellness escalation detection,
            and telemetry-aware notifications.

          </p>

        </div>

        {/* LIVE STATUS */}
        <motion.div
          animate={{
            y: [-3, 3, -3],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="glass px-8 py-5 rounded-3xl border border-green-500/10 h-fit"
        >

          <div className="flex items-center gap-3">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <p className="text-green-400 text-lg font-semibold tracking-wide">

              Adaptive AI monitoring active

            </p>

          </div>

        </motion.div>

      </div>

      {/* STATS */}
      <div className="grid lg:grid-cols-4 gap-8 mt-16">

        <StatCard
          title="Critical"
          value={stats.critical}
          color="text-red-400"
          glow="shadow-[0_0_30px_rgba(239,68,68,0.12)]"
        />

        <StatCard
          title="Warnings"
          value={stats.warnings}
          color="text-orange-400"
          glow="shadow-[0_0_30px_rgba(249,115,22,0.12)]"
        />

        <StatCard
          title="Resolved"
          value={stats.resolved}
          color="text-green-400"
          glow="shadow-[0_0_30px_rgba(34,197,94,0.12)]"
        />

        <StatCard
          title="Unread"
          value={stats.unread}
          color="text-cyan-400"
          glow="shadow-[0_0_30px_rgba(6,182,212,0.12)]"
        />

      </div>

      {/* ALERT FEED */}
      <div className="mt-16 space-y-8">

        {notifications.map((item, index) => (

          <NotificationCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            time={item.time}
            severity={item.severity}
            unread={item.unread}
          />

        ))}

      </div>

    </DashboardLayout>

  )
}

/* STAT CARD */
const StatCard = ({
  title,
  value,
  color,
  glow,
}) => {

  return (

    <motion.div
      whileHover={{
        y: -4,
      }}
      className={`glass rounded-[34px] p-8 border border-white/5 hover:border-orange-500/10 transition-all duration-300 ${glow}`}
    >

      <p className="text-gray-500 uppercase tracking-[3px] text-sm font-semibold">

        {title}

      </p>

      <h1 className={`text-6xl font-black mt-6 tracking-tight ${color}`}>

        {value}

      </h1>

    </motion.div>

  )
}

/* NOTIFICATION CARD */
const NotificationCard = ({
  icon,
  title,
  description,
  time,
  severity,
  unread = false,
}) => {

  const severityStyles = {

    critical:
      'border-red-500/20',

    warning:
      'border-orange-500/20',

    success:
      'border-green-500/20',

    info:
      'border-cyan-500/20',

  }

  const iconStyles = {

    critical:
      'from-red-500 to-orange-500',

    warning:
      'from-orange-500 to-yellow-500',

    success:
      'from-green-500 to-emerald-500',

    info:
      'from-cyan-500 to-blue-500',

  }

  return (

    <motion.div
      whileHover={{
        y: -3,
      }}
      className={`glass rounded-[36px] p-8 border ${severityStyles[severity]} hover:border-opacity-40 transition-all duration-300 overflow-hidden relative`}
    >

      {/* BACKGROUND */}
      <div className="absolute top-[-80px] right-[-80px] w-[220px] h-[220px] rounded-full bg-white/5 blur-[120px]" />

      <div className="relative z-10 flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8">

        {/* LEFT */}
        <div className="flex gap-6">

          {/* ICON */}
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${iconStyles[severity]} flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(255,255,255,0.05)]`}>

            {icon}

          </div>

          {/* TEXT */}
          <div>

            <div className="flex items-center gap-4 flex-wrap">

              <h2 className="text-3xl font-black tracking-tight">

                {title}

              </h2>

              {unread && (

                <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse" />

              )}

            </div>

            <p className="text-gray-400 text-lg mt-5 leading-relaxed max-w-4xl">

              {description}

            </p>

          </div>

        </div>

        {/* TIME */}
        <div className="glass px-5 py-3 rounded-2xl whitespace-nowrap border border-white/5 h-fit">

          <p className="text-gray-300 font-medium">

            {time}

          </p>

        </div>

      </div>

    </motion.div>

  )
}

export default Notifications