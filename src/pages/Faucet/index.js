import React from 'react';
import './style.scss';

export default function FaucetPage() {
    return (
        <div className="faucet-page">
            <div className="header-div">STARKSPORT FAUCET</div>
            <div className="faucet-div">
                <div className="faucet-input-wrapper">
                    <input className="faucet-input" placeholder="Enter your walllet Address" />
                    <button className="faucet-button">CLAIM</button>
                </div>
            </div>
        </div>
    );
}
