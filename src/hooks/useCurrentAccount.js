import { useGlobalContext } from '../context/GlobalContext';
import { WALLETS } from '../context/types';
import { useAccount } from '@starknet-react/core';
import { useMemo } from 'react';

function useCurrentAccount() {
    const { account, address, status } = useAccount();
    const { wallet, walletAddress } = useGlobalContext();

    return useMemo(() => {
        if (wallet === WALLETS.OKX && window.okxwallet.starknet.isConnected) {
            return {
                account: window.okxwallet.starknet.account,
                address: window.okxwallet.starknet.selectedAddress,
                status: 'connected',
            };
        } else if (status === 'connected') {
            return {
                account,
                address,
                status,
            };
        } else {
            return {
                account: undefined,
                address: undefined,
                status: 'disconnected',
            };
        }
    }, [wallet, account, address, walletAddress]);
}

export default useCurrentAccount;
