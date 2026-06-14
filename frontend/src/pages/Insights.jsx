import DashboardLayout from '../layouts/DashboardLayout'

import { useEffect, useState } from 'react'

import {
  Brain,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Activity,
  Zap,
} from 'lucide-react'

import { motion } from 'framer-motion'

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

const Insights = () => {

  const [prediction, setPrediction] = useState(
    'Loading...'
  )

  const [loading, setLoading] = useState(true)

  // NEW DYNAMIC STATES
  const [analytics, setAnalytics] =
    useState(null)

  const [forecastData, setForecastData] =
    useState([])

  const [riskFactors, setRiskFactors] =
    useState([])

  const [recommendations, setRecommendations] =
    useState([])

  // ==========================================
  // FETCH AI DATA
  // ==========================================

  useEffect(() => {

    const fetchPrediction = async () => {

      try {

        const user = JSON.parse(
          localStorage.getItem('user')
        )

        // ==========================================
        // GET ANALYTICS
        // ==========================================

        const analyticsResponse = await fetch(

          `http://127.0.0.1:5000/api/analytics/employee/${user.id}`

        )

        const analyticsData =
          await analyticsResponse.json()

        const employeeData =
          analyticsData.data

        setAnalytics(employeeData)

        // SET DYNAMIC DATA
        setForecastData(
          employeeData.forecastData || []
        )

        setRiskFactors(
          employeeData.riskFactors || []
        )

        setRecommendations(
          employeeData.recommendations || []
        )

// ==========================================
// USE STORED RANDOM FOREST RESULT
// ==========================================

setPrediction(
  employeeData.burnoutRisk || 'Unknown'
)

        setLoading(false)

      }

      catch (error) {

        console.log(error)

        setPrediction(
          'Prediction Failed'
        )

        setLoading(false)

      }

    }

    fetchPrediction()

  }, [])

  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

        <div>

          <p className="text-orange-400 uppercase tracking-[5px] font-semibold">

            Machine Learning Insights

          </p>

          <h1 className="text-7xl font-black mt-5 leading-tight">

            Employee Wellness Insights

          </h1>

          <p className="text-gray-400 text-xl mt-6 max-w-4xl leading-relaxed">

            Predictive wellness analytics powered by
Random Forest machine learning,
behavioral monitoring,
and burnout forecasting.
          </p>

        </div>

        {/* LIVE + ML TEST */}
        <div className="flex flex-col gap-5">

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

                AI engine active

              </p>

            </div>

          </motion.div>


        </div>

      </div>

      {/* TOP CARDS */}
      <div className="grid lg:grid-cols-4 gap-8 mt-16">

        <InsightCard
          icon={<Brain size={28} />}
          title="Burnout Risk"
          value={loading ? '...' : prediction}
          subtitle="Random Forest prediction"
          gradient="from-orange-500 to-orange-400"
        />

        <InsightCard
          icon={<TrendingUp size={28} />}
          title="Forecast Periods"
value={forecastData.length}
subtitle="future risk forecasts"
          gradient="from-yellow-500 to-orange-500"
        />

        <InsightCard
          icon={<ShieldAlert size={28} />}
          title="Risk Factors"
          value={riskFactors.length}
          subtitle="behavioral risk drivers"
          gradient="from-red-500 to-orange-500"
        />

        <InsightCard
          icon={<Sparkles size={28} />}
          title="Recommendations"
value={recommendations.length}
subtitle="AI generated suggestions"
          gradient="from-amber-500 to-yellow-500"
        />

      </div>

      {/* FORECAST GRAPH */}
      <div className="glass rounded-[40px] p-10 mt-16 border border-orange-500/10">

        <div className="flex items-center justify-between flex-wrap gap-6">

          <div>

            <p className="text-orange-400 uppercase tracking-[4px] font-semibold">

              Predictive Forecast

            </p>

            <h1 className="text-5xl font-black mt-4">

              Burnout trajectory

            </h1>

          </div>

          <div className="glass px-6 py-4 rounded-2xl border border-white/5">

            <p className="text-yellow-400 text-lg font-medium">

              {forecastData.length} Forecast Periods

            </p>

          </div>

        </div>

        {/* CHART */}
        <div className="h-[450px] mt-14">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart data={forecastData}>

              <CartesianGrid stroke="#ffffff10" />

              <XAxis
                dataKey="week"
                stroke="#777"
              />

              <YAxis stroke="#777" />

              <Tooltip
                contentStyle={{
                  background: '#0f0f0f',
                  border: '1px solid rgba(255,122,0,0.15)',
                  borderRadius: '18px',
                  color: '#fff',
                }}
              />

              <Line
                type="monotone"
                dataKey="burnout"
                stroke="#f97316"
                strokeWidth={4}
                dot={{
                  r: 5,
                  fill: '#f97316',
                }}
              />

              <Line
                type="monotone"
                dataKey="productivity"
                stroke="#eab308"
                strokeWidth={4}
                dot={{
                  r: 5,
                  fill: '#eab308',
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* AI GRID */}
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 mt-16">

        {/* LEFT */}
        <div className="glass rounded-[40px] p-10 border border-orange-500/10">

          <div className="flex items-center justify-between flex-wrap gap-6">

            <div>

              <p className="text-orange-400 uppercase tracking-[4px] font-semibold">

                Risk Analysis

              </p>

              <h1 className="text-5xl font-black mt-5">

                Burnout Risk Factors

              </h1>

            </div>

            <div className="glass px-5 py-3 rounded-2xl border border-white/5">

              <p className="text-yellow-400 font-medium">

  Detected Risk Factors

</p>

            </div>

          </div>

          {/* FACTORS */}
          <div className="space-y-10 mt-14">
            {riskFactors.length === 0 && (

  <div className="text-gray-400">

    No significant risk factors detected.

  </div>

)}

            {riskFactors.map(
              (factor, index) => (

                <FactorBar
                  key={index}
                  title={factor.title}
                  value={factor.value}
                  width={factor.width}
                  gradient="from-orange-500 to-red-500"
                />

              )
            )}

          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-8">

          {recommendations.map(
  (item, index) => (

    <AIRecommendation
      key={index}
      icon={<Brain size={28} />}
      title={`Recommendation ${index + 1}`}
      description={item}
      gradient="from-orange-500 to-yellow-500"
    />

  )
)}

        </div>

      </div>

    </DashboardLayout>

  )

}

/* CARD */
const InsightCard = ({
  icon,
  title,
  value,
  subtitle,
  gradient,
}) => {

  return (

    <motion.div
      whileHover={{
        y: -4,
      }}
      className="glass rounded-[35px] p-8 border border-white/5 hover:border-orange-500/10 transition-all duration-300"
    >

      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-[0_0_30px_rgba(255,122,0,0.12)]`}>

        {icon}

      </div>

      <p className="text-gray-500 uppercase tracking-[3px] mt-8 text-sm font-semibold">

        {title}

      </p>

      <h1 className="text-6xl font-black mt-5 tracking-tight">

        {value}

      </h1>

      <p className="text-gray-400 mt-4">

        {subtitle}

      </p>

    </motion.div>

  )

}

/* FACTOR BAR */
const FactorBar = ({
  title,
  value,
  width,
  gradient,
}) => {

  return (

    <div>

      <div className="flex justify-between mb-4">

        <p className="text-2xl font-semibold">

          {title}

        </p>

        <p className="text-2xl font-bold text-orange-400">

          {value}

        </p>

      </div>

      <div className="h-5 rounded-full bg-white/10 overflow-hidden">

        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          style={{ width }}
        />

      </div>

    </div>

  )

}

/* AI RECOMMENDATION */
const AIRecommendation = ({
  icon,
  title,
  description,
  gradient,
}) => {

  return (

    <motion.div
      whileHover={{
        y: -3,
      }}
      className="glass rounded-[35px] p-8 border border-white/5 hover:border-orange-500/10 transition-all duration-300"
    >

      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-[0_0_30px_rgba(255,122,0,0.12)]`}>

        {icon}

      </div>

      <h2 className="text-3xl font-black mt-8">

        {title}

      </h2>

      <p className="text-gray-400 text-lg leading-relaxed mt-6">

        {description}

      </p>

    </motion.div>
    

  )
  

}

export default Insights