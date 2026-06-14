
import DashboardLayout from '../../layouts/DashboardLayout'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EmployeeDetails = () => {

  const { id } = useParams()

  const [employee, setEmployee] = useState(null)

  const [latestMood, setLatestMood] = useState(null)

  const [latestActivity, setLatestActivity] = useState(null)

  const [analytics, setAnalytics] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchEmployee()

  }, [])

  const fetchEmployee = async () => {

    try {

      const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/hr/employee/${id}`

      )

      const data = await response.json()

      if (data.status === 'success') {

        setEmployee(
          data.employee
        )

        setLatestMood(
          data.latestMood
        )

        setLatestActivity(
          data.latestActivity
        )

      }

      const analyticsResponse = await fetch(

        `${import.meta.env.VITE_API_URL}/api/analytics/employee/${id}`

      )

      const analyticsData = await analyticsResponse.json()

      if (analyticsData.status === 'success') {

        setAnalytics(
          analyticsData.data
        )

      }

      setLoading(false)

    }

    catch (error) {

      console.log(error)

      setLoading(false)

    }

  }

  if (loading) {

    return (

      <DashboardLayout>

        <div className="glass rounded-[40px] p-10">

          Loading employee details...

        </div>

      </DashboardLayout>

    )

  }

  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* HEADER */}

        <div className="glass rounded-[40px] p-10">

          <h1 className="text-5xl font-black">

            Employee Intelligence

          </h1>

          <p className="text-gray-400 mt-3">

            AI-powered workforce analytics

          </p>

        </div>

        {/* PROFILE */}

        <div className="glass rounded-[40px] p-10">

          <h2 className="text-3xl font-bold mb-6">

            Profile

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <InfoCard
              title="Name"
              value={employee?.name}
            />

            <InfoCard
              title="Email"
              value={employee?.email}
            />

            <InfoCard
              title="Department"
              value={employee?.department}
            />

            <InfoCard
              title="Role"
              value={employee?.role}
            />

          </div>

        </div>

        {/* WELLNESS */}

        <div className="glass rounded-[40px] p-10">

          <h2 className="text-3xl font-bold mb-6">

            Wellness Metrics

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <InfoCard
              title="Stress"
              value={analytics?.averageStress ?? 0}
            />

            <InfoCard
              title="Energy"
              value={analytics?.averageEnergy ?? 0}
            />

            <InfoCard
              title="Sleep"
              value={analytics?.averageSleep ?? 0}
            />

            <InfoCard
              title="Workload"
              value={analytics?.averageWorkload ?? 0}
            />

          </div>

        </div>

        {/* ML PREDICTION */}

        <div className="glass rounded-[40px] p-10">

          <h2 className="text-3xl font-bold mb-6">

            AI Burnout Intelligence

          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <p className="text-gray-500">

                Burnout Risk

              </p>

              <h1 className="text-6xl font-black text-orange-400 mt-2">

                {analytics?.burnoutRisk || 'Unknown'}

              </h1>

            </div>

            <div>

              <p className="text-gray-500">

                ML Confidence

              </p>

              <h1 className="text-6xl font-black text-cyan-400 mt-2">

                {analytics?.riskScore || 0}%

              </h1>

            </div>

          </div>

        </div>

        {/* ACTIVITY */}

        <div className="glass rounded-[40px] p-10">

          <h2 className="text-3xl font-bold mb-6">

            Activity Intelligence

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <InfoCard
              title="Active Minutes"
              value={analytics?.averageActiveMinutes ?? 0}
            />

            <InfoCard
              title="Idle Minutes"
              value={analytics?.averageIdleMinutes ?? 0}
            />

            <InfoCard
              title="Focus Score"
              value={analytics?.focusScore ?? 0}
            />

            <InfoCard
              title="Entries"
              value={analytics?.totalEntries ?? 0}
            />

          </div>

        </div>

        {/* FORECAST */}

        <div className="glass rounded-[40px] p-10">

          <h2 className="text-3xl font-bold mb-8">

            6 Week AI Forecast

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {analytics?.forecastData?.map((item) => (

              <div
                key={item.week}
                className="bg-[#111111] rounded-2xl p-6 border border-white/5"
              >

                <h3 className="text-2xl font-bold">

                  {item.week}

                </h3>

                <p className="text-orange-400 mt-3">

                  Burnout: {item.burnout}

                </p>

                <p className="text-green-400 mt-2">

                  Productivity: {item.productivity}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* RECOMMENDATIONS */}

        <div className="glass rounded-[40px] p-10">

          <h2 className="text-3xl font-bold mb-8">

            AI Recommendations

          </h2>

          <div className="space-y-4">

            {analytics?.recommendations?.map(

  (item, index) => (

    <div
      key={index}
      className="bg-[#111111] rounded-2xl p-6 border border-white/5"
    >

      <div className="flex gap-4">

        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">

          {index + 1}

        </div>

        <p className="text-gray-300 leading-relaxed">

          {item}

        </p>

      </div>

    </div>

  )

)}

          </div>

        </div>

      </div>

    </DashboardLayout>

  )

}

const InfoCard = ({
  title,
  value
}) => {

  return (

    <div className="bg-[#111111] rounded-2xl p-6 border border-white/5">

      <p className="text-gray-500">

        {title}

      </p>

      <h3 className="text-3xl font-bold mt-2">

        {value}

      </h3>

    </div>

  )

}

export default EmployeeDetails

