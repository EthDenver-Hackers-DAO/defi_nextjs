import Onboard from 'bnc-onboard';

const networkId = 3; // robsten
const dappId = process.env.NEXT_PUBLIC_BLOCKNATIVE_KEY;
export function initOnboard(subscriptions) {
  return Onboard({
    dappId,
    hideBranding: true,
    networkId,
    darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask', preferred: true },
        { walletName: 'tally', preferred: true }
      ]
    },
    walletCheck: [{ checkName: 'connect' }, { checkName: 'network' }]
  });
}

export const abbreviateWalletAddress = (address) => {
  if (typeof address !== 'string') return;
  return `${address.substring(0, 6)}...${address.substring(40)}`;
};
