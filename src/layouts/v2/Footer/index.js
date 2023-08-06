import assets from '../../../assets';
import './style.scss';

const FooterLayout = () => {
    const contactData = {
        telegram: 'https://t.me/starksportglobal',
        telegramChannel: 'https://t.me/starksportchanel',
        twitter: 'https://twitter.com/starkfinance',
        discord: 'https://discord.com/invite/starksport',
        medium: 'https://medium.com/@starksport',
    };

    const openInNewTab = (url) => {
        var win = window.open(url, '_blank');
        win.focus();
    };

    return (
        <div className="footer-layout col g-10">
            {/* <p className="text-center fz-18">Stark Sport us a product developer by 0xIcii</p> */}
            <div className="row g-15 a-center j-center">
                <div className="border-logo">
                    <img
                        src={assets.svg.iconTelegram}
                        alt="discord"
                        className="icon"
                        onClick={() => {
                            openInNewTab(contactData.telegramChannel);
                        }}
                    />
                </div>

                <div className="border-logo">
                    <img
                        src={assets.svg.iconTelegram}
                        alt="discord"
                        className="icon"
                        onClick={() => {
                            openInNewTab(contactData.telegram);
                        }}
                    />
                </div>
                <div className="border-logo">
                    <img
                        src={assets.svg.iconDiscord}
                        alt="discord"
                        className="icon"
                        onClick={() => {
                            openInNewTab(contactData.discord);
                        }}
                    />
                </div>

                <div className="border-logo">
                    <img
                        src={assets.svg.iconX}
                        alt="Twitter"
                        className="icon"
                        onClick={() => {
                            openInNewTab(contactData.twitter);
                        }}
                    />
                </div>

                <div className="border-logo">
                    <img
                        src={assets.svg.iconMedium}
                        alt="Medium"
                        className="icon"
                        onClick={() => {
                            openInNewTab(contactData.medium);
                        }}
                    />
                </div>
            </div>
            <div>
                <p className="text-center subtitle-footer">Contact: support@starksport.finance</p>
                <p className="text-center subtitle-footer">2023 © Copyright STARKSPORT. All Rights Reserved</p>
            </div>
        </div>
    );
};

export default FooterLayout;
