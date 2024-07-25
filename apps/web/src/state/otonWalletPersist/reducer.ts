import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OtonUserInfo } from 'pages/Landing/components/OtonWallet/OtonUserInfo';


export interface OtonWalletPersistState {
    isSignedIn: boolean,
    otonUserData: OtonUserInfo | null,
    hashedPassword: string | null,
}
const initialState: OtonWalletPersistState = {
  isSignedIn: false,
  otonUserData: null,
  hashedPassword: null,
}

const otonWalletPersistSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    setOtonUserData(state, {payload}: PayloadAction<OtonUserInfo | null>){
      state.otonUserData = payload;
      state.isSignedIn = payload != null;
    },
    setHashedPassword(state, {payload}: PayloadAction<string | null>){
        state.hashedPassword = payload;
    }
  },
})

export const { 
    setOtonUserData,
    setHashedPassword,
} = otonWalletPersistSlice.actions
export default otonWalletPersistSlice.reducer