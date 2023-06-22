import { useDispatch } from 'react-redux';
import './header.css';
import { setAddCargoAction, setShowPopupAction } from '../../redux/UIReducer';


function Header() {

    const dispatch = useDispatch()

    let clickHandler = () => {
        dispatch(setAddCargoAction(true))
        dispatch(setShowPopupAction(true))
    }

    return <div className="header">
        <div className='add-button' onClick={clickHandler}>Добавить</div>
    </div>
}

export default Header;