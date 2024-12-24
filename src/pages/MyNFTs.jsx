import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

const MyNFTs = () => {
  const [myNfts, setMyNfts] = useState([]);
  const { account } = useWeb3();

  useEffect(() => {
    if (account) {
      fetchMyNFTs();
    }
  }, [account]);

  const fetchMyNFTs = async () => {
    // Will implement fetching user's NFTs later
    console.log('Fetching NFTs for account:', account);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My NFTs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {myNfts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            You don't own any NFTs yet
          </p>
        ) : (
          myNfts.map((nft) => (
            <div key={nft.id} className="border rounded-lg overflow-hidden">
              {/* NFT Card Content */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyNFTs; 