import { motion } from 'framer-motion'

const TestimonialCard = ({
  name,
  role,
  review,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="glass rounded-[32px] p-8 glow"
    >

      {/* PROFILE */}
      <div className="flex items-center gap-4">

        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8c1a] shadow-[0_0_25px_rgba(255,122,0,0.18)]" />

        <div>

          <h1 className="text-2xl font-bold">
            {name}
          </h1>

          <p className="text-gray-400">
            {role}
          </p>

        </div>

      </div>

      {/* REVIEW */}
      <p className="text-gray-300 text-lg leading-relaxed mt-8">

        “{review}”

      </p>

    </motion.div>
  )
}

export default TestimonialCard