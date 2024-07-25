export const isValidUserInfo = (data: any): data is OtonUserInfo => {
    return (
        typeof data.address === 'string' &&
        typeof data.publicKey === 'string' &&
        typeof data.encryptedPassphrase === 'string'
    );
};

export interface OtonUserInfo{
    address: string;
    publicKey: string;
    encryptedPassphrase: string;
    email?: string; 
    photo?: string;
    username?: string;
}

  