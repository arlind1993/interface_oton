import { useAccountDrawer } from "components/AccountDrawer/MiniPortfolio/hooks";
import { OptionsItem } from "state/chatbot/reducer";
import { v4 as uuid } from 'uuid';
import { MessageSuccess } from "./req";
import useDebounce from "hooks/useDebounce";
import { isAddress } from "utilities/src/addresses";
import { useCurrencySearchResults } from "components/SearchModal/useCurrencySearchResults";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_CURRENCY_SEARCH_FILTERS } from "components/SearchModal/CurrencySearch";

export interface FullMessage{
    text: string
    options?: OptionsItem[]
    type: string
    typeData?: any
    status?: string
}


export const useMessageHandler = (success: any) => {

    const {searchCurrency, allCurrencyRows, loading: currencySearchResultsLoading,} = useCurrencySearchResults({
        searchQuery: success.entities.value,
        filters: DEFAULT_CURRENCY_SEARCH_FILTERS
    });




            switch(success.intent?.value){
                case "cant_answer": 
                    return "I can't provide an answer for that, as I am not an expert, talk to your finacial advisor for more information";
                case "cant_understand": 
                    return "I can't provide an answer for that";
                case "greetings": 
                    return "Hello to you as well, How can I help you?";
                case "coin_info":
                    for(const el of success.entities){
                        if(el.name == "crypto_coin"){

                            console.log("allCurrencyRows", allCurrencyRows);
                            return allCurrencyRows;
                            // setTimeout(()=>{
                            //     console.log("osvalue ", el.value);
                            //     console.log("oosoosososo", searchCurrency, allCurrencyRows);
                            // },100);
                        }
                    }
                    return "";
                case "connect_wallet": 
                    if(true){

                    }return "";
                case "help": 
                    for(const el of success.entities){
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