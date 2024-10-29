'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { BarChart, LineChart, PieChart } from '@/components/ui/chart'
import { ArrowDown, ArrowUp, Download, Moon, Sun, Users } from 'lucide-react'

const kpiData = [
  { title: "Total Volume", value: "$12.5M", change: 15.2 },
  { title: "Average Royalty", value: "7.8%", change: -2.5 },
  { title: "Unique Collectors", value: "5,234", change: 8.1 },
  { title: "Active Listings", value: "12,456", change: 3.7 },
]

const lineChartData = [
  { name: 'Jan', Earnings: 4000 },
  { name: 'Feb', Earnings: 3000 },
  { name: 'Mar', Earnings: 5000 },
  { name: 'Apr', Earnings: 4500 },
  { name: 'May', Earnings: 6000 },
  { name: 'Jun', Earnings: 5500 },
]

const barChartData = [
  { name: 'Collection A', value: 400 },
  { name: 'Collection B', value: 300 },
  { name: 'Collection C', value: 200 },
  { name: 'Collection D', value: 278 },
  { name: 'Collection E', value: 189 },
]

const pieChartData = [
  { name: 'Ethereum', value: 400 },
  { name: 'Polygon', value: 300 },
  { name: 'Solana', value: 300 },
]

export default function AnalyticsDashboard() {
  const [selectedMetric, setSelectedMetric] = useState("volume")
  const [dateRange, setDateRange] = useState("last7days")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="container mx-auto px-4 py-8 bg-background dark:bg-gray-900 transition-colors duration-300">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Analytics Dashboard</h1>
        
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-gray-200">{kpi.title}</CardTitle>
              {kpi.change > 0 ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white">{kpi.value}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">
                {kpi.change > 0 ? '+' : ''}{kpi.change}% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Earnings Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <LineChart
              data={lineChartData}
              index="name"
              categories={["Earnings"]}
              colors={["blue"]}
              yAxisWidth={40}
              className="h-[300px]"
            /> */}
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Collection Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <BarChart
              data={barChartData}
              index="name"
              categories={["value"]}
              colors={["blue"]}
              yAxisWidth={40}
              className="h-[300px]"
            /> */}
          </CardContent>
        </Card>
      </div>
      <Card className="mb-8 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="dark:text-white">Revenue Distribution by Chain</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <PieChart
            data={pieChartData}
            index="name"
            categories={["value"]}
            colors={["sky", "indigo", "violet"]}
            className="h-[300px]"
          /> */}
        </CardContent>
      </Card>

      {/* Custom Reports */}
      <Card className="mb-8 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="dark:text-white">Custom Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="metric" className="dark:text-gray-200">Metric</Label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger id="metric" className="dark:bg-gray-700 dark:text-white">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700">
                  <SelectItem value="volume">Volume</SelectItem>
                  <SelectItem value="royalties">Royalties</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date-range" className="dark:text-gray-200">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger id="date-range" className="dark:bg-gray-700 dark:text-white">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700">
                  <SelectItem value="last7days">Last 7 days</SelectItem>
                  <SelectItem value="last30days">Last 30 days</SelectItem>
                  <SelectItem value="last3months">Last 3 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">Generate Report</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Updates */}
      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="dark:text-white">Real-time Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transactions">
            <TabsList className="dark:bg-gray-700">
              <TabsTrigger value="transactions" className="dark:text-gray-200 dark:data-[state=active]:bg-gray-600">Transactions</TabsTrigger>
              <TabsTrigger value="listings" className="dark:text-gray-200 dark:data-[state=active]:bg-gray-600">New Listings</TabsTrigger>
              <TabsTrigger value="alerts" className="dark:text-gray-200 dark:data-[state=active]:bg-gray-600">Alerts</TabsTrigger>
            </TabsList>
            <TabsContent value="transactions">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between border-b dark:border-gray-700 pb-2">
                    <div>
                      <p className="font-medium dark:text-white">NFT #1234 sold</p>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">0.5 ETH • 2 mins ago</p>
                    </div>
                    <Users className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="listings">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between border-b dark:border-gray-700 pb-2">
                    <div>
                      <p className="font-medium dark:text-white">New listing: Cosmic Voyage #42</p>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">Listed for 2 ETH • 5 mins ago</p>
                    </div>
                    <Users className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="alerts">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between border-b dark:border-gray-700 pb-2">
                    <div>
                      <p className="font-medium dark:text-white">High value sale alert</p>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">NFT #5678 sold for 10 ETH • 10 mins ago</p>
                    </div>
                    <Users className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}