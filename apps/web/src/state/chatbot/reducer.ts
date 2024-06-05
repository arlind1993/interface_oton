import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MutableRefObject } from 'react';
// import { shallowEqual } from 'react-redux'

export interface HistoryItem {
  id: string;
  name: string;
  tempName: string;
  timestamp: number;
  hover: boolean;
  renaming: boolean;
  chats: string[];
}
export interface ChatItem {
  id: string;
  text: string;
  tempText: string;
  type: string;
  isChatbotText: boolean;
  status: string;
  hover: boolean;
  editing: boolean;
  options?: OptionsItem[];
}

export interface OptionsItem {
  id: number;
  text: string;
  href: string;
  selected: false;
}

export interface ChatbotState {
  histories: Record<string, HistoryItem>;
  chats: Record<string, ChatItem>;
}
const initialState: ChatbotState = {
  histories: {
    "2": {
      id: "2",
      name: "d",
      tempName: "",
      timestamp: 1715076642000,
      hover: false,
      renaming: false,
      chats: []
    },
    "1": {
      id: "1",
      name: "",
      tempName: "",
      timestamp: 1714990242000,
      hover: false,
      renaming: false,
      chats: []
    },
    "5": {
      id: "5",
      name: "3",
      tempName: "",
      timestamp: 1713607842000,
      hover: false,
      renaming: false,
      chats: []
    },
    "23": {
      id: "23",
      name: "432332",
      tempName: "",
      timestamp: 1716199842000,
      hover: false,
      renaming: false,
      chats: []
    },
  },
  chats: {
    "1" : {
      id: "1",
      text: "Hello, how can I help you ",
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
    addHistoryItem(state, { payload: {items} }: PayloadAction<{items: Array<HistoryItem>}>) {
      for(const item of items){
        state.histories[item.id] = item
      }
    },
    addChatItem(state, { payload: {items, historyId} }: PayloadAction<{items: Array<ChatItem>, historyId?: string}>) {
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
    removeHistoryItem(state, {payload: {ids}}:PayloadAction<{ids: Array<string>}>){
      for(const id of ids){
        if (id in state.histories) {
          delete state.histories[id];
        }
      }
    },
    removeChatItem(state, {payload: {ids, historyId}}:PayloadAction<{ids: Array<string>, historyId?: string}>){  
      for(const id of ids){
        if (id in state.chats) {
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
} = walletsSlice.actions
export default walletsSlice.reducer