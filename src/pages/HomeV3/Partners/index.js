//image
import { useState, useEffect } from 'react';
import assets from '../../../assets';

import './styles.scss';

function Partners() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showArrow, setShowArrow] = useState(false);
    const [endScroll, setEndScroll] = useState(false);

    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

    const handleScroll = (e) => {
        let number = e.target.scrollLeft
        if(windowWidth + number >= 1700) {
            setEndScroll(true);
        } else {
            setEndScroll(false);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        
        if(1700 - windowWidth > 0 && !endScroll)
            setShowArrow(true)
        else {
            setShowArrow(false);
        }
    
    }, [windowWidth, endScroll]);




    const collabsAndPartners = [
        {
            line: 1,
            data: [
                {
                    logo: assets.images.trantor_logo,
                    name: 'Trantor'
                },
                {
                    logo: assets.images.starknetic_logo,
                    name: 'Starknetics'
                },
                {
                    logo: assets.images.hashstack_logo,
                    name: 'Hashstack'
                },
                {
                    logo: assets.images.galxe_logo,
                    name: 'Galxe'
                },
                 {
                    logo: assets.images.carmine_logo,
                    name: 'Carmine options',
                }
            ]
        },

        {
            line: 2,
            data: [
                {
                    logo: assets.images.certik_logo,
                    name: 'CertiK'
                },
                {
                    logo: assets.images.sithswap_logo,
                    name: 'SithSwap'
                },
                {
                    logo: assets.images.RYGLabs_logo,
                    name: 'RYG.Labs'
                },
                {
                    logo: assets.images.misess_logo,
                    name: 'Mises'
                },
                {
                    logo: assets.images.link3_logo,
                    name: 'Link3'
                },
               {
                    logo: assets.images.stark_guardians_logo,
                    name: 'StarkGuardians'
                },
            ]
        },
    ]
    const line_1 = collabsAndPartners.find(item => item.line === 1);
    const line_2 = collabsAndPartners.find(item => item.line === 2);
    return (
        <div className="wrapper-partners">
            <div className='wrapper-title'>
                <img className="title" src={assets.images.COLLAB_AND_PARTNERS} alt="" />
            </div>
            {/* <p className='title-size'>COLLABS & PARTNERS</p> */}
            {showArrow ? (<div className='scroll-arrow fade-in-out'><img className='arrow' src={assets.svg.arrow_right} alt=''/></div>) : <></>}
            <div className='wrapper-logos' onScroll={handleScroll} >
                <div className="logos">
                <div className="logos-partner-line_1">
                    {
                        line_1.data.map((item, index) => {
                            return (<div className="box-border" key={index}>
                            <div className="item">
                                <img className="logo" src={item.logo} alt="" />
                                {item.name ? <p className="partner-name">{item.name}</p> : <></>}
                            </div>
                        </div>)
                        })
                    }
                </div>
                <div className="logos-partner-line_2">
                    {
                        line_2.data.map((item, index) => {
                            return (<div className="box-border" key={index}>
                            <div className="item">
                                <img className="logo" src={item.logo} alt="" />
                                {item.name ? <p className="partner-name">{item.name}</p> : <></>}
                            </div>
                        </div>)
                        })
                    }
                </div>
            </div>
            </div>
        </div>
    );
}

export default Partners;
