import assets from '../../../assets';

import './styles.scss'

function Roadmap() {

    const withDevice = window.innerWidth;
    return (
        <div className='wrapper-roadmap'>
            <img className='title' src={assets.images.ROAD_MAP} alt="" />
            {/* <p className='title-size'>ROADMAP</p> */}
            <div className='wrapper-overflow'>
            {withDevice > 480 ? 
                (
                <div className='wrapper-roadmap-img'>
                    <img id='roadmap' className='roadmap-img' src={assets.images.roadmap_img} alt='' />
                </div>
                ) : 
                (
                <div className='roadmap-mobile'>
                    <div className='wrapper-event'>
                        <p className='timeAt'>Q1 3/2023</p>
                        <p className='activities'>
                            Website launching<br/>
                            Project token creation<br/>
                            Social Media creation<br/>
                            Search & Filters<br/>
                            NFT launching<br/>
                            Development of the dapp beta<br/>
                            Project KYC verification
                        </p>
                    </div>
                    <div className='wrapper-event'>
                        <p className='timeAt'>Q2 4/2023</p>
                        <p className='activities'>
                            NFT launching<br/>
                            Development of the dapp beta<br/> 
                            Project KYC verification
                        </p>
                    </div>
                    <div className='wrapper-event'>
                        <p className='timeAt'>Q3 8/2023</p>
                        <p className='activities'>
                            Testnet Dapp <br/>
                            Swap<br/>
                            More liquidity<br/> 
                            Create/Manage pairs + liquidity<br/>
                            groups NFTs Event<br/>
                            Design NFTs, Create Events<br/>
                            Event advertising<br/>
                            Marketplace Starksport
                        </p>
                    </div>
                    <div className='wrapper-event'>
                        <p className='timeAt'>Q4 10/2023</p>
                        <p className='activities'>
                            Launchpad<br/>
                            Economic system<br/> 
                            Mainnet Dapp<br/> 
                            Trading chart<br/>
                            Awarding the NFTs event<br/> 
                            Staking/ Lending system
                        </p>
                    </div>
                    <div className='wrapper-event'>
                        <p className='timeAt'>Q1 3/2024 </p>
                        <p className='activities'>
                            Airdrop DAO<br/> 
                            Opening DAO<br/> 
                            DAO treasury<br/>
                            Starksport multichain
                        </p>
                    </div>
                </div>
                )
            
            }
                

            </div>
        </div>
    );
}

export default Roadmap;