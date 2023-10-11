import { useConnectors } from '@starknet-react/core';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import assets from '../../assets';
import './style.scss';

import { useWallet } from '../../evm/hooks/useWallet';
import { injected } from '../../evm/utils/web3React';
import { useDispatch } from 'react-redux';
import actions from '../../redux/action';
import { CHAIN_ID } from '../../evm/configs/networks';
import { WALLET_TYPES, WALLETS } from '../../context/types';
import { useGlobalContext } from '../../context/GlobalContext';

const ModalWallet = ({ isShowing, hide }) => {
    const dispatch = useDispatch();

    const { setWalletConnected } = useGlobalContext();

    const { connect: connectEvm } = useWallet();

    const handleArgent = () => {};

    const handleBraavos = () => {};

    const handleClose = () => {
        hide();
        setShowWallet(false);
    };

    const { available, connectors, connect, refresh } = useConnectors();

    const [showWallet, setShowWallet] = useState(false);

    // Refresh to check for available connectors every 5 seconds.
    useEffect(() => {
        const interval = setInterval(refresh, 5000);
        return () => clearInterval(interval);
    }, [refresh]);

    // Handle connect wallet, alert if user haven't installed that wallet
    const handleConnect = async (connector, okx = false, isEvm = false, _chainId = CHAIN_ID.ZETA_TESTNET) => {
        if (okx) {
            if (window.okxwallet.starknet.isConnected) {
                setWalletConnected(WALLETS.OKX, window.okxwallet.starknet.selectedAddress, WALLET_TYPES.STARKNET);
            }

            const [address] = await window.okxwallet.starknet.enable();
            setWalletConnected(WALLETS.OKX, address, WALLET_TYPES.STARKNET);
        } else if (isEvm) {
            connectEvm(connector, _chainId);
            setWalletConnected(WALLETS.METAMASK, '', WALLET_TYPES.EVM);
        } else {
            const isWalletConnected = available.find(
                (availableConnector) => availableConnector.id() === connector.id(),
            );
            if (isWalletConnected) {
                await connect(connector);
                setWalletConnected(WALLETS.ARGENT_X, '', WALLET_TYPES.STARKNET);
            } else alert(`Please install ${connector.id()} wallet!`);
        }
        localStorage.setItem('isEvm', isEvm);
        localStorage.setItem('isOkx', okx);
        dispatch(actions.setIsEvm(isEvm));
        handleClose();
    };

    const iconBack = (
        <svg
            className="tiktok-45b2fy-StyledArrowLeft e1dq5aum2"
            width="1em"
            data-e2e=""
            height="1em"
            viewBox="0 0 48 48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.58579 22.5858L20.8787 6.29289C21.2692 5.90237 21.9024 5.90237 22.2929 6.29289L23.7071 7.70711C24.0976 8.09763 24.0976 8.7308 23.7071 9.12132L10.8284 22H39C39.5523 22 40 22.4477 40 23V25C40 25.5523 39.5523 26 39 26H10.8284L23.7071 38.8787C24.0976 39.2692 24.0976 39.9024 23.7071 40.2929L22.2929 41.7071C21.9024 42.0976 21.2692 42.0976 20.8787 41.7071L4.58579 25.4142C3.80474 24.6332 3.80474 23.3668 4.58579 22.5858Z"
            ></path>
        </svg>
    );

    return isShowing
        ? ReactDOM.createPortal(
              <React.Fragment>
                  <div className="modal-overlay" />
                  <div className="modal-wrapper-wallet" aria-modal aria-hidden tabIndex={-1} role="dialog">
                      <div
                          className="modal"
                          onClick={(event) => {
                              event.stopPropagation();
                          }}
                      >
                          <div className="modal-header">
                              <div className="model-back">
                                  {showWallet && (
                                      <div className="icon-back" onClick={() => setShowWallet(false)}>
                                          {iconBack}
                                      </div>
                                  )}
                                  <p className="fz-20 fw-7">Switch Network</p>
                              </div>

                              <div className="modal-close" onClick={handleClose}>
                                  <img src={assets.svg.iconClose} alt="close" style={{ height: 15, width: 15 }} />
                              </div>
                          </div>
                          <div className="modal-body row j-center g-50">
                              {showWallet ? (
                                  <>
                                      <div
                                          className="wallet-icon-inactive a-center g-5"
                                          onClick={() => handleConnect(connectors[1])}
                                      >
                                          <img src={assets.images.argent} alt="" />
                                          <p className="fz-18 fw-7">ArgentX</p>
                                      </div>
                                      <div
                                          className="wallet-icon-inactive col a-center g-5"
                                          onClick={() => handleConnect(connectors[0])}
                                      >
                                          <img src={assets.images.braavos} alt="" />
                                          <p className="fz-18 fw-7">Braavos</p>
                                      </div>
                                      <div
                                          className="wallet-icon-inactive col a-center g-5"
                                          onClick={() => handleConnect(undefined, true, false)}
                                      >
                                          <img src={assets.images.okx} alt="" />
                                          <p className="fz-18 fw-7">OKX</p>
                                      </div>
                                  </>
                              ) : (
                                  <>
                                      <div
                                          className="wallet-icon-inactive a-center g-5"
                                          onClick={() => setShowWallet(true)}
                                      >
                                          <img src={assets.svg.iconSwitchNetwork} alt="" />
                                          <p className="fz-18 fw-7">Starknet</p>
                                      </div>
                                      <div
                                          className="wallet-icon-inactive col a-center g-5"
                                          onClick={() => handleConnect(injected, false, true, CHAIN_ID.ZETA_TESTNET)}
                                      >
                                          <img src={assets.images.zeta} />
                                          <p className="fz-18 fw-7">Zetachain</p>
                                      </div>

                                      <div
                                          className="wallet-icon-inactive col a-center g-5"
                                          onClick={() => handleConnect(injected, false, true, CHAIN_ID.OPSIDE_TESTNET)}
                                      >
                                          <img src={assets.images.opside} />
                                          <p className="fz-18 fw-7">Opside</p>
                                      </div>
                                  </>
                              )}
                          </div>
                      </div>
                  </div>
              </React.Fragment>,
              document.body,
          )
        : null;
};

export default ModalWallet;
