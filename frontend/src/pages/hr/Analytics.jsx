import HRLayout from '../../layouts/HRLayout'

import CompanyStats from '../../components/hr/CompanyStats'
import DepartmentHeatmap from '../../components/hr/DepartmentHeatmap'
import WorkforceDistribution from '../../components/hr/WorkforceDistribution'

const Analytics = () => {
  return (
    <HRLayout>

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

        <div>

          <p className="text-purple-400 uppercase tracking-[4px] font-semibold">
            Organizational Intelligence
          </p>

          <h1 className="text-7xl font-black mt-5 leading-tight">

            Workforce Analytics

          </h1>

          <p className="text-gray-400 text-xl mt-6 max-w-4xl leading-relaxed">

            AI-generated organizational analytics,
            workforce health distribution,
            productivity intelligence,
            and burnout trend visualization.

          </p>

        </div>

        {/* STATUS */}
        <div className="glass px-8 py-5 rounded-2xl h-fit">

          <p className="text-cyan-400 text-lg font-semibold">
            ● Analytics engine active
          </p>

        </div>

      </div>

      {/* COMPANY STATS */}
      <div className="mt-16">

        <CompanyStats />

      </div>

      {/* DEPARTMENT HEATMAP */}
      <div className="mt-16">

        <DepartmentHeatmap />

      </div>

      {/* DISTRIBUTION */}
      <div className="mt-16 pb-20">

        <WorkforceDistribution />

      </div>

    </HRLayout>
  )
}

export default Analytics