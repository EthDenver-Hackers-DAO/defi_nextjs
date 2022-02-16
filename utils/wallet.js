import swal from '@sweetalert/with-react';
export const checkValidMegaMask = () => {
  if (!window.ethereum) {
    swal({
      text: '🦊 You must install Metamask, a virtual Ethereum wallet, in your browser',
      buttons: {
        cancel: 'Close'
      },
      icon: 'warning',
      content: (
        <a href="https://metamask.io/download/" target="_blank">
          🦊 메타마스크 설치하기
        </a>
      )
    });
    return false;
  }
  return true;
};

export const checkValidConnectWallet = () => {
  if (!window.ethereum?.selectedAddress) {
    swal(
      'Wallet Connection',
      `You must connect your virtual Ethereum wallet, in your top right of the page`,
      'warning'
    );
    return false;
  }
  return true;
};

export const abbreviateWalletAddress = (address) => {
  if (typeof address !== 'string') return;
  return `${address.substring(0, 6)}...${address.substring(40)}`;
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const obj = {
        status: '👆🏽 Write a message in the text-field above.',
        address: addressArray[0]
      };
      return obj;
    } catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message
      };
    }
  } else {
    return {
      address: '',
      status:
        '🦊 You must install Metamask, a virtual Ethereum wallet, in your browser'
    };
  }
};

export const getCurrentWalletConnected = async () => {
  try {
    const addressArray = await window.ethereum.request({
      method: 'eth_accounts'
    });
    if (addressArray.length > 0) {
      return {
        address: addressArray[0],
        status: '👆🏽 Write a message in the text-field above.'
      };
    } else {
      return {
        address: '',
        status: '🦊 Connect to Metamask using the top right button.'
      };
    }
  } catch (err) {
    console.error(err);
    return {
      address: '',
      status: '😥 ' + err.message
    };
  }
};
