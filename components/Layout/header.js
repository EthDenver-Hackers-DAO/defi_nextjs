import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AKLoadingButton from '../AKLoadingButton';
import { useRouter } from 'next/router';
import { abbreviateWalletAddress } from '../../utils/wallet';
import { Typography } from '@mui/material';
import { AccountBalanceWalletOutlined } from '@mui/icons-material';
import Logo from '../../public/assets/global-header-logo2.png';

const Header = ({ walletinfo, handleWallet, headerLoading }) => {
  const router = useRouter();
  const isWalletConnected = walletinfo.address?.length > 0;

  return (
    <header className="h-[80px] flex items-center w-full justify-center color_main_bg">
      <nav className={`flex justify-between taurus_inner`}>
        <div className="h-full transition-all hover:scale-105 cursor-pointer z-10">
          <Link href="/">
            <a className="flex items-center">
              <div className="lg:w-[50px] md:w-[40px] w-[35px]">
                <Image src={Logo} alt="Logo" />
              </div>
              <p className="ml-[10px] text-[25px] font-medium color_sub_c">
                Taurus
              </p>
            </a>
          </Link>
        </div>
        <div className="flex justify-evenly items-center">
          <AKLoadingButton
            className="flex z-10"
            variant="text"
            loading={headerLoading.wallet}
            onClick={handleWallet}
            sx={{
              fontWeight: 500,
              color: '#1B98E0',
              ':hover': {
                color: '#ffffff',
                opacity: '0.5',
                bgcolor: '#1B98E0'
              }
            }}
          >
            <AccountBalanceWalletOutlined />
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
