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
                {/* <p className='title-size'>STARKSPORT NFT MARKETPLACE</p> */}
                <p className="subtitle">
                    You can own unique NFTs from others or participate in an auction for rare ones
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
