import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MutableRefObject } from 'react';
// import { shallowEqual } from 'react-redux'

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
  isChatbotText: boolean
  status: string
  hover: boolean
  editing: boolean
  options?: OptionsItem[]
}

export interface OptionsItem {
  id: number
  text: string
  href: string
  selected: false
}

export interface ChatbotState {
  tempHistory: HistoryItem
  histories: Record<string, HistoryItem>
  chats: Record<string, ChatItem>
}
const initialState: ChatbotState = {
  tempHistory: {
    id: "temp",
    name: "Rename title",
    tempName: "",
    timestamp: 0,
    hover: false,
    renaming: false,
    chats:  ["1"]
  },
  histories: {
    "3": {
      id: "3",
      name: "Buy Crypto",
      tempName: "",
      timestamp: 1714990242000,
      hover: false,
      renaming: false,
      chats: ["1"]
    },
    "5": {
      id: "5",
      name: "What is OTON",
      tempName: "",
      timestamp: 1713607842000,
      hover: false,
      renaming: false,
      chats: ["1"]
    },
    "10": {
      id: "10",
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
        {id: 1, text: "Go to main", href: "/", selected: false},
        {id: 2, text: "Go to explore", href: "/explore", selected: false},
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
    resetTempHistory(state){
      updateTempHistory({
        id: "temp",
        name: "Rename title",
        tempName: "",
        timestamp: 0,
        hover: false,
        renaming: false,
        chats:  ["1"]
      })
    },
    updateTempHistory(state, {payload}: PayloadAction<Partial<HistoryItem>>){
      Object.assign(state.tempHistory, payload)
    },
    addHistoryItem(state, { payload: {items} }: PayloadAction<{items: Array<HistoryItem>}>) {
      console.log("addHistoryItem", items);
      for(const item of items){
        state.histories[item.id] = item
      }
    },
    addChatItem(state, { payload: {items, historyId} }: PayloadAction<{items: Array<ChatItem>, historyId?: string}>) {
      console.log("addChatItem", items);
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
      console.log("updateChatItem", payload);
      for(const {id, item} of payload){
        if(state.chats[id]){
          Object.assign(state.chats[id], item);
        }
      }
    },
    updateHistoryItem(state, { payload }: PayloadAction<Array<{ 
      item: Partial<HistoryItem>, 
      id: string,
    }>>) {
      console.log("updateHistoryItem", payload);
      for(const {id, item} of payload){
        if(state.histories[id]){
          Object.assign(state.histories[id], item);
        }
      }
    },
    emptyChats(state){
      state.chats = {}
    },
    emptyHistories(state){
      state.histories = {}
    },
    removeHistoryItem(state, {payload: {ids, withChats}}:PayloadAction<{ids: Array<string>, withChats: boolean}>){
      console.log("removeHistoryItem", ids, withChats);
      for(const id of ids){
        if (id in state.histories) {
          if(withChats){
            removeChatItem({ids: state.histories[id].chats});
          }
          delete state.histories[id];
        }
      }
    },
    removeChatItem(state, {payload: {ids, historyId}}:PayloadAction<{ids: Array<string>, historyId?: string}>){  
      console.log("removeChatItem", ids, historyId);
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
  emptyChats,
  emptyHistories,
  updateTempHistory,
  resetTempHistory,
} = walletsSlice.actions
export default walletsSlice.reducer