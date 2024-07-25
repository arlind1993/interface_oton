import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import { OtonUserInfo } from './OtonUserInfo';

class OtonWallet {
  private wallet: ethers.Wallet | null = null;
  public error: String | null = null;
  // Method to create a new wallet
  public createWallet(): void {
    this.wallet = ethers.Wallet.createRandom();
  }

  public hashLocalPassword = (password: string) => {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  };

  public signInWithMnemonic(mnemonic?: string | null): void {
    if(!mnemonic){
      this.wallet = null;
      this.error = "No mnemonic provided";
      return;
    }
    try{
      this.wallet = ethers.Wallet.fromMnemonic(mnemonic);
      if(!this.wallet.address){
        throw new Error("No address provided");
      }
    }catch(e){
      this.wallet = null;
      this.error = e.message;
    }
  }

  public getPassphrase(): string | null {
    return this.wallet ? this.wallet.mnemonic.phrase: null;
  }


  public getEncryptedPassphrase(hashedPassword: string): string | null {
    return this.wallet ? CryptoJS.AES.encrypt(
      this.wallet.mnemonic.phrase, 
      hashedPassword
    ).toString(): null;
  }

  public decryptPassphrase(encryptedPassword: string, hashedPassword: string): string | null {
    try{
      return CryptoJS.AES.decrypt(
        encryptedPassword, 
        hashedPassword
      ).toString(CryptoJS.enc.Utf8);
    }catch(e){
      this.error = e.message;
      return null;
    }
  }

  // Method to get the wallet address
  public getAddress(): string | null {
    return this.wallet ? this.wallet.address : null;
  }

  // Method to get the wallet private key
  public getPublicKey(): string | null {
    return this.wallet ? this.wallet.publicKey : null;
  }
}

export default OtonWallet;