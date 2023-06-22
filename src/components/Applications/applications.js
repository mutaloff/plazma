
import { useSelector } from "react-redux";
import DataCompare from "./dataCompare";
import AllCargoes from "./allCargoes";
import './applications.css'
import Fines from "./fines";
import Bids from "./bid"
import Passes from "./pass"
import Passwords from "./pass"

function Applications() {

    const { showAllCargoes, showCompareData, showFines, showBids, showPasses, showPasswords } = useSelector(state => state.ui)

    return <div className="application-main">
        {
            !showAllCargoes && !showCompareData && !showFines && !showBids && !showPasses && !showPasswords
                ? <div>Необходимо выбрать приложение</div>
                : showAllCargoes
                    ? <AllCargoes />
                    : showCompareData
                        ? <DataCompare />
                        : showFines
                            ? <Fines />
                            : showBids
                                ? <Bids />
                                : showPasses
                                    ? <Passes />
                                    : showPasswords && <Passwords />
        }
    </div>
}


export default Applications