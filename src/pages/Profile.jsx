import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { account } = useWeb3();
  const { address } = useParams();

  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    avatar: '',
    coverImage: '',
    twitter: '',
    instagram: '',
    website: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    fetchProfile();
  }, [address]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/profiles/${address}`);
      setProfile(response.data);
      setFormData({
        username: response.data.username || '',
        bio: response.data.bio || '',
        avatar: response.data.avatar || '',
        coverImage: response.data.coverImage || '',
        twitter: response.data.socialLinks?.twitter || '',
        instagram: response.data.socialLinks?.instagram || '',
        website: response.data.socialLinks?.website || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/profiles/${address}`, {
        ...formData,
        socialLinks: {
          twitter: formData.twitter,
          instagram: formData.instagram,
          website: formData.website
        }
      });
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="text-white pt-20">
      <div className="relative h-64 mb-24">
        <img
          src={profile?.coverImage || 'https://via.placeholder.com/1920x384?text=Cover+Image'}
          alt="Cover"
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute -bottom-16 left-8">
          <img
            src={profile?.avatar || `https://avatars.dicebear.com/api/identicon/${address}.svg`}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-900"
          />
        </div>
      </div>

      <div className="px-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{profile?.username || address.slice(0, 6)}</h1>
            <p className="text-gray-400">{profile?.bio || 'No bio yet'}</p>
            {profile?.socialLinks && (
              <div className="flex gap-4 mt-4">
                {profile.socialLinks.twitter && (
                  <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                    Twitter
                  </a>
                )}
                {profile.socialLinks.instagram && (
                  <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-500">
                    Instagram
                  </a>
                )}
                {profile.socialLinks.website && (
                  <a href={profile.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                    Website
                  </a>
                )}
              </div>
            )}
          </div>
          {account === address && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Avatar URL</label>
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image URL</label>
              <input
                type="text"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Twitter URL</label>
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Instagram URL</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Website URL</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Save Profile
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Created NFTs</h2>
              <div className="grid grid-cols-2 gap-4">
                {profile?.createdNFTs?.length > 0 ? (
                  profile.createdNFTs.map((nft) => (
                    <div key={nft.id} className="bg-gray-800 rounded-lg overflow-hidden">
                      <img src={nft.image} alt={nft.name} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold">{nft.name}</h3>
                        <p className="text-blue-500">{nft.price} ETH</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 col-span-2">No NFTs created yet</p>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Owned NFTs</h2>
              <div className="grid grid-cols-2 gap-4">
                {profile?.ownedNFTs?.length > 0 ? (
                  profile.ownedNFTs.map((nft) => (
                    <div key={nft.id} className="bg-gray-800 rounded-lg overflow-hidden">
                      <img src={nft.image} alt={nft.name} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold">{nft.name}</h3>
                        <p className="text-blue-500">{nft.price} ETH</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 col-span-2">No NFTs owned yet</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 