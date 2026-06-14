import HRLayout from '../../layouts/HRLayout'

import {
  FileBarChart,
  Brain,
  ShieldAlert,
} from 'lucide-react'

import { useEffect, useState } from 'react'

const Reports = () => {

  const [loading, setLoading] = useState(true)

  const [workforceReport, setWorkforceReport] = useState(null)

  const [forecast, setForecast] = useState(null)

  useEffect(() => {

    fetchReports()

  }, [])

  const fetchReports = async () => {

    try {

      const workforceResponse = await fetch(
        'http://127.0.0.1:5000/api/hr/workforce-report'
      )

      const workforceData =
        await workforceResponse.json()

      const forecastResponse = await fetch(
        'http://127.0.0.1:5000/api/hr/forecast'
      )

      const forecastData =
        await forecastResponse.json()

      if (
        workforceData.status === 'success'
      ) {

        setWorkforceReport(
          workforceData.report
        )

      }

      if (
        forecastData.status === 'success'
      ) {

        setForecast(
          forecastData
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

      <HRLayout>

        <div className="glass rounded-[35px] p-10">

          Loading AI Reports...

        </div>

      </HRLayout>

    )

  }

  return (

    <HRLayout>

      {/* HEADER */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

        <div>

          <p className="text-orange-400 uppercase tracking-[4px] font-semibold">

            Executive Intelligence

          </p>

          <h1 className="text-7xl font-black mt-5">

            Workforce Reports

          </h1>

          <p className="text-gray-400 text-xl mt-6 max-w-4xl leading-relaxed">

            AI-generated workforce intelligence,
            burnout forecasting,
            intervention planning,
            and executive analytics.

          </p>

        </div>

        <div className="glass px-8 py-5 rounded-2xl h-fit border border-orange-500/10">

          <p className="text-orange-400 text-lg font-semibold">

            ● AI Report Generation Active

          </p>

        </div>

      </div>

      {/* REPORT CARDS */}

      <div className="grid xl:grid-cols-3 gap-10 mt-16">

        {/* WORKFORCE REPORT */}

        <div className="glass rounded-[35px] p-8 border border-orange-500/10">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">

            <ShieldAlert size={28} />

          </div>

          <h2 className="text-3xl font-black mt-8">

            Burnout Risk Report

          </h2>

          <p className="text-gray-400 mt-6 leading-relaxed">

            {workforceReport?.summary}

          </p>

        </div>

        {/* FORECAST */}

        <div className="glass rounded-[35px] p-8 border border-orange-500/10">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-orange-500 flex items-center justify-center">

            <Brain size={28} />

          </div>

          <h2 className="text-3xl font-black mt-8">

            Retention Forecast

          </h2>

          <p className="text-orange-400 mt-6 font-semibold">

            Burnout Escalation:
            {' '}
            {forecast?.escalation}%

          </p>

          <p className="text-gray-400 mt-4 leading-relaxed">

            {forecast?.recommendation}

          </p>

        </div>

        {/* ACTION PLAN */}

        <div className="glass rounded-[35px] p-8 border border-orange-500/10">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-400 flex items-center justify-center">

            <FileBarChart size={28} />

          </div>

          <h2 className="text-3xl font-black mt-8">

            HR Action Plan

          </h2>

          <p className="text-gray-400 mt-6 leading-relaxed">

            {forecast?.actionPlan?.summary}

          </p>

        </div>

      </div>

      {/* KEY FINDINGS */}

      <div className="glass rounded-[35px] p-10 mt-16 border border-orange-500/10">

        <h2 className="text-4xl font-black">

          AI Key Findings

        </h2>

        <div className="mt-8 space-y-6">

          {

            workforceReport?.keyFindings?.map(

              (finding, index) => (

                <div

                  key={index}

                  className="glass rounded-2xl p-6 border border-orange-500/10 hover:border-orange-500/20 transition-all"

                >

                  {finding}

                </div>

              )

            )

          }

        </div>

      </div>

      {/* RECOMMENDATIONS */}

      <div className="glass rounded-[35px] p-10 mt-16 border border-orange-500/20">

        <h2 className="text-4xl font-black">

          AI Recommendations

        </h2>

        <div className="mt-8 space-y-6">

          {

            workforceReport?.recommendations?.map(

              (item, index) => (

                <div

                  key={index}

                  className="glass rounded-2xl p-6 border border-orange-500/10 hover:border-orange-500/20 transition-all"

                >

                  {item}

                </div>

              )

            )

          }

        </div>

      </div>

      {/* ACTION PLAN DETAILS */}

      {

        forecast?.actionPlan && (

          <div className="glass rounded-[35px] p-10 mt-16 border border-orange-500/20">

            <h2 className="text-4xl font-black">

              AI Intervention Plan

            </h2>

            <div className="grid xl:grid-cols-3 gap-8 mt-10">

              <div>

                <h3 className="text-orange-400 font-bold text-xl mb-5">

                  Immediate Actions

                </h3>

                {

                  forecast.actionPlan.immediate?.map(

                    (item, index) => (

                      <div
                        key={index}
                        className="mb-4 text-gray-400"
                      >

                        • {item}

                      </div>

                    )

                  )

                }

              </div>

              <div>

                <h3 className="text-orange-400 font-bold text-xl mb-5">

                  Medium Term

                </h3>

                {

                  forecast.actionPlan.medium?.map(

                    (item, index) => (

                      <div
                        key={index}
                        className="mb-4 text-gray-400"
                      >

                        • {item}

                      </div>

                    )

                  )

                }

              </div>

              <div>

                <h3 className="text-orange-400 font-bold text-xl mb-5">

                  Long Term

                </h3>

                {

                  forecast.actionPlan.longTerm?.map(

                    (item, index) => (

                      <div
                        key={index}
                        className="mb-4 text-gray-400"
                      >

                        • {item}

                      </div>

                    )

                  )

                }

              </div>

            </div>

          </div>

        )

      }

    </HRLayout>

  )

}

export default Reports