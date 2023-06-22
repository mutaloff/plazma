import { useState } from "react"
import "./statistics.css"
import sortList from "../../utils/sortList"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { changePardsStatisticsAction, changeRacesStatisticsAction, } from "../../redux/statisticsReduces"

function Statistics() {

    const dispatch = useDispatch()

    const { racesStatistics, pardsStatistics } = useSelector(state => state.statistics)

    const [up, setUp] = useState(true)

    const sortRacesStatistics = (key) => {
        let sorted = sortList(racesStatistics, key, up)
        dispatch(changeRacesStatisticsAction(sorted))
        setUp(!up)
    }
    const sortPardsStatistics = (key) => {
        let sorted = sortList(pardsStatistics, key, up)
        dispatch(changePardsStatisticsAction(sorted))
        setUp(!up)
    }

    return <div className='total'>
        <table className="statistics-table">
            <thead>
                <tr>
                    <th>№</th>
                    <th onClick={() => sortRacesStatistics('number')}>Номер</th>
                    <th onClick={() => sortRacesStatistics('cost')}>Доход</th>
                    <th onClick={() => sortRacesStatistics('dayCost')}>Доход в день</th>
                    <th onClick={() => sortRacesStatistics('distance')}>Дистанция</th>
                    <th onClick={() => sortRacesStatistics('rubkm')}>Руб/км</th>
                    <th onClick={() => sortRacesStatistics('days')}>Дней в рейсах</th>
                    <th onClick={() => sortRacesStatistics('racesNum')}>Количество рейсов</th>
                    <th onClick={() => sortRacesStatistics('cargoNum')}>Перевезено грузов</th>
                    <th onClick={() => sortRacesStatistics('kpi')}>КПД</th>
                </tr>
            </thead>
            <tbody>
                {
                    racesStatistics.map((race, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{race.number}</td>
                            <td>{race.cost}</td>
                            <td>{race.dayCost}</td>
                            <td>{race.distance} км.</td>
                            <td>{race.rubkm} руб/км.</td>
                            <td>{race.days} дней</td>
                            <td>{race.racesNum}</td>
                            <td>{race.cargoNum}</td>
                            <td>{race.kpi}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <table className="statistics-table">
            <thead>
                <tr>
                    <th>№</th>
                    <th onClick={() => sortPardsStatistics('name')}>Контрагент</th>
                    <th onClick={() => sortPardsStatistics('cost')}>Доход</th>
                    <th onClick={() => sortPardsStatistics('racesNum')}>Перевезено грузов</th>
                </tr>
            </thead>
            <tbody>
                {
                    pardsStatistics.map((pard, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{pard.name}</td>
                            <td>{pard.cost}</td>
                            <td>{pard.racesNum}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
}


export default Statistics