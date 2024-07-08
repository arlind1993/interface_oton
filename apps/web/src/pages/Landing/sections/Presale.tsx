import Row from 'components/Row'
import { t, Trans } from 'i18n'
import { useMemo } from 'react'
import styled from 'styled-components'
import { StatCard } from '../components/StatCard'
import { motion } from 'framer-motion'
import { Box } from 'rebass'

const Container = styled.div`
  width: 100%;
  max-width: 1360px;
  backround: green;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40px;

  @media (max-width: 960px) {
    max-height: 360px;
  }

  @media (max-width: 768px) {
    max-height: none;
    padding: 0 48px;
  }
  @media (max-width: 468px) {
    padding: 0 24px;
  }
`

const Heading = styled.div`
  font-feature-settings: 'ss07' on;
  font-family: Basel;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 44px;
  white-space: pre-line;
  text-wrap: pretty;
`

const Description = styled.div`
  width: 100%;
  max-width: 1360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40px;

  @media (max-width: 960px) {
    max-height: 360px;
  }
  @media (max-width: 768px) {
    max-height: none;
    padding: 0 48px;
  }
  @media (max-width: 468px) {
    padding: 0 24px;
  }
`

const PresaleCard = motion(styled(Row)`
  position: relative;
  border-radius: 32px;
  width: 100%;
  cursor: pointer;
  height: ${(props) => props.height || '609px'};
  overflow: hidden;
  text-decoration: none;
  @media (max-width: 1024px) {
    height: ${(props) => props.height || '516px'};
    min-height: ${(props) => props.minHeight || '240px'};
  }
  @media (max-width: 768px) {
    height: auto;
    min-height: ${(props) => props.minHeight || '240px'};
  }
`)


const Backers = styled.div`
`;

const Item = styled.div`

`



export function Presale() {
    const backers = [
        {
            name: "Eugen Laci",
            count: 100   
        },   
        { 
            name: "Mira Nole",
            count: 100   
        },  
    ];
    const presaleData = [
    {
        from: {
            code: "ETH",
            name: "Etherium",
            count: 1,
        },
        to: {
            code: "OTON",
            name: "Oton",
            count: 100,
        }
    },{
        from: {
            code: "BTC",
            name: "Bitcoin",
            count: 1,
        },
        to: {
            code: "OTON",
            name: "Oton",
            count: 100,
        }
    },{
        from: {
            code: "USDT",
            name: "Tether",
            count: 1,
        },
        to: {
            code: "OTON",
            name: "Oton",
            count: 100,
        }
    },
    ];
    return (
    <Container>
        <Heading>
            Discover OTON: The Future of Crypto Investment!
        </Heading>
        <Description>
        Experience seamless, AI-powered trading with OTON's secure wallet, trend analysis, and versatile OTON coin. Join the revolution that democratizes crypto investments, making it accessible for everyone. Choose OTON for its cutting-edge AI insights and user-friendly interface, empowering you to make informed decisions with ease. Be among the first 100 to sign up and receive free OTON coins – your gateway to a smarter crypto journey!
        </Description>
        {
            presaleData.map((data)=> {
                return (
                <PresaleCard>
                    <div>
                        {data.from.name}
                    </div>
                    <div>
                        {}
                    </div>

                </PresaleCard>
                )
            })
        }
        <Backers>
        {
            backers.map((data) => {
                return (
                <Item>
                    {data.name}
                    {data.count}
                </Item>
                )
            })
        }
        </Backers>
    </Container>

    )
}