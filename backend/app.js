import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import nftRoutes from './routes/nft.routes.js';
import profileRoutes from './routes/profile.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/nfts', nftRoutes);
app.use('/api/profiles', profileRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/nft-marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; 