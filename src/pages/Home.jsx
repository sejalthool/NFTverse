import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import axios from 'axios';
import Hero from '../components/Hero';
import API_BASE_URL from '../config/api';

const Home = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { provider } = useWeb3();

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/nfts`);
      setNfts(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch NFTs. Please try again later.');
    } finally {
      setLoading(false);
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
    <div className="text-white">
      <Hero />
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Discover, Collect & Sell NFTs
        </h1>
        <p className="text-gray-400 text-lg">
          The world's first and largest digital marketplace for crypto collectibles
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
            All Items
          </button>
          <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
            Art
          </button>
          <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
            Gaming
          </button>
        </div>
        <select className="bg-gray-800 text-white px-4 py-2 rounded-lg">
          <option>Recently Listed</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <div key={nft.tokenId} className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700">
            <div className="relative group">
              <img 
                src={nft.image} 
                alt={nft.name} 
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=NFT';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transform -translate-y-2 group-hover:translate-y-0 transition-all">
                  View Details
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <img 
                  src={`https://avatars.dicebear.com/api/identicon/${nft.seller}.svg`}
                  className="w-6 h-6 rounded-full"
                  alt="seller avatar"
                />
                <span className="text-gray-400 text-sm">@{nft.seller.slice(0, 6)}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{nft.name}</h2>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{nft.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-xs">Current Price</p>
                  <p className="text-lg font-bold text-blue-500">{nft.price} ETH</p>
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 