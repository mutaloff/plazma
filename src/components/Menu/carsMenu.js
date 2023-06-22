import { useSelector } from "react-redux"
import kamaz from '../../assets/kamaz.png'
import volvo from '../../assets/volvo.png'
import daf from '../../assets/daf.png'
import mercedes from '../../assets/mercedes.png'


function CarsMenu({ carHandler, carIndex, races }) {

    const brands = useSelector(state => state.races.carsInfo.map(item => item[1]))

    return <>
        {
            Object.values(races).map((race, i) => (
                <div className="menu-nums" onClick={() => carHandler(i)} key={i} style={{ borderBottom: i === carIndex && '2px solid blue' }}>
                    <div className='menu-index'>
                        <div className='menu-num'>{('0' + (i + 1)).slice(-2)}.</div>
                    </div>
                    <img
                        src={brands[i] === 'Даф' ? daf : brands[i] === 'Вольво' ? volvo : brands[i] === 'Камаз' ? kamaz : mercedes}
                        className='brand'
                        alt=''
                    />
                    <div className='menu-num'>
                        {race['000'].number.substring(0, 1) + ' '
                            + race['000'].number.substring(1, 4) + ' '
                            + race['000'].number.substring(4, 6) + ' '
                            + race['000'].number.substring(6, 9)}
                    </div>
                    <div className='menu-data'>
                        <div className='menu-num'>{Object.values(race).at(-1)?.unloadDate}</div>
                    </div>
                </div>
            ))
        }
    </>
}



export default CarsMenu