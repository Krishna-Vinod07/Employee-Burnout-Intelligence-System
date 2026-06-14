import {
  LayoutDashboard,
  Brain,
  Activity,
  Bell,
  Settings,
  LogOut,
  Home,
  User,
} from 'lucide-react'

import {
  NavLink,
  Link,
  useNavigate,
} from 'react-router-dom'

const Sidebar = () => {

  const navigate = useNavigate()

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem('user')

    navigate('/login')

  }

  return (

    <aside className="w-[290px] h-screen overflow-y-auto fixed left-0 top-0 border-r border-white/5 bg-[#050505]/95 backdrop-blur-2xl p-8 flex flex-col justify-between z-50">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-4 group"
        >

          {/* ICON */}
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#ff6b00] to-[#ff8c1a] flex items-center justify-center shadow-[0_0_30px_rgba(255,122,0,0.18)] transition-all duration-300 group-hover:scale-105">

            <Brain
              size={30}
              className="text-white"
            />

          </div>

          {/* TEXT */}
          <div>

            <h1 className="text-3xl font-bold tracking-tight text-white">

              BurnoutAI

            </h1>

            <p className="text-gray-500 text-xs tracking-[4px] uppercase mt-1">

              Workforce Intelligence

            </p>

          </div>

        </Link>

        {/* BACK BUTTON */}
        <div className="mt-10">

          <Link
            to="/"
            className="glass rounded-2xl px-5 py-4 flex items-center gap-3 text-gray-400 hover:text-white hover:border-orange-500/20 border border-transparent transition-all duration-300"
          >

            <Home size={20} />

            <span className="font-medium">
              Back to homepage
            </span>

          </Link>

        </div>

        {/* NAVIGATION */}
        <div className="mt-14 space-y-4">

          <SidebarItem
            icon={<LayoutDashboard size={22} />}
            title="Dashboard"
            to="/employee"
          />

          <SidebarItem
            icon={<Activity size={22} />}
            title="Analytics"
            to="/employee-analytics"
          />

          <SidebarItem
            icon={<Brain size={22} />}
            title="AI Insights"
            to="/insights"
          />

          <SidebarItem
            icon={<Bell size={22} />}
            title="Notifications"
            to="/notifications"
          />

          <SidebarItem
            icon={<Settings size={22} />}
            title="Settings"
            to="/settings"
          />
          <SidebarItem
  icon={<User size={22} />}
  title="Profile"
  to="/profile"
/>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="space-y-5">

        {/* STATUS CARD */}
        <div className="glass rounded-3xl p-5 border border-orange-500/10">

          <div className="flex items-center gap-3">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <p className="text-green-400 text-sm font-semibold tracking-wide">

              AI monitoring active

            </p>

          </div>

          <p className="text-gray-500 text-sm mt-4 leading-relaxed">

            Real-time workforce analytics
            and burnout monitoring enabled.

          </p>

        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full rounded-2xl px-5 py-5 flex items-center gap-4 bg-[#0f0f0f] border border-white/5 hover:border-orange-500/20 text-gray-400 hover:text-white transition-all duration-300"
        >

          <LogOut size={20} />

          <span className="font-medium">
            Logout
          </span>

        </button>

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

        `flex items-center gap-4 px-5 py-5 rounded-2xl transition-all duration-300 border group ${
          isActive

            ? 'bg-gradient-to-r from-[#ff6b00] to-[#ff8c1a] text-white border-orange-400/20 shadow-[0_0_25px_rgba(255,122,0,0.18)]'

            : 'border-transparent text-gray-400 hover:text-white hover:bg-[#101010] hover:border-orange-500/10'
        }`
      }
    >

      {/* ICON */}
      <div className="group-hover:scale-110 transition-all duration-300">

        {icon}

      </div>

      {/* TEXT */}
      <span className="text-[17px] font-medium tracking-wide">

        {title}

      </span>

    </NavLink>

  )
}

export default Sidebar