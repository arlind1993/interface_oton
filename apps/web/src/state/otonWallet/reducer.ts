import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum OtonModalType{
  Main,
  Create,
  Forgot,
  Logged
}

export interface OtonWalletState {
  passphrases: Array<string>
  errors: Array<string>
  visibilities: Array<boolean>
  otonModalType: OtonModalType
}
const initialState: OtonWalletState = {
  passphrases: Array(12).fill(''),
  errors: Array(12).fill(''),
  visibilities: Array(12).fill(false),
  otonModalType: OtonModalType.Main
}

const otonWalletSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    setPassphrase(state, { payload: {pos, input} }: PayloadAction<{pos: number, input: string}>) {
      if((pos >= 0) && (pos < state.passphrases.length)){
        state.passphrases[pos] = input;
      }
    },
    updatePassphrases(state, {payload}: PayloadAction<Array<string>>){
      if(state.passphrases.length == payload.length){
        state.passphrases = payload;
      } 
    },
    setPassphraseError(state, { payload: {pos, input} }: PayloadAction<{pos: number, input: string}>) {
      if((pos >= 0) && (pos < state.errors.length)){
        state.errors[pos] = input;
      }
    },
    updatePassphraseErrors(state, {payload}: PayloadAction<Array<string>>){
      if(state.errors.length == payload.length){
        state.errors = payload;
      } 
    },
    updateVisibilities(state, {payload}: PayloadAction<Array<boolean>>){
      if(state.visibilities.length == payload.length){
        state.visibilities = payload;
      } 
    },
    setVisibility(state, { payload: {pos, input} }: PayloadAction<{pos: number, input: boolean}>) {
      if((pos >= 0) && (pos < state.visibilities.length)){
        state.visibilities[pos] = input;
      }
    },
    emptyData(state){
      state.passphrases = Array(12).fill('');
      state.visibilities = Array(12).fill(false);
      state.errors = Array(12).fill("");
    },
    setOtonModalType(state, {payload }: PayloadAction<OtonModalType>){
      state.otonModalType = payload
    }
  },
})

export const { 
    setPassphrase, 
    updatePassphrases, 
    setVisibility, 
    updateVisibilities,
    setPassphraseError,
    updatePassphraseErrors,
    setOtonModalType,
    emptyData,
} = otonWalletSlice.actions
export default otonWalletSlice.reducer