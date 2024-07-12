import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions, Document } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/oton_wallet', {
    useFindAndModify: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

interface WalletDocument extends Document {
  address: string;
  privateKey: string;
}

const walletSchema = new mongoose.Schema<WalletDocument>({
  address: { type: String, required: true },
  privateKey: { type: String, required: true },
}, {
  collection: 'wallets'
});

const Wallet = mongoose.model<WalletDocument>('Wallet', walletSchema);

app.post('/api/wallets', async (req: Request, res: Response) => {
  const { address, privateKey } = req.body;
  const wallet = new Wallet({ address, privateKey });

  try {
    await wallet.save();
    res.status(201).send(wallet);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
