const Footer = () => {

  return (

    <footer className="mt-40 border-t border-white/10 pt-20 pb-10 overflow-hidden">

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>

            <h1 className="text-3xl md:text-4xl font-black">

              Burnout
              <span className="text-orange-400">
                AI
              </span>

            </h1>

            <p className="text-gray-400 mt-6 leading-relaxed max-w-sm">

              AI-powered workforce wellness intelligence
              platform for healthier, more productive teams.

            </p>

            {/* SOCIALS */}
            <div className="flex gap-4 mt-8">

              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer">

                G

              </div>

              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer">

                in

              </div>

              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer">

                X

              </div>

            </div>

          </div>

          {/* PLATFORM */}
          <div>

            <h2 className="text-2xl font-bold">

              Platform

            </h2>

            <div className="space-y-4 mt-8 text-gray-400">

              <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

                Analytics

              </p>

              <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

                Wellness Engine

              </p>

              <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

                Behavior Tracking

              </p>

              <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

                Forecasting

              </p>

            </div>

          </div>

          {/* COMPANY */}
          <div>

            <h2 className="text-2xl font-bold">

              Company

            </h2>

            <div className="space-y-4 mt-8 text-gray-400">

              <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

                About

              </p>

              <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

                Research

              </p>

              <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

                Careers

              </p>

              <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

                Contact

              </p>

            </div>

          </div>

          {/* RESOURCES */}
          <div>

            <h2 className="text-2xl font-bold">

              Resources

            </h2>

            <div className="space-y-4 mt-8 text-gray-400">

              <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

                Documentation

              </p>

              <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

                API Access

              </p>

              <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

                Security

              </p>

              <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

                Support

              </p>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-gray-500 text-center md:text-left">

            © 2026 BurnoutAI. All rights reserved.

          </p>

          <div className="flex flex-wrap justify-center gap-6 text-gray-500">

            <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

              Privacy Policy

            </p>

            <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

              Terms of Service

            </p>

            <p className="hover:text-orange-400 transition-all duration-300 cursor-pointer">

              Cookies

            </p>

          </div>

        </div>

      </div>

    </footer>

  )

}

export default Footer