'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { useWeb3 } from '@/contexts/Web3Context'
import { DYNAMICNFT_CONTRACT_ADDRESS } from '@/config/addresses'
import { Upload, Sun, Moon, Loader2 } from 'lucide-react'
import { ipfsHashToTokenId, tokenIdToIpfsHash } from '@/utils/ipfsHashConverter';
import { uploadImageToIPFS } from '@/utils/ipfsUtils';
import Image from 'next/image'

// Global Royalty Rate Limits
const globalMinRate = 500 // 5% minimum rate
const globalMaxRate = 2000 // 20% maximum rate

export default function CreateNFTPage() {
  const { DynamicNFTContract, RoyaltyContract, account } = useWeb3()
  const [image, setImage] = useState(null)
  const [ipfsHash, setIpfsHash] = useState('')
  const [royalty, setRoyalty] = useState({
    baseRate: 1000,
    minRate: 500,
    maxRate: 2500,
    volumeMultiplier: 10,
    timeDecayFactor: 86400,//1 day
    beneficiary: '',
    lastUpdateTime: 0,
    useMarketMetrics: true,
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const [isMinted, setIsMinted] = useState(false)
  const [mintedTokenId, setMintedTokenId] = useState(null)
  
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    setMounted(true)
    if (account) {
      setRoyalty(prev => ({ ...prev, beneficiary: account }))
    }
  }, [DynamicNFTContract, RoyaltyContract, account])

  if (!mounted) return null

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setImage(file);
    setUploadingImage(true);
    setError('');
    
    try {
      const { ipfsHash, url } = await uploadImageToIPFS(file);
      
      setIpfsHash(ipfsHash);
      setPreviewImage(url);
      setSuccess('Image uploaded successfully to IPFS!');
      
    } catch (err) {
      console.error('Error uploading to IPFS:', err);
      setError('Error uploading to IPFS: ' + err.message);
      setPreviewImage('');
      setIpfsHash('');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleMintNFT = async () => {
    setLoading(true);
    try {
      if (!DynamicNFTContract) throw new Error('Contract not initialized');
      
      const tokenId = ipfsHashToTokenId(ipfsHash);
      const tx = await DynamicNFTContract.methods.mint(account, tokenId).send({ from: account });
      
      setSuccess('NFT minted successfully!');
      setIsMinted(true);
      setMintedTokenId(tokenId);
      
      const hashMapping = JSON.parse(localStorage.getItem('ipfsHashMapping') || '{}');
      hashMapping[tokenId] = ipfsHash;
      localStorage.setItem('ipfsHashMapping', JSON.stringify(hashMapping));
      
    } catch (err) {
      setError('Error minting NFT: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetRoyalty = async () => {
    if (!isMinted) {
      setError('Please mint the NFT before setting the royalty configuration.')
      return
    }

    setLoading(true)
    try {
      if (!RoyaltyContract) throw new Error('Contract not initialized')
      const royaltyConfig = {
        ...royalty,
        baseRate: Math.floor(royalty.baseRate),
        minRate: Math.floor(royalty.minRate),
        maxRate: Math.floor(royalty.maxRate),
      }
      const tx = await RoyaltyContract.methods.setRoyaltyConfig(DYNAMICNFT_CONTRACT_ADDRESS, mintedTokenId, royaltyConfig).send({ from: account })
      setSuccess('Royalty configuration set successfully!')
    } catch (err) {
      setError('Error setting royalty configuration: ' + err.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95 dark:border-gray-800">
        <div className="container flex items-center justify-between h-16 px-4">
          <h1 className="text-2xl font-bold dark:text-white">Create Your NFT</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="flex-1 container px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Upload Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center w-full">
                <Label 
                  htmlFor="dropzone-file" 
                  className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 relative ${uploadingImage ? 'pointer-events-none' : ''}`}
                >
                  {uploadingImage ? (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Uploading to IPFS...</p>
                    </div>
                  ) : !previewImage ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="object-contain max-h-full max-w-full p-2"
                      />
                    </div>
                  )}
                  <Input 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </Label>
              </div>
              {ipfsHash && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  IPFS Hash: {ipfsHash}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Set Royalty Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baseRate" className="dark:text-gray-200">Base Royalty Rate</Label>
                <Slider
                  id="baseRate"
                  min={globalMinRate}
                  max={globalMaxRate}
                  step={10}
                  value={[royalty.baseRate]}
                  onValueChange={(value) => setRoyalty({ ...royalty, baseRate: value[0] })}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">{(royalty.baseRate / 100).toFixed(2)}%</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="minRate" className="dark:text-gray-200">Minimum Royalty Rate</Label>
                <Slider
                  id="minRate"
                  min={globalMinRate}
                  max={royalty.baseRate}
                  step={10}
                  value={[royalty.minRate]}
                  onValueChange={(value) => setRoyalty({ ...royalty, minRate: value[0] })}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">{(royalty.minRate / 100).toFixed(2)}%</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxRate" className="dark:text-gray-200">Maximum Royalty Rate</Label>
                <Slider
                  id="maxRate"
                  min={royalty.baseRate}
                  max={globalMaxRate}
                  step={10}
                  value={[royalty.maxRate]}
                  onValueChange={(value) => setRoyalty({ ...royalty, maxRate: value[0] })}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">{(royalty.maxRate / 100).toFixed(2)}%</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="beneficiary" className="dark:text-gray-200">Beneficiary Address</Label>
                <Input
                  id="beneficiary"
                  value={royalty.beneficiary}
                  onChange={(e) => setRoyalty({ ...royalty, beneficiary: e.target.value })}
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="useMarketMetrics"
                  checked={royalty.useMarketMetrics}
                  onCheckedChange={(checked) => setRoyalty({ ...royalty, useMarketMetrics: checked })}
                />
                <Label htmlFor="useMarketMetrics" className="dark:text-gray-200">Use Market Metrics (Make your Royalty Dynamic with our Market Monitors)</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSetRoyalty} disabled={!isMinted || loading} className="w-full">
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Set Royalty Configuration'
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mt-6">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-center mt-12 space-x-4">
          <Button 
            size="lg" 
            onClick={handleMintNFT} 
            disabled={loading || !ipfsHash || isMinted || uploadingImage}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Minting...</span>
              </div>
            ) : isMinted ? (
              'NFT Minted'
            ) : (
              'Mint NFT'
            )}
          </Button>
          <Button size="lg" onClick={() => router.push('/listNFTs')} variant="outline">
            List Your NFTs
          </Button>
        </div>
      </main>
    </div>
  )
}