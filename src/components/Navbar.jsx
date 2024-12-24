import { useWeb3 } from '../context/Web3Context';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const { account, connectWallet } = useWeb3();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll listener
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-white">N</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                NFTverse
              </span>
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              {['/', '/explore', '/create', '/my-nfts'].map((path) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    isActive(path)
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {path === '/' ? 'Home' :
                   path === '/explore' ? 'Explore' :
                   path === '/create' ? 'Create' : 'My NFTs'}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search NFTs..."
                className="w-64 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <svg className="w-5 h-5 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {account ? (
              <Link 
                to={`/profile/${account}`} 
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all"
              >
                <img
                  src={`https://avatars.dicebear.com/api/identicon/${account}.svg`}
                  className="w-6 h-6 rounded-full ring-2 ring-blue-500"
                  alt="profile"
                />
                <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
              </Link>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-all"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 