import MainLayout from '../layouts/MainLayout'
import CircularProgress from '../components/charts/CircularProgress'
import FeatureCard from '../components/landing/FeatureCard'
import BurnoutLineChart from '../components/charts/BurnoutLineChart'
import AIRecommendationCard from '../components/dashboard/AIRecommendationCard'
import TestimonialCard from '../components/landing/TestimonialCard'
import WellnessMetric from '../components/dashboard/WellnessMetric'

import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import {
  BrainCircuit,
  Activity,
  Bell,
  HeartPulse,
  ShieldCheck,
  Users,
} from 'lucide-react'

import { motion } from 'framer-motion'
const Home = () => {

  useEffect(() => {

    fetch('http://127.0.0.1:5000/api/test')

      .then((res) => res.json())

      .then((data) => {
        console.log(data)
      })

      .catch((err) => {
        console.log(err)
      })

  }, [])

  return (
    <MainLayout>
<section className="relative z-0 grid lg:grid-cols-2 gap-20 items-center min-h-[92vh] pt-36 overflow-hidden">

  {/* LEFT CONTENT */}
  <motion.div
    initial={{ opacity: 0, x: -60 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10"
  >

    {/* TOP BADGE */}
    <div className="inline-flex items-center gap-3 glass px-5 py-3 rounded-full border border-orange-500/10">

      <div className="live-dot" />

      <p className="text-orange-300 text-sm font-medium tracking-wide">

        AI-Powered Employee Wellness Platform

      </p>

    </div>

    {/* MAIN HEADING */}
    <h1 className="text-5xl lg:text-[5rem] font-bold leading-[0.95] mt-10 tracking-tight">

  Employee Burnout

  <span className="block">
    Prediction System
  </span>

  <span className="block text-orange-400 mt-4">
    AI & Machine Learning
  </span>

</h1>

    {/* DESCRIPTION */}
    <p className="text-gray-400 text-xl mt-10 leading-relaxed max-w-2xl">

      Monitor employee wellness, analyze productivity,
predict burnout risk, and generate personalized
AI recommendations using machine learning
and behavioral analytics.

    </p>

    {/* BUTTONS */}
    <div className="flex flex-wrap gap-5 mt-14">

      <Link
        to="/employee"
        className="px-10 py-5 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff8c1a] text-lg font-semibold hover:scale-105 duration-300 inline-block"
      >

        Launch Dashboard

      </Link>

      <Link
        to="/hr"
        className="glass px-10 py-5 rounded-2xl text-lg hover:bg-white/10 duration-300 inline-block border border-white/5"
      >

        HR Console

      </Link>

    </div>

    {/* STATS */}
    <div className="grid grid-cols-3 gap-10 mt-20">

      <div>

        <h1 className="text-5xl font-black text-orange-400">
          81%
        </h1>

        <p className="text-gray-500 mt-3">
          Model Accuracy
        </p>

      </div>

      <div>

        <h1 className="text-5xl font-black text-orange-400">
          8
        </h1>

        <p className="text-gray-500 mt-3">
          Input Features
        </p>

      </div>

      <div>

        <h1 className="text-5xl font-black text-orange-400">
          6
        </h1>

        <p className="text-gray-500 mt-3">
          Week Forecast
        </p>

      </div>

    </div>

  </motion.div>

  
{/* RIGHT SIDE */}
<motion.div
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="relative flex items-center justify-center h-[700px]"
>

  {/* OUTER PULSE */}
  <div className="absolute w-[620px] h-[620px] rounded-full border border-orange-500/5 animate-ping" />

  {/* ROTATING RING */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      repeat: Infinity,
      duration: 18,
      ease: 'linear',
    }}
    className="absolute w-[520px] h-[520px] rounded-full border border-orange-500/10"
  >

    {/* ORBIT DOT */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-orange-400 shadow-[0_0_30px_rgba(255,122,0,0.9)]" />

  </motion.div>

  {/* SECOND ROTATING RING */}
  <motion.div
    animate={{ rotate: -360 }}
    transition={{
      repeat: Infinity,
      duration: 12,
      ease: 'linear',
    }}
    className="absolute w-[420px] h-[420px] rounded-full border border-white/5"
  >

    {/* ORBIT DOT */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-orange-300 shadow-[0_0_25px_rgba(255,180,0,0.8)]" />

  </motion.div>

  {/* FLOATING PARTICLES */}
  <motion.div
    animate={{
      y: [-15, 15, -15],
    }}
    transition={{
      repeat: Infinity,
      duration: 4,
    }}
    className="absolute top-[120px] left-[90px] w-3 h-3 rounded-full bg-orange-400 shadow-[0_0_20px_rgba(255,122,0,0.8)]"
  />

  <motion.div
    animate={{
      y: [15, -15, 15],
    }}
    transition={{
      repeat: Infinity,
      duration: 5,
    }}
    className="absolute bottom-[120px] right-[80px] w-3 h-3 rounded-full bg-orange-300 shadow-[0_0_20px_rgba(255,180,0,0.8)]"
  />

  {/* CENTER CORE */}
  <motion.div
    animate={{
      scale: [1, 1.03, 1],
    }}
    transition={{
      repeat: Infinity,
      duration: 3,
    }}
    className="relative glass w-[340px] h-[340px] rounded-full flex items-center justify-center border border-orange-500/10 overflow-hidden"
  >

    {/* INNER GLOW */}
    <div className="absolute inset-0 bg-orange-500/5 blur-3xl" />

    {/* GRID EFFECT */}
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:22px_22px]" />

    {/* CONTENT */}
    <div className="relative z-10 flex flex-col items-center">

      {/* AI ICON */}
      <motion.div
        animate={{
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#ff6b00] to-[#ff9d3d] flex items-center justify-center shadow-[0_0_50px_rgba(255,122,0,0.35)]"
      >

        <BrainCircuit size={42} />

      </motion.div>

      {/* SCORE */}
      <h1 className="text-6xl font-black mt-10 text-orange-400">
        AI
      </h1>

      <p className="text-gray-400 mt-4 tracking-wide">
        Wellness Engine
      </p>

    </div>

  </motion.div>

  {/* FLOATING CARD */}
  <motion.div
    animate={{
      y: [-10, 10, -10],
    }}
    transition={{
      repeat: Infinity,
      duration: 4,
    }}
    className="absolute top-20 left-0 glass rounded-3xl p-6 border border-white/5"
  >

    <p className="text-gray-500 text-sm">
      Random Forest
    </p>

    <h1 className="text-4xl font-bold mt-2">
      Classifier
    </h1>

  </motion.div>

  {/* FLOATING CARD */}
  <motion.div
    animate={{
      y: [10, -10, 10],
    }}
    transition={{
      repeat: Infinity,
      duration: 5,
    }}
    className="absolute bottom-20 right-0 glass rounded-3xl p-6 border border-white/5"
  >

    <p className="text-gray-500 text-sm">
      Groq AI
    </p>

    <h1 className="text-4xl font-bold mt-2">
      Insight
    </h1>

  </motion.div>

</motion.div>
</section>
{/* FEATURES SECTION */}
<section className="mt-36">

  {/* HEADER */}
  <div className="text-center max-w-4xl mx-auto">

    <p className="text-orange-400 uppercase tracking-[5px] font-semibold">
      Platform
    </p>

    <h1 className="text-5xl lg:text-6xl font-bold mt-6 leading-tight tracking-tight">

      Everything you need
      to build healthier teams.

    </h1>

    <p className="text-gray-400 text-xl mt-8 leading-relaxed">

      Built for HR teams, leadership,
      and workforce wellness intelligence.

    </p>

  </div>

  {/* GRID */}
  <div className="grid lg:grid-cols-3 gap-8 mt-20">

    <FeatureCard
      icon={<BrainCircuit size={30} />}
      title="Burnout Prediction"
      description="Random Forest machine learning model
for burnout risk prediction."
    />

    <FeatureCard
      icon={<Activity size={30} />}
      title="Behavioral Signals"
      description="Track workload, meetings, productivity, and wellness patterns."
    />

    <FeatureCard
      icon={<Bell size={30} />}
      title="Real-Time Alerts"
      description="Instant burnout escalation alerts routed directly to HR systems."
    />

    <FeatureCard
      icon={<HeartPulse size={30} />}
      title="Wellness Recommendations"
      description="AI-generated interventions personalized for each employee."
    />

    <FeatureCard
      icon={<Users size={30} />}
      title="HR Cohort Analytics"
      description="Department-wide burnout trends and workforce intelligence."
    />

    <FeatureCard
  icon={<ShieldCheck size={30} />}
  title="Burnout Forecasting"
  description="Forecast future burnout trends using machine learning and employee wellness data."
/>

  </div>

</section>

{/* ANALYTICS SECTION */}
<section className="mt-40">

  {/* HEADER */}
  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">

    <div>

      <p className="text-orange-400 uppercase tracking-[5px] font-semibold">
        Live Intelligence
      </p>

      <h1 className="text-5xl lg:text-6xl font-bold mt-6 leading-tight max-w-3xl tracking-tight">

        AI-powered workforce monitoring.

      </h1>

    </div>

    <p className="text-gray-400 text-xl leading-relaxed max-w-xl">

      Burnout forecasting generated using
employee wellness metrics,
activity tracking,
and machine learning models.
    </p>

  </div>

  {/* CHART */}
  <div className="glass rounded-[40px] p-8 border border-white/5">

    <BurnoutLineChart />

  </div>

</section>

{/* AI INSIGHTS SECTION */}
<section className="mt-40">

  {/* HEADER */}
  <div className="max-w-4xl">

    <p className="text-orange-400 uppercase tracking-[5px] font-semibold">
      AI Wellness Engine
    </p>

    <h1 className="text-5xl lg:text-6xl font-bold mt-6 leading-tight tracking-tight">

      Recommendations powered
      by behavioral intelligence.

    </h1>

    <p className="text-gray-400 text-xl mt-8 leading-relaxed">

      Personalized interventions generated
      from workload patterns, stress indicators,
      and productivity analytics.

    </p>

  </div>

  {/* CONTENT */}
  <div className="grid lg:grid-cols-2 gap-10 mt-20">

    {/* LEFT */}
    <div className="space-y-8">

      <AIRecommendationCard
        status="Focus Recovery"
        title="Improve Recovery Time"
        description="AI detected elevated context switching and fatigue patterns."
      />

      <AIRecommendationCard
        status="Wellness Suggestion"
        title="Maintain Healthy Work Habits"
        description="Employees with uninterrupted focus blocks showed lower burnout risk."
      />

    </div>

    {/* RIGHT */}
    <div className="glass rounded-[40px] p-10 border border-orange-500/10">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-orange-400 uppercase tracking-[4px]">
            Wellness Snapshot
          </p>

          <h1 className="text-4xl font-bold mt-3 tracking-tight">
            Employee Health Metrics
          </h1>

        </div>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6b00] to-[#ff9d3d] flex items-center justify-center text-2xl">

          🧠

        </div>

      </div>

      {/* METRICS */}
      <div className="space-y-8 mt-12">

        <WellnessMetric
          title="Mood Tracking"
  value="Active"
  progress={100}
  color="bg-orange-500"
        />

        <WellnessMetric
          title="Activity Monitoring"
  value="Enabled"
  progress={100}
  color="bg-orange-500"
        />

        <WellnessMetric
          title="Burnout Prediction"
  value="ML Model"
  progress={100}
  color="bg-orange-500"
        />

        <WellnessMetric
          title="AI Recommendations"
  value="Groq AI"
  progress={100}
  color="bg-orange-500"
        />

      </div>

    </div>

  </div>

</section>

{/* TESTIMONIALS */}
<section className="mt-44">

  {/* HEADER */}
  <div className="text-center max-w-4xl mx-auto">

    <p className="text-orange-400 uppercase tracking-[5px] font-semibold">
      Project Highlights
    </p>

    <h1 className="text-5xl lg:text-6xl font-bold mt-6 leading-tight tracking-tight">

      Core System Capabilities

    </h1>

    <p className="text-gray-400 text-xl mt-8 leading-relaxed">

      BurnoutAI helps organizations detect workforce stress early
      and improve employee wellness outcomes.

    </p>

  </div>

  {/* STATS */}
  <div className="grid md:grid-cols-4 gap-8 mt-20">

    {[
      ['81%', 'Model Accuracy'],
      ['8', 'Input Features'],
      ['6', 'Week Forecast'],
      ['AI', 'Recommendations'],
    ].map(([value, label]) => (

      <div
        key={label}
        className="glass rounded-[32px] p-8 text-center border border-white/5 hover:border-orange-500/20 transition-all duration-300"
      >

        <h1 className="text-5xl font-black text-orange-400">
          {value}
        </h1>

        <p className="text-gray-400 mt-4">
          {label}
        </p>

      </div>

    ))}

  </div>

  {/* TESTIMONIALS */}
  <div className="grid lg:grid-cols-3 gap-8 mt-20">

    <TestimonialCard
  name="Employee Module"
  role="Wellness Tracking"
  review="Track stress, energy, sleep, workload, and burnout risk."
/>

<TestimonialCard
  name="AI Engine"
  role="Machine Learning"
  review="Random Forest model predicts burnout risk and future workforce trends."
/>

<TestimonialCard
  name="HR Dashboard"
  role="Workforce Analytics"
  review="Provides organization-wide insights, forecasts, and AI recommendations."
/>

  </div>

</section>

{/* CTA SECTION */}
<section className="mt-44 mb-20">

  <div className="glass rounded-[50px] p-14 lg:p-20 relative overflow-hidden border border-orange-500/10">

    <div className="relative z-10 text-center max-w-4xl mx-auto">

      <p className="text-orange-400 uppercase tracking-[5px] font-semibold">
        Start Today
      </p>

      <h1 className="text-5xl lg:text-7xl font-bold mt-8 leading-tight tracking-tight">

        Monitor Wellness.
Predict Burnout.
Support Employees.

      </h1>

      <p className="text-gray-400 text-xl mt-10 leading-relaxed">

        Detect burnout before productivity declines,
        empower employees with wellness insights,
        and create sustainable workforce performance.

      </p>

      {/* BUTTONS */}
      <div className="flex flex-wrap justify-center gap-6 mt-14">

        <Link
          to="/employee"
          className="px-10 py-5 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff8c1a] text-lg font-semibold hover:scale-105 duration-300 inline-block"
        >

          Launch Dashboard

        </Link>

        <Link
          to="/hr"
          className="glass px-10 py-5 rounded-2xl text-lg hover:bg-white/10 duration-300 inline-block border border-white/5"
        >

          HR Dashboard

        </Link>

      </div>

    </div>

  </div>

</section>
    </MainLayout>
  )
}

export default Home