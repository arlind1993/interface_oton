import { SearchTokensWebQuery, SearchTokensWebQueryVariables, } from "uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks";



interface EntityWit {
  body: string;
  confidence: number;
  end: number;
  entities: Record<string, any>;
  id: string;
  name: string;
  role: string;
  start: number;
  type: string;
  value: string;
}

interface EntitiesWit {
  [key: string]: EntityWit[];
}

interface IntentWit {
  confidence: number;
  id: string;
  name: string;
}

interface SuccessWit {
  entities: EntitiesWit;
  intents: IntentWit[];
  text: string;
  traits: Record<string, any>; // Assuming traits could have various structures
}

interface ResponseWit{
  success?: MessageSuccess,
  error?: any,
}

interface MessageIntent{
  value: string
  confidence: number
}
 interface MessageEntity{
  value: string
  name: string
  role?: string
  confidence: number
}

interface MessageIntent{
  value: string
  confidence: number
}
export interface MessageSuccess{
  intent?: MessageIntent
  entities: MessageEntity[]
}

export const witBotSendMessage = async (message: string): Promise<ResponseWit> => {
  console.log("send",message);
  // if(1 === 1){
  //   return new Promise((resolve: (value: ResponseWit)=> void) => {
  //     setTimeout(()=>{
  //       resolve({
  //         success: {
  //           entities: [
  //             {
  //               name: "exchange_coin",
  //               confidence: 0.9,
  //               value: "Bitcoin",
  //             },{
  //               name: "exchange_coin",
  //               confidence: 0.9,
  //               value: "Etherium",
  //             },
  //           ],
  //           intent: {
  //             confidence: 0.9,
  //             value: "exchange_coins"
  //           }
  //         }
  //       })
  //     },500);
  //     });
  //   } else if(1==1){
  //     return new Promise((resolve: (value: ResponseWit)=> void) => {
  //       setTimeout(()=>{
  //         resolve({
  //           success: {
  //             entities: [
  //               // {
  //               //   name: "help_term",
  //               //   confidence: 0.9,
  //               //   value: "wallet",
  //               // },{
  //               //   name: "exchange_coin",
  //               //   confidence: 0.9,
  //               //   value: "Etherium",
  //               // },
  //             ],
  //             intent: {
  //               confidence: 0.9,
  //               value: "my_transactions"
  //             }
  //           }
  //         })
  //       },500);
  //     });
  //   }else if(2==2){
  //     return new Promise((resolve: (value: ResponseWit)=> void) => {
  //       setTimeout(()=>{
  //         resolve({
  //           success: {
  //             entities: [
  //               {
  //                 name: "crypto_coin",
  //                 confidence: 0.9,
  //                 value: "Bit",
  //               },{
  //                 name: "exchange_coin",
  //                 confidence: 0.9,
  //                 value: "Etherium",
  //               },
  //             ],
  //             intent: {
  //               confidence: 0.9,
  //               value: "coin_info"
  //             }
  //           }
  //         })
  //       },500);
  //     });
  //   }
  try{
    const vId = 20240603;
    const url = `https://api.wit.ai/message?v=${vId}&q=${message}`
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 6S4VPEXGEAEDBNBTLDYWUTQPSPGASYRW',
      },
      method: 'GET',
    });
    const jRes = await res.json();
    const success = jRes as SuccessWit;
    const successResponse : MessageSuccess = {
      entities: []
    }

    if(success.intents && success.intents.length > 0){
      successResponse.intent = {
        value: success.intents[0].name,
        confidence: success.intents[0].confidence,
      };
    }
    if(success.entities){
      Object.values(success.entities).forEach(e=> {
        e.forEach(e=>{
          successResponse.entities.push({
            confidence: e.confidence,
            value: e.value,
            name: e.name,
            role: e.role,
          })
        })  
      });
    }
    console.log({
      success: successResponse
    });
    return {
      success: successResponse
    };
  }catch(e){
    console.log({
      error: e
    });
    return {
      error: e
    };
  }
}



export const getTokensFromSearchQuery = async(variables: SearchTokensWebQueryVariables) : Promise<SearchTokensWebQuery> => {
    const query = `
    query SearchTokensWeb($searchQuery: String!, $chains: [Chain!]) {
      searchTokens(searchQuery: $searchQuery, chains: $chains) {
        id
        decimals
        name
        chain
        standard
        address
        symbol
        market(currency: USD) {
          id
          price {
            id
            value
            currency
          }
          pricePercentChange(duration: DAY) {
            id
            value
          }
          volume24H: volume(duration: DAY) {
            id
            value
            currency
          }
        }
        project {
          id
          name
          logo {
            id
            url
          }
          safetyLevel
          logoUrl
          isSpam
        }
      }
    }
  `;

    return fetch('https://beta.gateway.uniswap.org/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify({ query, variables }),
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log("Wit res", data);
        return data.data;
    }).catch(error => {
        // Handle errors here
        console.error('There was a problem with the fetch operation:', error);
        return {
            searchTokens : []
        };
    });
}
