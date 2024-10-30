import { Buffer } from 'buffer';

// Base58 character set used by IPFS
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

// Convert IPFS hash to uint256 (tokenId)
const ipfsHashToTokenId = (ipfsHash) => {
  if (!ipfsHash || typeof ipfsHash !== 'string') {
    throw new Error('Invalid IPFS hash');
  }

  // Remove the 'Qm' prefix if it exists
  const hash = ipfsHash.startsWith('Qm') ? ipfsHash.slice(2) : ipfsHash;
  
  let number = 0n;
  const bigInt58 = BigInt(58);
  
  // Convert base58 to decimal
  for (let i = 0; i < hash.length; i++) {
    const char = hash[hash.length - 1 - i];
    const charIndex = ALPHABET.indexOf(char);
    if (charIndex === -1) {
      throw new Error(`Invalid character in IPFS hash: ${char}`);
    }
    const value = BigInt(charIndex);
    number += value * (bigInt58 ** BigInt(i));
  }
  
  return number;
}

// Convert uint256 (tokenId) back to IPFS hash
const tokenIdToIpfsHash = (tokenId) => {
  if (!tokenId || (typeof tokenId !== 'string' && typeof tokenId !== 'bigint')) {
    throw new Error('Invalid token ID');
  }

  let number = BigInt(tokenId);
  const bigInt58 = BigInt(58);
  let hash = '';
  
  // Convert decimal to base58
  if (number === 0n) {
    hash = ALPHABET[0];
  } else {
    while (number > 0n) {
      const remainder = number % bigInt58;
      hash = ALPHABET[Number(remainder)] + hash;
      number = number / bigInt58;
    }
  }
  
  // Add back the 'Qm' prefix
  return 'Qm' + hash;
}

// Test function
const testHashConversion = (originalHash) => {
  console.log('Original IPFS Hash:', originalHash);
  const tokenId = ipfsHashToTokenId(originalHash);
  console.log('Token ID:', tokenId.toString());
  const recoveredHash = tokenIdToIpfsHash(tokenId);
  console.log('Recovered Hash:', recoveredHash);
  console.log('Conversion successful:', originalHash === recoveredHash);
  return tokenId;
}
// Utility function to format token IDs for display
const formatTokenId = (tokenId) => {
    // Convert to BigInt to handle very large numbers
    const bigTokenId = BigInt(tokenId);
    
    // If the number is small enough, return it as is
    if (bigTokenId < 1000n) {
      return tokenId.toString();
    }
    
    // For larger numbers, create a shortened version
    if (bigTokenId < 1000000n) {
      // For numbers < 1M, show first 3 digits + k
      return `${(Number(bigTokenId) / 1000).toFixed(1)}k`;
    }
    
    if (bigTokenId < 1000000000n) {
      // For numbers < 1B, show first 3 digits + M
      return `${(Number(bigTokenId) / 1000000).toFixed(1)}M`;
    }
    
    // For very large numbers, show first 4 digits + ellipsis + last 4 digits
    const idString = tokenId.toString();
    return `${idString.slice(0, 4)}...${idString.slice(-4)}`;
  };
  

export { ipfsHashToTokenId, tokenIdToIpfsHash, testHashConversion,formatTokenId };