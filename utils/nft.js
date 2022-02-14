import { pinJSONToIPFS } from './pinata';
import { Contract } from './constants';

export const addTokenMintListener = (callback) => {
  if (!window.contract) return;
  window.contract.events.TokenMinted({}, (error, data) => {
    if (error) {
      callback({
        success: false,
        data: error
      });
    } else {
      callback({
        success: true,
        data: data.returnValues[1]
      });
    }
  });
};

export const mintNFT = async (metaData) => {
  if (!window.contract || !window.ethereum) return;
  //pinata pin request
  const pinataResponse = await pinJSONToIPFS(metaData);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: '😢 Something went wrong while uploading your tokenURI.'
    };
  }
  const tokenURI = pinataResponse.pinataUrl;

  //set up your Ethereum transaction
  const transactionParameters = {
    to: Contract.address, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods.mint(tokenURI).encodeABI() //make call to NFT smart contract
  };

  //sign transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters]
    });
    return {
      success: true,
      status: 'https://mumbai.polygonscan.com/tx/' + txHash
    };
  } catch (error) {
    return {
      success: false,
      status: '😥 Something went wrong: ' + error.message
    };
  }
};
