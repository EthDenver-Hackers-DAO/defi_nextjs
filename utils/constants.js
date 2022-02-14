export const isProduction = false;

export const URL = {
  TART: `https://${isProduction ? 'www' : 'testnet'}.tart.cafe`,
  ALCHEMY: isProduction
    ? 'polygon-mainnet.g.alchemy.com'
    : 'polygon-mumbai.g.alchemy.com',
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
