const employees = [
  {
    name: 'Yuki Tanaka',
    dept: 'Marketing',
    hours: '67h',
    productivity: 73,
    burnout: '55%',
    risk: 'HIGH',
  },
  {
    name: 'Marcus Chen',
    dept: 'Operations',
    hours: '53h',
    productivity: 69,
    burnout: '41%',
    risk: 'MODERATE',
  },
  {
    name: 'Nadia Hassan',
    dept: 'Engineering',
    hours: '61h',
    productivity: 82,
    burnout: '22%',
    risk: 'LOW',
  },
]

const EmployeeTable = () => {
  return (
    <div className="glass rounded-[35px] p-8 glow overflow-auto">

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row justify-between gap-6 xl:items-center mb-10">

        <div>

          <h1 className="text-3xl font-black">
            Employee management
          </h1>

          <p className="text-gray-400 mt-3">
            20 of 20 matching
          </p>

        </div>

        {/* SEARCH */}
        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search employee..."
            className="glass px-5 py-4 rounded-2xl bg-transparent outline-none"
          />

          <select className="glass px-5 py-4 rounded-2xl bg-transparent outline-none">

            <option>All risks</option>
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>

          </select>

        </div>

      </div>

      {/* TABLE */}
      <table className="w-full min-w-[900px]">

        <thead>

          <tr className="text-left text-gray-400 border-b border-white/10">

            <th className="pb-5">Employee</th>
            <th className="pb-5">Department</th>
            <th className="pb-5">Hours</th>
            <th className="pb-5">Productivity</th>
            <th className="pb-5">Burnout</th>
            <th className="pb-5">Risk</th>

          </tr>

        </thead>

        <tbody>

          {employees.map((employee, index) => (
            <tr
              key={index}
              className="border-b border-white/5"
            >

              <td className="py-6 font-semibold">
                {employee.name}
              </td>

              <td>{employee.dept}</td>

              <td>{employee.hours}</td>

              <td>{employee.productivity}</td>

              <td>{employee.burnout}</td>

              <td>

                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  employee.risk === 'HIGH'
                    ? 'bg-red-500/20 text-red-400'
                    : employee.risk === 'MODERATE'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-green-500/20 text-green-400'
                }`}>

                  {employee.risk}

                </span>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default EmployeeTable