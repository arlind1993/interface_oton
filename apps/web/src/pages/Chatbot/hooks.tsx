import { useAccountDrawer } from "components/AccountDrawer/MiniPortfolio/hooks";
import { OptionsItem } from "state/chatbot/reducer";
import { v4 as uuid } from 'uuid';
import { MessageSuccess } from "./req";
import useDebounce from "hooks/useDebounce";
import { isAddress } from "utilities/src/addresses";
import { useCurrencySearchResults } from "components/SearchModal/useCurrencySearchResults";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_CURRENCY_SEARCH_FILTERS } from "components/SearchModal/CurrencySearch";
import { CurrencyListRow } from "components/SearchModal/CurrencyList";
import { Chain, SearchTokensQuery } from "uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks";
import { getTokensFromSearchQuery } from "./request";

export interface FullMessage{
    text: string
    options?: OptionsItem[]
    type: string
    typeData?: any
    status?: string
}
export const translateToMessage = async(data: MessageSuccess, chains: Array<Chain>): Promise<FullMessage> => {
    console.log("Wet Data", data);
    
    const ttm  = async (data: MessageSuccess): Promise<string | FullMessage> => {
        switch(data.intent?.value){
            case "cant_answer": 
                return "I can't provide an answer for that, as I am not an expert, talk to your finacial advisor for more information";
            case "cant_understand": 
                return "I can't provide an answer for that";
            case "greetings": 
                return "Hello to you as well, How can I help you?";
            case "coin_info":
                for(const el of data.entities){
                    if(el.name == "crypto_coin"){
                        let res = await getTokensFromSearchQuery({
                            chains: chains,
                            searchQuery: el.value
                        });
                        if(res.searchTokens) {
                            console.log("Value", res.searchTokens[0]);
                        }
                    }
                }
                return "";
            case "connect_wallet": 
                if(true){

                }return "";
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
    return ttm(data).then(res=>{
        if(typeof res === 'object') return res as FullMessage;
        return {text: res as string, type: "text"};
    });
}