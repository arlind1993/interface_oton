
import { ColumnCenter } from '../../../../components/Column'
import Modal from '../../../../components/Modal'
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside'
import { Trans } from '../../../../i18n'
import { ChangeEvent, MouseEventHandler, ClipboardEvent, createContext, useContext, useEffect, useState } from 'react'
import { useRef } from 'react'
import { X } from 'react-feather'
import { useCloseModal, useModalIsOpen } from '../../../../state/application/hooks'
import { ApplicationModal } from '../../../../state/application/reducer'
import styled from 'styled-components'
import { BaseButton, ButtonEmphasis, ButtonPrimary, ButtonSecondary, ButtonSize, ThemeButton } from 'components/Button'
import createWallet from './reqs/createWallet'
import OtonWallet from './OtonWallet'
import { OtonUserInfo } from './OtonUserInfo'
import fetchWalletData from './reqs/fetchWallet'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { setPassphrase, setVisibility, updatePassphrases, emptyData, OtonModalType, setOtonModalType} from 'state/otonWallet/reducer'
import { OtonMain } from './OtonMain'
import { OtonForgot } from './OtonForgot'
import { OtonCreate } from './OtonCreate'
import { OtonLogged } from './OtonLogged'
import { on } from 'events'
import { BackArrow } from 'ui/src/components/icons/BackArrow'
 
const StyledModal = styled(Modal)`
  display: block;
`
const Wrapper = styled.div`
  position: relative;
  padding: 60px 32px 32px 32px;
  width: 100%;
  user-select: none;
`
const CloseIcon = styled(X)`
  width: 25px;
  height: 25px;
  stroke: ${({ theme }) => theme.neutral2};
`
const CloseButton = styled.div`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 28px;
  right: 23px;
  border-radius: 160px;
  padding: 4px;
  cursor: pointer;
  background: ${({ theme }) => theme.surface3};
  :hover {
    ${CloseIcon} {
      stroke: ${({ theme }) => theme.neutral1};
    }
  }
`

export const ModalHeading = styled.h1`
  padding: 0 20px;
  margin-bottom: 0;
  text-align: center;
`

export const ModalDescription = styled.p`
  text-align: center;
`

export const FormSubmitButton = styled(ButtonPrimary)`
  padding: 5px;
  margin: 10px 0;
  border-radius: 8px;
  font-size: 16px;
  line-height: normal;
`

export const FormSecondarySubmitButton = styled(ButtonSecondary)`
  padding: 5px;
  margin: 10px 0;
  border-radius: 8px;
  font-size: 16px;
  line-height: normal;
`

export const EasyButton = styled(BaseButton)`
  background: none;
  color: ${({ theme }) => theme.accent1};
  font-size: 16px;
  line-height: normal;
  font-weight: 535;
  padding: 0px;
  width: unset;
  border-radius: 0;
`

const BButton = styled(BaseButton)`
  background: none;
  color: ${({ theme }) => theme.neutral2};
  font-size: 16px;
  line-height: normal;
  align-self: flex-start;
  font-weight: 535;
  padding: 0px;
  width: unset;
  border-radius: 0;
`


export const BackButton = ({onClick}: {onClick?: MouseEventHandler<HTMLButtonElement>})=> {
  return (
    <BButton onClick={onClick}> 

    
        <BackArrow/>
        Back
    </BButton> 
  );
}

const OtonWalletContext = createContext<OtonWallet | null>(null);

export function useOtonWalletContext(): OtonWallet {
  const context = useContext(OtonWalletContext)
  if (!context) throw new Error('useOtonWalletContext must be used within a OtonWalletProvider')
  return context
}

function OtonWalletProvider({ children }: { children: React.ReactNode }) {
  // Initialize your OtonWallet instance
  const otonWalletInstance = new OtonWallet();

  return (
    <OtonWalletContext.Provider value={otonWalletInstance}>
      {children}
    </OtonWalletContext.Provider>
  );
}



export function OtonWalletModal() {
  const modal = ApplicationModal.OTON_WALLET_SIGN_IN;
  const isOpen = useModalIsOpen(modal);
  const ref = useRef<HTMLDivElement>(null);
  const closeModal = useCloseModal();  
  const dispatch = useAppDispatch();
  const otonModalType = useAppSelector((state) => state.otonWallet.otonModalType);
  const isSignedIn = useAppSelector((state) => state.otonWalletPersist.isSignedIn);
 
  useEffect(()=>{
    if(isOpen && isSignedIn){
      dispatch(setOtonModalType(OtonModalType.Logged));
    }
  },[isOpen, isSignedIn]);

  const clear = () => {
    closeModal(modal);
    dispatch(emptyData());
    dispatch(setOtonModalType(OtonModalType.Create));
  }

  return (
    <OtonWalletProvider>
      <StyledModal isOpen={isOpen} onDismiss={clear} maxWidth={486} slideIn >
        <Wrapper ref={ref}>
          <CloseButton onClick={clear} data-testid="get-the-app-close-button">
            <CloseIcon />
          </CloseButton>
          {
            otonModalType == OtonModalType.Logged ? <OtonLogged/> :
            otonModalType == OtonModalType.Create ? <OtonCreate/> :
            otonModalType == OtonModalType.Forgot ? <OtonForgot/> :
            <OtonMain/>
          }
        </Wrapper>
      </StyledModal>
    </OtonWalletProvider>
  )
}
