import { useConnectors } from '@starknet-react/core';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import assets from '../../assets';
import './style.scss';

import { useWallet } from '../../evm/hooks/useWallet';
import { injected } from '../../evm/utils/web3React';
import { useDispatch } from 'react-redux';
import actions from '../../redux/action';
import { CHAIN_ID } from '../../evm/configs/networks';

const ModalWallet = ({ isShowing, hide }) => {
    const dispatch = useDispatch();

    const { connect: connectEvm } = useWallet();

    const handleArgent = () => {};

    const handleBraavos = () => {};

    const handleClose = () => {
        hide();
    };

    const { available, connectors, connect, refresh } = useConnectors();

    // Refresh to check for available connectors every 5 seconds.
    useEffect(() => {
        const interval = setInterval(refresh, 5000);
        return () => clearInterval(interval);
    }, [refresh]);

    // Handle connect wallet, alert if user haven't installed that wallet
    const handleConnect = (connector, isEvm = false, _chainId = CHAIN_ID.ZETA_TESTNET) => {
        if (isEvm) {
            connectEvm(connector, _chainId);
        } else {
            const isWalletConnected = available?.find(
                (availableConnector) => availableConnector.id() === connector.id(),
            );
            if (!isWalletConnected && !isEvm) return alert(`Please install ${connector.id()} wallet!`);
            connect(connector);
        }
        localStorage.setItem('isEvm', isEvm);
        dispatch(actions.setIsEvm(isEvm));
        handleClose();
    };

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
                              <p className="fz-20 fw-7">Switch Network</p>

                              <div className="modal-close" onClick={handleClose}>
                                  <img src={assets.svg.iconClose} alt="close" style={{ height: 15, width: 15 }} />
                              </div>
                          </div>
                          <div className="modal-body row j-center g-50">
                              <div
                                  className="wallet-icon-inactive a-center g-5"
                                  onClick={() => handleConnect(connectors[1])}
                              >
                                  <img src={assets.images.argent} alt="" />
                                  <p className="fz-18 fw-7">Starknet (ArgentX)</p>
                              </div>
                              <div
                                  className="wallet-icon-inactive col a-center g-5"
                                  onClick={() => handleConnect(connectors[0])}
                              >
                                  <img src={assets.images.braavos} alt="" />
                                  <p className="fz-18 fw-7">Starknet (Braavos)</p>
                              </div>

                              <div
                                  className="wallet-icon-inactive col a-center g-5"
                                  onClick={() => handleConnect(injected, true, CHAIN_ID.ZETA_TESTNET)}
                              >
                                  <img src={assets.images.zeta} />
                                  <p className="fz-18 fw-7">Zetachain</p>
                              </div>

                              <div
                                  className="wallet-icon-inactive col a-center g-5"
                                  onClick={() => handleConnect(injected, true, CHAIN_ID.OPSIDE_TESTNET)}
                              >
                                  <img src={assets.images.opside} />
                                  <p className="fz-18 fw-7">Opside</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </React.Fragment>,
              document.body,
          )
        : null;
};

export default ModalWallet;
