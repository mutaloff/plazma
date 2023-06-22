import Row from "../Row/row";
import './cars.css';
import React, { useEffect, useState } from 'react';
import AddPopupContainer from '../Popup/addPopupContainer';
import Header from '../Header/header';
import Prompt from "../Prompt/prompt";
import { createPortal } from "react-dom";
import getRaceValues from "../../utils/getRaceValues";
import { useSelector, useDispatch } from "react-redux";
import { setShowPopupAction, setAddCargoAction, setCargoIndexAction } from "../../redux/UIReducer";
import { setRacesValuesAction } from "../../redux/racesReducer";

function Cars() {

    const { races } = useSelector(state => state.races)
    const { carIndex } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    const [insert, setInsert] = useState(false)

    useEffect(() => {
        dispatch(setRacesValuesAction(getRaceValues(races, carIndex)))
    }, [dispatch, carIndex, races])

    let changeHandler = (index) => {
        dispatch(setShowPopupAction(true))
        dispatch(setCargoIndexAction(index))
    }

    let addAfter = (i) => {
        dispatch(setAddCargoAction(true))
        setInsert(true)
        changeHandler(i)
    }

    const columnNames = ['№', 'Маршрут', 'Водитель', 'Дистанция', 'Стоимость', 'Фирма', 'Контрагент', '']

    return <div className="main">
        {
            createPortal(
                <>
                    <Prompt />
                    <AddPopupContainer
                        insert={insert}
                        setInsert={setInsert}
                    />
                </>,
                document.getElementById('root')
            )
        }
        <Header />
        <div className="info">
            <table className="table">
                <thead>
                    <tr>
                        {
                            columnNames.map((name, i) => <th key={i}> {name}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.values(races[carIndex]).map((race, i) => (
                            <Row
                                key={i}
                                race={race}
                                i={i}
                                addAfter={addAfter}
                                changeHandler={changeHandler}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
}

export default Cars;