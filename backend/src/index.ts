import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions, Document } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import CryptoJS from 'crypto-js';

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT;
const encryptionPassphrase = process.env.ENCRYPTION_PASSPHRASE || 'oton_passphrase';

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/oton_wallet', {
    useFindAndModify: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error:any) => {
    console.error('Error connecting to MongoDB', error);
});

interface WalletUser extends Document {
  address: string;
  publicKey: string;
  encryptedPassphrase: string;
  email?: string; 
  photo?: string;
  username?: string;
}

const walletSchema = new mongoose.Schema<WalletUser>({
  address: { type: String, required: true },
  publicKey: { type: String, required: true },
  encryptedPassphrase: { type: String, required: true },
  email: { type: String, required: false },
  photo: { type: String, required: false },
  username: { type: String, required: false },
}, {
  collection: 'wallets'
});

const Wallet = mongoose.model<WalletUser>('Wallet', walletSchema);

app.post('/api/wallets', async (req: Request, res: Response) => {
  const { address, publicKey, encryptedPassphrase, email, photo, username } = req.body;
  if(!address || !publicKey || !encryptedPassphrase){
    res.status(400).send("Parameters missing");
    return ; 
  }
  const wallet = new Wallet({ address, publicKey, encryptedPassphrase, email, photo, username });
  wallet.save().then((e)=>{
    res.status(201).send(wallet);
  }).catch((e)=>{
    res.status(400).send(e);
  })
});

app.patch('/api/wallets', async (req: Request, res: Response) => {
  const { address, publicKey, encryptedPassphrase, newEncryptedPassphrase, hashedPassword, email, photo, username  } = req.body;
  if(!address || !publicKey){
    res.status(400).send("Parameters missing");
    return ; 
  }
  const wallet: WalletUser | null = await Wallet.findById({address}).catch(e=>{
    res.status(400).send("Server error");
    return null;
  });

  if(!wallet){
    res.status(400).send("Not a valid wallet address");
    return;
  }

  const updateFields: any = {};

  if(newEncryptedPassphrase){
    updateFields.encryptedPassphrase = newEncryptedPassphrase;
  }else{
    if(!encryptedPassphrase || !hashedPassword){
      res.status(400).send("Parameters missing");
      return ; 
    }
    Object.assign(updateFields, {
      ...(email && { email }),
      ...(photo && { photo }),
      ...(username && { username }),
    })
    const passphrase = CryptoJS.AES.decrypt(encryptedPassphrase ,hashedPassword ).toString();
    const pass = CryptoJS.AES.decrypt(wallet.encryptedPassphrase ,hashedPassword ).toString();
    if(passphrase != pass){
      res.status(403).send("Forbidden: You don't have premission to see this data");
      return;
    }
  }

  await wallet.updateOne({address},  updateFields).then(e=>{
      res.status(200).send(true);
      return ;
  }).catch((e)=>{
    res.status(400).send("Server error");
    return ;
  });
  
});

app.get('/api/wallets', async (req: Request, res: Response) => {
  console.log(Object.entries(req.query).map(([key, value]) => [key, value, typeof value]));
  const { address, encryptedPassphrase, hashedPassword } = req.query as Record<string, any>;
  if(!encryptedPassphrase || !address){
    res.status(400).send("Parameters missing");
    return;
  }
  let passphrase;
  try{
    passphrase = CryptoJS.AES.decrypt(encryptedPassphrase ,hashedPassword ).toString();
    console.log(passphrase);
  }catch(e){
    res.status(400).send("Wrong password");
    return;
  }

  Wallet.findOne({address}).then(e => {
    if(!e){
      res.status(400).send("Not a valid wallet address");
      return;
    } 
    const pass = CryptoJS.AES.decrypt(e.encryptedPassphrase ,hashedPassword ).toString();

    console.log(pass)
    if(passphrase != pass){
      res.status(403).send("Forbidden: You don't have premission to see this data");
      return;
    }
    const data = {
      address: e.address,
      encryptedPassphrase: e.encryptedPassphrase,
      email: e.email,
      publicKey: e.publicKey,
      photo: e.photo,
      username: e.username,
    }
    res.status(200).json(data);
    return;
  }).catch((e)=>{
    res.status(400).send("Server error");
  })
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
