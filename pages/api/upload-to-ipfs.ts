import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fetch from 'node-fetch'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form data' })
    }

    const file = files.file as formidable.File
    if (!file) {
      return res.status(400).json({ error: 'No file provided' })
    }

    try {
      const formData = new FormData()
      formData.append('file', fs.createReadStream(file.filepath))

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.JWT_SECRET_ACCESS_TOKEN}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`)
      }

      const data = await response.json()
      
      res.status(200).json({
        ipfsHash: data.IpfsHash,
        url: `${process.env.GATEWAY_URL}/ipfs/${data.IpfsHash}`
      })
    } catch (error) {
      console.error('Error uploading to IPFS:', error)
      res.status(500).json({ error: 'Failed to upload to IPFS' })
    }
  })
}