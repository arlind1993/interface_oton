import Row from 'components/Row'
import { t, Trans } from 'i18n'
import { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { StatCard } from '../components/StatCard'
import { motion } from 'framer-motion'
import { RightArrow } from 'ui/src/components/icons'
import { PortfolioLogo } from 'components/AccountDrawer/MiniPortfolio/PortfolioLogo'
import { Chain, useTokenPromoQuery } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import { ChainId, CurrencyAmount } from '@uniswap/sdk-core';
import { USDT, WBTC, ETH_Added, NATIVE_CHAIN_ID } from 'constants/tokens'
import { Token, UNI_ADDRESSES, WETH9 } from '@uniswap/sdk-core'
import { useNavigate } from 'react-router-dom'
import { useCurrency } from 'hooks/Tokens'
import { chainIdToBackendName, getTokenDetailsURL } from 'graphql/data/util'
import { NumberType, useFormatter } from 'utils/formatNumbers'
import { Box } from '../components/Generics'
import { AiIcon, UniIcon } from 'components/Logo/UniIcon'
import { Table } from 'components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { timeAgo } from '../../Chatbot/History';
import { Amount } from '../../../../../../dist/out-tsc/packages/uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { useModalIsOpen } from 'state/application/hooks'
import { ApplicationModal, setOpenModal } from 'state/application/reducer'

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
    max-width: 700px;
    text-align: center;
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
    color: ${({ theme }) => theme.neutral2};
    font-weight: 485;
    font-size: 0.85em;
    font-height: 0.85em;
    line-height: 1.5em;
    margin-bottom: 10px;
    max-width: 700px;
`

const PresaleCard = styled.div`
  width: 100%;
  height: 72px;
  max-width: 700px;
  overflow: hidden;
  padding: 16px;
  padding-right: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.surface1};
  @media (max-width: 1024px) {
    height: 64px;
    padding-right: 16px;
  }
  @media (max-width: 768px) {
    height: 56px;
    padding-right: 16px;
  }
  @media (max-width: 468px) {
    height: 48px;
    padding: 12px;
    border-radius: 16px;
  }
  transition: background-color 125ms ease-in, transform 125ms ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.surface2};
    transform: scale(1.03);
  }
`

const TokenPrice = styled.div`
  padding: 0;
  margin: 0;
  font-family: Basel;
  font-size: 12px;
  line-height: 16px;
  font-style: normal;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: white;
`


const TableContainer = styled.div`
  max-width: 800px;
  min-width: 400px;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow: auto;
`;

const CellContainer = styled.div<{minWidth?: number, maxWidth?: number}>`
  padding: 8px;
  min-width: ${(props) => props.minWidth ?? 150}px;
  max-width: ${(props) => props.maxWidth ?? 300}px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NumberContainer = styled.div`
  padding: 8px;
  min-width: 50px; /* Minimum width for each column */
  max-width: 50px; /* Maximum width for each column */
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TokenName = styled.div`
    font-family: Basel;
    font-size: 18px;
    line-height: 24px;
    font-style: normal;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #FFFFFF;
`;
const LogoContainer = styled.div`
    width: 38px;
    height: 38px;
    border-radius: 50%;
    align-items: center;
    position: relative;
    background: ${(({theme})=> theme.accent1)};
    top: 0;
    left: 0;
    padding: 5px;
`

const TokenTicker = styled.div`
    font-family: Basel;
    font-size: 18px;
    line-height: 24px;
    font-style: normal;
    font-weight: 500;
    color: #9B9B9B;
`


function Exchange({ from, to, toConversionToUSDT}: { from: Token; to: Token, toConversionToUSDT: number }) {
    

    const modal = ApplicationModal.OTON_WALLET_SIGN_IN;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isOpen = useModalIsOpen(modal)
    const { formatFiatPrice } = useFormatter()
    
    const chainId = from.chainId
    const address = from.address
    
    const currency = useCurrency(address, chainId)
    const tokenPromoQuery = useTokenPromoQuery({
      variables: {
        address: currency?.wrapped.address,
        chain: chainIdToBackendName(chainId),
      },
    })
    const price = tokenPromoQuery.data?.token?.market?.price?.value ?? 0
    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
            console.log("lol" + isOpen);
            e.stopPropagation()
            // navigate(
            //     getTokenDetailsURL({
            //         address: address === 'ETH' ? NATIVE_CHAIN_ID : address,
            //         chain: chainIdToBackendName(chainId),
            //     })
            // )
            if(!isOpen){
                dispatch(setOpenModal(modal));
            }
        },
        [address, ,chainId, navigate, isOpen]
    )

    const priceFormated = formatFiatPrice({
        price: price/toConversionToUSDT,
        type: NumberType.FiatTokenPrice,
    })

    const priceShown = priceFormated.substring(1,priceFormated.length);
    return (

        <PresaleCard>
            <Box onClick={handleClick} gap="12px">
                <PortfolioLogo currencies={[currency]} chainId={chainId} size={38} />
                <Box direction="column" width="auto" gap="2px" align="flex-start" overflow="hidden">
                    <Box width="auto" gap="8px" align="center" overflow="hidden">
                        <TokenName>{from.name}</TokenName>
                        <TokenTicker>{from.symbol}</TokenTicker>
                    </Box>
                    <Box width="auto" gap="8px" align="center">
                        <TokenPrice>
                            1
                        </TokenPrice>
                    </Box>
                </Box>
            </Box>
            <Box justify="flex-end" gap="12px">
                <LogoContainer>
                    <AiIcon></AiIcon>
                </LogoContainer> 
                <Box direction="column" width="auto" gap="2px" align="flex-end" overflow="hidden">
                    <Box width="auto" gap="8px" align="center" overflow="hidden">
                        <TokenName>{to.name}</TokenName>
                        <TokenTicker>{to.symbol}</TokenTicker>
                    </Box>
                    <Box width="auto" gap="8px" align="center">
                        <TokenPrice >
                            {priceShown}
                        </TokenPrice>
                    </Box>
                </Box>
            </Box>
        </PresaleCard>
    )
  }





export function Presale() {

    const backers = [
        { 
            profile: "https://avatar.iran.liara.run/public",
            count: 14,   
            lastTime: 343334332 
        },   
        {
            profile: "https://avatar.iran.liara.run/public",
            name: "Eugen Laci",
            count: 100,
            lastTime: 343534332   
        },   
        { 
            profile: "https://avatar.iran.liara.run/public",
            name: "Mira Nole",
            count: 14,   
            lastTime: 343334332 
        },   
        { 
            profile: "https://avatar.iran.liara.run/public",
            name: "Mira Nole",
            count: 14,   
            lastTime: 343334332 
        },  {
            profile: "https://avatar.iran.liara.run/public",
            name: "Eugen Laci",
            count: 100,
            lastTime: 343534332   
        },   
        { 
            profile: "https://avatar.iran.liara.run/public",
            name: "Mira Nole",
            count: 14,   
            lastTime: 343334332 
        },   
    ];
    const sortedBackers = backers.sort((a,b) => b.count - a.count);

    const columns: ColumnDef<{ profile: string; name?: string; count: number; lastTime: number }>[] = [
        {
            header: () => <CellContainer minWidth={50} maxWidth={50}>#</CellContainer>,
            accessorKey: 'index',
            cell: ({ row }) => <CellContainer minWidth={50} maxWidth={50}>{row.index + 1}</CellContainer>,
        },
        {
            header:  () => <CellContainer minWidth={50} maxWidth={60}>Profile</CellContainer>,
            accessorKey: 'profile',
            cell: ({ getValue }) => <CellContainer minWidth={50} maxWidth={60}><img src={getValue<string>()} alt="Profile" width="40" height="40" /></CellContainer>
        },
        {
            header: () => <CellContainer>Address</CellContainer>,
            accessorKey: 'name',
            cell: ({ getValue }) => <CellContainer>{getValue<string>()??"Anonymous"}</CellContainer>,
        },
        {
            header:  () => <CellContainer>Total Amount</CellContainer>,
            accessorKey: 'count',
            cell: ({ getValue }) => <CellContainer>{getValue<number>()}</CellContainer>,
        },
        {
            header:  () => <CellContainer>Last Time</CellContainer>,
            accessorKey: 'lastTime',
            cell: ({ getValue }) => <CellContainer>{timeAgo(getValue<number>())}</CellContainer>,
        },
      ];

    const from = [
        ETH_Added,
        USDT,
        WBTC,
    ]
    const to = new Token(
        ChainId.MAINNET,
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        8,
        "OTON",
        "Oton"    
    )

    const toPriceInDollars = 1;

    return (
    <Container>
        <Heading>
            Discover OTON: The Future of Crypto Investment!
        </Heading>
        <Description>
            Experience seamless, AI-powered trading with OTON's secure wallet, trend analysis, and versatile OTON coin. Join the revolution that democratizes crypto investments, making it accessible for everyone. Choose OTON for its cutting-edge AI insights and user-friendly interface, empowering you to make informed decisions with ease. Be among the first 100 to sign up and receive free OTON coins – your gateway to a smarter crypto journey!
        </Description>
        {
            from.map((data, index)=> {
                return <Exchange key={""+index} from={data} to={to} toConversionToUSDT={toPriceInDollars}/>
            })
        }
        <Description>
            Here is a list of our current holders.
        </Description>
        <TableContainer>
            <Table maxHeight={680} columns={columns} data={sortedBackers} loading={false}/>
        </TableContainer>
    </Container>

    )
}