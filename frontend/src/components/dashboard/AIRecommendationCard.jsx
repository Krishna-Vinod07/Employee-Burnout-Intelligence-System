import { motion } from 'framer-motion'

const AIRecommendationCard = ({
  title,
  description,
  status,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="glass rounded-[32px] p-8 glow"
    >

      {/* STATUS */}
      <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500 text-purple-300 text-sm">

        {status}

      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-black mt-8 leading-snug">

        {title}

      </h1>

      {/* DESCRIPTION */}
      <p className="text-gray-400 text-lg mt-6 leading-relaxed">

        {description}

      </p>

    </motion.div>
  )
}

export default AIRecommendationCard