import DashboardLayout from '../layouts/DashboardLayout'

import ProductivityTimeline from '../components/employee/ProductivityTimeline'
import MoodTracker from '../components/employee/MoodTracker'
import WellnessHabits from '../components/employee/WellnessHabits'

import { motion } from 'framer-motion'

const EmployeeAnalytics = () => {

  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

        {/* LEFT */}
        <div>

          <p className="text-orange-400 uppercase tracking-[5px] font-semibold">

            Personal Analytics

          </p>

          <h1 className="text-7xl font-black mt-5 leading-tight tracking-tight">

            Performance Insights

          </h1>

          <p className="text-gray-400 text-xl mt-6 max-w-4xl leading-relaxed">

            Track productivity consistency,
            emotional wellness,
            focus patterns,
            and recovery analytics powered by AI.

          </p>

        </div>

        {/* STATUS */}
        <motion.div
          animate={{
            y: [-3, 3, -3],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="glass px-8 py-5 rounded-3xl h-fit border border-orange-500/10"
        >

          <div className="flex items-center gap-3">

            <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse" />

            <p className="text-orange-400 text-lg font-semibold tracking-wide">

              Personal analytics active

            </p>

          </div>

        </motion.div>

      </div>

      {/* PRODUCTIVITY */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="mt-16"
      >

        <ProductivityTimeline />

      </motion.div>

      {/* MOOD TRACKER */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.1,
          duration: 0.5,
        }}
        className="mt-16"
      >

        <MoodTracker />

      </motion.div>

      {/* WELLNESS */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
          duration: 0.5,
        }}
        className="mt-16 pb-20"
      >

        <WellnessHabits />

      </motion.div>

    </DashboardLayout>

  )
}

export default EmployeeAnalytics