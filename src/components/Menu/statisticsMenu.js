import { useSelector } from "react-redux"
import { countDays } from '../../utils/dateFunctions';




function StatisticsMenu({ carsNum }) {

    const { racesStatistics } = useSelector(state => state.statistics)

    const distance = racesStatistics.reduce((sum, a) => sum + a.distance, 0)
    const income = racesStatistics.reduce((sum, a) => sum + a.cost, 0)
    const days = racesStatistics.reduce((sum, a) => sum + a.days, 0)
    const cargoNum = racesStatistics.reduce((sum, a) => sum + a.cargoNum, 0)

    return <div>
        <div>Прошло дней с начала года: {countDays()}</div>
        <div>
            <span>Общие значения:</span>
            <div>Общий доход:  {income}</div>
            <div>Количество рейсов:  {racesStatistics.reduce((sum, a) => sum + a.racesNum, 0)}</div>
            <div>Перевезено грузов:  {cargoNum}</div>
            <div>Общий километраж:  {distance}</div>

        </div>
        <div>
            <span>Средние значения:</span>
            <div>Доход в день: {parseInt(income / countDays())}</div>
            <div>Доход на машину в день: {parseInt(income / countDays() / carsNum)}</div>
            <div>Руб/км:  {(income / distance).toFixed(2)}</div>
            <div>Км в день: {parseInt(distance / days)}</div>
            <div>Стоимость перевозки: {parseInt(income / cargoNum)}</div>
            <div>КПД автопарка: {(racesStatistics.reduce((sum, a) => sum + Number(a.kpi), 0) / racesStatistics.length).toFixed(2)}</div>
        </div>
        <div>Статистика машин</div>
        <div>Статистика контрагентов</div>
        <div>Статистика водителей</div>
    </div>
}


export default StatisticsMenu