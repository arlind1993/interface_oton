import { getTokensAsync } from "components/AccountDrawer/MiniPortfolio/Pools/getTokensAsync";
import { useCurrencySearchResults } from "components/SearchModal/useCurrencySearchResults";

export const translateToMessage = (
    intent: { value: string; confidence: number; } | null, 
    entities: { value: string; name: string; role?: string; confidence: number; }[]
): string => {
    switch(intent?.value){
        case "cant_answer": return "I can't provide an answer for that, as I am not an expert, talk to your finacial advisor for more information";
        case "cant_understand": return "I can't provide an answer for that";
        case "greetings": return "Hello to you as well, How can I help you?";
        case "coin_info":

            if(true){

            }
            return "";
        case "connect_wallet": 
            if(true){

            }return "";
        case "deposit": return "";
        case "exchange_coins": return "";
        case "extract": return "";
        case "keyword_info": return "";
        case "my_transactions": return "";
        case "my_wallet": return "";
        case "trending_coins": return "";
        default: return "I can't understand your question";
    }
    
}