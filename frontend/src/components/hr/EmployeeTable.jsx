
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const EmployeeTable = () => {

  const [employees, setEmployees] = useState([])

  const [search, setSearch] = useState('')

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchEmployees = async () => {

      try {

        const response = await fetch(

  'http://127.0.0.1:5000/api/hr/employees'

)

        const result = await response.json()

        if (result.status === 'success') {

          setEmployees(
            result.employees
          )

        }

        setLoading(false)

      }

      catch (error) {

        console.log(error)

        setLoading(false)

      }

    }

    fetchEmployees()

  }, [])

  const filteredEmployees = employees.filter(

    employee =>

      employee.employeeName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

  )

  return (

    <div className="relative overflow-hidden glass rounded-[42px] p-10 border border-orange-500/10">

      <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-orange-500/5 blur-[140px]" />

      {/* HEADER */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        <div>

          <p className="text-orange-400 uppercase tracking-[5px] font-semibold">

            Workforce Monitoring

          </p>

          <h1 className="text-5xl font-bold mt-5 tracking-tight">

            High Risk Employees

          </h1>

        </div>

        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="glass rounded-2xl px-6 py-4 bg-[#111111] border border-white/5 focus:border-orange-500/20 outline-none w-full lg:w-[320px] text-white placeholder:text-gray-500"
        />

      </div>

      {/* TABLE */}
      <div className="relative z-10 overflow-x-auto mt-14">

        {loading ? (

          <div className="text-xl text-gray-400">

            Loading employees...

          </div>

        ) : (

          <table className="w-full min-w-[1000px]">

            <thead>

              <tr className="border-b border-white/10 text-left">

                <th className="pb-6">Employee</th>

                <th className="pb-6">Department</th>

                <th className="pb-6">Stress</th>

                <th className="pb-6">Energy</th>

                <th className="pb-6">Workload</th>

                <th className="pb-6">Risk</th>

              </tr>

            </thead>

            <tbody>

              {filteredEmployees.map(

                (employee, index) => (

                  <motion.tr
                    key={index}
                    initial={{
                      opacity: 0
                    }}
                    animate={{
                      opacity: 1
                    }}
                    className="border-b border-white/5 hover:bg-white/[0.03]"
                  >

                    {/* NAME */}
                    <td className="py-8">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b00] to-[#ff9d3d] flex items-center justify-center font-bold">

                          {employee.employeeName?.charAt(0)}

                        </div>

                        <div>

                          <h2 className="font-semibold">

                            {employee.employeeName}

                          </h2>

                          <p className="text-gray-500 text-sm">

                            {employee.email}

                          </p>

                        </div>

                      </div>

                    </td>

                    {/* DEPARTMENT */}
                    <td className="py-8">

                      {employee.department}

                    </td>

                    {/* STRESS */}
                    <td className="py-8 text-red-400 font-semibold">

                      {employee.stress}

                    </td>

                    {/* ENERGY */}
                    <td className="py-8 text-green-400 font-semibold">

                      {employee.energy}

                    </td>

                    {/* WORKLOAD */}
                    <td className="py-8 text-orange-400 font-semibold">

                      {employee.workload}

                    </td>

                    {/* RISK */}
                    <td className="py-8">

                      <RiskBadge
                        risk={
                          employee.burnoutRisk
                        }
                      />

                    </td>

                  </motion.tr>

                )

              )}

            </tbody>

          </table>

        )}

      </div>

    </div>

  )

}

const RiskBadge = ({ risk }) => {

  const styles = {

    Low:
      'bg-green-500/15 text-green-400 border border-green-500/20',

    Moderate:
      'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20',

    High:
      'bg-orange-500/15 text-orange-400 border border-orange-500/20',

    Critical:
      'bg-red-500/15 text-red-400 border border-red-500/20',

  }

  return (

    <div className={`inline-flex px-5 py-2 rounded-full text-sm font-semibold ${styles[risk]}`}>

      {risk}

    </div>

  )

}

export default EmployeeTable

