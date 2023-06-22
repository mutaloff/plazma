import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import sortList from "../../utils/sortList"
import { changeCargoesAction } from "../../redux/racesReducer"
import saveExcel from "../../utils/saveExcel"





const AllCargoes = () => {

    const [up, setUp] = useState(true)

    const dispatch = useDispatch()

    const { cargoes } = useSelector(state => state.races)

    const { races } = useSelector(state => state.races)

    let sortRaces = (races, key, up) => {
        races = sortList(races, key, up)
        dispatch(changeCargoesAction(races))
        setUp(!up)
    }

    return <div className='all-cargoes-table'>
        <button onClick={() => saveExcel(races)}>Скачать Excel</button>
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th onClick={() => sortRaces(cargoes, 'number', up)}>Номер</th>
                    <th onClick={() => sortRaces(cargoes, 'driver', up)}>Водитель</th>
                    <th onClick={() => sortRaces(cargoes, 'unloadDate', up)}>Маршрут</th>
                    <th onClick={() => sortRaces(cargoes, 'pard', up)}>Контрагент</th>
                    <th onClick={() => sortRaces(cargoes, 'firm', up)}>Фирма</th>
                    <th onClick={() => sortRaces(cargoes, 'cost', up)}>Стоимость</th>
                    <th onClick={() => sortRaces(cargoes, 'distance', up)}>Дистанция</th>
                    <th onClick={() => sortRaces(cargoes, 'rubkm', up)}>Руб/км</th>
                </tr>
            </thead>
            <tbody>
                {
                    cargoes.map((cargo, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{cargo.number}</td>
                            <td>{cargo.driver}</td>
                            <td>{cargo.load + ' (' + cargo.loadDate + ') → ' + cargo.unload + ' (' + cargo.unloadDate + ')'}</td>
                            <td><a href={cargo.link} target='_blank' rel='noreferrer'>{cargo.pard}</a></td>
                            <td>{cargo.firm}</td>
                            <td>{cargo.cost}</td>
                            <td>{cargo.distance ? parseInt(cargo.distance) : 'Догруз'}</td>
                            <td>{cargo.rubkm ? cargo.rubkm : ''}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
}


export default AllCargoes