import { URL, Contract, isProduction } from './constants';
let alchemyKey = isProduction
  ? process.env.NEXT_PUBLIC_PRODUCTION_ALCHEMY_KEY
  : process.env.NEXT_PUBLIC_DEVELOPMENT_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');

alchemyKey = 'qnmYbTUb6B99q1A-qf87Hm2YCYhSM72O';
export const web3 = createAlchemyWeb3(`wss://${URL.ALCHEMY}/v2/${alchemyKey}`);

const contractABI = require(`./contract-abi-${
  isProduction ? 'prod' : 'dev'
}.json`);

export const getContract = async () => {
  const contract = await new web3.eth.Contract(contractABI, Contract.address);
  return contract;
};

export const initContract = async () => {
  if (!window.contract) {
    window.contract = await new web3.eth.Contract(
      contractABI,
      Contract.address
    );
  }
};
