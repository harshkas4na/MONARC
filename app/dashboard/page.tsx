'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bell, ChevronDown, DollarSign, Home, LineChart, Menu, Moon, PieChart, Settings, Sun, Users } from 'lucide-react'
// import { Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 278 },
  { name: 'May', value: 189 },
  { name: 'Jun', value: 239 },
  { name: 'Jul', value: 349 },
]

const recentActivity = [
  { hash: '0x1234...5678', amount: '0.5 ETH', timestamp: '2023-07-01 14:30', status: 'Completed' },
  { hash: '0x8765...4321', amount: '0.3 ETH', timestamp: '2023-07-01 13:45', status: 'Pending' },
  { hash: '0x9876...5432', amount: '0.7 ETH', timestamp: '2023-07-01 12:15', status: 'Completed' },
  { hash: '0x5432...7890', amount: '0.2 ETH', timestamp: '2023-07-01 11:30', status: 'Completed' },
]

export default function Dashboard() {
  const [royaltyRate, setRoyaltyRate] = useState(5)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            {/* Overview Section */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Collections</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 new this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Royalty Rate</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{royaltyRate}%</div>
                  <p className="text-xs text-muted-foreground">Average across all collections</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,450</div>
                  <p className="text-xs text-muted-foreground">To be processed in 24h</p>
                </CardContent>
              </Card>
            </div>

            {/* Royalty Management */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Royalty Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-64 h-64 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">{royaltyRate}%</span>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200 dark:text-gray-700 stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      ></circle>
                      <circle
                        className="text-blue-600 progress-ring stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray={`${royaltyRate * 2.51327} 251.327`}
                        strokeDashoffset="0"
                      ></circle>
                    </svg>
                  </div>
                  <div className="flex-1 ml-8">
                    <Label htmlFor="royalty-rate">Adjust Royalty Rate</Label>
                    <Slider
                      id="royalty-rate"
                      max={20}
                      step={0.1}
                      value={[royaltyRate]}
                      onValueChange={(value) => setRoyaltyRate(value[0])}
                      className="mb-4"
                    />
                    <div className="flex justify-between">
                      <Button>Save Changes</Button>
                      <Button variant="outline">Reset</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction Hash</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivity.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell>{activity.hash}</TableCell>
                        <TableCell>{activity.amount}</TableCell>
                        <TableCell>{activity.timestamp}</TableCell>
                        <TableCell>{activity.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis 
                        dataKey="name" 
                        stroke={theme === 'dark' ? "#fff" : "#000"}
                      />
                      <YAxis 
                        stroke={theme === 'dark' ? "#fff" : "#000"}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: theme === 'dark' ? "#333" : "#fff",
                          color: theme === 'dark' ? "#fff" : "#000",
                        }}
                      />
                      <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}