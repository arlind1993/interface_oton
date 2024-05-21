import { UniIcon } from 'components/Logo/UniIcon'
import styled from 'styled-components'

const AppIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.accent1};
  border: 0.5px solid ${(props) => props.theme.surface3};
  border-radius: 8px;
`
export function MobileAppLogo() {
  return (
    <AppIcon>
      <UniIcon width={42} height={42}/>
    </AppIcon>
  )
}
