import { Chain, SearchTokensWebQuery, SearchTokensWebQueryVariables, TokenStandard } from "uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks";

export const getTokensFromSearchQuery = async(variables: SearchTokensWebQueryVariables) : Promise<SearchTokensWebQuery> => {
    const query = `
    query SearchTokensWeb($searchQuery: String!, $chains: [Chain!]) {
      searchTokens(searchQuery: $searchQuery, chains: $chains) {
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
  `;
    console.log("getTokensFromSearchQuery", variables)

    return fetch('https://beta.gateway.uniswap.org/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers if required
        },
        body: JSON.stringify({ query, variables }),
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log(data);
        return data.data;
    }).catch(error => {
        // Handle errors here
        console.error('There was a problem with the fetch operation:', error);
        return {
            searchTokens : []
        };
    });
}
