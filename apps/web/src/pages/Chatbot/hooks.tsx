import { OptionsItem } from "state/chatbot/reducer";
import { v4 as uuid } from 'uuid';
import { MessageSuccess } from "./request";
import { Chain, Currency, SafetyLevel, SearchTokensWebQuery, TokenStandard } from "uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks";
import { getTokensFromSearchQuery } from "./request";

type MyToken = {
    __typename?: "Token";
    id: string;
    decimals?: number;
    name?: string;
    chain: Chain;
    standard?: TokenStandard;
    address?: string;
    symbol?: string;
    market?: {
        __typename?: 'TokenMarket',
        id: string,
        price?: {
            __typename?: 'Amount',
            id: string,
            value: number,
            currency?: Currency
        },
        pricePercentChange?: {
            __typename?: 'Amount',
            id: string,
            value: number
        },
        volume24H?: {
            __typename?: 'Amount',
            id: string,
            value: number,
            currency?: Currency
        }
    };
    project?: {
        __typename?: 'TokenProject',
        id: string,
        name?: string,
        safetyLevel?: SafetyLevel,
        logoUrl?: string,
        isSpam?: boolean,
        logo?: {
            __typename?: 'Image',
            id: string,
            url: string
        }
    };
}

export interface FullMessage{
    text: string
    options?: OptionsItem[]
    type: string
    typeData?: any
    status?: string
}
export const translateToMessage = async(data: MessageSuccess, chains: Array<Chain>, recommendedChainId?: Chain): Promise<FullMessage> => {
    console.log("Wet Data", data, recommendedChainId);
    
    const ttm  = async (): Promise<string | FullMessage> => {
        switch(data.intent?.value){
            case "cant_answer": 
                return "I can't provide an answer for that, as I am not an expert, talk to your finacial advisor for more information";
            case "cant_understand": 
                return "I can't provide an answer for that";
            case "greetings": 
                return "Hello to you as well, How can I help you?";
            case "coin_info": {
                let tokenInfo: SearchTokensWebQuery | null = null;
                for(const el of data.entities){
                    if(el.name == "crypto_coin"){
                        const res = await getTokensFromSearchQuery({
                            chains,
                            searchQuery: el.value
                        });
                        if(res.searchTokens) {
                            tokenInfo = res;
                            break;
                        }
                    }
                }
                if(tokenInfo){
                    return resForCoins("single", tokenInfo, undefined, recommendedChainId);
                }else{
                    return "No coin could be found please try another coin!";
                }
            }
            case "connect_wallet": 
                return "Connecting to wallet...";
            case "help": 
                for(const el of data.entities){
                    switch(el.value){
                        case "deposit": return "";
                        default: break; 
                    }
                }
                return {
                    text: "I may not understand what you want help with, but here are a few options:",
                    type: "options",
                    options: [
                        { 
                            id: uuid(),
                            href: 'openAccountDrawer',
                            selected: false,
                            text: "Connect with wallet"
                        }
                    ]
                };
            case "exchange_coins": return "";
            case "extract": return "";
            case "keyword_info": return "";
            case "my_transactions": return "";
            case "my_wallet": 
                return "";
            case "trending_coins":
                return "";
            default: 
                return "I can't understand your question";
        }
    } 
    return ttm().then(res=>{
        if(typeof res === 'object') return res as FullMessage;
        return {text: res as string, type: "text"};
    });
}
const resForCoins = (type: string, tokensFrom: SearchTokensWebQuery, tokensTo?: SearchTokensWebQuery, recommendedChain?: Chain): FullMessage => {
    console.log(type, tokensFrom, tokensTo, recommendedChain);
    if(type == "double" && tokensTo){
        const getFrom: Record<string, MyToken>  = {}
        const res : Record<string, {
            from: MyToken,
            to: MyToken
        }> = {};
        for(const from of tokensFrom.searchTokens!){
            if(from?.chain){
                if(!getFrom[from!.chain]){
                    getFrom[from!.chain] = from;
                    break;
                }   
            }
        }
        for(const to of tokensTo.searchTokens!){
            if(to?.chain){
                for(const [key, val] of Object.entries(getFrom)){
                    if(key == to!.chain){
                        res[key] = {
                            from: val,
                            to
                        };
                    }
                }
            }
        }
        const result: {
            data?: {
                from: MyToken,
                to: MyToken,  
            }
            chain?: string
         } = {};
        if(recommendedChain && res[recommendedChain]){
            result.data = res[recommendedChain];
            result.chain = recommendedChain;
        }else if (res[Chain.Ethereum]){
            result.data = res[Chain.Ethereum];
            result.chain = Chain.Ethereum;
        }else  {
            const e = Object.entries(res);
            if(e.length > 0){
                result.data = e[0][1];
                result.chain = e[0][0];
            }
        }

        if(result.data){
            return {
                text: "Here are the details of the trade from "+ result.data.from.name +" to "+ result.data.to.name +"!",
                type: "coin_details",
                typeData: result
            }
        }else{
            return {
                text: "Could not identify the type of coin. Please try another coin to get their details",
                type: "text",
            }
        }
    }else{
        const res: Record<string, MyToken>  = {}
        for(const from of tokensFrom.searchTokens!){
            if(from?.chain){
                if(!res[from!.chain]){
                    res[from!.chain] = from;
                }   
            }
        }
        console.log("ssss", res);
        const result: {
           data?: MyToken
           chain?: string
        } = {};
        if(recommendedChain && res[recommendedChain]){
            result.data = res[recommendedChain];
            result.chain = recommendedChain;
        }else if (res[Chain.Ethereum]){
            result.data = res[Chain.Ethereum];
            result.chain = Chain.Ethereum;
        }else {
            const e = Object.entries(res);
            if(e.length > 0){
                result.data = e[0][1];
                result.chain = e[0][0];
            }
        }
        if(result.data){
            return {
                text: "Here are the details of "+ result.data.name +"!",
                type: "coin_details",
                typeData: result
            }
        }else{
            return {
                text: "Could not identify the type of coin. Please try another coin to get their details",
                type: "text",
            }
        }
    }
    
}