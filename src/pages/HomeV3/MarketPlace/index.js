//image
import assets from '../../../assets';

import './styles.scss';

function MarketPlace() {
    const openInNewTab = (url) => {
        var win = window.open(url, '_blank');
        win.focus();
    };
    return (
        <div className="wrapper-martketplace">
            <div className="wrapper-title">
                <img className="title" src={assets.images.STARKSPORT_NFT_MARKETPLACE} alt="" />
                {/* <p className='title-size'>StarkFinance NFT MARKETPLACE</p> */}
                <p className="subtitle">
                    The best marketplace for crypto collectibles and non-fungible tokens (NFTs).
                    <br /> Trade, lend and borrow unique digital items and make it valuable.
                </p>
            </div>
            <img id="card-marketplace" className="cards-img" src={assets.images.cards_desktop} alt="" />
            <div
                className="btn"
                onClick={() => {
                    openInNewTab('https://marketplace.starksport.finance');
                }}
            >
                <p className="btn__title">VIEW MORE</p>
            </div>
        </div>
    );
}

export default MarketPlace;
