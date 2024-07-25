import { isValidUserInfo, OtonUserInfo } from "../OtonUserInfo";

const fetchWalletData = async (requestBody : {
    address: string,
    encryptedPassphrase: string,
    hashedPassword: string,
}): Promise<OtonUserInfo | null> => {
    const mainUrl = process.env.REACT_APP_BACKEND_WALLET;
    if(!mainUrl) return null;
    const url = new URL(mainUrl);
    url.search = new URLSearchParams(requestBody).toString();
    console.log("The "+url);
    try{
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return isValidUserInfo(data)? data: null;
    }catch(e){
        console.log('Error fetching wallet data:', e);
        return null;
    }
};
  
export default fetchWalletData;