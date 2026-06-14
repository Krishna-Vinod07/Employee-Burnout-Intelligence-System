import DashboardLayout from '../layouts/DashboardLayout'

import {
  Brain,
  Activity,
  Bell,
  ArrowRight,
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

import { Link } from 'react-router-dom'

const EmployeeDashboard = () => {

  // USER
  const user = JSON.parse(
    localStorage.getItem('user')
  )

  // STATES
  const [analytics, setAnalytics] = useState(null)

  const [prediction, setPrediction] = useState('...')

  const [wellnessData, setWellnessData] = useState(null)

  // FETCH DASHBOARD DATA
  useEffect(() => {

    fetchDashboardData()

  }, [])

  const fetchDashboardData = async () => {

    try {

      // FETCH ANALYTICS
      const analyticsResponse = await fetch(

        `${import.meta.env.VITE_API_URL}/api/analytics/employee/${user.id}`

      )

      const analyticsData =
        await analyticsResponse.json()

      if (analyticsData.status === 'success') {

        setAnalytics(
          analyticsData.data
        )

      }

      // FETCH LATEST MOOD
      // FETCH LATEST MOOD
const response = await fetch(

  `${import.meta.env.VITE_API_URL}/api/mood/latest/${user.id}`

)

const data = await response.json()

if (data.status === 'success') {

  setWellnessData(
    data.data
  )

  const latestMood =
    data.data

  // USE STORED RANDOM FOREST RESULT

  setPrediction(

    latestMood.burnoutRisk ||

    'Unknown'

  )

}

    }

    catch (error) {

      console.log(error)

    }

  }

  return (

    <DashboardLayout>

      {/* HERO */}
      <div className="glass rounded-[42px] p-12 border border-orange-500/10 relative overflow-hidden">

        {/* GLOW */}
        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-orange-500/10 blur-[140px] rounded-full" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-12">

          {/* LEFT */}
          <div className="max-w-4xl">

            <p className="text-orange-400 uppercase tracking-[6px] font-semibold">

              Personal Wellness Hub

            </p>

            <h1 className="text-7xl font-black mt-6 leading-tight">

              Good morning,

              <span className="text-orange-400">
                {' '}
                {user?.name || 'Employee'}.
              </span>

            </h1>

            <p className="text-gray-400 text-2xl mt-8 leading-relaxed max-w-3xl">

              Your personal wellness intelligence dashboard
              has been updated using real-time behavioral analytics,
              productivity monitoring, and explainable AI forecasting.

            </p>

          </div>

          {/* STATUS */}
          <div className="glass rounded-[32px] p-8 border border-green-500/10 min-w-[340px]">

            <div className="flex items-center gap-4">

              <div className="w-5 h-5 rounded-full bg-green-400 animate-pulse" />

              <p className="text-green-400 text-2xl font-bold">

                Wellness tracking active

              </p>

            </div>

            <p className="text-gray-400 text-lg mt-6 leading-relaxed">

              AI systems are continuously monitoring
              workload balance, focus patterns,
              recovery cycles, and emotional wellness.

            </p>

          </div>

        </div>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-14">

        <StatCard
  title="AI Burnout Risk"
  value={prediction}
  subtitle={`Risk Score: ${wellnessData?.riskScore || 0}%`}
  color="text-red-400"
/>
        <StatCard
          title="Average Stress"
          value={`${analytics?.averageStress || 0}%`}
          subtitle="Behavioral analysis"
          color="text-orange-400"
        />

        <StatCard
          title="Focus Score"
          value={`${analytics?.focusScore || 0}%`}
          subtitle="Productivity stability"
          color="text-yellow-400"
        />

        <StatCard
          title="Energy Level"
          value={`${analytics?.averageEnergy || 0}%`}
          subtitle="Recovery & engagement"
          color="text-green-400"
        />

      </div>

      {/* INSIGHTS + ACTIVITY */}
      <div className="grid xl:grid-cols-2 gap-10 mt-14">

        {/* AI INSIGHT */}
        <div className="glass rounded-[40px] p-10 border border-orange-500/10">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">

              <Brain size={36} />

            </div>

            <div>

              <p className="text-orange-400 uppercase tracking-[4px] font-semibold">

                AI Insight

              </p>

              <h2 className="text-5xl font-black mt-2">

                {prediction} Burnout Risk

              </h2>

            </div>

          </div>

          <p className="text-gray-400 text-xl mt-10 leading-relaxed">

            AI systems detected behavioral and wellness
            patterns indicating potential productivity
            imbalance and emotional fatigue risk.

          </p>

          <Link
            to="/insights"
            className="inline-flex items-center gap-3 mt-12 px-8 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 hover:scale-105 duration-300 font-semibold text-lg"
          >

            Open AI Insights

            <ArrowRight size={22} />

          </Link>

        </div>

        {/* RECENT ACTIVITY */}
        <div className="glass rounded-[40px] p-10 border border-orange-500/10">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">

              <Activity size={36} />

            </div>

            <div>

              <p className="text-cyan-400 uppercase tracking-[4px] font-semibold">

                Recent Activity

              </p>

              <h2 className="text-5xl font-black mt-2">

                Weekly Summary

              </h2>

            </div>

          </div>

          <div className="space-y-6 mt-10">

            <ActivityItem
              text={`Current AI Risk: ${prediction}`}
              time="Real-time"
            />

            <ActivityItem
              text={`Average Stress: ${analytics?.averageStress || 0}%`}
              time="Behavioral Analytics"
            />

            <ActivityItem
              text={`Focus Score: ${analytics?.focusScore || 0}%`}
              time="AI Monitoring"
            />

          </div>

        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="glass rounded-[40px] p-10 border border-orange-500/10 mt-14 mb-20">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

          {/* LEFT */}
          <div>

            <p className="text-orange-400 uppercase tracking-[4px] font-semibold">

              Quick Actions

            </p>

            <h2 className="text-6xl font-black mt-5 leading-tight">

              Employee Wellness
              <br />
              Tools

            </h2>

          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-6">

            <QuickButton
              title="View Analytics"
              to="/employee-analytics"
            />

            <QuickButton
              title="AI Insights"
              to="/insights"
            />

            <QuickButton
              title="Notifications"
              to="/notifications"
            />

            <QuickButton
              title="Update Mood"
              to="/mood"
            />

          </div>

        </div>

      </div>

    </DashboardLayout>

  )
}

/* STAT CARD */
const StatCard = ({
  title,
  value,
  subtitle,
  color,
}) => {

  return (

    <div className="glass rounded-[36px] p-10 border border-orange-500/10">

      <p className="text-gray-500 uppercase tracking-[6px] text-sm">

        {title}

      </p>

      <h1 className={`text-7xl font-black mt-8 ${color}`}>

        {value}

      </h1>

      <p className="text-gray-400 text-xl mt-8">

        {subtitle}

      </p>

    </div>

  )
}

/* ACTIVITY ITEM */
const ActivityItem = ({
  text,
  time,
}) => {

  return (

    <div className="glass rounded-[28px] p-6 flex items-center justify-between border border-white/5">

      <div className="flex items-center gap-4">

        <Bell
          size={22}
          className="text-orange-400"
        />

        <p className="text-2xl font-medium">

          {text}

        </p>

      </div>

      <p className="text-gray-500 text-xl">

        {time}

      </p>

    </div>

  )
}

/* QUICK BUTTON */
const QuickButton = ({
  title,
  to,
}) => {

  return (

    <Link
      to={to}
      className="px-8 py-5 rounded-2xl glass border border-orange-500/10 hover:border-orange-500/30 hover:bg-orange-500/5 duration-300 font-semibold text-xl flex items-center justify-center"
    >

      {title}

    </Link>

  )
}

export default EmployeeDashboard