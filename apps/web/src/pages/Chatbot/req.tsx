
export const witBotSendMessage = async (message: string) => {
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
    const s = jRes as SuccessWit;
    return {
      success: s
    } as ResponseWit;
  }catch(e){
    return {
      error: e
    } as ResponseWit;
  }
}


export interface EntityWit {
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

export interface EntitiesWit {
  [key: string]: EntityWit[];
}

export interface IntentWit {
  confidence: number;
  id: string;
  name: string;
}

export interface SuccessWit {
  entities: EntitiesWit;
  intents: IntentWit[];
  text: string;
  traits: Record<string, any>; // Assuming traits could have various structures
}

export interface ResponseWit{
  success: SuccessWit,
  error: any,
}