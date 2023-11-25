import assets from '../../../assets';
import './style.scss';

const FooterLayout = () => {
    const contactData = {
        // telegram: 'https://t.me/starksportglobal',
        telegramChannel: 'https://t.me/starksportchanel',
        twitter: 'https://twitter.com/starkfinance',
        discord: 'https://discord.gg/vm7DJJn54Y',
        medium: 'https://starkfinance.medium.com',
    };

    const openInNewTab = (url) => {
        var win = window.open(url, '_blank');
        win.focus();
    };

    return (
        <div className="footer-layout col g-10" style={{ borderTop: '1px solid #ffffff80' }}>
            {/* <p className="text-center fz-18">Stark Sport us a product developer by 0xIcii</p> */}
            <div className="row g-15 a-center j-center">
                <div className="wrapper-logo-footer">
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
                </div>

                {/* <div className='border-logo'>
                    <img
                        src={assets.svg.iconTelegram}
                        alt="discord"
                        className='icon'
                        onClick={() => {
                            openInNewTab(contactData.telegram);
                        }}
                    />
                </div> */}
                {/* <div className='wrapper-logo-footer'>
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
                </div> */}

                {/* <div className='wrapper-logo-footer'>
                    <div className='border-logo'>
                        <img
                            src={assets.svg.iconTelegram}
                            alt="discord"
                            className='icon'
                            onClick={() => {
                                openInNewTab(contactData.telegram);
                            }}
                        />
                    </div>
                </div> */}

                <div className="wrapper-logo-footer">
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
                </div>

                <div className="wrapper-logo-footer">
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
                </div>

                <div className="wrapper-logo-footer">
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
            </div>
            <div style={{ color: '#ffffffb3' }}>
                <p className="text-center subtitle-footer">Contact: business@starksport.finance</p>
                <p className="text-center subtitle-footer">2023 © Copyright STARKSPORT. All Rights Reserved</p>
            </div>
        </div>
    );
};

export default FooterLayout;
