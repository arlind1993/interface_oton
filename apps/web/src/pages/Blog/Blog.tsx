import { ButtonEmphasis, ButtonSize, ThemeButton } from 'components/Button';
import {Fragment, memo, useCallback, useRef, useState} from 'react'
import { Trans } from 'react-i18next'
import styled from 'styled-components'
import { title } from '../../nft/components/collection/TransactionCompleteModal.css';
import { timeAgo } from 'pages/Chatbot/History';

const Container = styled.div`
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  postion: absolute;
  padding: 10px;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  align-items: flex-start;
  grid-auto-rows: 1fr;
`;

const BlogItem = styled(ThemeButton)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface BlogItem{
  id: string;
  image: string;
  timestamp: number;
  tags: string[]| string;
  title: string;
  description: string;
  href: string;
}


function Blog() {
const [data, setData] = useState<BlogItem[]>([
    {
      id: "1",
      image: "https://images.ctfassets.net/oc3ca6rftwdu/6g4SAhpT4VBbQbrhu0fAjz/173213a85e13011c261997deb0a0402c/Untitled__1_.png",
      timestamp: 212323244,
      tags: ["tech"],
      title: "Buy crypto using Robinhood Connect on the Uniswap mobile app",
      description: "Users of the Uniswap mobile app can now buy crypto with a debit card, via bank transfer, or directly from their Robinhood balance using Robinhood Connect.",
      href: "https://blog.uniswap.org/measuring-price-improvement-with-order-flow-auctions"
    },
    {
      id: "2",
      image: "https://images.ctfassets.net/oc3ca6rftwdu/wnUutcbVIuQVWA7khnI6U/e7e24b20bc699498055b5b40d030620f/Extension_Beta_Banner.png",
      timestamp: 3245352,
      tags: ["products"],
      title: "Access the Uniswap Extension Beta",
      description: "We are excited to begin rolling out the Uniswap Extension to users on the waitlist.",
      href: "https://blog.uniswap.org/uniswap-extension-beta"
    },
    {
      id: "3",
      image: "https://images.ctfassets.net/oc3ca6rftwdu/1WJkM4HQUuDFSKKsa3Tdr3/354fbb3…/uniswapxacross.png",
      timestamp: 32453525253,
      tags: "protocols",
      title: "Uniswap Labs and Across propose standard for cross-chain intents",
      description: "Uniswap Labs and Across team up to propose a unified framework for intents-based systems to specify cross-chain actions.",
      href: "https://blog.uniswap.org/uniswap-labs-and-across-propose-standard-for-cross-chain-intents",
    },
  ]);

  const renderItem = useCallback((item: BlogItem) => (
    <Fragment key={item.id}>
      <BlogItem onClick={()=>{
        console.log("href" + item.href)}}
        emphasis={ButtonEmphasis.medium}
        size={ButtonSize.medium}
      >     
          {item.title}
          <br/>
          {timeAgo(item.timestamp)}
      </BlogItem>
    </Fragment>
  ), []);

  
  return (
    <Container data-testid="blog-page">
      <h1>
          <Trans>
              Get the latest updates, news and announcements from the OTON Team
          </Trans>
      </h1>
      <BlogGrid>
        {data.map((item)=> renderItem(item))}
      </BlogGrid>
    </Container>
  )
}

export default memo(Blog)
