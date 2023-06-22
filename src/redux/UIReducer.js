const SET_CAR_INDEX = 'SET_CAR_INDEX'
const SET_TAB = 'SET_TAB'
const SET_SHOW_POPUP = 'SET_SHOW_POPUP'
const SET_SHOW_PROMPT = 'SET_SHOW_PROMPT'
const SET_ADD_CARGO = 'SET_ADD_CARGO'
const SET_CARGO_INDEX = 'SET_ADD_CARGO_INDEX'
const SET_SHOW_ALL_CARGOES = 'SET_SHOW_ALL_CARGOES'
const SET_SHOW_COMPARE_DATA = 'SET_SHOW_COMPARE_DATA'
const SET_SHOW_FINES = 'SET_SHOW_FINES'
const SET_SHOW_BIDS = 'SET_SHOW_BIDS'
const SET_SHOW_PASSES = 'SET_SHOW_PASSES'
const SET_SHOW_PASSWORDS = 'SET_SHOW_PASSWORDS'

let initialState = {
    carIndex: localStorage.getItem('car') ? Number(localStorage.getItem('car')) : 0,
    tab: 'cars',
    showPopup: false,
    showPrompt: false,
    promptNote: '',
    addCargo: false,
    cargoIndex: 0,
    showAllCargoes: false,
    showCompareData: false,
    showFines: false,
    showBids: false,
    showPasses: false,
    showPasswords: false
}

export const uiReducer = ((state = initialState, action) => {
    switch (action.type) {
        case SET_CAR_INDEX:
            return { ...state, carIndex: action.payload }
        case SET_TAB:
            return { ...state, tab: action.payload }
        case SET_SHOW_POPUP:
            return { ...state, showPopup: action.payload }
        case SET_SHOW_PROMPT:
            return { ...state, showPrompt: action.payload.toShow, promptNote: action.payload.note }
        case SET_ADD_CARGO:
            return { ...state, addCargo: action.payload }
        case SET_CARGO_INDEX:
            return { ...state, cargoIndex: action.payload }
        case SET_SHOW_ALL_CARGOES:
            return { ...state, showAllCargoes: action.payload }
        case SET_SHOW_COMPARE_DATA:
            return { ...state, showCompareData: action.payload }
        case SET_SHOW_FINES:
            return { ...state, showFines: action.payload }
        case SET_SHOW_BIDS:
            return { ...state, showBids: action.payload }
        case SET_SHOW_PASSES:
            return { ...state, showPasses: action.payload }
        case SET_SHOW_PASSWORDS:
            return { ...state, showPasswords: action.payload }
        default:
            return state
    }
})

export const setCarIndexAction = (payload) => ({ type: SET_CAR_INDEX, payload })

export const setShowAllCargoesAction = (payload) => ({ type: SET_SHOW_ALL_CARGOES, payload })

export const setShowCompareDataAction = (payload) => ({ type: SET_SHOW_COMPARE_DATA, payload })

export const setShowFinesAction = (payload) => ({ type: SET_SHOW_FINES, payload })

export const setShowBidsAction = (payload) => ({ type: SET_SHOW_BIDS, payload })

export const setShowPassesAction = (payload) => ({ type: SET_SHOW_PASSES, payload })

export const setShowPasswordsAction = (payload) => ({ type: SET_SHOW_PASSWORDS, payload })

export const setCargoIndexAction = (payload) => ({ type: SET_CARGO_INDEX, payload })

export const setShowPopupAction = (payload) => ({ type: SET_SHOW_POPUP, payload })

export const setShowPromptAction = (payload) => ({ type: SET_SHOW_PROMPT, payload })

export const setTabAction = (payload) => ({ type: SET_TAB, payload })

export const setAddCargoAction = (payload) => ({ type: SET_ADD_CARGO, payload })
