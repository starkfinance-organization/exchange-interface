//image
import assets from '../../../assets';

import './styles.scss';

function OurFeatures() {
    const openInNewTab = (url) => {
        var win = window.open(url, '_blank');
        win.focus();
    };
    return (
        <div className="wrapper-our-features">
            <div>
                <img className="our-features-img" src={assets.images.OUR_FEATURES} alt="" />
                {/* <p className='title-size'>OUR FEATURES</p> */}
            </div>

            <div className="items">
                <div className="box-border">
                    <div className="item">
                        <img className="icon" src={assets.svg.iconLayer2} alt="" />
                        <p className="title">A DeFi Hub</p>
                        <p className="subtitle">Swap and provide liquidity easily on AMM exchange</p>
                    </div>
                </div>

                <div className="box-border">
                    <div className="item">
                        <img className="icon" src={assets.svg.iconPriceFeeds} alt="" />
                        <p className="title">NFT Marketplace</p>
                        <p className="subtitle">Trade and auction for your valuable NFTs</p>
                    </div>
                </div>

                <div className="box-border">
                    <div className="item">
                        <img className="icon" src={assets.svg.iconYield} alt="" />
                        <p className="title">Launchpad</p>
                        <p className="subtitle">Incubate and support quality projects to develop</p>
                    </div>
                </div>

                <div className="box-border">
                    <div className="item">
                        <img className="icon" src={assets.svg.iconLiquidation} alt="" />
                        <p className="title">Earnings</p>
                        <p className="subtitle">Stake, farm and lend NFTs, get your own passive income</p>
                    </div>
                </div>
            </div>

            <div
                className="btn"
                onClick={() => {
                    openInNewTab('https://starksport.gitbook.io/');
                }}
            >
                <p className="btn__title">EXPLORE MORE</p>
            </div>
        </div>
    );
}

export default OurFeatures;
