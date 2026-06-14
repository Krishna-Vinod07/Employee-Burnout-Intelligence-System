import { motion } from 'framer-motion'

const BurnoutScoreCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-[40px] p-10 glow"
    >

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-400 uppercase tracking-[3px]">
            Burnout Score
          </p>

          <h1 className="text-4xl font-black mt-4">
            Composite ML Index
          </h1>

        </div>

        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">

          📡

        </div>

      </div>

      {/* CIRCLE */}
      <div className="flex justify-center mt-16">

        <div className="relative w-[260px] h-[260px] rounded-full flex items-center justify-center">

          {/* OUTER */}
          <div className="absolute inset-0 rounded-full border-[18px] border-white/10" />

          {/* PROGRESS */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'conic-gradient(#9333EA 0% 72%, transparent 72%)',
              borderRadius: '9999px',
            }}
          />

          {/* INNER */}
          <div className="w-[190px] h-[190px] bg-[#070B1A] rounded-full flex flex-col items-center justify-center z-10">

            <h1 className="text-6xl font-black">
              72%
            </h1>

            <p className="text-purple-400 mt-4 text-lg">
              HIGH RISK
            </p>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="flex justify-between mt-14 text-gray-400">

        <p>Model confidence</p>

        <p className="text-white font-semibold">
          94%
        </p>

      </div>

    </motion.div>
  )
}

export default BurnoutScoreCard