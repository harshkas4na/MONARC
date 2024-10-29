'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, Grid, List, Moon, Search, Sun } from 'lucide-react'

const nfts = [
  { id: 1, title: "Cosmic Voyage #1", price: "0.5 ETH", royalty: "10%", creator: "0x1234...5678", image: "/placeholder.svg?height=400&width=400" },
  { id: 2, title: "Digital Dreams #42", price: "0.8 ETH", royalty: "7.5%", creator: "0x8765...4321", image: "/placeholder.svg?height=400&width=400" },
  { id: 3, title: "Neon Nights #7", price: "1.2 ETH", royalty: "5%", creator: "0x2468...1357", image: "/placeholder.svg?height=400&width=400" },
  { id: 4, title: "Pixel Paradise #13", price: "0.3 ETH", royalty: "12%", creator: "0x1357...2468", image: "/placeholder.svg?height=400&width=400" },
  { id: 5, title: "Ethereal Echoes #21", price: "2.0 ETH", royalty: "8%", creator: "0x3691...2580", image: "/placeholder.svg?height=400&width=400" },
  { id: 6, title: "Quantum Quests #99", price: "1.5 ETH", royalty: "6%", creator: "0x1470...2580", image: "/placeholder.svg?height=400&width=400" },
]

const collections = [
  { id: 1, name: "Cosmic Voyage", volume: "100 ETH", floorPrice: "0.5 ETH", owners: 500, items: 1000 },
  { id: 2, name: "Digital Dreams", volume: "75 ETH", floorPrice: "0.3 ETH", owners: 300, items: 500 },
  { id: 3, name: "Neon Nights", volume: "50 ETH", floorPrice: "0.2 ETH", owners: 200, items: 300 },
]

export default function Marketplace() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = useState([0, 5])
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
      {/* Header Section */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95 dark:border-gray-800">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center flex-1">
            <Input
              type="search"
              placeholder="Search NFTs..."
              className="w-full max-w-sm mr-4"
            />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="recent">Recently Added</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setViewMode('grid')}>
              <Grid className={`h-4 w-4 ${viewMode === 'grid' ? 'text-primary' : 'text-muted-foreground'}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setViewMode('list')}>
              <List className={`h-4 w-4 ${viewMode === 'list' ? 'text-primary' : 'text-muted-foreground'}`} />
            </Button>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="polygon">Polygon</SelectItem>
                <SelectItem value="solana">Solana</SelectItem>
              </SelectContent>
            </Select>
            
          </div>
        </div>
      </header>

      <div className="flex-1 container px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <div>
              <h3 className="font-semibold mb-2 dark:text-gray-200">Price Range</h3>
              <Slider
                min={0}
                max={5}
                step={0.1}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2 dark:text-gray-300">
                <span>{priceRange[0]} ETH</span>
                <span>{priceRange[1]} ETH</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 dark:text-gray-200">Collections</h3>
              {collections.map((collection) => (
                <div key={collection.id} className="flex items-center space-x-2">
                  <Checkbox id={`collection-${collection.id}`} />
                  <Label htmlFor={`collection-${collection.id}`} className="dark:text-gray-300">{collection.name}</Label>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-semibold mb-2 dark:text-gray-200">Chains</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="ethereum" />
                  <Label htmlFor="ethereum" className="dark:text-gray-300">Ethereum</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="polygon" />
                  <Label htmlFor="polygon" className="dark:text-gray-300">Polygon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="solana" />
                  <Label htmlFor="solana" className="dark:text-gray-300">Solana</Label>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 dark:text-gray-200">Royalty Rates</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="royalty-0-5" />
                  <Label htmlFor="royalty-0-5" className="dark:text-gray-300">0-5%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="royalty-5-10" />
                  <Label htmlFor="royalty-5-10" className="dark:text-gray-300">5-10%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="royalty-10-plus" />
                  <Label htmlFor="royalty-10-plus" className="dark:text-gray-300">10%+</Label>
                </div>
              </div>
            </div>
            <Button className="w-full">Clear All Filters</Button>
          </aside>

          {/* NFT Grid */}
          <main className="flex-1">
            {/* Collection Stats */}
            <div className="mb-8 overflow-x-auto">
              <div className="inline-flex min-w-full">
                {collections.map((collection) => (
                  <Card key={collection.id} className="w-72 mr-4 shrink-0 dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="dark:text-gray-100">{collection.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm dark:text-gray-300">
                        <div>Volume:</div>
                        <div className="font-semibold">{collection.volume}</div>
                        <div>Floor Price:</div>
                        <div className="font-semibold">{collection.floorPrice}</div>
                        <div>Owners:</div>
                        <div className="font-semibold">{collection.owners}</div>
                        <div>Items:</div>
                        <div className="font-semibold">{collection.items}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* NFT Grid/List */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {nfts.map((nft) => (
                <Card key={nft.id} className={`${viewMode === 'list' ? 'flex' : ''} dark:bg-gray-800`}>
                  <div className={viewMode === 'list' ? 'w-1/3' : ''}>
                    <img
                      src={nft.image}
                      alt={nft.title}
                      className="w-full h-auto object-cover aspect-square rounded-t-lg"
                    />
                  </div>
                  <div className={viewMode === 'list' ? 'w-2/3' : ''}>
                    <CardHeader>
                      <CardTitle className="dark:text-gray-100">{nft.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2 dark:text-gray-400">Creator: {nft.creator}</p>
                      <p className="font-semibold dark:text-gray-200">Price: {nft.price}</p>
                      <p className="text-sm dark:text-gray-300">Royalty: {nft.royalty}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Buy Now</Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}