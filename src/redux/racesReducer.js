import { API } from "../api"
import { defaultDateFormat, today } from "../utils/dateFunctions"
import getLink from "../utils/link"

const SET_RACES = 'SET_RACES'
const CHANGE_RACES = 'CHANGE_RACES'
const ADD_RACE = 'ADD_RACE'
const SET_CARGOES = 'SET_ALL_RACES_LIST'
const CHANGE_CARGOES = 'CHANGE_ALL_RACES_LIST'
const SET_CARS_INFO = 'SET_CARS_INFO'
const SET_DRIVERS_INFO = 'SET_DRIVERS_INFO'
const SET_RACE_VALUES = 'SET_RACE_VALUES'
const ADD_CARGO = 'SET_NEW_CARGO'
const CHANGE_CARGO = 'CHANGE_NEW_CARGO'
const DELETE_CARGO = 'DELETE_CARGO'

let initialState = {
    races: [],
    cargoes: [],
    carsInfo: [],
    driversInfo: [],
    raceValues: [],
    newCargo: {}
}

export const racesReducer = ((state = initialState, action) => {
    switch (action.type) {
        case SET_RACES:
            return { ...state, races: [...action.payload] }
        case ADD_RACE:
            return { ...state, races: addRace(state.races, action.payload) }
        case CHANGE_RACES:
            return { ...state, races: [...action.payload] }
        case SET_CARGOES:
            return { ...state, cargoes: setCargoes(action.payload) }
        case CHANGE_CARGOES:
            return { ...state, cargoes: [...action.payload] }
        case SET_CARS_INFO:
            return { ...state, carsInfo: [...action.payload] }
        case SET_DRIVERS_INFO:
            return { ...state, driversInfo: [...action.payload] }
        case SET_RACE_VALUES:
            return { ...state, raceValues: [...action.payload] }
        case ADD_CARGO:
            return { ...state, newCargo: addCargo(action.payload, state.newCargo) }
        case CHANGE_CARGO:
            return { ...state, newCargo: { ...state.newCargo, ...changeCargo(action.payload) } }
        case DELETE_CARGO:
            return { ...state, races: deleteCargo(state.races, action.payload) }
        default:
            return state
    }
})

export const setRacesAction = (payload) => ({ type: SET_RACES, payload })

export const setCargoesAction = (payload) => ({ type: SET_CARGOES, payload })

export const changeCargoesAction = (payload) => ({ type: CHANGE_CARGOES, payload })

export const changeRacesAction = (payload) => ({ type: CHANGE_RACES, payload })

export const addRaceAction = (payload) => ({ type: ADD_RACE, payload })

export const setCarsInfoAction = (payload) => ({ type: SET_CARS_INFO, payload })

export const setDriversInfoAction = (payload) => ({ type: SET_DRIVERS_INFO, payload })

export const setRacesValuesAction = (payload) => ({ type: SET_RACE_VALUES, payload })

export const addCargoAction = (payload) => ({ type: ADD_CARGO, payload })

export const changeCargoAction = (payload) => ({ type: CHANGE_CARGO, payload })

export const deleteCargoAction = (payload) => ({ type: DELETE_CARGO, payload })



function setCargoes(races) {
    let result = []
    races.forEach(race => Object.values(race)
        .forEach(item => result.push({ ...item, rubkm: parseInt(item.cost / item.distance) })))
    return result
}

function addRace(races, action) {
    const result = races.map((race, i) => {
        if (action.index === i) {
            API.addRace(Object.values(races[action.index])[0].number, action.race)
            return action.race
        }
        return race
    })
    return result
}

function deleteCargo(races, action) {
    let obj = {}
    let result = races.map((race, i) => {
        if (action.carIndex === i) {
            let count = 0
            Object.values(race).forEach((cargo, j) => {
                if (j !== action.cargoIndex) {
                    obj[('00' + count).slice(-3)] = cargo
                    count = count + 1
                }
                return obj
            })
            return obj
        }
        return race
    })

    API.addRace(Object.values(races[action.carIndex])[0].number, obj).then(res => console.log(obj))
    return result
}


function addCargo({ races, carIndex, cargoIndex, addCargo, auto = false }, prevCargo) {

    const cargo = races[carIndex][('00' + cargoIndex).slice(-3)]

    auto = Boolean(auto && cargo?.pard)

    let result = {
        status: addCargo || !cargo.status ? 'Не оплачен' : cargo.status,
        firm: addCargo ? 'Мегаполис' : cargo?.firm,
        stage: addCargo ? 1 : cargo?.stage,
        distance: cargo.distance ? cargo.distance : 0,
        interval: cargo.interval ? cargo.distance : 0,
        driver: !auto ? Object.values(races[carIndex]).at(-1).driver : prevCargo?.driver,
        number: !auto ? cargo?.number : prevCargo?.number,
        date: addCargo || !auto ? today() : cargo?.date,
        cost: addCargo || !auto ? 0 : cargo?.cost,
        link: addCargo || !auto ? '' : cargo?.link,
        load: addCargo || !auto ? '' : cargo?.load,
        unload: addCargo || !auto ? '' : cargo?.unload,
        loadDate: addCargo || !auto ? '' : cargo?.loadDate,
        unloadDate: addCargo || !auto ? '' : cargo?.unloadDate,
        pard: addCargo ? '' : cargo?.pard,
    }
    return result
}

function changeCargo({ value, key, type }) {
    let obj = {}
    if (key === 'link') {
        obj[key] = getLink(value)
    } else if (type === 'date') {
        obj[key] = defaultDateFormat(value)
    } else if (type === 'number') {
        obj[key] = parseInt(value)
    } else {
        obj[key] = value
        if (value === 'Уфа' && key === 'load') {
            obj.stage = 0
        } else if (value === 'Уфа' && key === 'unload') {
            obj.stage = 2
        }
    }
    return obj
}