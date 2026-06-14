
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const WorkforceDistribution = () => {

  const [loading, setLoading] = useState(true)

  const [overview, setOverview] = useState(null)

  const [chartData, setChartData] = useState([])

  const [report, setReport] = useState(null)
  const [showReport, setShowReport] = useState(false)
  const [generating, setGenerating] = useState(false)
  useEffect(() => {

    fetchOverview()

  }, [])

  const fetchOverview = async () => {

    try {

      const response = await fetch(

        'http://127.0.0.1:5000/api/hr/overview'

      )

      const result = await response.json()

      if (result.status === 'success') {

        const data = result.data

        setOverview(data)

        const total = Math.max(
          data.totalEmployees,
          1
        )

        setChartData([

  {
    name: 'Low Risk',
    value: Math.round(
      (data.lowRisk / total) * 100
    ),
    color: '#22c55e',
    glow:
      'shadow-[0_0_35px_rgba(34,197,94,0.12)]',
  },

  {
    name: 'Moderate',
    value: Math.round(
      (data.moderateRisk / total) * 100
    ),
    color: '#eab308',
    glow:
      'shadow-[0_0_35px_rgba(234,179,8,0.10)]',
  },

  {
    name: 'High Risk',
    value: Math.round(
      (data.highRisk / total) * 100
    ),
    color: '#f97316',
    glow:
      'shadow-[0_0_35px_rgba(249,115,22,0.10)]',
  },

  {
    name: 'Critical',
    value: Math.round(
      (data.criticalRisk / total) * 100
    ),
    color: '#ef4444',
    glow:
      'shadow-[0_0_35px_rgba(239,68,68,0.10)]',
  },

])

      }

      setLoading(false)

    }

    catch (error) {

      console.log(error)

      setLoading(false)

    }

  }
  const generateReport = async () => {

  try {

    setGenerating(true)

    const response = await fetch(

      'http://127.0.0.1:5000/api/hr/workforce-report'

    )

    const result = await response.json()

    if (result.status === 'success') {

      setReport(
        result.report
      )

      setShowReport(true)

    }

  }

  catch (error) {

    console.log(error)

  }

  finally {

    setGenerating(false)

  }

}

  if (loading) {

    return (

      <div className="glass rounded-[42px] p-10">

        Loading workforce analytics...

      </div>

    )

  }

  const workforceHealth = Math.max(
  100 - (overview?.averageRiskScore || 0),
  0
)

  return (

    <div className="relative overflow-hidden glass rounded-[42px] p-10 border border-orange-500/10">

      <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-orange-500/5 blur-[140px]" />

      {/* HEADER */}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        <div>

          <p className="text-orange-400 uppercase tracking-[5px] font-semibold">

            Workforce Analytics

          </p>

          <h1 className="text-5xl font-bold mt-5 tracking-tight">

            Workforce Distribution

          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-3xl leading-relaxed">

            AI-powered workforce segmentation
            using real burnout predictions.

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
          className="glass px-7 py-5 rounded-3xl h-fit border border-green-500/10"
        >

          <p className="text-gray-500 uppercase tracking-[3px] text-sm font-semibold">

            Workforce Health

          </p>

          <h2 className="text-5xl font-black text-green-400 mt-3 tracking-tight">

            {workforceHealth}%

          </h2>

        </motion.div>

      </div>

      {/* CHART */}

      <div className="relative z-10 grid lg:grid-cols-[1fr_0.9fr] gap-12 items-center mt-16">

        <motion.div
          whileHover={{
            scale: 1.01,
          }}
          className="h-[430px]"
        >

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={95}
                outerRadius={155}
                paddingAngle={5}
                dataKey="value"
              >

                {chartData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={entry.color}
                  />

                ))}

              </Pie>

              <Tooltip
                contentStyle={{
                  background: '#0f0f0f',
                  border:
                    '1px solid rgba(255,122,0,0.12)',
                  borderRadius: '18px',
                  color: '#fff',
                }}
              />

            </PieChart>

          </ResponsiveContainer>

        </motion.div>

        {/* LEGEND */}

        <div className="space-y-8">

          {chartData.map((item, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: 10,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -3,
              }}
              className={`glass rounded-[30px] p-6 flex items-center justify-between border border-white/5 hover:border-orange-500/10 transition-all duration-300 ${item.glow}`}
            >

              <div className="flex items-center gap-5">

                <div
                  className="w-5 h-5 rounded-full"
                  style={{
                    background: item.color,
                  }}
                />

                <div>

                  <h3 className="text-2xl font-bold">

                    {item.name}

                  </h3>

                  <p className="text-gray-500 mt-1">

                    Workforce segment

                  </p>

                </div>

              </div>

              <h2 className="text-4xl font-black">

                {item.value}%

              </h2>

            </motion.div>

          ))}

        </div>

      </div>

      {/* AI INSIGHT */}

      <motion.div
        whileHover={{
          y: -3,
        }}
        className="relative z-10 glass rounded-[34px] p-9 mt-16 border border-yellow-500/15"
      >

        <div className="absolute top-[-80px] right-[-80px] w-[220px] h-[220px] rounded-full bg-yellow-500/5 blur-[120px]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          <div>

            <p className="text-yellow-400 uppercase tracking-[4px] font-semibold">

              AI Workforce Insight

            </p>

            <h2 className="text-4xl font-bold mt-5 tracking-tight leading-tight">

              {overview?.workforceAlert}

            </h2>

            <p className="text-gray-400 text-lg mt-6 leading-relaxed max-w-4xl">

              Overall burnout risk is

              {' '}

              <span className="font-bold text-white">

                {overview?.overallRisk}

              </span>

              .

              Productivity trend:

              {' '}

              <span className="font-bold text-white">

                {overview?.productivityStatus}

              </span>

              .

            </p>

          </div>

          <button

  onClick={generateReport}

  className="px-9 py-5 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-105 transition-all duration-300 font-semibold h-fit shadow-[0_0_30px_rgba(234,179,8,0.15)]"

>

  {

    generating

      ? 'Generating Report...'

      : 'View Detailed Report'

  }

</button>

        </div>

      </motion.div>
      {
  showReport && report && (

    <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-8">

      <div className="glass max-w-5xl w-full rounded-[30px] p-8 max-h-[85vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-4xl font-bold">

            AI Workforce Report

          </h2>

          <button

            onClick={() => setShowReport(false)}

            className="text-red-400 text-2xl"

          >

            ✕

          </button>

        </div>

        <div className="space-y-8">

          <div>

            <h3 className="text-orange-400 text-2xl font-bold mb-3">

              Executive Summary

            </h3>

            <p className="text-gray-300 leading-relaxed">

              {report.summary}

            </p>

          </div>

          <div>

            <h3 className="text-yellow-400 text-2xl font-bold mb-3">

              Key Findings

            </h3>

            <ul className="space-y-3">

              {report.keyFindings?.map((item, index) => (

                <li key={index}>

                  • {item}

                </li>

              ))}

            </ul>

          </div>

          <div>

            <h3 className="text-green-400 text-2xl font-bold mb-3">

              Recommendations

            </h3>

            <ul className="space-y-3">

              {report.recommendations?.map((item, index) => (

                <li key={index}>

                  • {item}

                </li>

              ))}

            </ul>

          </div>

        </div>

      </div>

    </div>

  )
}

    </div>

  )

}

export default WorkforceDistribution

