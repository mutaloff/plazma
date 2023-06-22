import "./popup.css";
import { useWindowSize } from '../../customHooks/useWindowSize';
import { useSelector } from "react-redux";
import ClosePopup from "./closePopup";
import getPopupContent from "./addPopupContent";
import { useDispatch } from "react-redux";
import { changeCargoAction } from "../../redux/racesReducer";
import { Checkbox, Button } from "../ Elements/elements";
import InputContainer from "../Input/inputContainer";


function AddPopup({ races, closeHandler, extra, setExtra, addHandler, autocompleteHandler }) {

    const [width, height] = useWindowSize()

    const { carIndex, showPopup, addCargo, cargoIndex } = useSelector(state => state.ui)

    const { newCargo } = useSelector(state => state.races)

    const dispatch = useDispatch()

    const inputs = getPopupContent(races, carIndex, cargoIndex, addCargo)

    const stages = ['НАЧАЛО РЕЙСА', 'РЕЙС', 'КОНЕЦ РЕЙСА']


    return <div className="popup-wrapper" style={{ display: showPopup ? 'flex' : 'none' }}>
        <div className="add-popup" style={{ width: width - (width > 600 ? 250 : 50), height: height - (height > 700 ? 200 : 150) }}>
            <ClosePopup closeHandler={closeHandler} />
            <div className="popup-content">
                {
                    showPopup && Object.keys(races[carIndex]).map((race, i) => (
                        <div key={i} className="popup">
                            {
                                i === cargoIndex && <>
                                    {
                                        inputs.map((item, i) => (
                                            <InputContainer
                                                key={i}
                                                inputKey={item.key}
                                                name={item[Object.keys(item)[0]]}
                                                info={item.info}
                                                type={item.type}
                                                elems={item?.elems}
                                                handler={autocompleteHandler}
                                            />
                                        ))
                                    }
                                    <Checkbox callback={setExtra} condition={!extra} name='Догруз' />
                                    <div className="stage">
                                        {
                                            stages.map((stage, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => dispatch(changeCargoAction({ value: i, key: 'stage', type: 'number' }))}
                                                    style={{ color: newCargo.stage === i && 'blue' }}
                                                    className='race'>{stage}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    {
                                        addCargo
                                            ? <Button name='Добавить' width={'100%'} height={44} handler={addHandler} args={[i, addCargo]} />
                                            : <Button name='Изменить' width={'100%'} height={44} handler={addHandler} args={[i, addCargo]} />
                                    }
                                </>
                            }
                        </div>
                    ))
                }
            </div >
        </div >
    </div >
}

export default AddPopup;