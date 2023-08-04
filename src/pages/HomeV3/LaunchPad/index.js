//image
import assets from '../../../assets';

import './styles.scss';

function LaunchPad() {
    const openInNewTab = (url) => {
        var win = window.open(url, '_blank');
        win.focus();
    };
    return (
        <div className="wrapper-launchpad">
            <img className="launchpad-card-img" src={assets.images.nft} alt="" />
            <div className="content">
                {/* <img className="title" src={assets.images.staspost_launchpad} alt="" /> */}
                <p className='title-size'>STARKSPORT LAUNCHPAD</p>
                <p className="subtitle">
                    An all-in-one Incubation Hub empowers investors and allows quality project creators the ability to provide token or NFT sales.
                </p>
                <div
                    className="btn"
                    onClick={() => {
                        openInNewTab('https://demo.starksport.finance/');
                    }}
                >
                    <p className="btn__title">VIEW MORE</p>
                </div>
            </div>
        </div>
    );
}

export default LaunchPad;
