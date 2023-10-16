import { InjectedConnector } from '@web3-react/injected-connector';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import sample from 'lodash/sample';
import { CHAIN_ID, NETWORKS_SUPPORTED } from '../configs/networks';

const rpcNode = sample(NETWORKS_SUPPORTED[CHAIN_ID.ZETA_TESTNET].rpc);
if (!rpcNode) throw Error('One RPC node is not configured');

export const injected = new InjectedConnector({
    supportedChainIds: [...Object.values(CHAIN_ID)],
});

export const connectorByNames = {
    injected,
};

export const simpleRpcProvider = new StaticJsonRpcProvider(rpcNode);

export const getNetwork = (chainId) => {
    switch (chainId) {
        case CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP:
            return NETWORKS_SUPPORTED[CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP];

        default:
            return NETWORKS_SUPPORTED[CHAIN_ID.ZETA_TESTNET];
    }
};

export const setupDefaultNetwork = async (chainId) => {
    const network = getNetwork(chainId);
    const rpc = sample(network.rpc);
    const provider = window.ethereum;
    const _chainId = `0x${network.chainId.toString(16)}`;
    if (provider) {
        try {
            await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: _chainId }],
            });
        } catch (switchError) {
            try {
                await provider.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: _chainId,
                            chainName: network.name,
                            nativeCurrency: {
                                name: network.nativeCoin.name,
                                symbol: network.nativeCoin.symbol,
                                decimals: network.nativeCoin.decimals,
                            },
                            rpcUrls: [rpc],
                            blockExplorerUrls: [network.explorer],
                        },
                    ],
                });
                return true;
            } catch (error) {
                console.error('Failed to setup the network in Metamask:', error);
                return false;
            }
        }
    } else {
        console.error("Can't setup the network on metamask because window.ethereum is undefined");
        return false;
    }
};
