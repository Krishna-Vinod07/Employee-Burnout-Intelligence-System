import logo from '../../assets/logo.png'

import { motion } from 'framer-motion'

const AuthLayout = ({
  children,
  title,
 subtitle,
}) => {

  return (

    <div className="min-h-screen bg-[#030303] text-white grid lg:grid-cols-2 overflow-hidden relative">

      {/* GLOBAL BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,120,0,0.10),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(255,120,0,0.08),transparent_25%)] pointer-events-none" />

      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col justify-between p-16 border-r border-white/[0.05] relative overflow-hidden">

        {/* ORANGE GLOW */}
        <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-orange-500/10 blur-[170px] rounded-full animate-pulse" />

        <div className="absolute bottom-[-200px] left-[5%] w-[550px] h-[550px] bg-orange-500/5 blur-[190px] rounded-full" />

        {/* TOP SECTION */}
        <div className="relative z-10">

          <div className="flex items-center gap-6">

            {/* LOGO */}
            <motion.img
  whileHover={{
    scale: 1.04,
  }}
  transition={{
    duration: 0.3,
  }}
  src={logo}
  alt="BurnoutAI"
 className="w-40 h-50 object-contain scale-[2.2] drop-shadow-[0_0_30px_rgba(255,122,0,0.18)]"
/>

            {/* TEXT */}
            <div>

              <h1 className="text-6xl font-black tracking-tight leading-none">

                Burnout<span className="text-orange-400">AI</span>

              </h1>

              <p className="text-gray-500 mt-3 tracking-wide text-xl">

                Workforce Intelligence

              </p>

            </div>

          </div>

        </div>

        {/* HERO TEXT */}
        <div className="relative z-10 max-w-2xl">

          <p className="text-orange-400 uppercase tracking-[7px] font-semibold">
  Employee Wellness Platform
</p>

<h1 className="text-[78px] font-black leading-[0.95] mt-10 tracking-tight">

  Predict
  employee
  burnout
  early.

</h1>

<p className="text-gray-400 text-2xl leading-relaxed mt-12 max-w-xl">

  Monitor employee wellness, stress,
  workload, and productivity using
  AI-powered analytics and personalized
  recommendations.

</p>

        </div>

        {/* BOTTOM STATS */}
        <div className="relative z-10 flex gap-10">

          {/* CARD */}
          <motion.div
            whileHover={{
              y: -5,
            }}
            className="glass rounded-[30px] px-10 py-8 border border-white/[0.04] backdrop-blur-2xl"
          >

           <h1 className="text-6xl font-black text-orange-400">
  81%
</h1>

<p className="text-gray-400 mt-4 text-lg">
 Model Accuracy
</p>

          </motion.div>

          {/* CARD */}
          <motion.div
            whileHover={{
              y: -5,
            }}
            className="glass rounded-[30px] px-10 py-8 border border-white/[0.04] backdrop-blur-2xl"
          >

            <h1 className="text-6xl font-black text-orange-400">
  6
</h1>

<p className="text-gray-400 mt-4 text-lg">
  Week Forecast
</p>

          </motion.div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex items-center justify-center p-8 overflow-hidden">

        {/* RIGHT GLOW */}
        <div className="absolute top-[10%] right-[-100px] w-[400px] h-[400px] bg-orange-500/10 blur-[150px] rounded-full" />

        {/* AUTH CARD */}
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
            duration: 0.6,
          }}
          className="relative w-full max-w-xl glass rounded-[42px] p-10 border border-white/[0.05] overflow-hidden shadow-[0_0_70px_rgba(255,122,0,0.06)]"
        >

          {/* TOP BORDER LIGHT */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

          {/* HEADER */}
          <p className="text-orange-400 uppercase tracking-[5px] font-semibold">

            Authentication

          </p>

          <h1 className="text-6xl font-black mt-6 tracking-tight leading-none">

            {title}

          </h1>

          <p className="text-gray-400 text-xl mt-6 leading-relaxed">

            {subtitle}

          </p>

          {/* FORM */}
          <div className="mt-14">

            {children}

          </div>

        </motion.div>

      </div>

    </div>

  )
}

export default AuthLayout