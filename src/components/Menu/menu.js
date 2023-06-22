import './menu.css';
import driverLogo from '../../assets/driver-logo.png'
import carLogo from '../../assets/car-logo.png'
import statisticsLogo from '../../assets/statistics-logo.png'
import appsLogo from '../../assets/apps-logo.png'
import storageLogo from '../../assets/storage-logo.png'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCarIndexAction, setCargoIndexAction, setTabAction } from '../../redux/UIReducer';
import DriversMenu from './driversMenu';
import StatisticsMenu from './statisticsMenu';
import CarsMenu from './carsMenu';
import AppsMenu from './applicationsMenu';
import StorageMenu from './storageMenu';


function Menu() {

    const { races } = useSelector(state => state.races)

    const { tab, carIndex } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    let carHandler = (index) => {
        localStorage.setItem('car', index);
        dispatch(setCarIndexAction(index))
        dispatch(setCargoIndexAction(0))
    }

    return <div className="side-menu">
        <div className='menu-list'>
            {
                tab === 'cars'
                    ? <CarsMenu carIndex={carIndex} carHandler={carHandler} races={races} />
                    : tab === 'drivers'
                        ? <DriversMenu />
                        : tab === 'statistics'
                            ? <StatisticsMenu carsNum={races.length} />
                            : tab === 'applications'
                                ? <AppsMenu />
                                : <StorageMenu />
            }
        </div>

        <div className='tabs'>
            <span onClick={() => dispatch(setTabAction('cars'))} className={tab === 'cars' ? 'selected-icon' : ''} >
                <img className='icon' src={carLogo} alt='' />
            </span>
            <span onClick={() => dispatch(setTabAction('drivers'))} className={tab === 'drivers' ? 'selected-icon' : ''}>
                <img className='icon' src={driverLogo} alt='' />
            </span>
            <span onClick={() => dispatch(setTabAction('applications'))} className={tab === 'applications' ? 'selected-icon' : ''}>
                <img className='icon' src={appsLogo} alt='' />
            </span>
            <span onClick={() => dispatch(setTabAction('storage'))} className={tab === 'storage' ? 'selected-icon' : ''}>
                <img className='icon' src={storageLogo} alt='' />
            </span>
            <span onClick={() => dispatch(setTabAction('statistics'))} className={tab === 'statistics' ? 'selected-icon' : ''}>
                <img className='icon' src={statisticsLogo} alt='' />
            </span>
        </div>
    </div>
}

export default Menu