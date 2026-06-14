import { motion } from 'framer-motion'

const FeatureCard = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className="glass rounded-[32px] p-8 min-h-[280px] card-hover glow"
    >

      {/* ICON */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff8c1a] shadow-[0_0_25px_rgba(255,122,0,0.18)] flex items-center justify-center mb-8">

        {icon}

      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-black leading-snug">
        {title}
      </h1>

      {/* DESCRIPTION */}
      <p className="text-gray-400 text-lg leading-relaxed mt-6">
        {description}
      </p>

    </motion.div>
  )
}

export default FeatureCard