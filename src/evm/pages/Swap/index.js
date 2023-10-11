import { BigNumber } from '@ethersproject/bignumber';
import { formatEther, parseUnits } from '@ethersproject/units';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Token, TokenAmount } from '@uniswap/sdk';
import { Fraction } from '@uniswap/sdk-core';
import { Button, Modal } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Area, AreaChart, XAxis } from 'recharts';
import assets from '../../../assets';
import svg from '../../../assets/svg';
import ModalSettingSwap from '../../../components/ModalSettingSwap';
import useModalSettingSwap from '../../../components/ModalSettingSwap/useModalSettingSwap';
import {
    CHAIN_ID,
    EXPLORER_TX,
    Field,
    ROUTER_ADDRESS,
    TOKEN_ICON_LIST,
    UNKNOWN_TOKEN_ICON,
    WETH,
} from '../../configs/networks.js';
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React.js';
import useListTokens from '../../hooks/useListTokens.js';
import { approves, getAllowances, getToken } from '../../state/erc20';
import { EmptyPool, getCurrencyBalances, getPoolInfo } from '../../state/liquidity.js';
import { getDerivedSwapInfo, swapCallback } from '../../state/swap';
import { isAddress } from '../../utils/index.js';
import './style.scss';

const FormSwap = ({ setHistoricalPrices, setVol, setPairAddr }) => {
    const [isShow, setIsShow] = useState(false);
    const [percent, setPercent] = useState(100);
    const navigate = useNavigate();

    // Slippage
    const [slippagePercentage, setSlippagePercentage] = useState(0.5);
    const handleSlippagePercentageChange = (event) => {
        let inputNumber = event.target.value;
        if (inputNumber < 0) {
            inputNumber = 0;
        }
        setSlippagePercentage(inputNumber);
    };

    const getHistoricalPrices = async () => {
        try {
            const response = await axios.get(
                `https://api.starksport.finance/api/historical-prices?tokenInAddress=0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7&tokenOutAddress=0x3fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac`, // Fix to server query
            );
            setHistoricalPrices(response.data);
        } catch (error) {
            console.error('Error fetching historical prices:', error);
        }
    };

    useEffect(() => {
        async function getPairId() {
            try {
                let res = await axios.get(
                    `https://api.starksport.finance/api/token-pairs/0x3fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac/0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7`,
                );
                // setRowsData(res.data);
                // console.log("🚀 ~ file: index.js:560 ~ getPairId ~ res:", res.data)
                let vol = parseFloat(res.data).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
                // console.log('🚀 ~ file: index.js:571 ~ getPairId ~ vol:', vol);
                setVol(vol);
            } catch (error) {
                console.log(error);
            }
        }
        getPairId();
    }, []);

    const openModalSetting = () => {
        toggleSettingSwap();
    };

    const { isShowingSetting, toggleSettingSwap } = useModalSettingSwap();

    // swap
    const handleTokenShow = (field) => {
        setIsShow(true);
        setIndependentField(field);
    };

    const handleReverse = () => {
        const [_input, _output] = [tokens[Field.INPUT], tokens[Field.OUTPUT]];
        setTokens({
            [Field.INPUT]: _output,
            [Field.OUTPUT]: _input,
        });
    };

    const { account, library, isConnected: isConnectedEvm, chainId } = useActiveWeb3React();
    // const { query } = useRouter();
    const listTokens = useListTokens(chainId);

    const [tokens, setTokens] = useState({
        [Field.INPUT]: WETH[chainId],
        [Field.OUTPUT]: undefined,
    });

    useEffect(() => {
        if (chainId) {
            setTokens({
                [Field.INPUT]: WETH[chainId],
                [Field.OUTPUT]: undefined,
            });
        }
    }, [chainId]);

    // Reset token 0 input amount when change another token
    useEffect(() => {
        if (tokens[Field.INPUT] && tokens[Field.OUTPUT]) {
            getHistoricalPrices();
        }
    }, [tokens]);
    const [balances, setBalances] = useState();

    const [typedValue, setTypedValue] = useState('');
    const [independentField, setIndependentField] = useState(Field.INPUT);
    const [reloadPool, setReloadPool] = useState(false);
    const [poolInfo, setPoolInfo] = useState(EmptyPool);
    const [submitting, setSubmitting] = useState(false);
    const [tokensNeedApproved, setTokensNeedApproved] = useState([]);
    const [trade, setTrade] = useState(null);
    const [slippage, setSlippage] = useState('0.5');
    const [disabledMultihops, setDisabledMultihops] = useState(false);
    const [loadedPool, setLoadedPool] = useState(false);

    useEffect(() => {
        (async () => {
            if (!chainId || !account || !library) return;
            try {
                const [balances, poolInfo] = await Promise.all([
                    getCurrencyBalances(chainId, account, library, [tokens[Field.INPUT], tokens[Field.OUTPUT]]),
                    getPoolInfo(chainId, account, library, [tokens[Field.INPUT], tokens[Field.OUTPUT]]),
                ]);
                poolInfo && setPoolInfo(poolInfo);
                balances && setBalances(balances);
                setPairAddr(`${tokens[Field.INPUT]?.address ?? ''}:${tokens[Field.OUTPUT]?.address ?? ''}`);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [chainId, account, library, tokens, reloadPool]);

    useEffect(() => {
        (async () => {
            try {
                if (!account || !library || !chainId) return;
                setLoadedPool(false);
                const trade = await getDerivedSwapInfo({
                    chainId,
                    library,
                    independentField,
                    typedValue,
                    currencies: tokens,
                    singlehops: disabledMultihops,
                });
                setTrade(trade);
                setLoadedPool(true);
            } catch (error) {
                setLoadedPool(false);
                console.error(error);
            }
        })();
    }, [chainId, account, library, tokens, typedValue, independentField, disabledMultihops]);

    useEffect(() => {
        if (!chainId || !account || !library || !trade || !tokens[Field.INPUT] || !typedValue) return;

        const decimals = tokens[Field.INPUT]?.decimals ?? 18;
        const parsedAmount = new Fraction(parseUnits(typedValue, decimals).toString());
        const inputAmount =
            independentField === Field.INPUT
                ? new TokenAmount(tokens?.[Field.INPUT], parsedAmount.quotient.toString())
                : trade.inputAmount;
        getAllowances(chainId, library, account, ROUTER_ADDRESS[chainId], [tokens[Field.INPUT]], [inputAmount])
            .then(setTokensNeedApproved)
            .catch(console.error);
    }, [chainId, account, library, trade, tokens, independentField, typedValue]);

    // const handleOpenModal = (independentField) => {
    // 	setIndependentField(independentField);
    // 	onOpen();
    // };

    const handleSelectToken = (token, depend) => {
        let _tokens = { ...tokens };
        _tokens[depend] = token;
        if (depend === Field.INPUT) {
            if (tokens[Field.OUTPUT] && token.equals(tokens[Field.OUTPUT])) {
                if (tokens[Field.INPUT]) _tokens[Field.OUTPUT] = tokens[Field.INPUT];
                else _tokens[Field.OUTPUT] = undefined;
            }
        } else {
            if (tokens[Field.INPUT] && token.equals(tokens[Field.INPUT])) {
                if (tokens[Field.OUTPUT]) _tokens[Field.INPUT] = tokens[Field.OUTPUT];
                else _tokens[Field.INPUT] = undefined;
            }
        }
        setTokens(_tokens);
        // handleTokenClose();
        setIsShow(false);
        // onClose();
    };

    const handleChangeAmounts = (value, independentField) => {
        if (isNaN(+value)) return;
        setTypedValue(value);
        setIndependentField(independentField);
    };

    const isDisableBtn = useMemo(() => {
        if (!trade || !balances?.[0] || !tokens[Field.INPUT] || !typedValue) return true;
        let input =
            independentField === Field.INPUT
                ? parseUnits(typedValue, tokens[Field.INPUT]?.decimals).toString()
                : trade.inputAmount.raw.toString();

        if (BigNumber.from(input).gt(BigNumber.from(balances[0]?.raw.toString() ?? '0'))) {
            return true;
        }
        return false;
    }, [trade, balances]);

    const isNeedApproved = useMemo(() => (tokensNeedApproved.length > 0 ? true : false), [tokensNeedApproved]);

    const onSwapCallback = useCallback(async () => {
        try {
            if (!chainId || !account || !library || submitting) return;
            setSubmitting(true);
            await swapCallback(chainId, library, account, trade, +slippage);
            setReloadPool((pre) => !pre);
            setSubmitting(false);
            setTypedValue('');
            alert('Swap success');
        } catch (error) {
            console.error(error);
            setSubmitting(false);
            alert(error?.reason ?? error?.message ?? error);
        }
    }, [chainId, account, library, trade, slippage]);

    const onApproveTokens = useCallback(async () => {
        try {
            if (!chainId || !account || !library || submitting) return;
            setSubmitting(true);
            const result = await approves(chainId, library, account, ROUTER_ADDRESS[chainId], tokensNeedApproved);
            if (result) setTokensNeedApproved([]);
            setSubmitting(false);
            alert('Approve tokens success');
        } catch (error) {
            console.error(error);
            setSubmitting(false);
            alert(error?.reason ?? error?.message ?? error);
        }
    }, [chainId, account, library, tokensNeedApproved]);

    // const isHighPriceImpact = useMemo(
    // 	() => (trade ? trade.priceImpact.greaterThan(FIVE_PERCENT) : false),
    // 	[trade]
    // );

    const onSubmit = () => {
        if (!isConnectedEvm) return alert('Please connect wallet');
        // if (isHighPriceImpact) return onOpenConfirmHighSlippage();
        if (isNeedApproved) {
            return onApproveTokens();
        } else if (!isDisableBtn) {
            return onSwapCallback();
        }
    };

    // const onSubmitHighSlippage = () => {
    // 	if (isNeedApproved) {
    // 		return onApproveTokens();
    // 	} else if (!isDisableBtn) {
    // 		return onSwapCallback().then(onCloseConfirmHighSlippage);
    // 	}
    // };

    const buttonText = useMemo(() => {
        if (!account) return 'Connect wallet';
        if (!loadedPool || !tokens[Field.INPUT] || !tokens[Field.OUTPUT] || !balances || !balances[0] || !balances[1])
            return 'Swap';

        if (!trade) {
            if (poolInfo.pair) return 'Swap';
            else return 'No route';
        } else {
            let input =
                independentField === Field.INPUT
                    ? parseUnits(typedValue, tokens[Field.INPUT]?.decimals).toString()
                    : trade.inputAmount.raw.toString();

            if (BigNumber.from(input).gt(BigNumber.from(balances[0]?.raw.toString() ?? '0'))) {
                return `Insufficient ${tokens[Field.INPUT]?.symbol} balance`;
            }
            if (poolInfo.noLiquidity && poolInfo.pair) return 'No liquidity';
            else if (isNeedApproved) return 'Approve token';
        }
        return 'Swap';
    }, [loadedPool, tokens, trade, poolInfo, isNeedApproved, account, balances]);

    // search token
    const [searchToken, setSearchToken] = useState('');
    const [_listTokens, _setListTokens] = useState([]);

    const handleSearchToken = useCallback(async () => {
        if (!searchToken || !isAddress(searchToken)) return listTokens;
        const existsTokens = listTokens.filter((t) => t.address.toLowerCase() === searchToken.toLowerCase());
        if (existsTokens.length) return existsTokens;
        const _t = await getToken(chainId, searchToken, library);
        if (_t instanceof Token) return [_t];
        return [];
    }, [listTokens, searchToken, library, chainId]);

    useEffect(() => {
        (async () => {
            try {
                const _tokens = await handleSearchToken();
                _setListTokens(_tokens);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [handleSearchToken]);

    const setTokenAmountByPercentOfBalance = (percent, independentField) => {
        const balance =
            independentField === Field.INPUT ? balances?.[0]?.raw.toString() : balances?.[1]?.raw.toString();
        const value = !balance ? '' : BigNumber.from(balance).mul(BigNumber.from(percent)).div(BigNumber.from(100));
        handleChangeAmounts(formatEther(value.toString()).toString(), independentField);
    };

    const percentNumbers = [
        {
            number: 25,
            handleChoosingPercent: (independentField) => {
                setTokenAmountByPercentOfBalance(25, independentField);
                return;
            },
        },
        {
            number: 50,
            handleChoosingPercent: (independentField) => {
                setTokenAmountByPercentOfBalance(50, independentField);
                return;
            },
        },
        {
            number: 75,
            handleChoosingPercent: (independentField) => {
                setTokenAmountByPercentOfBalance(75, independentField);
                return;
            },
        },
        {
            number: 100,
            handleChoosingPercent: (independentField) => {
                setTokenAmountByPercentOfBalance(100, independentField);
                return;
            },
        },
    ];

    const currentPath = window.location.pathname;

    return (
        <div className="form-wrapper col gap-10" style={{ gap: 2 }}>
            {/* Select token modal */}
            <Modal
                open={isShow}
                footer={null}
                centered
                bodyStyle={{
                    backgroundColor: '#000',
                    overflow: 'auto',
                    gap: 20,
                }}
                onCancel={() => {
                    setIsShow(false);
                }}
            >
                <div className="select-token-modal">
                    <div className="header-modal-wrapper">
                        <h3>Select a token or search token</h3>

                        <div className="search-wrapper">
                            <img src={assets.svg.search} alt="search" />
                            <input
                                placeholder="Token address"
                                value={searchToken}
                                onChange={(e) => setSearchToken(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="line"></div>

                    <div className="list-wrapper">
                        {searchToken !== '' || _listTokens.length > 0 ? (
                            <div>
                                {_listTokens.map((t, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="row gap-10 a-center item-wrapper "
                                            onClick={() => handleSelectToken(t, independentField)}
                                        >
                                            <img
                                                src={TOKEN_ICON_LIST[chainId]?.[t.address] ?? UNKNOWN_TOKEN_ICON}
                                                alt={t.symbol ?? '?'}
                                                style={{ height: 30, width: 30 }}
                                            />
                                            <h3>{t.symbol}</h3>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
                                {searchToken != '' ? (
                                    <div className="row gap-10 a-center item-wrapper "></div>
                                ) : (
                                    <h3>Token not found</h3>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
            <ModalSettingSwap isShowing={isShowingSetting} hide={toggleSettingSwap} />

            <div className="row j-between" style={{ margin: '10px 0' }}>
                <div className="row gap-10" style={{ marginBottom: 10 }}>
                    <h4
                        className={`hover-primary-color-2 ${
                            currentPath === '/swap' ? 'primary-color-1' : 'primary-color-2'
                        }`}
                    >
                        Swap
                    </h4>
                    <h4
                        className="hover-primary-color-2 primary-color-2 title-noactive"
                        onClick={() => {
                            navigate('/liquidity');
                        }}
                    >
                        Liquidity
                    </h4>
                </div>
                <div
                    className="btn__setting row gap-10 center"
                    style={{ marginBottom: 10 }}
                    onClick={() => {
                        openModalSetting();
                    }}
                >
                    <img src={assets.svg.setting} style={{ width: 15, height: 15 }} alt="" />
                </div>
                {/* <div style={{ height: 20, width: 20 }}>
                    <img src={assets.svg.setting} />
                </div> */}
            </div>

            <div className="input-wrapper">
                <div style={{ padding: 12 }}>
                    <div className="row">
                        <input
                            placeholder="0.0"
                            value={
                                independentField === Field.INPUT
                                    ? typedValue
                                    : trade?.outputAmount.toSignificant(18) ?? ''
                            }
                            onChange={(e) => handleChangeAmounts(e.target.value, Field.INPUT)}
                        />
                        <div>
                            <div
                                className="row gap-5 option-wrapper a-center p-10"
                                onClick={() => {
                                    handleTokenShow(Field.INPUT);
                                }}
                            >
                                <img
                                    alt={tokens[Field.INPUT]?.symbol ?? '?'}
                                    src={TOKEN_ICON_LIST[chainId]?.[tokens[Field.INPUT]?.address] ?? UNKNOWN_TOKEN_ICON}
                                    style={{ height: 30, width: 30 }}
                                />
                                <h5>{tokens[Field.INPUT]?.symbol ?? '--'}</h5>
                                <img
                                    src={assets.svg.down_arrow}
                                    style={{ height: 20, width: 20 }}
                                    alt="down_arrow_icon"
                                />
                            </div>
                            <div className="wrapper-percent">
                                {percentNumbers.map((item, index) => {
                                    return (
                                        <button
                                            key={index}
                                            className={`${
                                                item.number === percent ? 'btn-percent-select' : 'btn-percent'
                                            }`}
                                            onClick={() => item.handleChoosingPercent(Field.INPUT)}
                                        >
                                            <p>{item.number === 100 ? 'MAX' : item.number + '%'}</p>
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="input-balance-wrapper">
                                <p>Balance: {balances?.[0]?.toSignificant(18)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="center icon-swap-wrapper"
                style={{
                    marginTop: 4,
                    marginBottom: 4,
                    zIndex: 99,
                    // border: '4px solid #26193c',
                    cursor: 'pointer',
                }}
                onClick={() => handleReverse()}
            >
                <img src={assets.svg.swap} style={{ height: 24, width: 24 }} alt="swap_icon" />
            </div>

            <div className="input-wrapper">
                <div style={{ padding: 12, marginTop: 10 }}>
                    <div className="row">
                        <h4 style={{ margin: 'auto' }}>
                            ~{' '}
                            {independentField === Field.OUTPUT
                                ? typedValue
                                : trade?.outputAmount.toSignificant(18) ?? ''}
                        </h4>
                        <div>
                            <div
                                className="row gap-5 option-wrapper a-center p-10"
                                onClick={() => {
                                    handleTokenShow(Field.OUTPUT);
                                }}
                            >
                                <img
                                    alt={tokens[Field.OUTPUT]?.symbol ?? '?'}
                                    src={
                                        TOKEN_ICON_LIST[chainId]?.[tokens[Field.OUTPUT]?.address] ?? UNKNOWN_TOKEN_ICON
                                    }
                                    style={{ height: 30, width: 30 }}
                                />
                                <h5>{tokens[Field.OUTPUT]?.symbol ?? '--'}</h5>
                                <img
                                    src={assets.svg.down_arrow}
                                    style={{ height: 20, width: 20 }}
                                    alt="down_arrow_icon"
                                />
                            </div>
                            <div className="input-balance-wrapper" style={{ marginBottom: 0 }}>
                                <p>Balance: {balances?.[1]?.toSignificant(18)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                style={{
                    marginTop: 20,
                    width: '100%',
                    border: 'none',
                }}
                className="btn p-20"
                onClick={() => {
                    onSubmit();
                }}
                loading={submitting}
            >
                {buttonText}
            </Button>
        </div>
    );
};

const SwapPage = () => {
    const { chainId } = useActiveWeb3React();

    const [vol, setVol] = useState(0);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [historicalPrices, setHistoricalPrices] = useState([]);
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate;
    }

    const formatPrice = (price) => {
        if (price != null) {
            return price.toFixed(6);
        }
        return 0;
    };

    function formatPrice2(price) {
        const formattedPrice = Number(price).toFixed(6);
        return formattedPrice;
    }

    function formatPrice3(price) {
        // console.log('🚀 ~ file: index.js:1002 ~ formatPrice3 ~ price:', price);
        // let formattedPrice = 0;
        // if (price > 1) {
        //     formattedPrice = Number(price / 10 ** 18).toFixed(2);
        // } else {
        //     formattedPrice = Number(price).toFixed(6);
        // }
        // return parseFloat(formattedPrice);
        return formatEther(price);
    }

    const convertToLocalTime = (timestamp) => {
        // Create a Date object from the given timestamp
        const date = new Date(timestamp * 1000);

        // Format the date and time
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const [priceSrt, setPriceSrt] = useState();
    const [dateCurrent, setDateCurrent] = useState(Math.floor(Date.now() / 1000));
    const [activeIndex, setActiveIndex] = useState(0);
    const [rowsData, setRowsData] = useState([]); // TODO
    const [pairAddr, setPairAddr] = useState(':');

    // useEffect(() => {
    //     if (historicalPrices && historicalPrices.length > 0) {
    //         setPriceSrt(formatPrice2(historicalPrices[historicalPrices.length - 1]?.price));
    //         setDateCurrent(formatTimestamp(historicalPrices[historicalPrices.length - 1]?.timestamp));

    //         // You can use the formatTimestamp() function here, assuming it's defined in your code
    //         // if (firstTimestamp) {
    //         //     setDateCurrent(formatTimestamp(firstTimestamp));
    //         // }
    //     }
    //     // setPriceSrt(formatPrice(historicalPrices[0].price));
    //     // setDateCurrent(formatTimestamp(historicalPrices[0].timestamp));
    // }, [historicalPrices]);

    const handleMouseEnter = (index) => {
        setActiveIndex(index);
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            setDateCurrent(formatTimestamp(payload[0].payload.timestamp));
            setPriceSrt(formatPrice2(payload[0].value));
            return (
                <div className="custom-tooltip">
                    <p>{formatTimestamp(payload[0].payload.timestamp)}</p>
                    <p className="label">{formatPrice2(payload[0].value)}</p>
                </div>
            );
        }
        return null;
    };

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    useEffect(() => {
        async function getSwapTx(pairAddr) {
            try {
                const tokens = pairAddr.split(':');
                if (tokens.length != 2 || !isAddress(tokens[0]) || !isAddress(tokens[1])) return setRowsData([]);
                let res = await axios.get(
                    `https://api-zeta.starksport.finance/indexer/tx/${chainId ?? CHAIN_ID.ZETA_TESTNET}/${pairAddr}`,
                );
                setRowsData(res.data);
            } catch (error) {}
        }
        getSwapTx(pairAddr);
    }, [pairAddr, chainId]);

    // Handle short address type
    const shortAddress = (address) => {
        if (address) {
            // console.log('Current address:', address);
            const firstDigits = address.slice(0, 6);
            const lastDigits = address.slice(-4);

            const resultAddress = firstDigits + '...' + lastDigits;
            return resultAddress;
        }
    };

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    const openInNewTab = (url) => {
        var win = window.open(url, '_blank');
        win.focus();
    };

    return (
        <div className="swap-page">
            <div className="row j-center gap-30 flex-wrap">
                <div className="chart-wrapper">
                    <div className="mb-50">
                        {/* <h5 className="" style={{ marginTop: 12, color: 'grey' }}>
                            24h Vol: ${isNaN(vol) ? '0' : vol}
                        </h5> */}
                        <div className="chart-header">
                            <div className="chart-content-1">
                                <h5
                                    className=""
                                    style={{ fontSize: '18px', fontWeight: '800', marginTop: 12, color: '#fff' }}
                                >
                                    Volume (24hr)
                                </h5>
                                <p className="chart-content-1__p1">${isNaN(vol) ? '0' : vol}</p>
                                <p className="chart-content-1__p2">
                                    {dateCurrent ? convertToLocalTime(dateCurrent) : 'Jan 1, 2023 (UTC)'}
                                </p>
                            </div>
                            <div className="chart-content-2">
                                <div className="active">M</div>
                                <div className="in-active">D</div>
                                <div className="in-active">W</div>
                                <div className="in-active">Y</div>
                            </div>
                        </div>
                        {/* <div className="row flex-wrap a-end gap-20">
                            <h2 className="fz-40 fw-900 text-end cl-green">{priceSrt}</h2>
                            <div className="row gap-20">
                                <h2 className="fz-20">AVAX/1INCH</h2>
                                <h2 className="fz-20">-1.29%</h2>
                            </div>
                        </div>
                        <h3 className="fz-16">{dateCurrent}</h3> */}
                    </div>
                    {/* <AreaChart
                        width={windowSize.width > 600 ? 600 : windowSize.width - 80}
                        height={300}
                        data={historicalPrices}
                    >
                        <defs>
                            <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
                                <stop offset="10%" stopColor="#fff" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#14ffe3" stopOpacity={0.9} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis domain={[historicalPrices[0] - 5, 'auto']} />
                        <Area type="monotone" dataKey="price" stroke="#14ffe3" fill="url(#colorUv)" />
                        <Tooltip content={<CustomTooltip />} />
                    </AreaChart> */}
                    <AreaChart
                        width={windowSize.width > 600 ? 600 : windowSize.width - 100}
                        height={300}
                        // data={DUMMY_DATA.data}
                    >
                        {/* <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs> */}
                        <XAxis dataKey="uv" />
                        {/* <Tooltip content={<CustomTooltip />} /> */}
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </div>

                <FormSwap setVol={setVol} setHistoricalPrices={setHistoricalPrices} setPairAddr={setPairAddr} />
            </div>

            {/* <div className="form-claim">
                <div className="row gap-10 a-center item-wrapper " style={{ marginTop: 10, marginBottom: 30 }}>
                    <h2 className="title-claim" style={{ margin: 'auto', fontWeight: 600, color: '#fff' }}>
                        CLAIM FREE TESTNET TOKEN
                    </h2>
                </div>
                <div style={{ width: 'auto' }}>
                    {mockDataTokenTest.map((item, index) => (
                        <div
                            className="row gap-10 a-center item-wrapper "
                            style={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: 20,
                                marginBottom: 20,
                                width: 140,
                            }}
                        >
                            <img src={item.icon} alt={item.name} style={{ height: 30, width: 30 }} />
                            <h4>
                                {item.freeToken} {item.name}
                            </h4>
                        </div>
                    ))}
                </div>
                <div
                    className="btn"
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 30,
                        marginBottom: 10,
                        height: 40,
                        width: 120,
                    }}
                    onClick={() => handleClaimFreeToken()}
                >
                    <h4>Claim</h4>
                </div>
            </div> */}

            <div className="table-swap">
                <TableContainer component={Paper} style={{ background: '#0e0a1f' }}>
                    <Table sx={{}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {/* <TableCell style={{ textAlign: 'center' }}>ID</TableCell> */}
                                <TableCell style={{ textAlign: 'center' }}>Txhash</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Address</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>From</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>To</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsData.map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    {/* <TableCell style={{ textAlign: 'center' }} component="th" scope="row">
                                        {row.id}
                                    </TableCell> */}
                                    <TableCell
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            openInNewTab(`${EXPLORER_TX[chainId]}/${row.txHash}`);
                                        }}
                                    >
                                        {shortAddress(row.txHash)}
                                        <img
                                            src={svg.link}
                                            style={{ height: 13, width: 13, marginLeft: '3px', marginBottom: '4px' }}
                                        />
                                    </TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>{shortAddress(row.from)}</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        {formatPrice3(row.tokenAmountIn) + ' ' + row.tokenIn}
                                    </TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        {formatPrice3(row.tokenAmountOut) + ' ' + row.tokenOut}
                                    </TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        {convertToLocalTime(row.timestamp)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default SwapPage;
