import logo from '../../assets/logo.png'

import {
  NavLink,
  Link,
} from 'react-router-dom'

import {
  Home,
  Users,
  BarChart3,
  Settings,
  LogIn,
  LogOut,
} from 'lucide-react'

const Navbar = () => {

  const user = JSON.parse(
    localStorage.getItem('user')
  )

  const handleLogout = () => {

    localStorage.removeItem('user')

    window.location.href = '/login'

  }

  return (

    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4">

      {/* ORANGE GLOW */}
      <div className="absolute top-[-120px] left-[10%] w-[420px] h-[240px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* NAVBAR */}
      <div className="relative glass rounded-[28px] px-8 h-[86px] flex items-center justify-between border border-white/[0.04] backdrop-blur-2xl overflow-hidden">

        {/* TOP LIGHT */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

        {/* LOGO */}
        <Link
          to="/"
          className="relative z-10 flex items-center"
        >

          <img
            src={logo}
            alt="BurnoutAI"
            className="w-[300px] h-[800px] object-contain translate-x-[6px]"
          />

        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-12 relative z-10 ml-10">

          <NavItem
            icon={<Home size={18} />}
            title="Home"
            to="/"
          />

          <NavItem
            icon={<Users size={18} />}
            title="Employee"
            to="/employee"
          />

          <NavItem
            icon={<BarChart3 size={18} />}
            title="HR Console"
            to="/hr"
          />

          <NavItem
            icon={<Settings size={18} />}
            title="Settings"
            to="/settings"
          />

        </nav>

        {/* AUTH */}
        <div className="relative z-10">

          {user ? (

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#111111] border border-orange-500/10 hover:border-orange-500/25 text-white transition-all duration-300 hover:bg-[#161616]"
            >

              <LogOut size={18} />

              Logout

            </button>

          ) : (

            <Link
              to="/login"
              className="flex items-center gap-3 px-7 py-3 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff922d] text-white font-semibold transition-all duration-300 hover:scale-105 shadow-[0_0_35px_rgba(255,122,0,0.18)]"
            >

              <LogIn size={18} />

              Sign In

            </Link>

          )}

        </div>

      </div>

    </header>

  )
}

const NavItem = ({
  icon,
  title,
  to,
}) => {

  return (

    <NavLink
      to={to}
      className={({ isActive }) =>

        `flex items-center gap-3 text-[16px] font-medium transition-all duration-300 ${
          isActive

            ? 'text-white'

            : 'text-gray-400 hover:text-orange-300'
        }`
      }
    >

      {icon}

      <span>
        {title}
      </span>

    </NavLink>

  )
}

export default Navbar