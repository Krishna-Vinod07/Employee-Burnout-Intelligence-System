import { motion } from 'framer-motion'

const StatCard = ({
  title,
  value,
  subtitle,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="glass rounded-[32px] p-8 glow"
    >

      <p className="text-gray-400 uppercase tracking-[3px]">
        {title}
      </p>

      <h1 className="text-6xl font-black mt-6">
        {value}
      </h1>

      <p className="text-purple-400 text-lg mt-4">
        {subtitle}
      </p>

    </motion.div>
  )
}

export default StatCard