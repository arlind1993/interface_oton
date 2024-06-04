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
    histories: Record<string, HistoryItem>,
    chats: Record<string, ChatItem>,
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
    },
    "1": {
      id: "1",
      name: "",
      tempName: "",
      timestamp: 1714990242000,
      hover: false,
      renaming: false,
    },
    "5": {
      id: "5",
      name: "3",
      tempName: "",
      timestamp: 1713607842000,
      hover: false,
      renaming: false,
    },
    "23": {
      id: "23",
      name: "432332",
      tempName: "",
      timestamp: 1716199842000,
      hover: false,
      renaming: false,
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
    addHistoryItem(state, { payload }: PayloadAction<HistoryItem>) {
      state.histories[payload.id] = payload
    },
    addChatItem(state, { payload }: PayloadAction<ChatItem>) {
      state.chats[payload.id] = payload;
    },  
    updateChatItem( state, { payload: { id, item} }: PayloadAction<{ 
      id: string,
      item: Partial<ChatItem>
    }>) {
      if(state.chats[id]){
        Object.assign(state.chats[id], item);
      }
    },
    updateHistoryItem(state, { payload: { item, pos, hover, renaming, name, tempName, refs } }: 
        PayloadAction<{ 
        item?: HistoryItem, 
        pos: number,
        hover?: boolean,
        renaming?: boolean,
        name?: string,
        tempName?: string,
        refs?: MutableRefObject<(HTMLInputElement | null)[]>
    }>) {
      if(state.histories[id]){
        Object.assign(state.histories[id], item);
      }
    },
    emptyChats(state){
      state.chats = [];
    },
    emptyHistories(state){
      state.histories = [];
    },
    removeHistoryItem(state, {payload: {pos, refs}}:PayloadAction<{ 
        pos: number,
        refs: MutableRefObject<(HTMLInputElement | null)[]>
    }>){
        state.histories = state.histories.filter((item, index) => index !== pos);
        refs.current = refs.current.filter((_, index) => index !== pos);
    },
    removeChatItem(state, {payload: {pos, refs}}:PayloadAction<{ 
      pos: number,
      refs: MutableRefObject<(HTMLTextAreaElement | null)[]>
    }>){
        state.chats = state.chats.filter((_, index) => index !== pos);
        refs.current = refs.current.filter((_, index) => index !== pos);
    },
    removeAfterChatItem(state, {payload: {pos, refs}}:PayloadAction<{ 
      pos: number,
      refs: MutableRefObject<(HTMLTextAreaElement | null)[]>
    }>){
        state.chats = state.chats.filter((_, index) => index <= pos);
        refs.current = refs.current.filter((_, index) => index <= pos);
    },
  },
})

export const { 
  addHistoryItem, 
  addChatItem, 
  updateChatItem, 
  updateHistoryItem, 
  removeHistoryItem,
  removeAfterChatItem,
  removeChatItem, 
  emptyChats,
  emptyHistories,
} = walletsSlice.actions
export default walletsSlice.reducer