import { useEffect, useState } from 'react'

const useActivityTracker = () => {

  const [activityCount, setActivityCount] = useState(0)

  const [idleMinutes, setIdleMinutes] = useState(0)

  const [activeMinutes, setActiveMinutes] = useState(0)

  const [sessionDuration, setSessionDuration] = useState(0)

  useEffect(() => {

    let idle = false

    let idleTimeout

    const handleActivity = () => {

      idle = false

      clearTimeout(idleTimeout)

      idleTimeout = setTimeout(() => {

        idle = true

      }, 60000)

    }

    const handleProductiveAction = () => {

      setActivityCount(prev => {

        if (prev >= 500) return prev

        return prev + 1

      })

      handleActivity()

    }

    window.addEventListener(
      'keydown',
      handleProductiveAction
    )

    window.addEventListener(
      'click',
      handleProductiveAction
    )

    window.addEventListener(
      'mousemove',
      handleActivity
    )

    const timer = setInterval(() => {

      setSessionDuration(prev => prev + 1)

      if (idle) {

        setIdleMinutes(prev => prev + 1)

      } else {

        setActiveMinutes(prev => prev + 1)

      }

    }, 60000)

    return () => {

      clearInterval(timer)

      clearTimeout(idleTimeout)

      window.removeEventListener(
        'keydown',
        handleProductiveAction
      )

      window.removeEventListener(
        'click',
        handleProductiveAction
      )

      window.removeEventListener(
        'mousemove',
        handleActivity
      )

    }

  }, [])

  useEffect(() => {

    const saveActivity = async () => {

      try {

        const user = JSON.parse(
          localStorage.getItem('user')
        )

        if (!user?.id) return

        await fetch(

          `${import.meta.env.VITE_API_URL}/api/activity/track`,

          {

            method: 'POST',

            headers: {

              'Content-Type': 'application/json'

            },

            body: JSON.stringify({

              userId: user.id,

              activeMinutes,

              idleMinutes,

              activityCount,

              sessionDuration

            })

          }

        )

      }

      catch (error) {

        console.log(
          'Activity save error:',
          error
        )

      }

    }

    const saveInterval = setInterval(

      saveActivity,

      300000

    )

    return () => clearInterval(
      saveInterval
    )

  }, [

    activeMinutes,
    idleMinutes,
    activityCount,
    sessionDuration

  ])

  return {

    activityCount,

    idleMinutes,

    activeMinutes,

    sessionDuration

  }

}

export default useActivityTracker