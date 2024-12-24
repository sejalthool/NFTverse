import express from 'express';
import { NFT } from '../models/nft.model.js';

const router = express.Router();

// Get all NFTs
router.get('/', async (req, res) => {
  try {
    const nfts = await NFT.find();
    console.log('Fetched NFTs:', nfts);
    res.json(nfts);
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create new NFT
router.post('/', async (req, res) => {
  try {
    console.log('Received NFT creation request:', req.body);
    
    // Validate required fields
    const requiredFields = ['tokenId', 'name', 'description', 'image', 'price', 'seller', 'owner'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Check if NFT with tokenId already exists
    const existingNFT = await NFT.findOne({ tokenId: req.body.tokenId });
    if (existingNFT) {
      throw new Error('NFT with this tokenId already exists');
    }

    const nft = new NFT(req.body);
    const newNFT = await nft.save();
    
    console.log('Created new NFT:', newNFT);
    res.status(201).json(newNFT);
  } catch (error) {
    console.error('Error creating NFT:', error);
    res.status(400).json({ 
      message: error.message,
      details: error.errors ? Object.values(error.errors).map(err => err.message) : []
    });
  }
});

export default router; 