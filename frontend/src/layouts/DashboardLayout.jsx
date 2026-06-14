import Sidebar from '../components/dashboard/Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-mainGradient text-white flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-[280px] p-8 overflow-x-hidden">

        {children}

      </main>

    </div>
  )
}

export default DashboardLayout