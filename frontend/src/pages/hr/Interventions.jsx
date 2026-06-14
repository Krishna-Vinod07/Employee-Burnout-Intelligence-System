import HRLayout from '../../layouts/HRLayout'

import HighRiskEmployees from '../../components/hr/HighRiskEmployees'

const Interventions = () => {
  return (
    <HRLayout>

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

        <div>

          <p className="text-orange-400 uppercase tracking-[4px] font-semibold">
            Workforce Recovery System
          </p>

          <h1 className="text-7xl font-black mt-5 leading-tight">

            Intervention Center

          </h1>

          <p className="text-gray-400 text-xl mt-6 max-w-4xl leading-relaxed">

            AI-assisted workforce recovery workflows,
            burnout prevention systems,
            escalation monitoring,
            and organizational wellness intervention planning.

          </p>

        </div>

        {/* STATUS */}
        <div className="glass px-8 py-5 rounded-2xl h-fit border border-orange-500/20">

          <p className="text-orange-400 text-lg font-semibold">
            ● Intervention engine active
          </p>

        </div>

      </div>

      {/* HIGH RISK EMPLOYEES */}
      <div className="mt-16 pb-20">

        <HighRiskEmployees />

      </div>

    </HRLayout>
  )
}

export default Interventions