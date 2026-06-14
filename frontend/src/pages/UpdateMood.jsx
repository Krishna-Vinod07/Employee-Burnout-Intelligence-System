import { useState } from 'react'

import DashboardLayout from '../layouts/DashboardLayout'

const UpdateMood = () => {

  const user = JSON.parse(
    localStorage.getItem('user')
  )

  const [formData, setFormData] = useState({

    mood: 'Focused',
    stress: 50,
    energy: 50,
    sleep: 7,
    workload: 50,

  })

  const [loading, setLoading] = useState(false)

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/mood/add`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({

            userId: user.id,

            mood: formData.mood,

            stress: Number(formData.stress),

            energy: Number(formData.energy),

            sleep: Number(formData.sleep),

            workload: Number(formData.workload),

          }),
        }
      )

      const data = await response.json()

      if (data.status === 'success') {

        alert('Wellness updated successfully')

      } else {

        alert(data.message)

      }

    } catch (error) {

      console.log(error)

      alert('Failed to update wellness')

    } finally {

      setLoading(false)

    }

  }

  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="glass rounded-[40px] p-10 border border-orange-500/10">

        <p className="text-orange-400 uppercase tracking-[4px] font-semibold">

          Wellness Update

        </p>

        <h1 className="text-6xl font-black mt-6 leading-tight">

          Daily Mood Check-In

        </h1>

        <p className="text-gray-400 text-xl mt-6 max-w-4xl leading-relaxed">

          Update your emotional wellness,
          workload intensity,
          sleep recovery,
          and energy patterns.

        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="glass rounded-[40px] p-10 mt-12 border border-white/5"
      >

        <div className="grid lg:grid-cols-2 gap-10">

          {/* MOOD */}
          <div>

            <label className="text-gray-300 text-lg">

              Current Mood

            </label>

            <select
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              className="w-full mt-4 bg-[#0b0b0b] border border-white/10 rounded-2xl px-6 py-5 outline-none text-white"
            >

              <option>Focused</option>

              <option>Happy</option>

              <option>Tired</option>

              <option>Burned Out</option>

              <option>Motivated</option>

              <option>Stressed</option>

            </select>

          </div>

          {/* SLEEP */}
          <div>

            <label className="text-gray-300 text-lg">

              Sleep Hours

            </label>

            <input
              type="number"
              name="sleep"
              min="1"
              max="12"
              value={formData.sleep}
              onChange={handleChange}
              className="w-full mt-4 bg-[#0b0b0b] border border-white/10 rounded-2xl px-6 py-5 outline-none text-white"
            />

          </div>

        </div>

        {/* SLIDERS */}
        <div className="mt-14 space-y-12">

          {/* STRESS */}
          <SliderInput
            label="Stress Level"
            name="stress"
            value={formData.stress}
            onChange={handleChange}
            color="orange"
          />

          {/* ENERGY */}
          <SliderInput
            label="Energy Level"
            name="energy"
            value={formData.energy}
            onChange={handleChange}
            color="green"
          />

          {/* WORKLOAD */}
          <SliderInput
            label="Workload Intensity"
            name="workload"
            value={formData.workload}
            onChange={handleChange}
            color="red"
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="mt-14 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff8c1a] text-white text-lg font-semibold hover:scale-[1.02] duration-300"
        >

          {loading
            ? 'Saving Update...'
            : 'Save Wellness Update'}

        </button>

      </form>

    </DashboardLayout>

  )
}

/* SLIDER */
const SliderInput = ({
  label,
  name,
  value,
  onChange,
}) => {

  return (

    <div>

      <div className="flex items-center justify-between mb-5">

        <p className="text-xl font-semibold">

          {label}

        </p>

        <p className="text-orange-400 text-2xl font-black">

          {value}%

        </p>

      </div>

      <input
        type="range"
        min="0"
        max="100"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full accent-orange-500"
      />

    </div>

  )
}

export default UpdateMood