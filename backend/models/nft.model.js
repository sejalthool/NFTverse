import mongoose from 'mongoose';

const NFTSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  sold: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const NFT = mongoose.model('NFT', NFTSchema); 