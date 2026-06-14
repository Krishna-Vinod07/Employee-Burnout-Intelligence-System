import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'

import EmployeeDashboard from './pages/EmployeeDashboard'
import EmployeeAnalytics from './pages/EmployeeAnalytics'

import HRDashboard from './pages/HRDashboard'

import Login from './pages/Login'
import Register from './pages/Register'

import Insights from './pages/Insights'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import EmployeeProfile from './pages/EmployeeProfile'

import Employees from './pages/hr/Employees'
import Analytics from './pages/hr/Analytics'
import Forecasting from './pages/hr/Forecasting'
import Interventions from './pages/hr/Interventions'
import Reports from './pages/hr/Reports'
import EmployeeDetails from './pages/hr/EmployeeDetails'
import UpdateMood from './pages/UpdateMood'

import ProtectedRoute from './components/auth/ProtectedRoute'

import useActivityTracker from './hooks/useActivityTracker'

function App() {

  // ACTIVITY TRACKER
  useActivityTracker()

  return (

    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* EMPLOYEE DASHBOARD */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRole="employee">

            <EmployeeDashboard />

          </ProtectedRoute>
        }
      />

      {/* EMPLOYEE ANALYTICS */}
      <Route
        path="/employee-analytics"
        element={
          <ProtectedRoute allowedRole="employee">

            <EmployeeAnalytics />

          </ProtectedRoute>
        }
      />

      {/* HR DASHBOARD */}
      <Route
        path="/hr"
        element={
          <ProtectedRoute allowedRole="hr">

            <HRDashboard />

          </ProtectedRoute>
        }
      />

      {/* HR EMPLOYEES */}
      <Route
        path="/hr/employees"
        element={
          <ProtectedRoute allowedRole="hr">

            <Employees />

          </ProtectedRoute>
        }
      />

      {/* HR ANALYTICS */}
      <Route
        path="/hr/analytics"
        element={
          <ProtectedRoute allowedRole="hr">

            <Analytics />

          </ProtectedRoute>
        }
      />

      {/* HR FORECASTING */}
      <Route
        path="/hr/forecasting"
        element={
          <ProtectedRoute allowedRole="hr">

            <Forecasting />

          </ProtectedRoute>
        }
      />

      {/* HR INTERVENTIONS */}
      <Route
        path="/hr/interventions"
        element={
          <ProtectedRoute allowedRole="hr">

            <Interventions />

          </ProtectedRoute>
        }
      />

      {/* HR REPORTS */}
      <Route
        path="/hr/reports"
        element={
          <ProtectedRoute allowedRole="hr">

            <Reports />

          </ProtectedRoute>
        }
      />

      {/* INSIGHTS */}
      <Route
        path="/insights"
        element={<Insights />}
      />

      {/* NOTIFICATIONS */}
      <Route
        path="/notifications"
        element={<Notifications />}
      />

      {/* SETTINGS */}
      <Route
        path="/settings"
        element={<Settings />}
      />

      {/* PROFILE */}
      <Route
        path="/profile"
        element={<EmployeeProfile />}
      />

      {/* MOOD */}
      <Route
        path="/mood"
        element={<UpdateMood />}
      />
      <Route
  path="/hr/employee/:id"
  element={
    <ProtectedRoute allowedRole="hr">
      <EmployeeDetails />
    </ProtectedRoute>
  }
/>

    </Routes>

  )
}

export default App