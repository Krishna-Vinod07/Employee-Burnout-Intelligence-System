
import {
  AlertTriangle,
  Brain,
} from 'lucide-react'

import { motion } from 'framer-motion'

import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

const HighRiskEmployees = () => {

  const [employees, setEmployees] = useState([])

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {

    fetchEmployees()

  }, [])

  const fetchEmployees = async () => {

    try {

      const response = await fetch(

        'http://127.0.0.1:5000/api/hr/high-risk'

      )

      const data = await response.json()

      if (data.status === 'success') {

        setEmployees(
          data.employees
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

        Loading employees...

      </div>

    )

  }

  return (

    <div className="relative overflow-hidden glass rounded-[42px] p-10 border border-red-500/10">

      <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-red-500/5 blur-[140px]" />

      {/* HEADER */}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        <div>

          <p className="text-red-400 uppercase tracking-[5px] font-semibold">

            Critical Monitoring

          </p>

          <h1 className="text-5xl font-bold mt-5 tracking-tight">

            High Risk Employees

          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-3xl leading-relaxed">

            Employees requiring immediate wellness intervention
            based on ML burnout prediction.

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
          className="glass px-7 py-5 rounded-3xl h-fit border border-red-500/15"
        >

          <p className="text-red-400 uppercase tracking-[3px] text-sm font-semibold">

            Active Cases

          </p>

          <h2 className="text-5xl font-black mt-3 text-red-400 tracking-tight">

            {employees.length}

          </h2>

        </motion.div>

      </div>

      {/* EMPLOYEES */}

      <div className="relative z-10 space-y-8 mt-16">

        {employees.map((employee, index) => (

          <motion.div
            key={employee.employeeId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -4,
            }}
            className="relative overflow-hidden glass rounded-[36px] p-8 border border-red-500/10 hover:border-red-500/25 transition-all duration-300"
          >

            <div className="absolute top-[-70px] right-[-70px] w-[200px] h-[200px] rounded-full bg-red-500/5 blur-3xl" />

            <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

              {/* LEFT */}

              <div className="flex items-start gap-6">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(239,68,68,0.15)]">

                  <AlertTriangle size={28} />

                </div>

                <div>

                  <div className="flex flex-wrap items-center gap-4">

                    <h2 className="text-3xl font-bold tracking-tight">

                      {employee.employeeName}

                    </h2>

                    <RiskBadge
                      risk={employee.burnoutRisk}
                    />

                  </div>

                  <p className="text-gray-500 mt-3 text-lg">

                    {employee.department}

                  </p>

                  <p className="text-gray-300 mt-4">

                    {employee.email}

                  </p>

                </div>

              </div>

              {/* RIGHT */}

              <div className="flex flex-col items-start xl:items-end gap-6">

                <div className="glass rounded-3xl px-7 py-5 border border-red-500/10">

                  <p className="text-gray-500 uppercase tracking-[3px] text-sm font-semibold">

                    ML Risk Score

                  </p>

                  <h2 className="text-5xl font-black text-red-400 mt-3 tracking-tight">

                    {employee.riskScore}%

                  </h2>

                </div>

                <div className="flex flex-wrap gap-4">

                  

                  <button

                    onClick={() =>
                      navigate(
                        `/hr/employee/${employee.employeeId}`
                      )
                    }

                    className="glass px-7 py-4 rounded-2xl hover:bg-white/[0.05] transition-all duration-300 border border-white/5"
                  >

                    Review Employee

                  </button>

                </div>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

      {/* AI INSIGHT */}

      <motion.div
        whileHover={{
          y: -3,
        }}
        className="relative z-10 glass rounded-[34px] p-9 mt-16 border border-orange-500/10"
      >

        <div className="absolute top-[-80px] right-[-80px] w-[220px] h-[220px] rounded-full bg-orange-500/5 blur-[120px]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          <div>

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b00] to-[#ff9d3d] flex items-center justify-center shadow-[0_0_25px_rgba(255,122,0,0.15)]">

                <Brain
                  size={22}
                  className="text-white"
                />

              </div>

              <p className="text-orange-400 uppercase tracking-[4px] font-semibold">

                ML Workforce Insight

              </p>

            </div>

            <h2 className="text-4xl font-bold mt-6 tracking-tight leading-tight">

              Burnout monitoring powered by
              machine learning analytics

            </h2>

            <p className="text-gray-400 text-lg mt-6 leading-relaxed max-w-4xl">

              Forecasting models continuously
              monitor workforce wellness trends
              and identify employees requiring
              intervention.

            </p>

          </div>

        </div>

      </motion.div>

    </div>

  )

}

const RiskBadge = ({ risk }) => {

  const styles = {

    Critical:
      'bg-red-500/15 text-red-400 border border-red-500/20',

    High:
      'bg-orange-500/15 text-orange-400 border border-orange-500/20',

    Moderate:
      'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20',

    Low:
      'bg-green-500/15 text-green-400 border border-green-500/20',

  }

  return (

    <div
      className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide ${styles[risk]}`}
    >

      {risk}

    </div>

  )

}

export default HighRiskEmployees

