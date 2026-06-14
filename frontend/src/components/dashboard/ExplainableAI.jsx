import ExplainabilityBar from './ExplainabilityBar'

const ExplainableAI = () => {
  return (
    <div className="glass rounded-[40px] p-10 glow">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-6">

        <div>

          <p className="text-purple-400 uppercase tracking-[4px] font-semibold">
            Explainable AI
          </p>

          <h1 className="text-5xl font-black mt-5 leading-tight">

            What's driving
            your burnout score

          </h1>

        </div>

        {/* BADGE */}
        <div className="glass px-5 py-3 rounded-2xl h-fit">

          <p className="text-cyan-400">
            SHAP-style contributions
          </p>

        </div>

      </div>

      {/* BARS */}
      <div className="mt-16">

        <ExplainabilityBar
          label="Idle / disengagement"
          value="6.8"
          progress={82}
          color="bg-gradient-to-r from-purple-600 to-fuchsia-600"
        />

        <ExplainabilityBar
          label="Overtime frequency"
          value="6.3"
          progress={76}
          color="bg-gradient-to-r from-cyan-500 to-blue-500"
        />

        <ExplainabilityBar
          label="Self-reported stress"
          value="4.7"
          progress={63}
          color="bg-gradient-to-r from-pink-500 to-fuchsia-500"
        />

        <ExplainabilityBar
          label="Mood (inverse)"
          value="4.4"
          progress={58}
          color="bg-gradient-to-r from-orange-500 to-pink-500"
        />

        <ExplainabilityBar
          label="Productivity decline"
          value="2.3"
          progress={39}
          color="bg-gradient-to-r from-green-500 to-emerald-500"
        />

        <ExplainabilityBar
          label="Sleep deficit"
          value="1.2"
          progress={24}
          color="bg-gradient-to-r from-yellow-500 to-orange-500"
        />

      </div>

    </div>
  )
}

export default ExplainableAI