import { useEffect, useState } from "react";
import AddPopup from "./addPopup";
import { useSelector } from "react-redux";
import { setAddCargoAction, setShowPopupAction, setShowPromptAction } from "../../redux/UIReducer";
import { addRaceAction, addCargoAction } from "../../redux/racesReducer";
import getPointsDistance from "../../utils/getPointsDistance";
import { useDispatch } from "react-redux";
import { htmlDateFormat } from "../../utils/dateFunctions";
import { getCargoInfo } from "../../utils/getCargoInfo";

function AddPopupContainer({ insert, setInsert }) {

    const { races, newCargo, cargoes } = useSelector(state => state.races)

    const [extra, setExtra] = useState(false)

    const { carIndex, addCargo, cargoIndex } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addCargoAction({ races, carIndex, cargoIndex, addCargo, auto: !addCargo }))
    }, [races, carIndex, cargoIndex, addCargo, dispatch])


    const autocompleteHandler = () => {
        let lastCargo = cargoes.sort((a, b) =>
            new Date(htmlDateFormat(a.loadDate)) - new Date(htmlDateFormat(b.loadDate)))
            .filter(item => item.pard === newCargo.pard).at(-1)
        let cargo = getCargoInfo(races, lastCargo)
        if (cargo) {
            dispatch(addCargoAction({ races, carIndex: cargo.carIndex, cargoIndex: cargo.cargoIndex, addCargo: false, auto: true }))
        }
    }

    let addHandler = (index, add = true) => {
        let obj = Object.values(races[carIndex])
        if (addCargo) {
            if (insert) {
                obj.splice(index + 1, 0, newCargo)
            } else {
                index = Object.keys(races[carIndex]).length
                obj.push({ ...newCargo })
            }
        } else {
            obj[index] = newCargo
        }

        let result = {}

        if (!extra) {
            getPointsDistance(obj, index).then(data => {
                for (let i = 0; i < data.length; i++) {
                    result[('00' + i).slice(-3)] = data[i]
                }
                dispatch(setShowPromptAction({ toShow: true, note: add ? 'Добавлено ' : 'Изменено' }))
                dispatch(addRaceAction({ race: result, index: carIndex }))
                setTimeout(() => dispatch(setShowPromptAction(false)), 3000)
            })
                .catch(() => {
                    dispatch(setShowPromptAction({ toShow: true, note: 'Не удалось добавить груз' }))
                    setTimeout(() => dispatch(setShowPromptAction(false)), 3000)
                })
        } else {
            for (let i = 0; i < obj.length; i++) {
                result[('00' + i).slice(-3)] = obj[i]
            }
            dispatch(setShowPromptAction({ toShow: true, note: add ? 'Добавлено ' : 'Изменено' }))
            dispatch(addRaceAction({ race: result, index: carIndex }))
            setTimeout(() => dispatch(setShowPromptAction(false)), 3000)
        }
        dispatch(setShowPopupAction(false))
        dispatch(setAddCargoAction(false))
    }

    const closeHandler = () => {
        dispatch(setShowPopupAction(false))
        dispatch(setAddCargoAction(false))
        setInsert(false)
    }

    return <div>
        <AddPopup
            closeHandler={closeHandler}
            addHandler={addHandler}
            setExtra={setExtra}
            races={races}
            extra={extra}
            autocompleteHandler={autocompleteHandler}
        />
    </div>

}


export default AddPopupContainer