import { Profile } from '../models/profile.model.js';

export const getProfile = async (req, res) => {
  try {
    const { address } = req.params;
    let profile = await Profile.findOne({ address })
      .populate('createdNFTs')
      .populate('ownedNFTs');

    if (!profile) {
      // Create a new profile if it doesn't exist
      profile = await Profile.create({
        address,
        username: `User-${address.slice(0, 6)}`,
      });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error in getProfile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { address } = req.params;
    const updateData = {
      ...req.body,
      socialLinks: {
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        website: req.body.website
      }
    };

    delete updateData.twitter;
    delete updateData.instagram;
    delete updateData.website;

    const profile = await Profile.findOneAndUpdate(
      { address },
      updateData,
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (error) {
    console.error('Error in updateProfile:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 