import {
  LayoutDashboard,
  Users,
  Activity,
  Brain,
  ShieldAlert,
  FileBarChart,
  Home,
} from 'lucide-react'

import {
  NavLink,
  Link,
} from 'react-router-dom'

import { motion } from 'framer-motion'

const HRSidebar = () => {

  return (

    <aside className="w-[285px] h-screen fixed left-0 top-0 bg-[#050505]/95 backdrop-blur-2xl border-r border-orange-500/10 px-5 py-4 z-50 overflow-y-auto overflow-x-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[260px] h-[260px] rounded-full bg-orange-500/5 blur-[120px]" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col min-h-full">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-4 group shrink-0"
        >

          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.05,
            }}
            transition={{
              duration: 0.3,
            }}
            className="w-14 h-14 rounded-3xl bg-gradient-to-br from-[#ff6b00] to-[#ff9d3d] flex items-center justify-center shadow-[0_0_35px_rgba(255,122,0,0.18)] shrink-0"
          >

            <Brain
              size={28}
              className="text-white"
            />

          </motion.div>

          <div className="min-w-0">

            <h1 className="text-[28px] font-bold tracking-tight leading-none truncate">

              BurnoutAI

            </h1>

            <p className="text-gray-500 text-xs mt-2 tracking-[3px] uppercase">

              HR Intelligence

            </p>

          </div>

        </Link>

        {/* BACK BUTTON */}
        <Link
          to="/"
          className="glass rounded-3xl px-5 py-4 flex items-center gap-4 hover:bg-white/[0.04] transition-all duration-300 mt-8 text-gray-300 hover:text-white border border-white/5 hover:border-orange-500/10 shrink-0"
        >

          <Home
            size={19}
            className="shrink-0"
          />

          <span className="font-medium tracking-wide text-[15px]">

            Back to homepage

          </span>

        </Link>

        {/* NAVIGATION */}
        <div className="mt-8 space-y-2.5 flex-1">

          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            title="HR Dashboard"
            to="/hr"
          />

          <SidebarItem
            icon={<Users size={20} />}
            title="Employees"
            to="/hr/employees"
          />

          <SidebarItem
            icon={<Activity size={20} />}
            title="Workforce Analytics"
            to="/hr/analytics"
          />

          <SidebarItem
            icon={<Brain size={20} />}
            title="Forecasting"
            to="/hr/forecasting"
          />

          <SidebarItem
            icon={<ShieldAlert size={20} />}
            title="Interventions"
            to="/hr/interventions"
          />

          <SidebarItem
            icon={<FileBarChart size={20} />}
            title="Reports"
            to="/hr/reports"
          />

        </div>

        {/* STATUS CARD */}
        <motion.div
          animate={{
            y: [-2, 2, -2],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="relative glass rounded-3xl p-5 border border-green-500/10 overflow-hidden mt-6 shrink-0"
        >

          {/* GLOW */}
          <div className="absolute top-[-60px] right-[-60px] w-[140px] h-[140px] rounded-full bg-green-500/5 blur-3xl" />

          <div className="relative z-10">

            {/* TOP */}
            <div className="flex items-center gap-3">

              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shrink-0" />

              <p className="text-green-400 font-semibold tracking-wide text-sm">

                AI monitoring active

              </p>

            </div>

            {/* TEXT */}
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">

              Real-time workforce analytics
              and predictive monitoring enabled.

            </p>

          </div>

        </motion.div>

      </div>

    </aside>

  )
}

const SidebarItem = ({
  icon,
  title,
  to,
}) => {

  return (

    <NavLink
      to={to}
      className={({ isActive }) =>

        `group flex items-center gap-4 px-5 py-4 rounded-3xl transition-all duration-300 border w-full ${
          isActive

            ? 'bg-gradient-to-r from-[#ff6b00] to-[#ff8c1a] text-white border-orange-400/20 shadow-[0_0_30px_rgba(255,122,0,0.15)]'

            : 'border-transparent hover:border-orange-500/10 hover:bg-white/[0.03] text-gray-400 hover:text-white'
        }`
      }
    >

      {/* ICON */}
      <div className="transition-transform duration-300 group-hover:scale-110 shrink-0">

        {icon}

      </div>

      {/* TITLE */}
      <span className="text-[16px] font-medium tracking-wide leading-snug">

        {title}

      </span>

    </NavLink>

  )
}

export default HRSidebar