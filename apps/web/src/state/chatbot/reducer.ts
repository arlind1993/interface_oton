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
    histories: HistoryItem[],
    chats: ChatItem[],
}
const initialState: ChatbotState = {
    histories: [
        {
          id: "2",
          name: "d",
          tempName: "",
          timestamp: 1715076642000,
          hover: false,
          renaming: false,
        },
        {
          id: "1",
          name: "",
          tempName: "",
          timestamp: 1714990242000,
          hover: false,
          renaming: false,
        },
        {
          id: "5",
          name: "3",
          tempName: "",
          timestamp: 1713607842000,
          hover: false,
          renaming: false,
        },
        {
          id: "23",
          name: "432332",
          tempName: "",
          timestamp: 1716199842000,
          hover: false,
          renaming: false,
        },
      ],
    chats: [
        {
          id: "1",
          text: "Hello, how can I help you ",
          tempText: "",
          isChatbotText: true,
          type: "text",
          hover: false,
          editing: false,
          status: "completed",
        },
        {
          id: "2",
          text: "I'd like to know ....",
          tempText: "",
          type: "text",
          isChatbotText: false,
          hover: false,
          editing: false,
          status: "completed",
        },
        {
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
        {
          id: "4",
          text: "4",
          tempText: "",
          isChatbotText: true,
          hover: false,
          type: "text",
          editing: false,
          status: "completed",
        },
      ],
}

const walletsSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    addHistoryItem(state, { payload }: PayloadAction<HistoryItem>) {
      state.histories = [...state.histories, payload]
    },
    addChatItem(state, { payload }: PayloadAction<ChatItem>) {
      state.chats =  [...state.chats, payload]
    },  
    updateChatItem( state, { payload: { item, pos, hover, editing, text, status, tempText, refs } }: 
        PayloadAction<{ 
        item?: ChatItem, 
        pos: number,
        hover?: boolean,
        editing?: boolean,
        text?: string,
        status?: string,
        tempText?: string,
        refs?: MutableRefObject<(HTMLTextAreaElement | null)[]>
    }>) {
        const dcp = [...state.chats];
        const index = pos;
        item = dcp[index];

        console.log(1);
        if(index >= 0){

          console.log(2);
          if(hover != undefined && hover != null){
            item.hover = hover;
          }
          console.log(3);
          if(editing != undefined && editing != null){
            item.editing = editing;
            if(editing){
              item.tempText = item.text;
              setTimeout(()=>{
                if(refs && refs.current[index]){
                  refs.current[index]?.focus();
                }
              });
            }else{
              item.tempText = "";
            }
            if(refs && refs.current[index]){
              refs.current[index]!.innerHTML = item.text;
            }
          }
          if(text != undefined && text != null){
            item.text = text;
          }
          if(status != undefined && status != null){
            item.status = status;
          }
          if(tempText != undefined && tempText != null){
            item.tempText = tempText;
          }
          dcp[index] = item;
          state.chats = dcp;
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
        const dcp = [...state.histories];
        const index = pos;
        item = dcp[pos];
        if(index >= 0){
          if(hover != undefined && hover != null){
            item.hover = hover;
          }
          if(renaming != undefined && renaming != null){
            item.renaming = renaming;
            if(renaming){
              item.tempName = item.name;
              setTimeout(()=>{
                if(refs && refs.current[index]){
                  refs.current[index]?.focus();
                }
              } );
            }else{
              console.log(item);
              item.tempName = "";
            }
            if(refs && refs.current[index]){
              refs.current[index]!.innerHTML = item.name;
            }
          }
          if(name != undefined && name != null){
            item.name = name;
          }
          if(tempName != undefined && tempName != null){
            item.tempName = tempName;
          }
          dcp[index] = item;
          state.histories = dcp;
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