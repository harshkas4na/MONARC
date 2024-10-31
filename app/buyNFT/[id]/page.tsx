import { Suspense } from 'react'
import BuyNFTClient from './BuyNFTClient'

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function BuyNFTPage({ params, searchParams }: PageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuyNFTClient id={params.id} />
    </Suspense>
  )
}

// Add these type definitions for Next.js
export interface GenerateMetadataProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: GenerateMetadataProps) {
  // You can add metadata generation logic here if needed
  return {
    title: `Buy NFT #${params.id}`,
  }
}