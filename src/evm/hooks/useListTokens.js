import { getListTokens } from '../utils/networks';
import { useMemo } from 'react';

const useListTokens = (chainId) => {
    return useMemo(() => getListTokens(chainId), [chainId]);
};

export default useListTokens;
