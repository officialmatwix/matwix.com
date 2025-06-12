import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      <header className="border-b border-slate-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-10">
              <img src="/images/mwwhite.png" alt="Matwix Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-xl font-bold">Matwix</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Welcome to Matwix Quantum Network
            </h1>
            <p className="text-xl text-slate-300 mb-10">
              The next generation platform for network marketing and team building
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-slate-600 hover:bg-slate-800">
                  Explore Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-slate-900/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Quantum AI Insights",
                  description: "Advanced AI algorithms to optimize your network growth and team performance",
                },
                {
                  title: "Real-time Analytics",
                  description: "Comprehensive dashboards with real-time data on your team and commissions",
                },
                {
                  title: "Secure Transactions",
                  description: "State-of-the-art security for all your financial transactions and personal data",
                },
              ].map((feature, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
                  <h3 className="text-xl font-bold mb-3 text-purple-400">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-8 px-4 bg-black/50">
        <div className="container mx-auto text-center text-slate-400">
          <p>© 2023 Matwix Quantum Network. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
