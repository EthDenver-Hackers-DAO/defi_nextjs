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

const Header = ({ walletinfo, handleWallet, headerLoading }) => {
  const router = useRouter();
  const isWalletConnected = walletinfo.address.length > 0;

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
            onClick={handleWallet}
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
    </header>
  );
};

export default Header;
