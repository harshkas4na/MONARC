'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { ethers } from 'ethers'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useWeb3 } from '@/contexts/Web3Context'
import { DYNAMICNFT_CONTRACT_ADDRESS } from '@/config/addresses'
import { Skeleton } from '@/components/ui/skeleton'
import { formatTokenId, tokenIdToIpfsHash } from '@/utils/ipfsHashConverter'

const ListNFTPage = () => {
  const [nfts, setNfts] = useState([])
  const [selectedNft, setSelectedNft] = useState(null)
  const [isListed, setIsListed] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { DynamicNFTContract, account } = useWeb3()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const getImageUrl = (tokenId) => {
    try {
      const ipfsHash = tokenIdToIpfsHash(tokenId)
      return `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${ipfsHash}`
    } catch (err) {
      console.error('Error converting tokenId to IPFS hash:', err)
      return ''
    }
  }

  const fetchUserNFTs = async () => {
    try {
      setLoading(true)
      const balance = Number(await DynamicNFTContract.methods.balanceOf(account).call());
      const userNfts = []
      for (let i = 0; i < balance; i++) {
        const tokenId = await DynamicNFTContract.methods.tokenOfOwnerByIndex(account, i).call();
        console.log(tokenId);
        const imageUrl = getImageUrl(tokenId)
        console.log(imageUrl);
        userNfts.push({ 
          tokenId: tokenId.toString(), 
          imageUrl,
          // Keep tokenURI for backwards compatibility
          tokenURI: imageUrl 
        })
      }
      setNfts(userNfts)
    } catch (err) {
      setError('Error fetching user NFTs: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchUserNFTs()
  },[DynamicNFTContract, account])

  if (!mounted) return null

  const handleSelectNFT = async (nft) => {
    setSelectedNft(nft)
    try {
      const isListed = await DynamicNFTContract.methods.isTokenListed(nft.tokenId).call();
      setIsListed(isListed)
    } catch (err) {
      setError('Error checking NFT listing status: ' + err.message)
    }
  }

  const handleListNFT = async () => {
    setLoading(true)
    try {
      if (!selectedNft) return;
      const tx = await DynamicNFTContract.methods.listToken(selectedNft.tokenId,1).send(
        { from: account }
      );     
      
      setSuccess('NFT listed successfully!')
      setIsListed(true)
    } catch (err) {
      setError('Error listing NFT: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUnlistNFT = async () => {
    setLoading(true)
    try {
      const tx = await DynamicNFTContract.methods.unlistToken(selectedNft.tokenId).send(
        { from: account }
      )
    
      setSuccess('NFT unlisted successfully!')
      setIsListed(false)
    } catch (err) {
      setError('Error unlisting NFT: ' + err.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95 dark:border-gray-800">
        <div className="container flex items-center justify-between h-16 px-4">
          <h1 className="text-2xl font-bold dark:text-white">List or Unlist Your NFTs</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(6).fill(0).map((_, index) => (
              <Card key={index} className="dark:bg-gray-800">
                <CardHeader>
                  <Skeleton className="h-4 w-[250px]" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[200px] w-full" />
                </CardContent>
              </Card>
            ))
          ) : nfts.length > 0 ? (
            nfts.map((nft) => (
              <Card
                key={nft.tokenId}
                className={`dark:bg-gray-800 transition-all hover:scale-105 cursor-pointer ${
                  selectedNft && selectedNft.tokenId === nft.tokenId
                    ? 'ring-2 ring-primary'
                    : ''
                }`}
                onClick={() => handleSelectNFT(nft)}
              >
                <CardHeader>
                  <CardTitle className="dark:text-white">
                    NFT #{formatTokenId(nft.tokenId)}
                    
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                    <img
                      src={nft.imageUrl}
                      alt={`NFT #${formatTokenId(nft.tokenId)}`}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.src = 'https://violet-defiant-kite-65.mypinata.cloud/ipfs/QmZdDAvqRJxENdcbLERhxBepfTqWM7y1DdDKxKiWTjctRt'
                        e.target.onerror = null
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground dark:text-gray-400">
              No NFTs found. Mint some NFTs first!
            </p>
          )}
        </div>

        {selectedNft && (
          <Card className="mt-8 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">
                Selected NFT: #{formatTokenId(selectedNft.tokenId)}
                <span className="text-xs text-gray-500 ml-2">
                  ({selectedNft.tokenId})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-24 overflow-hidden rounded-lg">
                  <img
                    src={selectedNft.imageUrl}
                    alt={`Selected NFT #${formatTokenId(selectedNft.tokenId)}`}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.src = 'https://violet-defiant-kite-65.mypinata.cloud/ipfs/QmZdDAvqRJxENdcbLERhxBepfTqWM7y1DdDKxKiWTjctRt'
                      e.target.onerror = null
                    }}
                  />
                </div>
                <p className="dark:text-gray-300">
                  Status: {isListed ? 'Listed' : 'Not Listed'}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              {!isListed ? (
                <Button
                  className="w-full"
                  onClick={handleListNFT}
                  disabled={loading}
                >
                  List on Kopli and Sepolia
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleUnlistNFT}
                  disabled={loading}
                >
                  Unlist from Kopli and Sepolia
                </Button>
              )}
            </CardFooter>
          </Card>
        )}

        {success && (
          <Alert variant="default" className="mt-6">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Card className="mt-8 dark:bg-gray-800">
          <CardContent>
            <p className="text-center text-muted-foreground pt-10 pb-6 font-bold text-xl dark:text-gray-400">
              Note: Listing or unlisting your NFTs will automatically update the listings on both the Kopli and Sepolia networks with REACTIVE NETWORK AUTOMATION.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default ListNFTPage