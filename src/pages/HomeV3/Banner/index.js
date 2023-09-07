//image
import assets from '../../../assets';

import './styles.scss';

function Banner() {
    const openInNewTab = (url) => {
        var win = window.open(url, '_blank');
        win.focus();
    };
    return (
        <div className="wrapper-banner">
            <div className="left">
                <p className="title-1">Decentralized Finance Platform</p>
                <img className="starkport-img" src={assets.images.STARKPORT} alt="" />
                {/* <p className="title-size">STARKSPORT</p> */}
                <p className="title-2">Cryptocurrency trading platform, NFTS event</p>
                <p className="all-time-volume">$4960 ALL-TIME VOLUME</p>
                <div className="flex a-center gap-15">
                    <img className="starknet-img" src={assets.images.starknet} alt="" />
                    <p className="powered-starknet">POWERED BY STARKNET</p>
                </div>
                <div
                    className="btn"
                    onClick={() => {
                        openInNewTab('https://marketplace.starksport.finance/events');
                    }}
                    style={{ marginTop: 16 }}
                >
                    <p className="btn__title">MINT NOW</p>
                </div>
            </div>
            <div className="right">
                <img className="logo-banner" src={assets.images.logo_gif} alt="" />
            </div>
        </div>
    );
}

export default Banner;
