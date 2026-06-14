
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const BurnoutForecast = () => {

  const [forecastData, setForecastData] = useState([])

  const [forecastInfo, setForecastInfo] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchForecast()

  }, [])

  const fetchForecast = async () => {

    try {

      const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/hr/forecast`

      )

      const data = await response.json()

      if (data.status === 'success') {

        setForecastData(

          data.forecastData

        )

        setForecastInfo(

          data

        )

      }

    }

    catch (error) {

      console.log(error)

    }

    finally {

      setLoading(false)

    }

  }

  if (loading) {

    return (

      <div className="glass rounded-[42px] p-10">

        Loading forecast...

      </div>

    )

  }
const actionPlan = forecastInfo?.actionPlan
  return (

    <div className="relative overflow-hidden glass rounded-[42px] p-10 border border-orange-500/10">

      <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-orange-500/5 blur-[140px]" />

      {/* HEADER */}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        <div>

          <p className="text-orange-400 uppercase tracking-[5px] font-semibold">

            Predictive Analytics

          </p>

          <h1 className="text-5xl font-bold mt-5 tracking-tight">

            Burnout Forecast

          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-3xl leading-relaxed">

            AI-powered workforce forecasting using
            machine learning models trained on
            employee wellness and activity patterns.

          </p>

        </div>

        <motion.div
          animate={{
            y: [-4, 4, -4],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="glass px-7 py-5 rounded-3xl h-fit border border-red-500/10"
        >

          <p className="text-red-400 uppercase tracking-[3px] text-sm font-semibold">

            Predicted Escalation

          </p>

          <h2 className="text-5xl font-black mt-3 text-red-400 tracking-tight">

            +{forecastInfo?.escalation || 0}%

          </h2>

        </motion.div>

      </div>

      {/* CHART */}

      <div className="relative z-10 h-[460px] mt-16">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={forecastData}>

            <CartesianGrid
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />

            <XAxis
              dataKey="week"
              stroke="#666"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#666"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: '#0f0f0f',
                border: '1px solid rgba(255,122,0,0.12)',
                borderRadius: '18px',
                color: '#fff',
              }}
            />

            <Line
              type="monotone"
              dataKey="burnout"
              stroke="#ef4444"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: '#ef4444',
              }}
            />

            <Line
              type="monotone"
              dataKey="retention"
              stroke="#06b6d4"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: '#06b6d4',
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* INSIGHTS */}

      <div className="relative z-10 grid lg:grid-cols-3 gap-8 mt-16">

        <ForecastCard
          title="Forecast Horizon"
          value="6 Weeks"
          subtitle="Machine learning projection window"
          color="text-red-400"
        />

        <ForecastCard
          title="Forecast Points"
          value={forecastData.length}
          subtitle="Generated using Random Forest model"
          color="text-cyan-400"
        />

        <ForecastCard
          title="AI Recommendation"
          value={
            forecastInfo?.recommendation ||
            'Monitor workload'
          }
          subtitle="Generated from ML forecasting results"
          color="text-orange-400"
        />

      </div>

      {/* ALERT */}

      <motion.div
        whileHover={{
          y: -3,
        }}
        className="relative z-10 glass rounded-[34px] p-9 mt-16 border border-red-500/15"
      >

        <div className="absolute top-[-80px] right-[-80px] w-[220px] h-[220px] rounded-full bg-red-500/5 blur-[120px]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          <div>

            <p className="text-red-400 uppercase tracking-[4px] font-semibold">

              Predictive AI Alert

            </p>

            <h2 className="text-4xl font-bold mt-5 tracking-tight leading-tight">

              Projected burnout increase
              detected by ML forecasting

            </h2>

            <p className="text-gray-400 text-lg mt-6 leading-relaxed max-w-4xl">

              Forecasts are generated from
              employee wellness metrics,
              workload patterns and activity
              behaviour using machine learning.

            </p>

          </div>

          
{/* AI ACTION PLAN */}

{actionPlan && (

  <div className="glass rounded-[34px] p-10 mt-12 border border-orange-500/15">

    <h2 className="text-4xl font-bold">

      AI Generated HR Action Plan

    </h2>

    <p className="text-gray-400 mt-6 leading-relaxed">

      {actionPlan.summary}

    </p>

    <div className="grid lg:grid-cols-3 gap-8 mt-10">

      {/* IMMEDIATE */}

      <div>

        <h3 className="text-red-400 text-xl font-bold mb-5">

          Immediate Actions

        </h3>

        <div className="space-y-3">

          {actionPlan.immediate?.map(

            (item, index) => (

              <div
                key={index}
                className="glass p-4 rounded-xl"
              >

                • {item}

              </div>

            )

          )}

        </div>

      </div>

      {/* MEDIUM */}

      <div>

        <h3 className="text-orange-400 text-xl font-bold mb-5">

          Medium-Term Actions

        </h3>

        <div className="space-y-3">

          {actionPlan.medium?.map(

            (item, index) => (

              <div
                key={index}
                className="glass p-4 rounded-xl"
              >

                • {item}

              </div>

            )

          )}

        </div>

      </div>

      {/* LONG TERM */}

      <div>

        <h3 className="text-cyan-400 text-xl font-bold mb-5">

          Long-Term Actions

        </h3>

        <div className="space-y-3">

          {actionPlan.longTerm?.map(

            (item, index) => (

              <div
                key={index}
                className="glass p-4 rounded-xl"
              >

                • {item}

              </div>

            )

          )}

        </div>

      </div>

    </div>

  </div>

)}



        </div>

      </motion.div>

    </div>

  )

}

const ForecastCard = ({
  title,
  value,
  subtitle,
  color,
}) => {

  return (

    <motion.div
      whileHover={{
        y: -4,
      }}
      className="glass rounded-[32px] p-8 border border-white/5 hover:border-orange-500/10 transition-all duration-300"
    >

      <p className="text-gray-500 uppercase tracking-[3px] text-xs font-semibold">

        {title}

      </p>

      <h2 className={`text-4xl font-bold mt-5 tracking-tight ${color}`}>

        {value}

      </h2>

      <p className="text-gray-400 mt-5 leading-relaxed">

        {subtitle}

      </p>

    </motion.div>

  )

}

export default BurnoutForecast

