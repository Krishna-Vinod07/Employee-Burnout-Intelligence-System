import HRLayout from '../../layouts/HRLayout'

import BurnoutForecast from '../../components/hr/BurnoutForecast'

const Forecasting = () => {
  return (
    <HRLayout>

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

        <div>

          <p className="text-red-400 uppercase tracking-[4px] font-semibold">
            Predictive Intelligence
          </p>

          <h1 className="text-7xl font-black mt-5 leading-tight">

            Burnout Forecasting

          </h1>

          <p className="text-gray-400 text-xl mt-6 max-w-4xl leading-relaxed">

            AI-powered forecasting models predicting
            burnout escalation, workforce retention,
            productivity decline, and organizational strain.

          </p>

        </div>

        {/* STATUS */}
        <div className="glass px-8 py-5 rounded-2xl h-fit border border-red-500/20">

          <p className="text-red-400 text-lg font-semibold">
            ● Predictive AI active
          </p>

        </div>

      </div>

      {/* FORECAST */}
      <div className="mt-16 pb-20">

        <BurnoutForecast />

      </div>

    </HRLayout>
  )
}

export default Forecasting