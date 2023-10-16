import { Percent, JSBI, Token } from '@uniswap/sdk';
import assets from '../../assets';

export const CHAIN_ID = {
    // ZETA_MAINNET: 7000,
    ZETA_TESTNET: 7001,
    // OPSIDE_MAINNET: 23118,
    STARKSPRT_OPSIDE_ROLLUP: 12029,
};

//   export const RPC: { [key in CHAIN_ID]: string[] } = {
//     [CHAIN_ID.ZETA_MAINNET]: ['https://api.mainnet.zetachain.com/evm'],
//     [CHAIN_ID.ZETA_TESTNET]: [
//       'https://zetachain-athens-evm.blockpi.network/v1/rpc/public',
//     ],
//     [CHAIN_ID.OPSIDE_MAINNET]: ['https://testrpc.opside.network'],
//     [CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP]: ['https://pre-alpha-hk-http-geth.opside.network'],
//   };

export const NETWORKS_SUPPORTED = {
    [CHAIN_ID.ZETA_TESTNET]: {
        name: 'Zeta Testnet',
        chainId: CHAIN_ID.ZETA_TESTNET,
        rpc: ['https://zetachain-athens-evm.blockpi.network/v1/rpc/public'],
        explorer: 'https://athens3.explorer.zetachain.com/',
        nativeCoin: {
            name: 'Zeta',
            symbol: 'ZETA',
            decimals: 18,
        },
    },
    [CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP]: {
        name: 'Opside Testnet',
        chainId: CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP,
        rpc: ['https://pre-alpha-zkrollup-rpc.opside.network/starksport-rollup'],
        explorer: 'https://starksport-rollup.zkevm.opside.info/',
        nativeCoin: {
            name: 'SFN',
            symbol: 'SFN',
            decimals: 18,
        },
    },
};

export const EXPLORER_TX = {
    [CHAIN_ID.ZETA_TESTNET]: 'https://explorer.zetachain.com/evm/tx',
    [CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP]: 'https://starksport-rollup.zkevm.opside.info/tx',
};

export const WETH = {
    [CHAIN_ID.ZETA_TESTNET]: new Token(
        NETWORKS_SUPPORTED[CHAIN_ID.ZETA_TESTNET].chainId,
        '0x5F0b1a82749cb4E2278EC87F8BF6B618dC71a8bf',
        18,
        'WZETA',
        'Wrapper Zeta',
    ),
    [CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP]: new Token(
        NETWORKS_SUPPORTED[CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP].chainId,
        '0x66efeA0Cf97907E8cE51f6739535c88278ce8683',
        18,
        'SFN',
        'StarkSport',
    ),
};

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST = [WETH];

export const CUSTOM_BASES = {};

export const TOKEN_LIST = {
    [CHAIN_ID.ZETA_TESTNET]: [
        WETH[CHAIN_ID.ZETA_TESTNET],
        new Token(
            NETWORKS_SUPPORTED[CHAIN_ID.ZETA_TESTNET].chainId,
            '0xC05a487a9c4c9B155F4B39117bB854D1E792B210',
            18,
            'TEST_BTC',
            'TEST_BTC',
        ),
        new Token(
            NETWORKS_SUPPORTED[CHAIN_ID.ZETA_TESTNET].chainId,
            '0x0439187Ab4a0E43B7E726482871df480Deb870b9',
            18,
            'MTK1',
            'MyToken1',
        ),
    ],
    [CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP]: [
        WETH[CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP],
        new Token(
            NETWORKS_SUPPORTED[CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP].chainId,
            '0x87Bc2d3a2eDBbE8Df5f6929Be15A4A87879Aa5FB',
            18,
            'USDT',
            'USDT',
        ),
    ],
};

export const TOKEN_ICON_LIST = {
    [CHAIN_ID.ZETA_TESTNET]: {
        [WETH[CHAIN_ID.ZETA_TESTNET].address]: assets.images.zeta,
        '0xC05a487a9c4c9B155F4B39117bB854D1E792B210': assets.svg.btc,
        '0x0439187Ab4a0E43B7E726482871df480Deb870b9': assets.svg.eth,
    },
    [CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP]: {
        [WETH[CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP].address]: assets.images.opside,
        '0x87Bc2d3a2eDBbE8Df5f6929Be15A4A87879Aa5FB': assets.svg.btc,
    },
};

export const UNKNOWN_TOKEN_ICON =
    'https://icones.pro/wp-content/uploads/2021/05/icone-point-d-interrogation-question-noir.png';

export const MULTICALL_ADDRESS = {
    [CHAIN_ID.ZETA_TESTNET]: '0x4aF8d9Ab04EA63C621C729EFd95d6BDCB8B15cf9',
    [CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP]: '0x51Ba566222d88996658c39CBe38e17efa84b69e5',
};

export const FACTORY_ADDRESS = {
    [CHAIN_ID.ZETA_TESTNET]: '0x2723a9B9F8D015C1f0bD3B5fd9393716e16D2f20',
    [CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP]: '0xa52E6160968aa9d9A536Cc38b58Bab89eFEFe09e',
};

export const ROUTER_ADDRESS = {
    [CHAIN_ID.ZETA_TESTNET]: '0xDA9cd02db532d205D593430ce7B12769F2F1e291',
    [CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP]: '0xcb79a3421826d4C90FCB18333F1621ae23af5182',
};

export const INIT_CODE_HASH = {
    [CHAIN_ID.ZETA_TESTNET]: '0x5bfbf8ac5fa24ec49b051b579d000fb25988e044b9ab8fe321d250613193c74f',
    [CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP]: '0x9981e46724cb553da182b88725e57f667320a0979eafccba4fc34f0ca03e5ed6',
};

export const Field = {
    INPUT: 'INPUT',
    OUTPUT: 'OUTPUT',
};

export const MAX_TRADE_HOPS = 3;

export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000));

export const ZERO_PERCENT = new Percent('0');
export const ONE_HUNDRED_PERCENT = new Percent('1');
export const FIVE_PERCENT = new Percent(JSBI.BigInt(5), JSBI.BigInt(100));
export const SWAP_FEE_PERCENT = new Percent(JSBI.BigInt(97), JSBI.BigInt(100));

export const BIPS_BASE = JSBI.BigInt(10000);
