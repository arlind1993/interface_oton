import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface HistoryItem {
  id: string
  name: string
  tempName: string
  timestamp: number
  hover: boolean
  renaming: boolean
  chats: string[]
}
export interface ChatItem {
  id: string
  text: string
  tempText: string
  type: string
  typeData?: any
  isChatbotText: boolean
  status: string
  hover: boolean
  editing: boolean
  options?: OptionsItem[]
}

export interface OptionsItem {
  id: string
  text: string
  action: string
  selected: boolean
}

export interface ChatbotState {
  histories: Record<string, HistoryItem>
  chats: Record<string, ChatItem>
}
const initialState: ChatbotState = {
  histories: {
    "temp": {
      id: "temp",
      name: "Rename title",
      tempName: "",
      timestamp: 0,
      hover: false,
      renaming: false,
      chats:  ["1"]
    },
    "11110000-0000-0000-0000-000011110000": {
      id: "11110000-0000-0000-0000-000011110000",
      name: "Buy Crypto",
      tempName: "",
      timestamp: 1714990242000,
      hover: false,
      renaming: false,
      chats: ["1"]
    },
    "22220000-0000-0000-0000-000022220000": {
      id: "22220000-0000-0000-0000-000022220000",
      name: "What is OTON",
      tempName: "",
      timestamp: 1713607842000,
      hover: false,
      renaming: false,
      chats: ["1"]
    },
    "33330000-0000-0000-0000-000033330000": {
      id: "33330000-0000-0000-0000-000033330000",
      name: "Connect wallet",
      tempName: "",
      timestamp: 1716199842000,
      hover: false,
      renaming: false,
      chats: ["1"]
    },
  },
  chats: {
    "1" : {
      id: "1",
      text: "Hello, how can I help you!",
      tempText: "",
      isChatbotText: true,
      type: "text",
      hover: false,
      editing: false,
      status: "completed",
    },
    "2": {
      id: "2",
      text: "I'd like to know ....",
      tempText: "",
      type: "text",
      isChatbotText: false,
      hover: false,
      editing: false,
      status: "completed",
    },
    "3":{
      id: "3",
      text: "Hi i can help you with that",
      tempText: "",
      type: "options",
      options: [
        {id: "1", text: "Go to main", action: "/", selected: false},
        {id: "2", text: "Go to explore", action: "/explore", selected: false},
      ],
      isChatbotText: true,
      hover: false,
      editing: false,
      status: "completed",
    },
    "4":{
      id: "4",
      text: "4",
      tempText: "",
      isChatbotText: true,
      hover: false,
      type: "text",
      editing: false,
      status: "completed",
    },
  },
}

const walletsSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    addHistoryItem(state, { payload: {items} }: PayloadAction<{items: Array<HistoryItem>}>) {
      // console.log("addHistoryItem", items);
      for(const item of items){
        state.histories[item.id] = item
      }
    },
    addChatItem(state, { payload: {items, historyId} }: PayloadAction<{items: Array<ChatItem>, historyId?: string}>) {
      // console.log("addChatItem", items);
      for(const item of items){
        state.chats[item.id] = item
      }
      if(historyId && historyId in state.histories){
        state.histories[historyId].chats.push(...items.map((e)=>e.id));
      }
    },  
    updateChatItem( state, {payload}: PayloadAction<Array<{ 
      id: string,
      item: Partial<ChatItem>
    }>>) {
      // console.log("updateChatItem", payload);
      for(const {id, item} of payload){
        if(state.chats[id]){
          Object.assign(state.chats[id], item);
        }
      }
    },
    updateChatItemOptionsClicked( state, {payload: {itemId, optionPos, selected}}: PayloadAction<{
      itemId: string,
      optionPos: number,
      selected: boolean
    }>) {
      console.log("updateChatItemOptionsClicked", itemId, optionPos, selected);
      if(itemId in state.chats){
        if(state.chats[itemId].options && state.chats[itemId].options![optionPos]){
          state.chats[itemId].options![optionPos].selected = selected;
        }
      }
    },
    updateHistoryItem(state, { payload }: PayloadAction<Array<{ 
      item: Partial<HistoryItem>, 
      id: string,
    }>>) {
      // console.log("updateHistoryItem", payload);
      for(const {id, item} of payload){
        if(state.histories[id]){
          Object.assign(state.histories[id], item);
        }
      }
    },
    resetTempHistory(state){
      // console.log("resetTempHistory");
      const item = {
        id: "temp",
        name: "Rename title",
        tempName: "",
        timestamp: 0,
        hover: false,
        renaming: false,
        chats:  ["1"]
      };
      if(state.histories["temp"]){
        Object.assign(state.histories["temp"], item);
      }
    },
    emptyChats(state){
      state.chats = {}
    },
    emptyHistories(state){
      state.histories = {}
    },
    removeHistoryItem(state, {payload: {ids, withChats}}:PayloadAction<{ids: Array<string>, withChats: boolean}>){
      // console.log("removeHistoryItem", ids, withChats);
      for(const id of ids){
        if (id in state.histories) {
          if(withChats){
            for(const cid of state.histories[id].chats){
              if ((cid in state.chats) && cid !== "1") {
                delete state.chats[cid];
              }
            }
          }
          delete state.histories[id];
        }
      }
    },
    removeChatItem(state, {payload: {ids, historyId}}:PayloadAction<{ids: Array<string>, historyId?: string}>){  
      // console.log("removeChatItem", ids, historyId, type);
      for(const id of ids){
        if ((id in state.chats) && id !== "1") {
          delete state.chats[id];
        }
      }
      
      if(historyId && historyId in state.histories){
        state.histories[historyId].chats = state.histories[historyId].chats.filter((hcid)=>  ids.every((cid)=> cid != hcid));
      }
    },
  },
})

export const { 
  addHistoryItem, 
  addChatItem, 
  updateChatItem, 
  updateHistoryItem, 
  removeHistoryItem,
  removeChatItem, 
  // emptyChats,
  // emptyHistories,
  updateChatItemOptionsClicked,
  resetTempHistory,
} = walletsSlice.actions
export default walletsSlice.reducer