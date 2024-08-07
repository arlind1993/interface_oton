import { ColumnCenter } from 'components/Column'
import Modal from 'components/Modal'
import Row from 'components/Row'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { Trans } from 'i18n'
import { useRef } from 'react'
import { X } from 'react-feather'
import { useCloseModal, useModalIsOpen } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/reducer'
import styled from 'styled-components'
import { ExternalLink, ThemedText } from 'theme/components'

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
const StyledQRCode = styled.img`
  width: 150px;
  height: 150px;
  border: 1px solid ${({ theme }) => theme.surface3};
  border-radius: 12px;
`
const BadgeLink = styled(ExternalLink)`
  stroke: none;
  :hover {
    opacity: 1;
  }
`
export function GetTheAppModal() {
  const isOpen = useModalIsOpen(ApplicationModal.GET_THE_APP)
  const closeModal = useCloseModal()
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => (isOpen ? closeModal(ApplicationModal.GET_THE_APP) : undefined))

  return (
    <StyledModal isOpen={isOpen} maxWidth={486} slideIn>
      <Wrapper ref={ref}>
        <CloseButton onClick={() => closeModal(ApplicationModal.GET_THE_APP)} data-testid="get-the-app-close-button">
          <CloseIcon />
        </CloseButton>
        <ColumnCenter gap="xl">
          <ColumnCenter gap="sm">
            <ThemedText.H1Medium textAlign="center">
              <Trans>Comming soon...</Trans>
            </ThemedText.H1Medium>
            <ThemedText.BodySecondary textAlign="center" maxWidth="400px">
              <Trans>Oton App will be available for everyone. Making things easier and user friendly. Wait for our announcement for any news on our social media platforms</Trans>
            </ThemedText.BodySecondary>
          </ColumnCenter>
        </ColumnCenter>
      </Wrapper>
    </StyledModal>
  )
}
