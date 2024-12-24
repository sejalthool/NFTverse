import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const { account } = useWeb3();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setLoading(true);
      const tokenId = Date.now().toString();
      
      const nftData = {
        tokenId,
        name: formData.name,
        description: formData.description,
        image: formData.image,
        price: formData.price,
        seller: account,
        owner: account
      };

      const response = await axios.post('http://localhost:5000/api/nfts', nftData);
      console.log('NFT created:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating NFT:', error);
      alert(error.response?.data?.message || 'Error creating NFT');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-2xl">
      <h1 className="text-4xl font-bold mb-8 text-white bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Create New NFT
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">NFT Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
            required
            placeholder="Enter NFT name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
            rows="4"
            required
            placeholder="Describe your NFT"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
            required
            placeholder="Enter image URL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Price (ETH)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.001"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
            required
            placeholder="Set your price"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          ) : (
            'Create NFT'
          )}
        </button>
      </form>
    </div>
  );
};

export default Create; 