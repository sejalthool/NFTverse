import { Link } from 'react-router-dom';

const FEATURED_NFTS = [
  {
    id: 1,
    name: "Cosmic Dreamer #1",
    image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400&h=400&fit=crop",
    price: "2.5",
    creator: "0x1234...5678"
  },
  {
    id: 2,
    name: "Digital Genesis #4",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    price: "1.8",
    creator: "0x8765...4321"
  },
  {
    id: 3,
    name: "Neon Horizon #7",
    image: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=400&h=400&fit=crop",
    price: "3.2",
    creator: "0x2468...1357"
  },
  {
    id: 4,
    name: "Abstract Mind #2",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop",
    price: "1.5",
    creator: "0x1357...2468"
  }
];

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden">

      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Discover, Collect & Sell
              </span>
              <br />
              <span className="text-white">
                Extraordinary NFTs
              </span>
            </h1>
            <p className="text-gray-300 text-xl mb-8">
              The world's first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs).
            </p>
            <div className="flex space-x-4">
              <Link
                to="/explore"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Explore
              </Link>
              <Link
                to="/create"
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Create
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800/50 rounded-2xl backdrop-blur-sm">
              {FEATURED_NFTS.map((nft) => (
                <div
                  key={nft.id}
                  className="group relative transform hover:scale-105 transition-all duration-300"
                >
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold">{nft.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-300">{nft.price} ETH</span>
                          <span className="text-xs text-gray-400">by {nft.creator}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 