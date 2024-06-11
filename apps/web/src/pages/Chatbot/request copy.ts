import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;

export enum SafetyLevel {
    Blocked = 'BLOCKED',
    MediumWarning = 'MEDIUM_WARNING',
    StrongWarning = 'STRONG_WARNING',
    Verified = 'VERIFIED'
  }
export enum TokenStandard {
    Erc20 = 'ERC20',
    Native = 'NATIVE'
  }
export enum Currency {
    Aud = 'AUD',
    Brl = 'BRL',
    Cad = 'CAD',
    Cny = 'CNY',
    Eth = 'ETH',
    Eur = 'EUR',
    Gbp = 'GBP',
    Hkd = 'HKD',
    Idr = 'IDR',
    Inr = 'INR',
    Jpy = 'JPY',
    Matic = 'MATIC',
    Ngn = 'NGN',
    Pkr = 'PKR',
    Rub = 'RUB',
    Sgd = 'SGD',
    Thb = 'THB',
    Try = 'TRY',
    Uah = 'UAH',
    Usd = 'USD',
    Vnd = 'VND'
  }

export enum Chain {
    Arbitrum = 'ARBITRUM',
    Avalanche = 'AVALANCHE',
    Base = 'BASE',
    Blast = 'BLAST',
    Bnb = 'BNB',
    Celo = 'CELO',
    Ethereum = 'ETHEREUM',
    EthereumGoerli = 'ETHEREUM_GOERLI',
    EthereumSepolia = 'ETHEREUM_SEPOLIA',
    Optimism = 'OPTIMISM',
    Polygon = 'POLYGON',
    UnknownChain = 'UNKNOWN_CHAIN'
  }

export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /**
     * The `AWSJSON` scalar type provided by AWS AppSync, represents a JSON string that
     * complies with [RFC 8259](https://tools.ietf.org/html/rfc8259).  Maps like
     * "**{\\"upvotes\\": 10}**", lists like "**[1,2,3]**", and scalar values like
     * "**\\"AWSJSON example string\\"**", "**1**", and "**true**" are accepted as
     * valid JSON and will automatically be parsed and loaded in the resolver mapping
     * templates as Maps, Lists, or Scalar values rather than as the literal input
     * strings.  Invalid JSON strings like "**{a: 1}**", "**{'a': 1}**" and "**Unquoted
     * string**" will throw GraphQL validation errors.
     */
    AWSJSON: any;
  };
  
export type SearchTokensWebQueryVariables = Exact<{
  searchQuery: string;
  chains?: Array<Chain> | Chain | undefined;
}>;
  
  
export type SearchTokensWebQuery = { 
  __typename?: 'Query', 
  searchTokens?: Array<{ 
    __typename?: 'Token', 
    id: string, 
    decimals?: number, 
    name?: string, 
    chain: Chain, 
    standard?: TokenStandard, 
    address?: string,
    symbol?: string, 
    market?: { 
      __typename?: 'TokenMarket', 
      id: string, 
      price?: { 
        __typename?: 'Amount', 
        id: string, 
        value: number, 
        currency?: Currency
      }, 
      pricePercentChange?: { 
        __typename?: 'Amount', 
        id: string,
        value: number 
      }, volume24H?: { 
        __typename?: 'Amount', 
        id: string,
        value: number, 
        currency?: Currency 
      }
    }, 
    project?: { 
        __typename?: 'TokenProject', 
        id: string, 
        name?: string, 
        safetyLevel?: SafetyLevel, 
        logoUrl?: string , 
        isSpam?: boolean | undefined, 
        logo?: { 
          __typename?: 'Image', 
          id: string, 
          url: string 
        } 
      }
    }>
  };
  

  export const SimpleTokenDetailsFragmentDoc = gql`
  fragment SimpleTokenDetails on Token {
id
address
chain
symbol
name
decimals
standard
project {
  id
  name
  logo {
    id
    url
  }
  safetyLevel
  logoUrl
  isSpam
}
}
  `;

export function useSearchTokensWebQuery(baseOptions: Apollo.QueryHookOptions<SearchTokensWebQuery, SearchTokensWebQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<SearchTokensWebQuery, SearchTokensWebQueryVariables>(SearchTokensWebDocument, options);
  }
export function useSearchTokensWebLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTokensWebQuery, SearchTokensWebQueryVariables>) {
      const options = {...defaultOptions, ...baseOptions}
      return Apollo.useLazyQuery<SearchTokensWebQuery, SearchTokensWebQueryVariables>(SearchTokensWebDocument, options);
    }

export type SearchTokensWebQueryHookResult = ReturnType<typeof useSearchTokensWebQuery>;
export type SearchTokensWebLazyQueryHookResult = ReturnType<typeof useSearchTokensWebLazyQuery>;
export type SearchTokensWebQueryResult = Apollo.QueryResult<SearchTokensWebQuery, SearchTokensWebQueryVariables>;
export const SearchTokensWebDocument = gql`
    query SearchTokensWeb($searchQuery: String!, $chains: [Chain!]) {
  searchTokens(searchQuery: $searchQuery, chains: $chains) {
    ...SimpleTokenDetails
    id
    decimals
    name
    chain
    standard
    address
    symbol
    market(currency: USD) {
      id
      price {
        id
        value
        currency
      }
      pricePercentChange(duration: DAY) {
        id
        value
      }
      volume24H: volume(duration: DAY) {
        id
        value
        currency
      }
    }
    project {
      id
      name
      logo {
        id
        url
      }
      safetyLevel
      logoUrl
      isSpam
    }
  }
}
    ${SimpleTokenDetailsFragmentDoc}`;