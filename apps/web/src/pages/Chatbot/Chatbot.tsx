import { memo, useRef } from 'react'
import styled from 'styled-components'
import History from './History'
import ChatSection from './ChatSection'
import Row from 'components/Row'


const Container = styled.main`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
`

const ChatSectionContainer = styled.div`
  display: flex;
  height: calc(100vh  - 72px - 80px );
  width: clamp(400px, 100%, 600px);
  padding: 10px;
`

function Chatbot() {
  return (
    <Container data-testid="chatbot-page">
      <History></History>
      <Row justify='center'>
        <ChatSectionContainer>
        <ChatSection></ChatSection>
      </ChatSectionContainer>
      </Row>
      
    </Container>
  )
}

export default memo(Chatbot)
