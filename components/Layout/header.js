import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AKLoadingButton from '../AKLoadingButton';
import { useRouter } from 'next/router';
import { abbreviateWalletAddress } from '../../utils/wallet';
import { Typography, Backdrop } from '@mui/material';
import { AccountBalanceWalletOutlined } from '@mui/icons-material';

import MetaMaskIcon from '../../public/assets/global-metamask.svg';
import TallyIcon from '../../public/assets/global-tally.svg';

const Header = ({ walletinfo, handleWallet, headerLoading, WALLETS }) => {
  const router = useRouter();
  const isWalletConnected = walletinfo.address.length > 0;

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <header className="h-[80px] flex items-center w-full justify-center tb-r">
      <nav className={`flex justify-between tart_inner`}>
        <div className="h-full transition-all hover:scale-105 cursor-pointer">
          <Link href="/">
            <a>
              <div className="lg:w-[115px] md:w-[100px] w-[90px] bg-red-300">
                [Project Logo]
              </div>
            </a>
          </Link>
        </div>
        <div className="flex justify-evenly items-center">
          <AKLoadingButton
            className="sm:flex hidden"
            variant="text"
            loading={headerLoading.wallet}
            onClick={handleToggle}
            sx={{
              fontWeight: 500,
              color: '#ffa519',
              ':hover': {
                color: '#ffffff',
                opacity: '0.5',
                bgcolor: '#ffa519'
              }
            }}
          >
            <AccountBalanceWalletOutlined fontSize="small" />
            {isWalletConnected && (
              <Typography className="ml-2">
                {abbreviateWalletAddress(walletinfo.address)}
              </Typography>
            )}
          </AKLoadingButton>
        </div>
      </nav>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div className="w-[450px] bg-red-400 flex flex-col items-center p-5">
          <p className="w-full mb-[16px] text-[20px]">Connect to a wallet</p>
          <div
            className="flex p tb-b w-full h-[56px] p-[8px] cursor-pointer"
            onClick={() => {
              handleClose();
              handleWallet();
            }}
          >
            <Image
              className="tb-r w-fit"
              src={MetaMaskIcon}
              alt="icon"
              width={40}
            />
            <p className="tb-r flex items-center ml-[16px]">MetaMask</p>
          </div>
          <div
            className="flex p tb-b w-full h-[56px] p-[8px] cursor-pointer"
            onClick={() => {
              handleClose();
              handleWallet();
            }}
          >
            <Image
              className="tb-r w-fit"
              src={TallyIcon}
              alt="icon"
              width={40}
            />
            <p className="tb-r flex items-center ml-[16px]">Tally</p>
          </div>
        </div>
      </Backdrop>
    </header>
  );
};

export default Header;
