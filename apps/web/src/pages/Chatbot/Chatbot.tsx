import { memo, useRef } from 'react'
import styled from 'styled-components'
import History from './History'
import ChatSection from './ChatSection'


const Container = styled.main`
  display: flex;
  flex-direction: row;
  flex: 1;
  bottom: 0;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
`


function Chatbot() {
  return (
    <Container data-testid="chatbot-page">
      <History></History>
      <ChatSection></ChatSection>
    </Container>
  )
}

export default memo(Chatbot)
