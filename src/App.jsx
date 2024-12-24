import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Create from './pages/Create';
import MyNFTs from './pages/MyNFTs';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Web3Provider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/create" element={<Create />} />
              <Route path="/my-nfts" element={<MyNFTs />} />
              <Route path="/profile/:address" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Web3Provider>
  );
};

export default App;
