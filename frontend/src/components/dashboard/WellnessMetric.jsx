const WellnessMetric = ({
  title,
  value,
  progress,
  color,
}) => {
  return (
    <div className="glass rounded-[30px] p-7">

      {/* TOP */}
      <div className="flex items-center justify-between">

        <p className="text-gray-400">
          {title}
        </p>

        <h1 className="text-2xl font-black">
          {value}
        </h1>

      </div>

      {/* PROGRESS */}
      <div className="w-full h-3 rounded-full bg-white/5 mt-8 overflow-hidden">

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

export default WellnessMetric