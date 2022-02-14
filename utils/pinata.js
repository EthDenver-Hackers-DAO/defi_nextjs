import dayjs from 'dayjs';
import { URL } from './constants';
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
const key = process.env.NEXT_PUBLIC_REACT_APP_PINATA_KEY;
const secret = process.env.NEXT_PUBLIC_REACT_APP_PINATA_SECRET;
const axios = require('axios');

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `${URL.PINATA.API}/pinning/pinJSONToIPFS`;
  const pinataBody = {
    pinataMetadata: {
      name: `${dayjs().utc().valueOf()}-${
        window.ethereum.selectedAddress
      }-TokenURI`
    },
    pinataContent: JSONBody
  };
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, pinataBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret
      }
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl: `${URL.PINATA.GATEWAY}/ipfs/${response.data.IpfsHash}`
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message
      };
    });
};

export const IPFS_PIN_TYPE = {
  FILE: 'FILE',
  DIR: 'DIR'
};

export const pinToIPFS = async (params) => {
  const { files, metaDataKey } = params;
  if (!files) {
    return {
      success: false,
      message: 'files is empty'
    };
  }
  const pinataBaseUrl = `${URL.PINATA.API}/pinning/pinFileToIPFS`;
  const pinataGatewayBaseUrl = `${URL.PINATA.GATEWAY}/ipfs/`;

  let data = new FormData();
  for (const file of files) {
    data.append('file', file);
  }

  const metadata = JSON.stringify({
    name: `${dayjs().utc().valueOf()}-${
      window.ethereum?.selectedAddress
    }-${metaDataKey}`
  });
  data.append('pinataMetadata', metadata);

  //making axios POST request to Pinata ⬇️
  return axios
    .post(pinataBaseUrl, data, {
      maxBodyLength: 'Infinity',
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret
      },
      onUploadProgress: function (progressEvent) {
        // 업로드 진행 이벤트 작업 수행
        // const total = progressEvent.total
        // const loaded = progressEvent.loaded
      }
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl: pinataGatewayBaseUrl + response.data.IpfsHash
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message
      };
    });
};
