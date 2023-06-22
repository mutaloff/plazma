import "./input.css";
import autoKeyboard from "../../utils/keyboard";
import { useEffect, useState } from "react";
import { changeCargoAction } from "../../redux/racesReducer";
import { useDispatch, useSelector } from "react-redux";
import upFirstChar from "../../utils/stringFunctions";
import { htmlDateFormat } from "../../utils/dateFunctions";
import { Input } from "./input";


function InputContainer({ name, info, type = 'text', inputKey, elems = [], handler }) {

    const { addCargo } = useSelector(state => state.ui)

    const { newCargo } = useSelector(state => state.races)

    let [text, setText] = useState(info)

    let [display, setDisplay] = useState(false)

    let [searchListItems, setSearchListItems] = useState(elems)

    let [placeHolder, setPlaceHolder] = useState('')

    const [num, setNum] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        if (addCargo) {
            setText(type === 'date' ? htmlDateFormat(newCargo[inputKey]) : newCargo[inputKey])
            setPlaceHolder('')
        }
    }, [newCargo, inputKey, addCargo, type])

    useEffect(() => setPlaceHolder(info ? '' : upFirstChar(searchListItems[0]?.toLowerCase())), [searchListItems, info])

    useEffect(() => {
        dispatch(changeCargoAction({ value: text, key: inputKey, type }))
    }, [text, dispatch, inputKey, type])

    const changeHandler = (e) => {
        if (type === 'text' && name !== 'Ссылка') {
            setText(autoKeyboard(upFirstChar(e.target.value)));
            setSearchListItems(elems.filter(item => item && item.toLowerCase().startsWith(autoKeyboard(e.target.value.toLowerCase()))))
        } else {
            setText(e.target.value)
        }
        setNum(0)
    }

    const keyHandler = (e) => {
        if (e.keyCode === 38) {
            setNum(num > 0 ? num - 1 : 0)
        } else if (e.keyCode === 40) {
            setNum(num < searchListItems.length - 1 ? num + 1 : num)
        } else if (e.keyCode === 13) {
            if (elems.length) {
                setText(Boolean(elems[0]) ? searchListItems[num] : e.target.value)
            }
            e.target.blur()
            setPlaceHolder('')
        }
    }

    const focusHandler = (e) => {
        setSearchListItems(elems)
        setDisplay(true)
        if (elems.length || name === 'Ссылка') {
            setText('')
        }
    }

    const blurHandler = (e) => {
        if (type === 'number') {
            setText(String(text).length > 0 && String(text).length < 4 ? text + '000' : text)
        }
        setTimeout(() => setDisplay(false), 200)
    }

    return <>
        <Input
            name={name}
            text={text}
            type={type}
            inputKey={inputKey}
            elems={elems}
            handler={handler}
            placeHolder={placeHolder}
            setPlaceHolder={setPlaceHolder}
            changeHandler={changeHandler}
            searchListItems={searchListItems}
            blurHandler={blurHandler}
            focusHandler={focusHandler}
            keyHandler={keyHandler}
            display={display}
            setText={setText}
            num={num}
            setSearchListItems={setSearchListItems}
        />
    </>
}

export default InputContainer