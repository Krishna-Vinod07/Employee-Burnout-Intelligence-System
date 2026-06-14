import HRLayout from '../../layouts/HRLayout'

import EmployeeTable from '../../components/hr/EmployeeTable'
import HighRiskEmployees from '../../components/hr/HighRiskEmployees'

const Employees = () => {
  return (
    <HRLayout>

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

        <div>

          <p className="text-cyan-400 uppercase tracking-[4px] font-semibold">
            Workforce Monitoring
          </p>

          <h1 className="text-7xl font-black mt-5 leading-tight">

            Employee Monitoring

          </h1>

          <p className="text-gray-400 text-xl mt-6 max-w-4xl leading-relaxed">

            Monitor employee wellness,
            burnout escalation, productivity,
            and workforce behavioral intelligence
            across the organization.

          </p>

        </div>

        {/* STATUS */}
        <div className="glass px-8 py-5 rounded-2xl h-fit">

          <p className="text-green-400 text-lg font-semibold">
            ● Employee monitoring active
          </p>

        </div>

      </div>

      {/* EMPLOYEE TABLE */}
      <div className="mt-16">

        <EmployeeTable />

      </div>

      {/* HIGH RISK */}
      <div className="mt-16 pb-20">

        <HighRiskEmployees />

      </div>

    </HRLayout>
  )
}

export default Employees