import DashboardLayout from '../layouts/DashboardLayout'

import {
  Mail,
  Shield,
  User,
  Brain,
  Activity,
  HeartPulse,
  Flame,
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

const EmployeeProfile = () => {

  // USER
  const user = JSON.parse(
    localStorage.getItem('user')
  )

  // STATES
  const [analytics, setAnalytics] = useState(null)

  const [latestMood, setLatestMood] =
    useState(null)

  const [aiStatus, setAiStatus] =
    useState('Analyzing...')

  const [aiSummary, setAiSummary] =
    useState(
      'AI systems are evaluating behavioral telemetry.'
    )

  // FETCH PROFILE DATA
  useEffect(() => {

    fetchProfileData()

  }, [])

  const fetchProfileData = async () => {

    try {

      // ANALYTICS
      const analyticsResponse = await fetch(

        `${import.meta.env.VITE_API_URL}/api/analytics/employee/${user.id}`

      )

      const analyticsData =
        await analyticsResponse.json()

      // LATEST MOOD
      const moodResponse = await fetch(

        `${import.meta.env.VITE_API_URL}/api/mood/latest/${user.id}`

      )

      const moodData =
        await moodResponse.json()

      if (

        analyticsData.status === 'success' &&

        moodData.status === 'success'

      ) {

        const analytics =
          analyticsData.data

        const mood =
          moodData.data

        setAnalytics(analytics)

        setLatestMood(mood)

        // AI STATUS
        if (
          mood.riskScore >= 75
        ) {

          setAiStatus(
            'Critical Burnout Risk'
          )

          setAiSummary(
            'AI systems detected severe burnout escalation patterns, emotional fatigue, and reduced recovery efficiency.'
          )

        }

        else if (
          mood.riskScore >= 55
        ) {

          setAiStatus(
            'High Burnout Risk'
          )

          setAiSummary(
            'Behavioral telemetry indicates elevated workload pressure and moderate emotional instability.'
          )

        }

        else if (
          analytics.focusScore >= 70
        ) {

          setAiStatus(
            'Healthy Productivity Pattern'
          )

          setAiSummary(
            'AI systems detected stable focus consistency, emotional resilience, and balanced productivity behavior.'
          )

        }

        else {

          setAiStatus(
            'Moderate Emotional Fatigue'
          )

          setAiSummary(
            'Wellness analytics indicate mild productivity instability and recovery imbalance.'
          )

        }

      }

    }

    catch (error) {

      console.log(error)

    }

  }

  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="glass rounded-[40px] p-12 border border-orange-500/10 overflow-hidden relative">

        {/* GLOW */}
        <div className="absolute top-[-100px] right-[-100px] w-[260px] h-[260px] bg-orange-500/10 blur-[120px] rounded-full" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

          {/* LEFT */}
          <div className="flex items-center gap-8">

            {/* AVATAR */}
            <div className="w-32 h-32 rounded-[35px] bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-[0_0_40px_rgba(255,140,0,0.25)]">

              <User size={58} />

            </div>

            {/* USER INFO */}
            <div>

              <p className="text-orange-400 uppercase tracking-[4px] font-semibold">

                AI Behavioral Profile

              </p>

              <h1 className="text-6xl font-black mt-4">

                {user?.name || 'Employee'}

              </h1>

              <p className="text-gray-400 text-xl mt-4">

                Intelligent Workforce Wellness Member

              </p>

            </div>

          </div>

          {/* STATUS */}
          <div className="glass rounded-[30px] p-7 border border-green-500/10">

            <div className="flex items-center gap-3">

              <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse" />

              <p className="text-green-400 text-xl font-semibold">

                AI Monitoring Active

              </p>

            </div>

            <p className="text-gray-400 mt-4 text-lg">

              Real-time behavioral analytics enabled

            </p>

          </div>

        </div>

      </div>

      {/* PROFILE INFO */}
      <div className="grid lg:grid-cols-3 gap-8 mt-14">

        {/* EMAIL */}
        <InfoCard
          icon={<Mail size={28} />}
          title="Email Address"
          value={user?.email}
        />

        {/* ROLE */}
        <InfoCard
          icon={<Shield size={28} />}
          title="Role"
          value={user?.role}
        />

        {/* AI STATUS */}
        <InfoCard
          icon={<Brain size={28} />}
          title="AI Behavioral Status"
          value={aiStatus}
        />

      </div>

      {/* AI METRICS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-14">

        <MetricCard
          icon={<Flame size={30} />}
          title="Stress Level"
          value={`${analytics?.averageStress || 0}%`}
          color="text-red-400"
        />

        <MetricCard
          icon={<Activity size={30} />}
          title="Focus Score"
          value={`${analytics?.focusScore || 0}%`}
          color="text-orange-400"
        />

        <MetricCard
          icon={<HeartPulse size={30} />}
          title="Energy Recovery"
          value={`${analytics?.averageEnergy || 0}%`}
          color="text-green-400"
        />

        <MetricCard
          icon={<Brain size={30} />}
          title="Burnout Risk"
          value={latestMood?.burnoutRisk || '...'}
          color="text-yellow-400"
        />

      </div>

      {/* AI SUMMARY */}
      <div className="glass rounded-[38px] p-10 border border-orange-500/10 mt-14 mb-20 overflow-hidden relative">

        {/* GLOW */}
        <div className="absolute bottom-[-100px] left-[-100px] w-[260px] h-[260px] bg-orange-500/10 blur-[120px] rounded-full" />

        <div className="relative z-10">

          <p className="text-orange-400 uppercase tracking-[4px] font-semibold">

            AI Behavioral Intelligence

          </p>

          <h1 className="text-5xl font-black mt-6 leading-tight">

            Personal Wellness Summary

          </h1>

          <p className="text-gray-400 text-xl mt-8 leading-relaxed max-w-5xl">

            {aiSummary}

          </p>

        </div>

      </div>

    </DashboardLayout>

  )
}

/* INFO CARD */
const InfoCard = ({
  icon,
  title,
  value,
}) => {

  return (

    <div className="glass rounded-[35px] p-8 border border-orange-500/10">

      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">

        {icon}

      </div>

      <p className="text-gray-400 uppercase tracking-[3px] text-sm mt-8">

        {title}

      </p>

      <h2 className="text-3xl font-black mt-5 break-words leading-snug">

        {value}

      </h2>

    </div>

  )
}

/* METRIC CARD */
const MetricCard = ({
  icon,
  title,
  value,
  color,
}) => {

  return (

    <div className="glass rounded-[35px] p-8 border border-orange-500/10">

      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">

        {icon}

      </div>

      <p className="text-gray-400 uppercase tracking-[3px] text-sm mt-8">

        {title}

      </p>

      <h1 className={`text-5xl font-black mt-5 ${color}`}>

        {value}

      </h1>

    </div>

  )
}

export default EmployeeProfile