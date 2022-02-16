import React from 'react';
import Header from './header';
import Footer from './footer';
import Head from 'next/head';
import { URL, NetworkIds } from '../../utils/constants';
import { useSnackbar } from 'notistack';
import { initOnboard } from '../../utils/wallet';

import swal from 'sweetalert';

const Layout = ({ children, metaTags }) => {
  const [walletinfo, setWalletInfo] = React.useState({
    address: ''
  });
  const [headerLoading, setHeaderLoading] = React.useState({
    wallet: false
  });
  const { enqueueSnackbar } = useSnackbar();
  const [onBoard, setOnBoard] = React.useState(null);

  React.useEffect(() => {
    const onBoard = initOnboard({
      address: (address) => {
        if (address) {
          enqueueSnackbar(`Successfully address is connected - ${address}`, {
            variant: 'success'
          });
        } else {
          localStorage.removeItem('selectedWallet');
          enqueueSnackbar(`Wallet is disconnected`, {
            variant: 'warning'
          });
        }

        setWalletInfo({
          ...walletinfo,
          address: address ? address : ''
        });
      },
      network: (network) => {
        NetworkIds;
        if (!network) return;
        if (!NetworkIds[network]) return;
        enqueueSnackbar(`Connected network is ${NetworkIds[network]}`, {
          variant: 'info'
        });
      },
      wallet: (wallet) => {
        if (wallet.provider) {
          const prevWallet = localStorage.getItem('selectedWallet');
          if (!prevWallet) {
            enqueueSnackbar(
              `Successfully Wallet is connected to ${wallet.name}`,
              {
                variant: 'success'
              }
            );
          }
          if (prevWallet !== wallet.name) {
            enqueueSnackbar(`Current wallet is changed to ${wallet.name}`, {
              variant: 'warning'
            });
          }
          localStorage.setItem('selectedWallet', wallet.name);
        }
      }
    });

    setOnBoard(onBoard);

    return () => {
      setHeaderLoading({
        ...headerLoading,
        wallet: false
      });
    };
  }, []);

  const handleWallet = async () => {
    setHeaderLoading({
      ...headerLoading,
      wallet: true
    });

    try {
      const walletSelect = await onBoard.walletSelect();
      if (walletSelect) {
        await onBoard.walletCheck();
      }

      setHeaderLoading({
        ...headerLoading,
        wallet: false
      });
    } catch (error) {
      swal('Wallet Error', error.message, 'error');
      setHeaderLoading({
        ...headerLoading,
        wallet: false
      });
    }
  };

  let meta = {
    title: 'Taurus',
    description: 'Leverage Your Balance with Taurus',
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
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
