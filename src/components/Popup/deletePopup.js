import "./popup.css";
import { useWindowSize } from '../../customHooks/useWindowSize';
import ClosePopup from "./closePopup";
import { deleteCargoAction } from "../../redux/racesReducer";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ Elements/elements";

function DeletePopup({ showDelete, setShowDelete, carIndex, cargoIndex }) {

    const [width,] = useWindowSize()


    const closeHandler = () => {
        setShowDelete(false)
    }

    const { races } = useSelector(state => state.races)

    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(deleteCargoAction({ carIndex, cargoIndex }))
        setShowDelete(false)
    }

    return <div className="popup-wrapper" style={{ display: showDelete ? 'flex' : 'none' }}>
        <div className="delete-popup" style={{ width: width - (width > 600 ? 250 : 50), height: 400 }}>
            <ClosePopup closeHandler={closeHandler} />
            <div className="delete-popup-content">
                <div className="delete-popup-note"> Удалить груз по направлению</div>
                <div className="delete-popup-note">
                    {
                        Object.values(races[carIndex])[cargoIndex].load + ' → ' + Object.values(races[carIndex])[cargoIndex].unload + '?'
                    }
                </div>
                <div className="delete-popup-note">
                    {
                        'Водитель - ' + Object.values(races[carIndex])[cargoIndex].driver
                    }
                </div>
                <div className="delete-popup-buttons">
                    <Button handler={() => deleteHandler()} name='Удалить' width={80} height={30} />
                    <Button handler={() => setShowDelete(false)} name='Отменить' width={80} height={30} />
                </div>
            </div>
        </div>
    </div>
}

export default DeletePopup;