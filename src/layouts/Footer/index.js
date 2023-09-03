import assets from '../../assets';
import './style.scss';

const Footer = () => {
    const contactData = {
        telegram: 'https://t.me/starksportglobal',
        telegramChannel: 'https://t.me/starksportchanel',
        twitter: 'https://twitter.com/starkfinance?s=21&t=mYOANC7ZpixnNnYAW14NEQ',
        discord: 'https://discord.gg/Z2Z8BwHy6k',
    };

    function openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }

    return (
        <div className="footer-layout row">
            <div className="col gap-4">
                <div className="row a-center gap-10">
                    <img src={assets.images.logo} style={{ height: 30, width: 30, borderRadius: 50 }} />
                    <h1 className="project-name">STARKSPORT</h1>
                </div>
                <h4 style={{ fontSize: 18, maxWidth: 500, color: '#ffffffb3' }}>
                    Blockchain is a key tool for determining the direction of finance in the future. The two most
                    talked-about issues in the emerging virtual asset market are DeFi and NFT. Upgrading constantly,
                    we'll provide services for our clients until the decentralized financial market allows for the
                    unrestricted exchange of all digital assets.
                </h4>
            </div>

            <div className="row gap-50 flex-wrap">
                <div className="col gap-20">
                    <h1 className="footer-title">SUPPORT</h1>
                    <h4
                        style={{ fontSize: 18, color: '#ffffffb3' }}
                        onClick={() => {
                            openInNewTab('https://starksport.gitbook.io/staksport/support');
                        }}
                    >
                        FAQ
                    </h4>
                    <h4
                        style={{ fontSize: 18, color: '#ffffffb3' }}
                        onClick={() => {
                            openInNewTab('https://discord.gg/Z2Z8BwHy6k');
                        }}
                    >
                        Tokenomics
                    </h4>
                    <h4
                        style={{ fontSize: 18, color: '#ffffffb3' }}
                        onClick={() => {
                            openInNewTab('https://starksport.gitbook.io/staksport/tokennomics');
                        }}
                    >
                        Audits
                    </h4>
                    <h4
                        style={{ fontSize: 18, color: '#ffffffb3' }}
                        onClick={() => {
                            openInNewTab('https://alpha.starkguardians.com/audits');
                        }}
                    >
                        Starksport NFT
                    </h4>
                </div>
                <div className="col gap-20">
                    <h1 className="footer-title">ACCESS</h1>
                    <h4
                        style={{ fontSize: 18, color: '#ffffffb3' }}
                        onClick={() => {
                            openInNewTab('https://starksport.gitbook.io/staksport/');
                        }}
                    >
                        Exchange
                    </h4>
                    <h4
                        style={{ fontSize: 18, color: '#ffffffb3' }}
                        onClick={() => {
                            openInNewTab('https://starksport.gitbook.io/staksport/roadmap');
                        }}
                    >
                        Marketplace
                    </h4>
                    <h4
                        style={{ fontSize: 18, color: '#ffffffb3' }}
                        onClick={() => {
                            openInNewTab('https://starksport.gitbook.io/staksport');
                        }}
                    >
                        Launchpad
                    </h4>
                    <h4
                        style={{ fontSize: 18, color: '#ffffffb3' }}
                        onClick={() => {
                            openInNewTab('https://github.com/possc/StarkSportContracts');
                        }}
                    >
                        Earnings
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default Footer;
