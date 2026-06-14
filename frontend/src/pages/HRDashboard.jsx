import HRLayout from '../layouts/HRLayout'

import CompanyStats from '../components/hr/CompanyStats'

import {
  Brain,
  ShieldAlert,
  Activity,
  ArrowRight,
  Radar,
} from 'lucide-react'

import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'

const HRDashboard = () => {

  return (

    <HRLayout>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden glass rounded-[42px] p-10 border border-orange-500/10"
      >

        {/* BACKGROUND GLOW */}
        <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-orange-500/5 blur-[140px]" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-12">

          {/* LEFT */}
          <div>

            <p className="text-orange-400 uppercase tracking-[5px] font-semibold">

              Executive Workforce Intelligence

            </p>

            <h1 className="text-6xl xl:text-7xl font-bold mt-6 leading-tight tracking-tight">

              HR Command
              <span className="block text-orange-400 mt-2">
                Center
              </span>

            </h1>

            <p className="text-gray-400 text-xl mt-8 max-w-4xl leading-relaxed">

              Centralized workforce wellness overview
              powered by AI behavioral analytics,
              burnout prediction,
              and organizational intelligence systems.

            </p>

          </div>

          {/* STATUS */}
          <motion.div
            animate={{
              y: [-4, 4, -4],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="glass px-8 py-6 rounded-3xl h-fit border border-green-500/10"
          >

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6b00] to-[#ff9d3d] flex items-center justify-center shadow-[0_0_30px_rgba(255,122,0,0.2)]">

                <Radar
                  size={26}
                  className="text-white"
                />

              </div>

              <div>

                <p className="text-green-400 text-lg font-semibold tracking-wide">

                  AI systems operational

                </p>

                <p className="text-gray-500 text-sm mt-1">

                  Workforce monitoring active

                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </motion.div>

      {/* COMPANY STATS */}
      <div className="mt-16">

        <CompanyStats />

      </div>

      {/* QUICK NAVIGATION */}
      <div className="grid xl:grid-cols-2 gap-10 mt-16">

        <QuickCard
          title="Employee Monitoring"
          description="Track employee wellness, productivity, and burnout escalation."
          icon={<Activity size={28} />}
          link="/hr/employees"
        />

        <QuickCard
          title="AI Forecasting"
          description="Predict workforce burnout and retention trends."
          icon={<Brain size={28} />}
          link="/hr/forecasting"
        />

        <QuickCard
          title="Intervention Center"
          description="Manage recovery plans and workforce interventions."
          icon={<ShieldAlert size={28} />}
          link="/hr/interventions"
        />

        <QuickCard
          title="Analytics Hub"
          description="Department heatmaps and workforce intelligence."
          icon={<Radar size={28} />}
          link="/hr/analytics"
        />

      </div>

      {/* AI ALERT */}
      <motion.div
        whileHover={{
          y: -3,
        }}
        className="relative overflow-hidden glass rounded-[40px] p-10 mt-16 border border-red-500/15"
      >

        {/* ALERT GLOW */}
        <div className="absolute top-[-100px] right-[-100px] w-[260px] h-[260px] rounded-full bg-red-500/5 blur-[120px]" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

          {/* LEFT */}
          <div>

            <p className="text-red-400 uppercase tracking-[4px] font-semibold">

              AI Workforce Alert

            </p>

            <h2 className="text-4xl font-bold mt-6 tracking-tight leading-tight">

              Burnout escalation detected
              in Engineering

            </h2>

            <p className="text-gray-400 text-lg mt-6 leading-relaxed max-w-4xl">

              AI models identified sustained overtime,
              meeting overload,
              and declining recovery scores
              across engineering teams.

            </p>

          </div>

          {/* BUTTON */}
          <Link
            to="/hr/interventions"
            className="px-9 py-5 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 transition-all duration-300 font-semibold h-fit inline-flex items-center gap-3 shadow-[0_0_30px_rgba(239,68,68,0.15)]"
          >

            Open Intervention Center

            <ArrowRight size={20} />

          </Link>

        </div>

      </motion.div>

    </HRLayout>

  )
}

/* QUICK CARD */
const QuickCard = ({
  title,
  description,
  icon,
  link,
}) => {

  return (

    <motion.div
      whileHover={{
        y: -5,
      }}
    >

      <Link
        to={link}
        className="relative overflow-hidden glass rounded-[36px] p-9 border border-white/5 hover:border-orange-500/15 transition-all duration-300 block"
      >

        {/* CARD GLOW */}
        <div className="absolute top-[-60px] right-[-60px] w-[180px] h-[180px] rounded-full bg-orange-500/5 blur-3xl" />

        {/* ICON */}
        <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6b00] to-[#ff9d3d] flex items-center justify-center shadow-[0_0_30px_rgba(255,122,0,0.18)]">

          {icon}

        </div>

        {/* TITLE */}
        <h2 className="relative z-10 text-3xl font-bold mt-8 tracking-tight">

          {title}

        </h2>

        {/* DESCRIPTION */}
        <p className="relative z-10 text-gray-400 text-lg mt-6 leading-relaxed">

          {description}

        </p>

        {/* FOOTER */}
        <div className="relative z-10 flex items-center gap-3 mt-10 text-orange-400 font-semibold tracking-wide">

          Open Module

          <ArrowRight size={20} />

        </div>

      </Link>

    </motion.div>

  )
}

export default HRDashboard