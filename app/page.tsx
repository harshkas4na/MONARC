"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, BarChart2, Coins, Shield, Zap } from "lucide-react"
import Link from 'next/link';
import { useTheme } from 'next-themes';



export default function App() {
  const [mounted, setMounted] = useState(false)
  // const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
 

  return (      
      <div className="flex flex-col min-h-screen dark:bg-gray-900 transition-colors duration-300">
    
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Dynamic NFT Royalties
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Revolutionize your NFT earnings with our advanced royalty management platform.
                </p>
              </div>
              <div className="space-x-4">

                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                  <Link href="/createNFT">
                    Create Your Own NFT
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          {/* Abstract shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full opacity-20 animate-blob"></div>
            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 dark:text-white">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Coins, title: "Dynamic Royalties", description: "Adjust royalty rates in real-time based on market conditions." },
                { icon: Shield, title: "Secure Transactions", description: "Blockchain-backed security for all your NFT transactions." },
                { icon: BarChart2, title: "Advanced Analytics", description: "Gain insights into your NFT performance and royalty earnings." },
                { icon: Zap, title: "Instant Payouts", description: "Receive your royalties instantly with our automated system." },
              ].map((feature, index) => (
                <Card key={index} className="p-6 space-y-2 transition-all hover:scale-105 dark:bg-gray-700 dark:text-white">
                  <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-300">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section id="stats" className="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-900 transition-colors duration-300">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
              {[
                { value: "$10M+", label: "Total Volume" },
                { value: "50K+", label: "NFTs Managed" },
                { value: "1000+", label: "Active Creators" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 text-center">
                  <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">{stat.value}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 dark:text-white">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
              {[
                { step: 1, title: "Connect Wallet", description: "Link your crypto wallet to our platform." },
                { step: 2, title: "Create Collection", description: "Set up your NFT collection with custom royalty rules." },
                { step: 3, title: "Manage Royalties", description: "Adjust rates and view real-time earnings." },
                { step: 4, title: "Receive Payouts", description: "Get paid automatically for every sale and resale." },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold dark:text-white">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
                  {index < 3 && <ArrowRight className="h-6 w-6 text-blue-600 mt-4 hidden lg:block" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Revolutionize Your NFT Earnings?</h2>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                Join thousands of creators who are already benefiting from our dynamic royalty system.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              <Link href="/createNFT">
              Get Started Now
                  </Link>
                
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-gray-800 text-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <p className="text-sm">© 2024 NFT Royalty System. All rights reserved.</p>
            <nav className="flex space-x-4">
              <Link href="#" className="hover:underline">Privacy Policy</Link>
              <Link href="#" className="hover:underline">Terms of Service</Link>
              <Link href="#" className="hover:underline">Contact Us</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
   
  );
}