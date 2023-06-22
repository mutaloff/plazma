import SearchList from "./searchList";
import { Button } from "../ Elements/elements";
import { useSelector } from "react-redux";



function Input({
    name,
    text,
    type = 'text',
    inputKey,
    elems = [],
    handler,
    placeHolder,
    setPlaceHolder,
    changeHandler,
    searchListItems,
    blurHandler,
    focusHandler,
    keyHandler,
    display,
    setText,
    num,
    setSearchListItems
}) {

    const { addCargo } = useSelector(state => state.ui)

    return <div className="group">
        {
            type === 'text' &&
            <input
                className="ph"
                placeholder={text && text.length ? placeHolder : ''}
                tabIndex={-1}
            />
        }
        <input
            placeholder={name}
            className="input"
            type={type}
            required
            value={text ? text : ''}
            onChange={changeHandler}
            onFocus={focusHandler}
            onBlur={() => blurHandler()}
            onKeyDown={keyHandler}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label className={type !== 'date' ? 'label' : 'noph'}>{name}</label>
        {
            Boolean(elems.length) &&
            <SearchList
                display={display}
                list={searchListItems}
                num={num}
                keyHandler={keyHandler}
                setText={setText}
                setPlaceHolder={setPlaceHolder}
                handler={changeHandler}
                setItems={setSearchListItems}
            />
        }
        {
            inputKey === 'pard' && addCargo &&
            <div className="autocomplete">
                <Button
                    name='Заполнить'
                    width={66}
                    height={19}
                    handler={handler}
                />
            </div>
        }
    </div >
}

export { Input }