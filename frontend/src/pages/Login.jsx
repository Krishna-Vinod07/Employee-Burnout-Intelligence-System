import { useState } from 'react'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

import {
  ArrowLeft,
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react'

import { motion } from 'framer-motion'

import AuthLayout from '../components/auth/AuthLayout'

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  // HANDLE LOGIN
  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(formData),
        }
      )

      const data = await response.json()

      console.log(data)

      // SUCCESS
      if (data.status === 'success') {

        // SAVE USER
        localStorage.setItem(
          'user',
          JSON.stringify(data.user)
        )

        // ROLE BASED REDIRECT
        if (data.user.role === 'hr') {

          window.location.href = '/hr'

        } else {

          window.location.href = '/employee'

        }

      } else {

        alert(data.message)

      }

    } catch (error) {

      console.log(error)

      alert('Login failed')

    } finally {

      setLoading(false)

    }

  }

  return (

    <AuthLayout
      title="Welcome back"
      subtitle="Access your workforce intelligence dashboard."
    >

      {/* BACK BUTTON */}
      <div className="mb-10">

        <Link
          to="/"
          className="inline-flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-all duration-300 group"
        >

          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-all duration-300"
          />

          <span className="tracking-wide font-medium">

            Back to Home

          </span>

        </Link>

      </div>

      {/* FORM */}
      <motion.form
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
        onSubmit={handleLogin}
        className="space-y-7"
      >

        {/* EMAIL */}
        <div>

          <label className="text-gray-300 font-medium tracking-wide">

            Email Address

          </label>

          <div className="relative mt-3">

            <Mail
              size={19}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-400"
            />

            <input
              type="email"
              name="email"
              placeholder="alex@company.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full glass rounded-2xl pl-14 pr-5 py-5 bg-[#0d0d0d] border border-white/5 focus:border-orange-500/20 focus:bg-[#111111] outline-none transition-all duration-300 text-white placeholder:text-gray-500"
              required
            />

          </div>

        </div>

        {/* PASSWORD */}
        <div>

          <label className="text-gray-300 font-medium tracking-wide">

            Password

          </label>

          <div className="relative mt-3">

            <Lock
              size={19}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-400"
            />

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full glass rounded-2xl pl-14 pr-5 py-5 bg-[#0d0d0d] border border-white/5 focus:border-orange-500/20 focus:bg-[#111111] outline-none transition-all duration-300 text-white placeholder:text-gray-500"
              required
            />

          </div>

        </div>

        {/* OPTIONS */}
        <div className="flex items-center justify-between pt-1">

          <label className="flex items-center gap-3 text-gray-400 text-sm">

            <input
              type="checkbox"
              className="accent-orange-500 w-4 h-4"
            />

            <span className="tracking-wide">

              Remember me

            </span>

          </label>

          <button
            type="button"
            className="text-orange-400 hover:text-orange-300 transition-all duration-300 font-medium"
          >

            Forgot password?

          </button>

        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          type="submit"
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff8c1a] text-lg font-semibold transition-all duration-300 shadow-[0_0_35px_rgba(255,122,0,0.18)] flex items-center justify-center gap-3"
        >

          {loading ? (

            'Signing in...'

          ) : (

            <>
              Sign In
              <ArrowRight size={20} />
            </>

          )}

        </motion.button>

        {/* FOOTER */}
        <p className="text-center text-gray-400 pt-3">

          Don&apos;t have an account?{' '}

          <Link
            to="/register"
            className="text-orange-400 hover:text-orange-300 font-medium transition-all duration-300"
          >

            Create one

          </Link>

        </p>

      </motion.form>

    </AuthLayout>

  )
}

export default Login