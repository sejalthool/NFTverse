import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  coverImage: {
    type: String,
    default: '',
  },
  socialLinks: {
    twitter: String,
    instagram: String,
    website: String,
  },
  createdNFTs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NFT'
  }],
  ownedNFTs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NFT'
  }],
}, {
  timestamps: true,
});

export const Profile = mongoose.model('Profile', ProfileSchema); 