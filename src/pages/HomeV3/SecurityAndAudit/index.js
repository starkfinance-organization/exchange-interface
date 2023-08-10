import assets from '../../../assets';

import './styles.scss';

function SecurityAndAudit() {
    const openInNewTab = (url) => {
        var win = window.open(url, '_blank');
        win.focus();
    };

    return (
        <div className="wrapper-security-audit">
            <img id='bg-security-audit' className="bg-security-audit" src={assets.images.bg_security_audit} alt="" />
            <div className="logos-certik-stark">
                <div>
                    <img className='logo_item' src={assets.images.certik_audit} alt="" />
                </div>
                <div className='logo_right'>
                    <img className='logo_item' src={assets.images.audit_logo_white} alt="" />
                </div>
            </div>
            <div className="content">
                <img className="logo-audit" src={assets.images.gif2} alt="" />
                <img className="title" src={assets.images.SECURITY_AUDIT} alt='' />
                {/* <p className='title-size'>SECURITY & AUDIT</p> */}
                <p className="subtitle">
                    Due to the experimental nature of our platform, we consider security a top priority.
                    <br />
                    Our smart contract is undergoing multiple independent audits from StarkGuardians and Certik
                </p>
                <div
                    className="btn"
                    onClick={() => {
                        openInNewTab('https://skynet.certik.com/projects/starksport');
                    }}
                >
                    <p className="btn__title">LEARN MORE</p>
                </div>
            </div>
        </div>

        // <div className="security container row mx-auto my-60 g-24 p-20">
        //     <div className="security__content col f-1 g-30">
        //         <div className="security__content__wrapper row a-end">
        //             <h1 className=" security__content--title fz-48">Security </h1>
        //             <h1 className="fz-48 ml-10">&</h1>
        //             <img src={assets.images.audit2} style={{ width: 160, height: 115 }} />
        //         </div>
        //         <p className="security__content--subtitle fz-24 fw-3 cl-light">
        //             Due to the experimental nature of our platform, we consider security a top priority. Our smart
        //             contract is undergoing multiple independent audits from StarkGuardians and Certik
        //         </p>
        //         <div
        //             className="btn"
        //             onClick={() => {
        //                 openInNewTab('https://skynet.certik.com/projects/starksport');
        //             }}
        //         >
        //             <p className="btn__title">Learn more</p>
        //         </div>
        //     </div>

        //     <div className="security__img f-1 row a-center ">
        //         <img src={assets.images.audit_logo} style={{ width: 300 }} />
        //         <img src={assets.images.audit_certik} style={{ width: 170 }} />
        //     </div>
        // </div>
    );
}

export default SecurityAndAudit;
