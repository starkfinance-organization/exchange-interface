import { getToken } from '@/state/erc20';
import { useActiveWeb3React } from './useActiveWeb3React';
import { useEffect, useState } from 'react';

const useToken = (address) => {
    const { library, chainId } = useActiveWeb3React();

    const [token, setToken] = useState();

    useEffect(() => {
        (async () => {
            try {
                if (address && chainId && library) {
                    const token = await getToken(chainId, address, library);
                    setToken(token);
                }
                setToken(undefined);
            } catch (error) {}
        })();
    }, [address, library, chainId]);

    return token;
};

export default useToken;
