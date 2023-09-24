import './style.scss';
import { useEffect, useRef, useState } from 'react';
import assets from '../../../assets';
import useDrawer from '../../../components/Drawer/useDrawer';
import Drawer from '../../../components/Drawer';
import useModal from '../../../components/ModalWallet/useModal';
import ModalWallet from '../../../components/ModalWallet';
import { route } from '../../../routes/configs';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '@starknet-react/core';

import { useActiveWeb3React } from '../../../evm/hooks/useActiveWeb3React';
import { CHAIN_ID } from '../../../evm/configs/networks';

const ButtonConnectWallet = () => {
    const { account: accountEvm, isConnected: isConnectedEvm } = useActiveWeb3React();

    const { isShowing, toggle } = useModal();
    const { address, status } = useAccount();

    // Handle short address type
    const shortAddress = () => {
        let addr = isConnectedEvm ? accountEvm : address;
        if (addr) {
            // console.log('Current address:', address);
            const firstDigits = addr.slice(0, 6);
            const lastDigits = addr.slice(-4);

            const resultAddress = firstDigits + '...' + lastDigits;
            return resultAddress;
        }
    };

    return (
        <div className="btn-conc g-5" onClick={toggle}>
            <ModalWallet isShowing={isShowing} hide={toggle} />
            {status == 'connected' || isConnectedEvm ? (
                <div>
                    <span className="btn-conc__title fw-7">{shortAddress()}</span>
                </div>
            ) : (
                <div className="row a-center">
                    <span className="btn-conc__title fw-7">Launch App</span>
                    {/* <span className="btn-conc__title btn-conc__title--hidden fw-7">App</span> */}
                    {/* <img className="btn-conc__icon" src={assets.svg.iconPower} alt="icon-power" /> */}
                </div>
            )}
        </div>
    );
};

const HeaderLayout = () => {
    const navigate = useNavigate();
    const { chainId, isConnected: isConnectedEvm } = useActiveWeb3React();

    const [showMenu, setShowMenu] = useState(false);
    const [showMenuEarn, setShowMenuEarn] = useState(false);
    const { toggleDrawer, isDrawerShowing } = useDrawer();
    const menuRef = useRef(null);
    const menuEarn = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    function handleMenuHover() {
        setShowMenu(true);
    }

    function handleMenuLeave() {
        setShowMenu(false);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuEarn.current && !menuEarn.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuEarn]);

    function handleMenuEarnHover() {
        setShowMenuEarn(true);
    }

    function handleMenuEarnLeave() {
        setShowMenuEarn(false);
    }

    const navClick = (path) => {
        navigate(path);
    };

    const openInNewTab = (url) => {
        var win = window.open(url, '_blank');
        win.focus();
    };

    return (
        <div className="header row a-center j-between">
            <div className="row a-center g-15">
                <div
                    className="row g-10 a-center"
                    onClick={() => {
                        navClick(route.home);
                    }}
                >
                    <img src={assets.images.logo} alt="logo" style={{ height: '5rem', width: '5rem' }} />
                    <h2 className="header__title">STARKSPORT</h2>
                </div>
            </div>

            <div className="header__nav row ">
                <div
                    className="header__item p-15"
                    onClick={() => {
                        navClick(route.home);
                    }}
                >
                    <h4>Home</h4>
                </div>
                <div className="header__item p-15" onMouseEnter={handleMenuHover} onMouseLeave={handleMenuLeave}>
                    <h4>Exchange</h4>

                    {showMenu && (
                        <div ref={menuRef} className="menu col">
                            <p
                                className="menu__item py-10 fw-7"
                                onClick={() => {
                                    navClick(route.swap);
                                }}
                            >
                                Swap
                            </p>
                            <p
                                className="menu__item py-10 fw-7"
                                onClick={() => {
                                    navClick('liquidity');
                                }}
                            >
                                Liquidity
                            </p>
                            {/* <p
                                className="menu__item py-10 fw-7"
                                onClick={() => openInNewTab('https://zeta-faucet.starksport.finance/')}
                            >
                                Faucet
                            </p> */}
                            <p
                                className="menu__item py-10 fw-7"
                                onClick={() => {
                                    navClick(route.liquidity2);
                                }}
                            >
                                Overview
                            </p>
                            {/* <div
                                    className="menu__item py-10 fw-7"
                                    onClick={() => {
                                        navClick(route.claimToken);
                                    }}
                                >
                                    <h4>Claim Testnet Token</h4>
                                </div> */}
                        </div>
                    )}
                </div>

                <div
                    className="header__item p-15"
                    onClick={() => {
                        openInNewTab('https://marketplace.starksport.finance/');
                    }}
                >
                    <h4>Marketplace</h4>
                </div>

                <div
                    className="header__item p-15"
                    onClick={() => {
                        navClick(route.launchpad);
                    }}
                >
                    <h4>Launchpad</h4>
                </div>

                <div
                    className="header__item p-15"
                    onMouseEnter={handleMenuEarnHover}
                    onMouseLeave={handleMenuEarnLeave}
                >
                    <h4>Earnings</h4>

                    {showMenuEarn && (
                        <div ref={menuRef} className="menu col">
                            <p
                                className="menu__item py-10 fw-7"
                                onClick={() => {
                                    navClick(route.pools);
                                }}
                            >
                                Staking
                            </p>
                            <p
                                className="menu__item py-10 fw-7"
                                onClick={() => {
                                    navClick(route.farms);
                                }}
                            >
                                Yield Farms
                            </p>

                            <p
                                className="menu__item py-10 fw-7"
                                onClick={() => {
                                    navClick(route.lending);
                                }}
                            >
                                Lending Network
                            </p>
                        </div>
                    )}
                </div>

                {/* <div
                        className="header__item p-15"
                        onClick={() => {
                            navClick(route.airdrop);
                        }}
                    >
                        <h4>NFT Holder Reward</h4>
                    </div> */}

                {/* <div
                        className="header__item p-15"
                        onClick={() => {
                            navClick(route.info);
                        }}
                    >
                        <h4>Info</h4>
                    </div> */}

                <div
                    className="header__item p-15"
                    onClick={() => {
                        openInNewTab('https://starksport.gitbook.io/staksport/');
                    }}
                >
                    <h4>Documentation</h4>
                </div>
            </div>

            <div className="menu-drawer g-20">
                <img
                    src={
                        !isConnectedEvm
                            ? assets.svg.iconSwitchNetwork
                            : chainId == CHAIN_ID.ZETA_TESTNET
                            ? assets.images.zeta
                            : assets.images.opside
                    }
                    alt="Switch network icon"
                    style={{ width: '50px', height: '50px' }}
                    className="menu-drawer-icon"
                />
                <ButtonConnectWallet />
                <Drawer isShowing={isDrawerShowing} hide={toggleDrawer} />
                <div className="menu-icon" onClick={toggleDrawer}>
                    <img src={assets.svg.iconMenu} alt="menu" style={{ height: 40, width: 40 }} />
                </div>
            </div>
        </div>
    );
};

export default HeaderLayout;
