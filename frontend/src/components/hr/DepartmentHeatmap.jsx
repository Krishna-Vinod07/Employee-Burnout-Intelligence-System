
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const DepartmentHeatmap = () => {

  const [departments, setDepartments] = useState([])
  const [highestRisk, setHighestRisk] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDepartments = async () => {

      try {

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/hr/departments`
        )

        const result = await response.json()

        if (result.status === 'success') {

          setDepartments(
            result.departments || []
          )

          setHighestRisk(
            result.highestRisk
          )

        }

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }

    }

    fetchDepartments()

  }, [])

  const getDepartmentColor = (status) => {

    switch (status) {

      case 'Critical':
        return 'bg-gradient-to-br from-red-600 to-red-400'

      case 'High':
        return 'bg-gradient-to-br from-orange-500 to-red-500'

      case 'Moderate':
        return 'bg-gradient-to-br from-yellow-500 to-amber-400'

      default:
        return 'bg-gradient-to-br from-green-500 to-emerald-500'

    }

  }

  return (

    <div className="relative overflow-hidden glass rounded-[42px] p-10 border border-orange-500/10">

      <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-orange-500/5 blur-[140px]" />

      {/* HEADER */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        <div>

          <p className="text-orange-400 uppercase tracking-[5px] font-semibold">
            Workforce Intelligence
          </p>

          <h1 className="text-5xl font-bold mt-5 tracking-tight">
            Department Heatmap
          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-3xl leading-relaxed">
            AI-generated burnout distribution and organizational
            stress mapping across departments.
          </p>

        </div>

        <div className="glass rounded-3xl p-6 border border-white/5">

          <div className="space-y-4">

            <LegendItem
              color="bg-green-500"
              label="Low Risk"
            />

            <LegendItem
              color="bg-yellow-500"
              label="Moderate"
            />

            <LegendItem
              color="bg-orange-500"
              label="High"
            />

            <LegendItem
              color="bg-red-500"
              label="Critical"
            />

          </div>

        </div>

      </div>

      {/* DEPARTMENTS */}
      <div className="relative z-10 grid lg:grid-cols-3 gap-8 mt-16">

        {loading ? (

          <div className="text-white text-2xl">
            Loading department intelligence...
          </div>

        ) : (

          departments.map((department, index) => (

            <motion.div

              key={department.name}

              initial={{
                opacity: 0,
                y: 20
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                delay: index * 0.08
              }}

              whileHover={{
                y: -5
              }}

              className={`relative overflow-hidden rounded-[36px] p-8 ${getDepartmentColor(
                department.status
              )} shadow-[0_0_35px_rgba(255,122,0,0.10)] transition-all duration-300`}

            >

              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10">

                <p className="uppercase tracking-[3px] text-white/70 text-xs font-semibold">
                  Department
                </p>

                <h2 className="text-4xl font-black mt-4 tracking-tight">
                  {department.name}
                </h2>

                <div className="mt-10">

                  <p className="text-white/70 tracking-wide">
                    Burnout Risk
                  </p>

                  <h1 className="text-7xl font-black mt-3 tracking-tight">
                    {department.burnout}%
                  </h1>

                </div>

                <div className="flex items-center justify-between mt-10">

                  <div>

                    <p className="text-white/70 text-sm">
                      Employees
                    </p>

                    <h3 className="text-2xl font-bold mt-2">
                      {department.employees}
                    </h3>

                  </div>

                  <div className="bg-black/20 backdrop-blur-md px-5 py-3 rounded-full border border-white/10">

                    <p className="font-semibold tracking-wide">
                      {department.status}
                    </p>

                  </div>

                </div>

              </div>

            </motion.div>

          ))

        )}

      </div>

      {/* ALERT */}
      {highestRisk && (

        <motion.div

          whileHover={{
            y: -3
          }}

          className="relative z-10 glass rounded-[34px] p-9 mt-16 border border-red-500/15"

        >

          <div className="absolute top-[-80px] right-[-80px] w-[220px] h-[220px] rounded-full bg-red-500/5 blur-[120px]" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>

              <p className="text-red-400 uppercase tracking-[4px] font-semibold">
                AI Workforce Alert
              </p>

              <h2 className="text-4xl font-bold mt-5 tracking-tight leading-tight">

                {highestRisk.name}
                {' '}
                department requires intervention

              </h2>

              <p className="text-gray-400 text-lg mt-6 leading-relaxed max-w-4xl">

                AI models detected elevated burnout
                escalation patterns and organizational
                stress accumulation within this department.

              </p>

            </div>

            <button

  onClick={() =>
    navigate('/hr/interventions')
  }

  className="px-9 py-5 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 transition-all duration-300 font-semibold h-fit shadow-[0_0_30px_rgba(239,68,68,0.15)]"

>

  Schedule Intervention

</button>

          </div>

        </motion.div>

      )}

    </div>

  )

}

const LegendItem = ({ color, label }) => {

  return (

    <div className="flex items-center gap-3">

      <div className={`w-4 h-4 rounded-full ${color}`} />

      <p className="text-gray-300 tracking-wide">
        {label}
      </p>

    </div>

  )

}

export default DepartmentHeatmap

