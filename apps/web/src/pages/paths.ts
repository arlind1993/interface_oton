// This is just an array of the app's defined paths that can be used in our Cloudflare Functions.
// Do not add any imports to this file.
// The array is kept up to date via the tests in src/pages/paths.test.ts

export const paths = [
  '/',
  '/explore',
  '/explore',
  '/explore/tokens/:chainName/:tokenAddress',
  '/tokens',
  '/tokens/:chainName',
  '/tokens/:chainName/:tokenAddress',
  '/explore/pools/:chainName/:poolAddress',
  '/vote/*',
  '/create-proposal',
  '/send',
  '/swap',
  '/limit',
  '/limits',
  '/pool/v2/find',
  '/pool/v2',
  '/pool',
  '/pool/:tokenId',
  '/pools/v2/find',
  '/pools/v2',
  '/pools',
  '/pools/:tokenId',
  '/whitepaper',
  '/add/v2',
  '/add',
  '/increase',
  '/remove/v2/:currencyIdA/:currencyIdB',
  '/remove/:tokenId',
  '/migrate/v2',
  '/migrate/v2/:address',
  '/nfts',
  '/nfts/asset/:contractAddress/:tokenId',
  '/nfts/profile',
  '/nfts/collection/:contractAddress',
  '/nfts/collection/:contractAddress/activity',
  '/chatbot'
]
