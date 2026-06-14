import Navbar from '../components/common/navbar'
import Footer from '../components/common/Footer'

const MainLayout = ({ children }) => {

  return (

    <div className="min-h-screen bg-[#030303] text-white overflow-hidden relative">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,120,0,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(255,120,0,0.05),transparent_25%)] pointer-events-none" />

      <Navbar />

      <main className="relative z-10 pt-36 px-6 lg:px-12">

        {children}

      </main>

      <Footer />

    </div>

  )
}

export default MainLayout