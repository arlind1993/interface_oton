import { memo, useState } from 'react'
import styled from 'styled-components'
import History from './History'
import ChatSection from './ChatSection'
import Row from 'components/Row'
import { useScreenSize } from 'hooks/useScreenSize'
import { screen } from 'test-utils/render';


const Container = styled.main`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
`

const ChatSectionContainer = styled.div`
  display: flex;
  height: calc(100vh  - 72px - 80px );
  width: 100%;
  max-width: 200px;
  padding: 10px;
`
function Chatbot() {
  return (
    <Container data-testid="chatbot-page">
      <History/>
      <Row justify='center'>
        <ChatSectionContainer>
          <ChatSection/>
        </ChatSectionContainer>
      </Row>
      
    </Container>
  )
}

export default memo(Chatbot)
