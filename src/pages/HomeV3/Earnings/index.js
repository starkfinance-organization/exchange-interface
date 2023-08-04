//image
import assets from '../../../assets'; 

import './styles.scss'

function Earnings() {
    return (
        <div className='wrapper-earnings'>
            <div className='background'>
                <div className='overplay'></div>
                <img src={assets.images.background_Manchester_Unit} alt=''/>
            </div>
            <div className='content'>
                {/* <img className='title' src={assets.images.starkport_earnings} alt='' /> */}
                <p className='title-size'>STARKSPORT EARNINGS</p>
                <p className='subtitle'>We provide benefits for long term users of the protocol.<br/>You can get a huge profits with your assets.</p>
                <div
                    className="btn"
                    onClick={() => {}}
                >
                    <p className="btn__title">VIEW MORE</p>
                </div>
            </div>
        </div>
    );
}

export default Earnings;