import { motion } from 'framer-motion'

const CircularProgress = ({ value }) => {
  return (
    <div className="relative w-[280px] h-[280px]">

      <svg className="w-full h-full rotate-[-90deg]">

        {/* BACKGROUND */}
        <circle
          cx="140"
          cy="140"
          r="110"
          stroke="#1E1B4B"
          strokeWidth="18"
          fill="transparent"
        />

        {/* PROGRESS */}
        <motion.circle
          cx="140"
          cy="140"
          r="110"
          stroke="url(#gradient)"
          strokeWidth="18"
          fill="transparent"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: value / 100 }}
          transition={{ duration: 2 }}
          style={{
            pathLength: value / 100,
          }}
        />

        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#D946EF" />
          </linearGradient>
        </defs>

      </svg>

      {/* CENTER TEXT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <h1 className="text-6xl font-black">
          {value}%
        </h1>

        <div className="mt-4 px-5 py-2 rounded-full border border-purple-500 text-purple-300">

          Moderate Risk

        </div>

      </div>

    </div>
  )
}

export default CircularProgress