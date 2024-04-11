import CryptoInvestments from '@/components/Lists/CryptoInvestments';
import FilterCryptoInvest from '@/components/Filter/FilterCryptoInvest';
import BtnAddCryptoInvestment from '@/components/Button/BtnAddCryptoInvestment';

export default function CryptoPage() {


    return (
        <div className="page">
            <div className="content">
                <FilterCryptoInvest/>
                <CryptoInvestments/>
                <BtnAddCryptoInvestment/>
            </div>
        </div>
    );
}