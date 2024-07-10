import { InterfacePageName } from '@uniswap/analytics-events'
import { Trace } from 'analytics'
import { ButtonPrimary, SmallButtonPrimary } from 'components/Button'
import { Trans } from 'i18n'
import { useIsMobile } from 'nft/hooks'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ThemedText } from 'theme/components'
import { useIsDarkMode } from 'theme/components/ThemeToggle'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  line-height: 1.6;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({theme})=> theme.accent1};
  text-align: center;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  color: ${({theme})=> theme.accent1};
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const DownloadSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export default function Whitepaper() {
    const pdfUrl = '/docs/Whitepaper.pdf';

  return (
    <Container>
      <Title>OTON – THE FIRST PLATFORM TO INCORPORATE AI</Title>
      
      <Section>
        <Paragraph>
          The cryptocurrency market has witnessed unprecedented growth and innovation over the past decade. However, navigating this complex ecosystem remains a challenge for many, especially those without a financial or technical background. In many cases, individuals find themselves with a considerable amount of money they want to invest but little to no knowledge of how to navigate the cryptocurrency market, leading to significant losses and misuse of their funds.
        </Paragraph>
        <Paragraph>
          Enter OTON, a revolutionary crypto platform designed to democratize access to the world of digital currencies. Leveraging the power of Artificial Intelligence (AI), OTON empowers users to make informed investment decisions, regardless of their prior experience. The OTON AI feature will be invaluable, guiding and informing users about their investment options. However, it is important to note that OTON AI will not manage user assets without their permission or command, nor will it suggest the best investment; the final decision will always rest with the user. With a suite of features including a secure wallet, seamless trading, market trend analysis, and the versatile OTON coin, our platform is poised to redefine the crypto investment landscape.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>Functionalities of OTON</SubTitle>
        <FeatureList>
          <FeatureItem>
            <FeatureTitle>1. Wallet</FeatureTitle>
            <Paragraph>
              OTON offers a robust and secure digital wallet, ensuring that users can safely store and manage their cryptocurrencies. The wallet supports multiple cryptocurrencies, allowing users to hold a diverse portfolio in one convenient place. Advanced security protocols, including multi-factor authentication and encryption, ensure that users' assets are protected against potential threats. AI enhances the wallet experience by providing security alerts, transaction optimization tips, and personalized portfolio management advice, making it easier for users to handle their assets with confidence. The wallet will keep your information about the history of trading you have completed with your account, provided by programs like MetaMask, which will ensure the security of your finances. In our platform we offer an account subscription, which will allow you to use every service we present. In return you will be charged a small fee for every trade you complete, on the percentage of the sum.
            </Paragraph>
          </FeatureItem>

          <FeatureItem>
            <FeatureTitle>2. Trade</FeatureTitle>
            <Paragraph>
              Our platform provides a user-friendly trading interface that caters to both beginners and seasoned traders. The AI-driven trading assistant offers real-time insights and recommendations, helping users to make informed decisions. With OTON, users can execute trades swiftly and efficiently, taking advantage of market opportunities as they arise. AI tools analyze market trends, historical data, and user preferences to provide tailored advice and strategies, ensuring that even novice traders can navigate the market effectively. You can use the platform, to store, navigate, sell and explore. At your disposal is also OTON coin, which can be used as a transition from one cryptocurrency to the other. If you have questions, and are still unclear about how the coin or our platform works you can always ask our AI services to your aid.
            </Paragraph>
          </FeatureItem>

          <FeatureItem>
            <FeatureTitle>3. Trending Observe</FeatureTitle>
            <Paragraph>
              Staying updated with market trends is crucial for successful investing. OTON's Trending Observe feature utilizes AI algorithms to analyze market data and identify emerging trends. This tool provides users with up-to-date information on market movements, popular coins, and potential investment opportunities, enabling them to stay ahead of the curve. AI continuously scans the market for relevant news, social media sentiment, and trading patterns, delivering comprehensive insights that empower users to make proactive investment decisions. Simplify the process of observing the crypto market with our platform. Spend more time analyzing relatable information, then searching for it.
            </Paragraph>
          </FeatureItem>

          <FeatureItem>
            <FeatureTitle>4. OTON Coin</FeatureTitle>
            <Paragraph>
              The OTON coin is a versatile digital asset that plays a central role in our platform. It can be converted into multiple cryptocurrencies, serving as a bridge between different digital assets. The OTON coin facilitates seamless transactions within the platform and offers users various benefits, such as reduced trading fees and access to exclusive features. The incorporated AI chatbot assists users at every step, from conversion to trading, eliminating the need for extensive research. The chatbot provides instant answers and guidance, making the process intuitive and straightforward. You do not have to enter a rabbit hole of research on how to trade our coin. Just simply ask our AI to help, and inform you. No matter your background, OTON coin and platform was made to serve a simpler form of trading, buying and selling in the crypto market.
            </Paragraph>
          </FeatureItem>

          <FeatureItem>
            <FeatureTitle>5. Liquidity Pools</FeatureTitle>
            <Paragraph>
              OTON incorporates AI-enhanced liquidity pools, providing users with the opportunity to earn rewards by supplying liquidity to the platform. These pools function similarly to traditional liquidity pools but with the added advantage of AI optimization. AI algorithms manage liquidity distribution, predict market fluctuations, and adjust pool parameters in real-time to maximize returns and minimize risks for liquidity providers. This ensures a more stable and profitable liquidity provision experience for all users.
            </Paragraph>
          </FeatureItem>
        </FeatureList>
      </Section>

      <Section>
        <SubTitle>Vision for OTON</SubTitle>
        <Paragraph>
          At OTON, our vision is to create a crypto platform that is accessible, secure, and empowering for everyone. We believe that AI has the potential to transform the way people interact with cryptocurrencies, making investment decisions more informed and less daunting. We wanted to build a platform where you do not need to lose money, because the information provided is too complicated for someone outside the field of investment. Our goal is to foster a vibrant and inclusive community where users can confidently navigate the crypto market, harnessing the full potential of digital assets, and making the most out of their investments. By continuously innovating and enhancing our platform, we aim to lead the charge in the next wave of crypto adoption, ensuring that everyone has the opportunity to participate in the digital economy, using AI to simplify the information for them.
        </Paragraph>
      </Section>

      <DownloadSection>
        <ButtonPrimary onClick={()=>window.open(pdfUrl, '_blank')} >
          Download Whitepaper as PDF
        </ButtonPrimary>
      </DownloadSection>
    </Container>
  );
}
