import Banner from './Banner';
import OurFeatures from './OurFeatures';
import SecurityAndAudit from './SecurityAndAudit';
import MarketPlace from './MarketPlace';
import LaunchPad from './LaunchPad';
import Earnings from './Earnings';
import BackersAndInvestors from './BackersAndInvestors';
import Partners from './Partners';
import Roadmap from './Roadmap';
import './styles.scss';

function HomePageV3() {
    return (
        <div className='home-page3'>
            <Banner />
            <OurFeatures />
            <SecurityAndAudit />
            <MarketPlace />
            <LaunchPad />
            <Earnings />
            <Roadmap />
            <BackersAndInvestors />
            <Partners />
        </div>
    );
}

export default HomePageV3;