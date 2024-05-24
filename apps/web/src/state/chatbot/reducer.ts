// import { createSlice } from '@reduxjs/toolkit'
// import { shallowEqual } from 'react-redux'

// export interface ChatbotState {
//   // Used to track wallets that have been connected by the user in current session, and remove them when deliberately disconnected.
//   // Used to compute is_reconnect event property for analytics
//   // connectedWallets: Wallet[]
//   // switchingChain: ChainId | false
// }
// const initialState: WalletState = {
//   connectedWallets: [],
// }

// const walletsSlice = createSlice({
//   name: 'chatbot',
//   initialState,
//   reducers: {
//     addConnectedWallet(state, { payload }) {
//       if (state.connectedWallets.some((wallet) => shallowEqual(payload, wallet))) return
//       state.connectedWallets = [...state.connectedWallets, payload]
//     },
//     startSwitchingChain(state, { payload }) {
//       state.switchingChain = payload
//     },
//     endSwitchingChain(state) {
//       state.switchingChain = false
//     },
//   },
// })

// export const { addConnectedWallet, startSwitchingChain, endSwitchingChain } = walletsSlice.actions
// export default walletsSlice.reducer