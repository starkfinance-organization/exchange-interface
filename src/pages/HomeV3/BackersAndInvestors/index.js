//image
import assets from '../../../assets'; 


import './styles.scss'

function BackersAndInvestors() {
    return (
        <div className='wrapper-backers-investors'>
            {/* <img className='title' src={assets.images.backers_investors} alt=''/> */}
            <p className='title-size'>BACKERS & INVESTORS</p>
            <div className='wrapper-logos'>
                <p className='message'>To Be Announce Soon</p>
                {/* <div className='logos-line-1'>
                    <img className='logo' src={assets.images.starknet_logo_1} alt='' />
                    <img className='logo' src={assets.images.starknet_logo_1} alt='' />
                    <img className='logo' src={assets.images.starknet_logo_1} alt='' />
                    <img className='logo' src={assets.images.starknet_logo_1} alt='' />
                </div>
                <div className='logos-line-2'>
                    <img className='logo' src={assets.images.starknet_logo_1} alt='' />
                    <img className='logo' src={assets.images.starknet_logo_1} alt='' />
                    <img className='logo' src={assets.images.starknet_logo_1} alt='' />
                    <img className='logo' src={assets.images.starknet_logo_1} alt='' />
                </div> */}
            </div>
        </div>
    );
}

export default BackersAndInvestors;