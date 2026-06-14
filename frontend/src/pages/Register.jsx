import { useState } from 'react'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight,
  Building2,
} from 'lucide-react'

import { motion } from 'framer-motion'

import AuthLayout from '../components/auth/AuthLayout'

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    name: '',

    email: '',

    password: '',

    role: 'employee',

    department: '',

  })

  const [loading, setLoading] =
    useState(false)

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    })

  }

  // HANDLE REGISTER
  const handleRegister = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      const response = await fetch(

        'http://127.0.0.1:5000/api/auth/register',

        {

          method: 'POST',

          headers: {

            'Content-Type':
              'application/json',

          },

          body: JSON.stringify(
            formData
          ),

        }

      )

      const data =
        await response.json()

      console.log(data)

      // SUCCESS
      if (
        data.status === 'success'
      ) {

        alert(
          'Registration successful'
        )

        navigate('/login')

      }

      else {

        alert(data.message)

      }

    }

    catch (error) {

      console.log(error)

      alert(
        'Registration failed'
      )

    }

    finally {

      setLoading(false)

    }

  }

  return (

    <AuthLayout
      title="Create account"
      subtitle="Start using BurnoutAI workforce intelligence."
    >

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

        onSubmit={handleRegister}

        className="space-y-7"
      >

        {/* NAME */}
        <div>

          <label className="text-gray-300 font-medium tracking-wide">

            Full Name

          </label>

          <div className="relative mt-3">

            <User
              size={19}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-400"
            />

            <input
              type="text"
              name="name"
              placeholder="Alex Morgan"
              value={formData.name}
              onChange={handleChange}
              className="w-full glass rounded-2xl pl-14 pr-5 py-5 bg-[#0d0d0d] border border-white/5 focus:border-orange-500/20 focus:bg-[#111111] outline-none transition-all duration-300 text-white placeholder:text-gray-500"
              required
            />

          </div>

        </div>

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

        {/* ROLE */}
        <div>

          <label className="text-gray-300 font-medium tracking-wide">

            Select Role

          </label>

          <div className="relative mt-3">

            <ShieldCheck
              size={19}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-400 z-10"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full glass rounded-2xl pl-14 pr-5 py-5 bg-[#0d0d0d] border border-white/5 focus:border-orange-500/20 outline-none transition-all duration-300 text-white appearance-none"
            >

              <option
                value="employee"
                className="bg-[#0d0d0d]"
              >

                Employee

              </option>

              <option
                value="hr"
                className="bg-[#0d0d0d]"
              >

                HR Manager

              </option>

            </select>

          </div>

        </div>

        {/* DEPARTMENT */}
        <div>

          <label className="text-gray-300 font-medium tracking-wide">

            Department

          </label>

          <div className="relative mt-3">

            <Building2
              size={19}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-400 z-10"
            />

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full glass rounded-2xl pl-14 pr-5 py-5 bg-[#0d0d0d] border border-white/5 focus:border-orange-500/20 outline-none transition-all duration-300 text-white appearance-none"
              required
            >

              <option
                value=""
                className="bg-[#0d0d0d]"
              >

                Select Department

              </option>

              <option
                value="Engineering"
                className="bg-[#0d0d0d]"
              >

                Engineering

              </option>

              <option
                value="HR"
                className="bg-[#0d0d0d]"
              >

                HR

              </option>

              <option
                value="Marketing"
                className="bg-[#0d0d0d]"
              >

                Marketing

              </option>

              <option
                value="Finance"
                className="bg-[#0d0d0d]"
              >

                Finance

              </option>

              <option
                value="Operations"
                className="bg-[#0d0d0d]"
              >

                Operations

              </option>

              <option
                value="Design"
                className="bg-[#0d0d0d]"
              >

                Design

              </option>

              <option
                value="Sales"
                className="bg-[#0d0d0d]"
              >

                Sales

              </option>

            </select>

          </div>

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

            'Creating account...'

          ) : (

            <>

              Create Account

              <ArrowRight size={20} />

            </>

          )}

        </motion.button>

        {/* FOOTER */}
        <p className="text-center text-gray-400 pt-2">

          Already have an account?{' '}

          <Link
            to="/login"
            className="text-orange-400 hover:text-orange-300 font-medium transition-all duration-300"
          >

            Sign in

          </Link>

        </p>

      </motion.form>

    </AuthLayout>

  )
}

export default Register