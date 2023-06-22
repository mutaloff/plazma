import { useEffect } from 'react';
import { setShowAllCargoesAction, setShowBidsAction, setShowCompareDataAction, setShowFinesAction, setShowPassesAction, setShowPasswordsAction } from '../../redux/UIReducer';
import { useDispatch } from 'react-redux';
import compareLogo from '../../assets/compare.png'
import allCargoesLogo from '../../assets/notes-logo.png'
import finesLogo from '../../assets/fines-logo.png'
import passLogo from '../../assets/pass-logo.png'
import bidLogo from '../../assets/bid-logo.png'
import passwordLogo from '../../assets/password-logo.png'
import './menu.css'

function ApplicationsMenu() {

    const dispatch = useDispatch()

    useEffect(() => () => {
        dispatch(setShowAllCargoesAction(false))
        dispatch(setShowCompareDataAction(false))
        dispatch(setShowFinesAction(false))
    }, [dispatch])

    const showAllCargoes = () => {
        dispatch(setShowAllCargoesAction(true))
    }

    const compareData = () => {
        dispatch(setShowCompareDataAction(true))
    }

    const showFines = () => {
        dispatch(setShowFinesAction(true))
    }

    const showBids = () => {
        dispatch(setShowBidsAction(true))
    }

    const showPasses = () => {
        dispatch(setShowPassesAction(true))
    }

    const showPasswords = () => {
        dispatch(setShowPasswordsAction(true))
    }

    return <>
        <div onClick={() => showAllCargoes()} className='compare-menu'>
            <img src={allCargoesLogo} alt='' className='icon' />
            <span className='compare-menu-text'>Показать все</span>
        </div>
        <div onClick={() => compareData()} className='compare-menu'>
            <img src={compareLogo} alt='' className='icon' />
            <span className='compare-menu-text'>Сравнить данные </span>
        </div>
        <div onClick={() => showFines()} className='compare-menu'>
            <img src={finesLogo} alt='' className='icon' />
            <span className='compare-menu-text'>Поиск штрафов </span>
        </div>
        <div onClick={() => showBids()} className='compare-menu'>
            <img src={passLogo} alt='' className='icon' />
            <span className='compare-menu-text'>Создать пропуск</span>
        </div>
        <div onClick={() => showPasses()} className='compare-menu'>
            <img src={bidLogo} alt='' className='icon' />
            <span className='compare-menu-text'>Создать заявку </span>
        </div>
        <div onClick={() => showPasswords()} className='compare-menu'>
            <img src={passwordLogo} alt='' className='icon' />
            <span className='compare-menu-text'>Пароли </span>
        </div>
    </>
}


export default ApplicationsMenu