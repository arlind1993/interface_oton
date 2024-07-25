import { OtonUserInfo } from "../OtonUserInfo";

const createWallet = async (requestData: OtonUserInfo): Promise<boolean> => {
const url = process.env.REACT_APP_BACKEND_WALLET;
  console.log({url, requestData});
  if (!url) return false; 

  try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });
        console.log("Sent");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error('Error creating wallet:', error);
        return false;
    }
};

export default createWallet;