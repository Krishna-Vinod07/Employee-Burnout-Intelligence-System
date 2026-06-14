import HRSidebar from '../components/hr/HRSidebar'

const HRLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-mainGradient text-white">

      <HRSidebar />

      <main className="ml-[280px] p-10">

        {children}

      </main>

    </div>
  )
}

export default HRLayout