
import { ColumnCenter } from '../../../../components/Column'
import Modal from '../../../../components/Modal'
import Row from '../../../../components/Row'
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside'
import { Trans } from '../../../../i18n'
import React, { useState } from 'react'
import { useRef } from 'react'
import { X } from 'react-feather'
import { useCloseModal, useModalIsOpen } from '../../../../state/application/hooks'
import { ApplicationModal } from '../../../../state/application/reducer'
import styled from 'styled-components'
import { ExternalLink, ThemedText } from '../../../../theme/components'
import { Register } from './Register'
import { SignIn } from './SignIn'
import { BaseButton } from 'components/Button'

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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 20px;
`;

const SwitchButton = styled(BaseButton)<{active: boolean}>`
  background: none;
  border-bottom: 2px solid ${({ active, theme }) => active ? theme.accent1 : 'transparent'};
  color: ${({ active, theme }) =>  active ? theme.accent1 : 'white'};
  font-size: 18px;
  font-weight: 535;
  padding: 8px;
  border-radius: 0;
  &:focus,
  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.accent1};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
`;

export const SubmitButton = styled.button`
  padding: 10px;
  background: #007BFF;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export function OtonWalletModal() {
  const modal = ApplicationModal.OTON_WALLET_SIGN_IN
  const isOpen = useModalIsOpen(modal)
  const closeModal = useCloseModal()
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => (isOpen ? closeModal(modal) : undefined));
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <StyledModal isOpen={isOpen} maxWidth={486} slideIn>
      <Wrapper ref={ref}>
      
        <CloseButton onClick={() => closeModal(modal)} data-testid="get-the-app-close-button">
          <CloseIcon />
        </CloseButton>
        <ColumnCenter>
          <ButtonGroup>
            <SwitchButton active={isSignIn} onClick={() => setIsSignIn(true)}>
              Sign In
            </SwitchButton>
            <SwitchButton active={!isSignIn}  onClick={() => setIsSignIn(false)}>
              Register
            </SwitchButton>
          </ButtonGroup>
          {isSignIn ? (<SignIn/>) : (<Register/>)}
        </ColumnCenter>
      </Wrapper>
    </StyledModal>
  )
}
