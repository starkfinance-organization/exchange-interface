import './style.scss';
import { useEffect, useRef, useState } from 'react';
import assets from '../../../assets';
import useDrawer from '../../../components/Drawer/useDrawer';
import Drawer from '../../../components/Drawer';
import useModal from '../../../components/ModalWallet/useModal';
import ModalWallet from '../../../components/ModalWallet';
import { route } from '../../../routes/configs';
import { useNavigate } from 'react-router-dom';

import { useActiveWeb3React } from '../../../evm/hooks/useActiveWeb3React';
import { CHAIN_ID } from '../../../evm/configs/networks';
import useCurrentAccount from '../../../hooks/useCurrentAccount';

const ButtonConnectWallet = () => {
    const { account: accountEvm, isConnected: isConnectedEvm } = useActiveWeb3React();
    const { address, status } = useCurrentAccount();

    const { isShowing, toggle } = useModal();

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
                {/* <div className="header__item p-15" onMouseEnter={handleMenuHover} onMouseLeave={handleMenuLeave}>
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
                            <p
                                className="menu__item py-10 fw-7"
                                onClick={() => {
                                    navClick(route.liquidity2);
                                }}
                            >
                                Overview
                            </p>
                        </div>
                    )}
                </div> */}

                <div
                    className="header__item p-15"
                    onClick={() => {
                        navClick(route.swap);
                    }}
                >
                    <h4>Swap</h4>
                </div>
                <div
                    className="header__item p-15"
                    onClick={() => {
                        navClick('liquidity');
                    }}
                >
                    <h4>Liquidity</h4>
                </div>
                <div
                    className="header__item p-15"
                    onClick={() => {
                        navClick(route.liquidity2);
                    }}
                >
                    <h4>Overview</h4>
                </div>

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
