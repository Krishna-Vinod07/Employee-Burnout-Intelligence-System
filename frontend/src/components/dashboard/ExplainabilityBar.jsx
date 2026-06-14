const ExplainabilityBar = ({
  label,
  value,
  progress,
  color,
}) => {
  return (
    <div className="mb-8">

      {/* LABEL ROW */}
      <div className="flex items-center justify-between mb-3">

        <p className="text-lg text-gray-300">
          {label}
        </p>

        <p className="text-xl font-semibold text-white">
          +{value}
        </p>

      </div>

      {/* BAR */}
      <div className="w-full h-4 rounded-full bg-white/5 overflow-hidden">

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

export default ExplainabilityBar