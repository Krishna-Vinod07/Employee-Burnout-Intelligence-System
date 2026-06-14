import DashboardLayout from '../layouts/DashboardLayout'

import {
  Moon,
  Bell,
  Shield,
  SlidersHorizontal,
  User,
  Brain,
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

const Settings = () => {

  // USER
  const user = JSON.parse(
    localStorage.getItem('user')
  )

  // STATES
  const [threshold, setThreshold] =
    useState(65)

  const [darkMode, setDarkMode] =
    useState(true)

  const [emailAlerts, setEmailAlerts] =
    useState(true)

  const [criticalOnly, setCriticalOnly] =
    useState(false)

  const [anonymizeReports,
    setAnonymizeReports] =
    useState(true)

  const [aiRecommendation,
    setAiRecommendation] =
    useState('')

  // ==============================
  // FETCH SETTINGS
  // ==============================

  useEffect(() => {

    fetchSettings()

  }, [])

  const fetchSettings = async () => {

    try {

      const response = await fetch(

        `http://127.0.0.1:5000/api/settings/${user.id}`

      )

      const data = await response.json()

      if (data.status === 'success') {

        setDarkMode(
          data.data.darkMode
        )

        setEmailAlerts(
          data.data.emailAlerts
        )

        setCriticalOnly(
          data.data.criticalOnly
        )

        setAnonymizeReports(
          data.data.anonymizeReports
        )

        setThreshold(
          data.data.threshold
        )

      }

    }

    catch (error) {

      console.log(error)

    }

  }

  // ==============================
  // SAVE SETTINGS
  // ==============================

  const saveSettings = async () => {

    try {

      const response = await fetch(

        'http://127.0.0.1:5000/api/settings/save',

        {

          method: 'POST',

          headers: {

            'Content-Type':
              'application/json'

          },

          body: JSON.stringify({

            userId: user.id,

            darkMode,

            emailAlerts,

            criticalOnly,

            anonymizeReports,

            threshold

          })

        }

      )

      const data = await response.json()

      console.log(data)

      alert(
        'Settings saved successfully'
      )

    }

    catch (error) {

      console.log(error)

    }

  }

  // ==============================
  // AI RECOMMENDATION
  // ==============================

  useEffect(() => {

    generateAIRecommendation()

  }, [threshold])

  const generateAIRecommendation = () => {

    if (threshold >= 75) {

      setAiRecommendation(
        'Aggressive burnout detection enabled. AI systems will escalate early risk signals rapidly.'
      )

    }

    else if (threshold >= 55) {

      setAiRecommendation(
        'Balanced AI sensitivity active. Recommended for most workforce wellness monitoring.'
      )

    }

    else {

      setAiRecommendation(
        'Conservative monitoring enabled. Only strong burnout signals will trigger escalation.'
      )

    }

  }

  return (

    <DashboardLayout>

      {/* HEADER */}
      <div>

        <p className="text-orange-400 uppercase tracking-[4px] font-semibold">

          AI Preferences

        </p>

        <h1 className="text-7xl font-black mt-5">

          Settings

        </h1>

        <p className="text-gray-400 text-xl mt-6 max-w-4xl leading-relaxed">

          Personalize AI monitoring,
          burnout intelligence,
          behavioral analytics,
          and workforce wellness notifications.

        </p>

      </div>

      {/* MAIN */}
      <div className="space-y-10 mt-16">

        {/* PROFILE */}
        <div className="glass rounded-[40px] p-10">

          <SectionHeader
            icon={<User size={30} />}
            title="Profile"
            subtitle="AI identity information"
          />

          <div className="grid lg:grid-cols-2 gap-8 mt-12">

            <InputField
              label="Full Name"
              value={user?.name || ''}
            />

            <InputField
              label="Work Email"
              value={user?.email || ''}
            />

            <InputField
              label="Role"
              value={user?.role || ''}
            />

            <InputField
              label="AI Status"
              value="Behavioral monitoring active"
            />

          </div>

        </div>

        {/* APPEARANCE */}
        <div className="glass rounded-[40px] p-10">

          <SectionHeader
            icon={<Moon size={30} />}
            title="Appearance"
            subtitle="Theme & interface"
          />

          <ToggleRow
            title="Dark mode"
            description="Use BurnoutAI intelligent dark theme."
            active={darkMode}
            onToggle={() =>
              setDarkMode(!darkMode)
            }
          />

        </div>

        {/* NOTIFICATIONS */}
        <div className="glass rounded-[40px] p-10">

          <SectionHeader
            icon={<Bell size={30} />}
            title="AI Notifications"
            subtitle="Behavioral alert configuration"
          />

          <div className="space-y-10 mt-12">

            <NotificationRow
              title="Email alerts"
              description="Receive AI wellness escalation alerts."
              active={emailAlerts}
              onToggle={() =>
                setEmailAlerts(!emailAlerts)
              }
            />

            <NotificationRow
              title="Critical only"
              description="Suppress non-critical burnout notifications."
              active={criticalOnly}
              onToggle={() =>
                setCriticalOnly(!criticalOnly)
              }
            />

          </div>

        </div>

        {/* PRIVACY */}
        <div className="glass rounded-[40px] p-10">

          <SectionHeader
            icon={<Shield size={30} />}
            title="Privacy"
            subtitle="AI data protection"
          />

          <ToggleRow
            title="Anonymize reports"
            description="Hide identity information in HR exports."
            active={anonymizeReports}
            onToggle={() =>
              setAnonymizeReports(
                !anonymizeReports
              )
            }
          />

        </div>

        {/* AI SENSITIVITY */}
        <div className="glass rounded-[40px] p-10">

          <SectionHeader
            icon={<SlidersHorizontal size={30} />}
            title="AI Sensitivity"
            subtitle="Burnout escalation intelligence"
          />

          <div className="mt-14">

            <div className="flex justify-between items-center">

              <h3 className="text-2xl font-bold">

                Threshold

              </h3>

              <p className="text-orange-400 text-2xl font-bold">

                {threshold}

              </p>

            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={threshold}
              onChange={(e) =>
                setThreshold(
                  e.target.value
                )
              }
              className="w-full mt-8 accent-orange-500"
            />

            <div className="flex justify-between text-gray-500 mt-4">

              <p>Conservative</p>

              <p>Balanced</p>

              <p>Aggressive</p>

            </div>

          </div>

        </div>

        {/* AI RECOMMENDATION */}
        <div className="glass rounded-[40px] p-10 border border-orange-500/10 overflow-hidden relative">

          <div className="absolute top-[-100px] right-[-100px] w-[240px] h-[240px] bg-orange-500/10 blur-[120px] rounded-full" />

          <div className="relative z-10">

            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff9d3d] flex items-center justify-center">

                <Brain size={30} />

              </div>

              <div>

                <h2 className="text-4xl font-black">

                  AI Recommendation

                </h2>

                <p className="text-gray-400 mt-2">

                  Personalized intelligence insight

                </p>

              </div>

            </div>

            <p className="text-xl text-gray-300 leading-relaxed mt-10 max-w-5xl">

              {aiRecommendation}

            </p>

          </div>

        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end pb-20">

          <button

            onClick={saveSettings}

            className="px-12 py-5 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff8c1a] text-xl font-bold hover:scale-[1.02] duration-300 shadow-[0_0_35px_rgba(255,122,0,0.18)]"
          >

            Save changes

          </button>

        </div>

      </div>

    </DashboardLayout>

  )
}

/* SECTION HEADER */
const SectionHeader = ({
  icon,
  title,
  subtitle,
}) => {

  return (

    <div className="flex items-center gap-5">

      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff9d3d] flex items-center justify-center shadow-[0_0_30px_rgba(255,122,0,0.18)]">

        {icon}

      </div>

      <div>

        <h2 className="text-4xl font-black">

          {title}

        </h2>

        <p className="text-gray-400 mt-1">

          {subtitle}

        </p>

      </div>

    </div>

  )
}

/* INPUT FIELD */
const InputField = ({
  label,
  value,
}) => {

  return (

    <div>

      <label className="text-gray-500 uppercase tracking-[2px] text-sm">

        {label}

      </label>

      <input
        type="text"
        defaultValue={value}
        className="w-full mt-4 bg-[#0d0d0d] border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-orange-500/20 transition-all duration-300"
      />

    </div>

  )
}

/* TOGGLE ROW */
const ToggleRow = ({
  title,
  description,
  active,
  onToggle,
}) => {

  return (

    <div className="flex items-center justify-between mt-12">

      <div>

        <h3 className="text-2xl font-bold">

          {title}

        </h3>

        <p className="text-gray-400 mt-2">

          {description}

        </p>

      </div>

      <button
        onClick={onToggle}
        className={`w-20 h-11 rounded-full relative transition-all duration-300 ${
          active
            ? 'bg-orange-500'
            : 'bg-[#111111]'
        }`}
      >

        <div
          className={`w-9 h-9 bg-black rounded-full absolute top-1 transition-all duration-300 ${
            active
              ? 'right-1'
              : 'left-1'
          }`}
        />

      </button>

    </div>

  )
}

/* NOTIFICATION ROW */
const NotificationRow = ({
  title,
  description,
  active,
  onToggle,
}) => {

  return (

    <div className="flex items-center justify-between">

      <div>

        <h3 className="text-2xl font-bold">

          {title}

        </h3>

        <p className="text-gray-400 mt-2">

          {description}

        </p>

      </div>

      <button
        onClick={onToggle}
        className={`w-20 h-11 rounded-full relative transition-all duration-300 ${
          active
            ? 'bg-orange-500'
            : 'bg-[#111111]'
        }`}
      >

        <div
          className={`w-9 h-9 bg-black rounded-full absolute top-1 transition-all duration-300 ${
            active
              ? 'right-1'
              : 'left-1'
          }`}
        />

      </button>

    </div>

  )
}

export default Settings