import assets from '../../assets';
import './style.scss';
import { Tooltip } from 'antd';

const Footer = () => {
    const contactData = {
        telegramChannel: 'https://t.me/starksportchanel',
        twitter: 'https://twitter.com/starkfinance',
        discord: 'https://discord.gg/vm7DJJn54Y',
        medium: 'https://starkfinance.medium.com',
    };

    function openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }

    return (
        <div className="footer-layout row">
            <div className="col gap-4">
                <div className="row a-center gap-10">
                    <img
                        src={assets.images.starkfinance_blue}
                        style={{ height: 48, width: 212.082, borderRadius: 50 }}
                    />
                </div>
                <h4 style={{ fontSize: 18, maxWidth: 500, color: '#ffffffb3' }}>
                    StarkFinance aims to combine the outstanding features of Defi, NFT Marketplace and Launchpad
                    together to attract users and support other projects on multichain
                </h4>
            </div>

            <div className="row gap-50">
                <div className="col gap-20">
                    <h1 className="footer-title">SUPPORT</h1>
                    <h4
                        style={{ fontSize: 18, color: '#ffffffb3', cursor: 'pointer' }}
                        onClick={() => {
                            openInNewTab('https://starkfinance.gitbook.io/starkfinance/');
                        }}
                    >
                        FAQ
                    </h4>
                    <h4
                        style={{ fontSize: 18, color: '#ffffffb3', cursor: 'pointer' }}
                        onClick={() => {
                            openInNewTab('https://starkfinance.gitbook.io/starkfinance/sfn-token/sfn-tokenomics');
                        }}
                    >
                        Tokenomics
                    </h4>
                    <h4
                        style={{ fontSize: 18, color: '#ffffffb3', cursor: 'pointer' }}
                        onClick={() => {
                            openInNewTab('https://skynet.certik.com/projects/StarkFinance');
                        }}
                    >
                        Audits
                    </h4>
                    <h4
                        style={{ fontSize: 18, color: '#ffffffb3', cursor: 'pointer' }}
                        onClick={() => {
                            openInNewTab('https://marketplace.starksport.finance/events');
                        }}
                    >
                        StarkFinance NFT
                    </h4>
                </div>
                <div className="col gap-20">
                    <h1 className="footer-title">ACCESS</h1>
                    <h4
                        style={{ fontSize: 18, color: '#ffffffb3', cursor: 'pointer' }}
                        onClick={() => {
                            openInNewTab('https://exchange.starkfinance.co/');
                        }}
                    >
                        Exchange
                    </h4>
                    <h4
                        style={{ fontSize: 18, color: '#ffffffb3', cursor: 'pointer' }}
                        onClick={() => {
                            openInNewTab('https://marketplace.starkfinance.co/');
                        }}
                    >
                        Marketplace
                    </h4>
                    {/* <h4
                        style={{ fontSize: 18, color: '#ffffffb3', cursor: 'pointer' }}
                        onClick={() => {
                            openInNewTab('https://starkfinance.gitbook.io/starkfinance');
                        }}
                    >
                        Launchpad
                    </h4> */}
                    <Tooltip placement="bottom" title="Coming Soon">
                        <h4 style={{ fontSize: 18, color: '#ffffffb3', cursor: 'pointer' }}>Launchpad</h4>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Coming Soon">
                        <h4 style={{ fontSize: 18, color: '#ffffffb3', cursor: 'pointer' }}>Earnings</h4>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default Footer;
