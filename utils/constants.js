export const isProduction = false;

export const URL = {
  TAURUS: `https://${isProduction ? 'www' : 'testnet'}.taurusfinance.xyz`,
  ALCHEMY: isProduction
    ? 'eth-ropsten.alchemyapi.io'
    : 'eth-ropsten.alchemyapi.io',
  PINATA: {
    GATEWAY: 'https://tart.mypinata.cloud'
  }
};

export const Contract = {
  name: 'tarttest1-contract-v2',
  address: isProduction
    ? '0x1e4eA8b83c7D6Ccdd522932f228025c7bD3bB58B'
    : '0x41C15D773150f56f7459F42461DFF74Ca15da904'
};

export const NetworkIds = {
  1: 'Ethereum',
  3: 'Ropsten',
  4: 'rinkeby',
  5: 'goerli'
};
