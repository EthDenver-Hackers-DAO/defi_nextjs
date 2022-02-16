import React from 'react';
import Header from './header';
import Footer from './footer';
import Head from 'next/head';
import { URL } from '../../utils/constants';
// import { initWallet } from '../../utils/wallet';
import Onboard from 'bnc-onboard';
import Web3 from 'web3';

import {
  connectWallet,
  getCurrentWalletConnected,
  checkValidMegaMask
} from '../../utils/wallet';
import swal from 'sweetalert';

const Layout = ({ children, metaTags }) => {
  const [walletinfo, setWalletInfo] = React.useState({ address: '' });
  const [headerLoading, setHeaderLoading] = React.useState({
    wallet: false
  });

  React.useEffect(() => {
    initWallet();
    console.log(
      'window.ethereum.selectedAddress',
      window.ethereum?.selectedAddress
    );

    return () => {
      setHeaderLoading({
        ...headerLoading,
        wallet: false
      });
    };
  }, []);

  const initWallet = async () => {
    //eslint-disable-next-line
    try {
      if (window.ethereum?.selectedAddress) {
        setWalletInfo({
          ...walletinfo,
          address: window.ethereum?.selectedAddress
        });
      } else {
        setHeaderLoading({
          ...headerLoading,
          wallet: true
        });
        const { _, address } = await getCurrentWalletConnected();
        setHeaderLoading({
          ...headerLoading,
          wallet: false
        });
        if (address.length > 0) {
          setWalletInfo({ ...walletinfo, address });
        }
      }
      addWalletListener();
    } catch (error) {
      swal('Error', error.message, 'error');
      setHeaderLoading({
        ...headerLoading,
        wallet: false
      });
      addWalletListener();
    }
  };

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletInfo({
            ...walletinfo,
            address: accounts[0]
          });
        } else {
          setWalletInfo({
            ...walletinfo,
            address: ''
          });
        }
        swal(
          'Wallet Account is Changed',
          'wallet address is changed now',
          'success'
        );
      });
    } else {
      setWalletInfo({
        ...walletinfo,
        address: ''
      });
    }
  };

  const handleWallet = async () => {
    const wallets = [
      { walletName: 'metamask', preferred: true },
      { walletName: 'tally', preferred: true }
    ];
    const onboard = Onboard({
      dappId: 'dc23170f-2a1e-4c44-811a-b0daa3438780', // [String] The API key created by step one above
      networkId: 3, // Ropsten
      subscriptions: {
        wallet: (wallet) => {
          // web3 = new Web3(wallet.provider);
        }
      },
      walletSelect: {
        wallets: wallets
      }
    });
    await onboard.walletSelect();
    console.log(111, 'window.ethereum', window.ethereum);
    const { status, address } = await connectWallet();

    console.log(111, status, address);
  };

  let meta = {
    title: 'TART',
    description: 'Mint your first interactive NFT',
    image: `${URL.PINATA.GATEWAY}/ipfs/QmRNTi2v8UeTosAhbW7D4nKtVKsSCPP1szP2g2czQFZLfG`,
    url: 'https://tart.cafe',
    ...metaTags
  };

  return (
    <div>
      <Head>
        <link rel="canonical" href={meta.url} />
        <title>{meta.title}</title>
        <meta name="title" content={meta.title} key="title" />
        <meta name="description" content={meta.description} key="description" />
        <meta
          name="keywords"
          content="NFT, mint, interactive, p5, ethereum, polygon, opensea, interactiveNFT"
        />

        <meta property="og:site_name" content={meta.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} key="ogtitle" />
        <meta
          property="og:description"
          content={meta.description}
          key="ogdescription"
        />
        <meta property="og:url" content={meta.url} />
        <meta property="og:image" content={meta.image} key="ogimage" />

        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:site" content="@yourname" /> */}
        <meta name="twitter:title" content={meta.title} key="twtitle" />
        <meta
          name="twitter:description"
          content={meta.description}
          key="twdescription"
        />
        <meta name="twitter:image" content={meta.image} key="twimage" />
      </Head>

      <Header
        walletinfo={walletinfo}
        handleWallet={handleWallet}
        headerLoading={headerLoading}
      />
      <main
        className="overflow-hidden flex flex-col justify-center items-center tb-r"
        walletinfo={walletinfo}
      >
        {/* {React.createElement(children, { walletinfo })} */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
