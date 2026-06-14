const WellnessBar = ({
  label,
  value,
  progress,
  color,
}) => {
  return (
    <div>

      {/* LABEL */}
      <div className="flex items-center justify-between mb-3">

        <p className="text-lg text-gray-300">
          {label}
        </p>

        <p className="text-white font-semibold">
          {value}
        </p>

      </div>

      {/* BAR */}
      <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">

        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  )
}

const WellnessTracker = () => {
  return (
    <div className="glass rounded-[35px] p-8 glow">

      {/* HEADER */}
      <div>

        <p className="text-purple-400 uppercase tracking-[3px]">
          Wellness Tracker
        </p>

        <h1 className="text-4xl font-black mt-4">
          Quick check-in
        </h1>

      </div>

      {/* BARS */}
      <div className="space-y-8 mt-12">

        <WellnessBar
          label="Mood"
          value="5/10"
          progress={50}
          color="bg-purple-500"
        />

        <WellnessBar
          label="Stress"
          value="4/10"
          progress={40}
          color="bg-red-500"
        />

        <WellnessBar
          label="Sleep"
          value="6.7h"
          progress={75}
          color="bg-fuchsia-500"
        />

        <WellnessBar
          label="Breaks today"
          value="5/8"
          progress={62}
          color="bg-cyan-500"
        />

      </div>

      {/* BUTTON */}
      <button className="w-full mt-12 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-lg font-semibold hover:scale-[1.02] duration-300">

        Submit today's check-in

      </button>

    </div>
  )
}

export default WellnessTracker