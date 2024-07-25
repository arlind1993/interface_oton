import { OtonUserInfo } from "../OtonUserInfo";

const updateWallet = async (requestData: OtonUserInfo & {newEncryptedPassphrase?: string, hashedPassword?: string }, ): Promise<boolean> => {
    const url = process.env.REACT_APP_BACKEND_WALLET;
    console.log({url, requestData});
    if (!url) return false; 

    try {
        const response = await fetch(url, {
            method: 'PATCH',
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
        console.error('Error updating wallet:', error);
        return false;
    }
};

export default updateWallet;