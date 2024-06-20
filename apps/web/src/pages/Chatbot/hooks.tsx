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
export const translateToMessage = async(data: MessageSuccess, chains: Array<Chain>, recommendedChainId?: Chain, account?: string): Promise<FullMessage> => {
    
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
                    if(el.name == "cryptocoin"){
                        const res = await getTokensFromSearchQuery({
                            chains,
                            searchQuery: el.value,
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
            case "help": {
                const helpTerms = data.entities.filter((e)=> e.name == "help_term");
                // const noHelpTerms = helpTerms.length === 0;
                let textHeader: string | undefined; 
                if(helpTerms.length == 1){
                    const data = helpTerms[0];
                    switch(data.value){
                        case "wallet": textHeader = "To connect to wallet you can click \"Connect\" on the top right or select the option down below!"; break;
                        case "trade": textHeader = "To make a trade you can click on swap on the top navigation or select the option down below!"; break;
                        case "deposit": textHeader = "To make a deposit you must have a wallet, click down below if you are connected!"; break;
                        default: break;
                    }
                }else if(helpTerms.length > 1){
                    textHeader = "Click on one of the options..."; 
                }
                if(!textHeader){
                    textHeader = "I may not understand what you want help with, but here are a few options:";
                    helpTerms.push(...["wallet", "deposit", "trade"].map(e=>{
                        return { 
                            value: e,
                            name: "help_term",
                            confidence: 1,
                        }
                    }))
                }
                return {
                    text: textHeader!,
                    type: "options",
                    options: helpTerms.map(e=> {
                        let text = "";
                        switch(e.value){
                            case "wallet": text = "Connect to wallet"; break;
                            case "deposit": text = "Deposit to wallet"; break;
                            case "trade": text = "Swap tokens"; break;
                            case "extract": text = "Extract from wallet"; break;
                            default: break;
                        }
                        return {
                            id: uuid(),
                            action: e.value,
                            selected: false,
                            text: text
                        }
                    })
                };
            }
            case "exchange_coins":{
                let tokenInfoFrom: SearchTokensWebQuery | undefined;
                let tokenInfoTo: SearchTokensWebQuery | undefined;
                for(const el of data.entities){
                    if(el.name == "exchange_coin"){
                        const res = await getTokensFromSearchQuery({
                            chains,
                            searchQuery: el.value
                        });
                        if(res.searchTokens) {                            
                            if(tokenInfoFrom){
                                tokenInfoTo = res;
                                break;
                            }else{
                                tokenInfoFrom = res;
                            }
                        }
                    }
                }
                if(tokenInfoFrom){
                    return resForCoins("double", tokenInfoFrom, tokenInfoTo, recommendedChainId);
                }else{
                    return "A coin could not be found please try other coins!";
                }
            }
            case "keyword_info": {
                const message: Array<string> = [];
                for(const el of data.entities){
                    switch(el.value){
                        case "OTON": ""; 
                    }
                }
                return message.join("\n\n");
            }
            case "my_transactions": return {
                text: account ? "Here is the list of your transactions: " : "You must connect first to see your transactions",
                type: account ? "my_transactions" : "options",
                options: account ? undefined : [{
                    id: uuid(),
                    action: "wallet",
                    selected: false,
                    text: "Connect to wallet"
                }]
            };
            case "trending_coins": return {
                text: "Here is the list with the most trenting coins: ",
                type: "trending_coins",
            };
            default: return "I can't understand your question";
        }
    } 
    return ttm().then(e=>{
        let res: FullMessage;
        if(typeof e === 'string'){
            res = {text: e as string, type: "text"}
        }else{
            res = e as FullMessage;
        } 
        console.log("resTTM", res);
        return res;
    });
}
const resForCoins = (type: string, tokensFrom: SearchTokensWebQuery, tokensTo?: SearchTokensWebQuery, recommendedChain?: Chain): FullMessage => {
    if(type == "double"){
        tokensTo ??= tokensFrom;
        const getFrom: Record<string, MyToken>  = {}
        const res : Record<string, {
            from: MyToken,
            to: MyToken
        }> = {};
        for(const from of tokensFrom.searchTokens!){
            if(from?.chain){
                if(!getFrom[from!.chain]){
                    getFrom[from!.chain] = from;
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
                type: "trade_details",
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