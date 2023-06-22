import React, { useState, useRef, useEffect } from 'react'
import { getDateDiff } from '../../utils/dateFunctions'
import { useSelector } from 'react-redux'
import './row.css';
import dotsIcon from '../../assets/dots.png'
import DeletePopup from '../Popup/deletePopup';
import { createPortal } from 'react-dom';

function Row({ race, i, changeHandler, addAfter }) {

    const { carIndex } = useSelector(state => state.ui)
    const { carsInfo, driversInfo, raceValues } = useSelector(state => state.races)

    const [showSetting, setShowSetting] = useState(false)

    const [showDelete, setShowDelete] = useState(false)

    const ref = useRef(null);

    let countRaceSum = (i, key) => {
        for (let value of raceValues) {
            if (i === value.index) {
                return value[key]
            }
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            showSetting && setShowSetting(!showSetting);
        }
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [showSetting])

    let copyService = () => {
        let driversArr = driversInfo.filter(item => item[0].includes(race.driver))[0][0].split(' ')
        let driver = driversArr[0] + ' ' + driversArr[1].substring(0, 1) + '.' + driversArr[2].substring(0, 1) + '.'
        navigator.clipboard.writeText(`Транспортно-экспедиторские услуги по маршруту г.${race.load} - г.${race.unload}, водитель ${driver} ${carsInfo[carIndex][1]} ${carsInfo[carIndex][0].replace(' ', '/')}, п/п ${carsInfo[carIndex][5].replace(' ', '/')}`)
    }

    return <React.Fragment key={i}>
        {
            createPortal(
                <DeletePopup showDelete={showDelete} setShowDelete={setShowDelete} cargoIndex={i} carIndex={carIndex} />,
                document.getElementById('root')
            )
        }
        {
            race.stage === 0 && <tr
                style={{ backgroundColor: '#ffffff' }}
                className='begin-race'><td>Начало рейса</td>
            </tr>
        }
        <tr className="races">
            <td width='px'>{i + 1}.</td>
            <td>{race.load + " (" + race.loadDate + ") → " + race.unload + " (" + race.unloadDate + ")"}</td>
            <td>{race.driver}</td>
            <td>{parseInt(race.distance)} ({parseInt(race.interval)})</td>
            <td>{race.cost}</td>
            <td>{race.firm}</td>
            <td><a href={race.link ? race.link : null} target="_blank" rel='noreferrer'>{race.pard}</a></td>
            <td onClick={() => setShowSetting(true)} className='row-dots-setting'>
                <img src={dotsIcon} alt='' className='row-dots-img' />
                <div
                    ref={ref}
                    className='row-settings'
                    style={{ display: showSetting ? 'flex' : 'none' }}
                    onClick={() => setTimeout(() => setShowSetting(false), 100)}
                >
                    <div className='settings-button' onClick={() => changeHandler(i)}>Изменить</div>
                    <div className='settings-button' onClick={() => addAfter(i)}>Добавить ниже</div>
                    <div className='settings-button' onClick={() => copyService()}>Копировать</div>
                    <div className='settings-button' onClick={() => setShowDelete(true)}>Удалить</div>
                </div>
            </td>
        </tr>
        {
            race.stage === 2 && <tr className='race-end'>
                <td>Конец рейса</td>
                <td>{(~~countRaceSum(i, 'cost') / ~~countRaceSum(i, 'distance')).toFixed(1)} руб/км</td>
                <td>{~~countRaceSum(i, 'distance') * 6} руб.</td>
                <td>{~~countRaceSum(i, 'distance')} км.</td>
                <td>{~~countRaceSum(i, 'cost')} руб.</td>
                <td>{~~(~~countRaceSum(i, 'cost') / getDateDiff(countRaceSum(i, 'startDate'), countRaceSum(i, 'finishDate')))} руб./день</td>
                <td>{getDateDiff(countRaceSum(i, 'startDate'), countRaceSum(i, 'finishDate'))} дней</td><td></td>
            </tr>
        }
    </React.Fragment >
}


export default Row