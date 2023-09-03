import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { route } from '../../routes/configs';

const Drawer = ({ isShowing, hide }) => {
    const navigate = useNavigate();

    const navClick = (path) => {
        navigate(path);
    };

    const openInNewTab = (url) => {
        var win = window.open(url, '_blank');
        win.focus();
    };

    return ReactDOM.createPortal(
        <React.Fragment>
            {isShowing && <div className="drawer-overlay" onClick={hide} />}
            {/* <div className="drawer-overlay" onClick={hide} /> */}
            <div
                className={`drawer-wrapper ${isShowing ? 'show-drawer' : ''}`}
                aria-modal
                aria-hidden
                tabIndex={-1}
                role="dialog"
            >
                <div
                    className="drawer"
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    <p
                        className="drawer__item"
                        onClick={() => openInNewTab('https://marketplace.starksport.finance/events')}
                    >
                        Marketplace
                    </p>
                    <p className="drawer__item" onClick={() => navClick(route.swap)}>
                        Swap
                    </p>

                    <p className="drawer__item" onClick={() => navClick('/liquidity')}>
                        Liquidity
                    </p>
                    <p
                        className="drawer__item"
                        onClick={() => {
                            navClick(route.liquidity2);
                        }}
                    >
                        Overview
                    </p>
                    <p className="drawer__item" onClick={() => navClick(route.pools)}>
                        Staking
                    </p>
                    <p className="drawer__item" onClick={() => navClick(route.farms)}>
                        Yield Farms
                    </p>

                    <p className="drawer__item" onClick={() => navClick(route.launchpad)}>
                        Launchpads
                    </p>

                    <p className="drawer__item" onClick={() => navClick(route.lending)}>
                        Lending Network
                    </p>

                    {/* <p className="drawer__item" onClick={() => navClick(route.airdrop)}>
                            NFT Holder Airdrop
                        </p> */}

                    {/* <p className="drawer__item" onClick={() => navClick(route.info)}>
                              Info
                          </p> */}

                    {/* <p
                              className="drawer__item"
                              onClick={() => {
                                  navClick(route.claimToken);
                              }}
                          >
                              Claim Testnet Token
                          </p> */}
                    <p
                        className="drawer__item"
                        onClick={() => {
                            openInNewTab('https://starksport.gitbook.io/staksport/');
                        }}
                    >
                        Documentation
                    </p>
                </div>
            </div>
        </React.Fragment>,
        document.body,
    );
};

export default Drawer;
