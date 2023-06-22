import { countDays, getDateDiff } from "../utils/dateFunctions"
import getList from "../utils/getList"
import getRaceValues from "../utils/getRaceValues"

const SET_RACES_STATISTICS = 'SET_RACES_STATISTICS'
const SET_PARDS_STATISTICS = 'SET_PARDS_STATISTICS'
const CHANGE_RACES_STATISTICS = 'CHANGE_RACES_STATISTICS'
const CHANGE_PARDS_STATISTICS = 'CHANGE_PARDS_STATISTICS'

let initialState = {
    racesStatistics: [],
    pardsStatistics: []
}

export const statisticsReducer = ((state = initialState, action) => {
    switch (action.type) {
        case SET_RACES_STATISTICS:
            return { ...state, racesStatistics: getRacesStatistics(action.payload) }
        case CHANGE_RACES_STATISTICS:
            return { ...state, racesStatistics: [...action.payload] }
        case SET_PARDS_STATISTICS:
            return { ...state, pardsStatistics: getPardsStatistics(action.payload) }
        case CHANGE_PARDS_STATISTICS:
            return { ...state, pardsStatistics: [...action.payload] }
        default:
            return state
    }
})

export const setRacesStatisticsAction = (payload) => ({ type: SET_RACES_STATISTICS, payload })

export const changeRacesStatisticsAction = (payload) => ({ type: CHANGE_RACES_STATISTICS, payload })

export const setPardsStatisticsAction = (payload) => ({ type: SET_PARDS_STATISTICS, payload })

export const changePardsStatisticsAction = (payload) => ({ type: CHANGE_PARDS_STATISTICS, payload })


function getRacesStatistics(races) {
    let getRacesDays = (races, carIndex) => {
        return (getRaceValues(races, carIndex)
            .map(value => {
                if (value.startDate !== '') {
                    return getDateDiff(value.startDate, value.finishDate)
                } else {
                    return getDateDiff(races[carIndex]['000'].loadDate, value.finishDate)
                }
            })
            .reduce((sum, a) => {
                if (a) return sum + a
                return sum
            }, 0))
    }
    let result = []
    for (let race of Object.values(races)) {
        result.push({
            number: race['000']?.number,
            cost: parseInt(Object.values(race).map(item => item.cost).reduce((sum, a) => sum + a, 0)),
            distance: parseInt(Object.values(race).map(item => item.distance + item.interval).reduce((sum, a) => sum + a, 0)),
            days: getDateDiff,
            cargoNum: Object.keys(race).length
        })
    }

    result.map((res, i) => {
        let raceDays = getRacesDays(races, i)
        res.rubkm = parseInt(res.cost / res.distance)
        res.days = raceDays
        res.dayCost = parseInt(res.cost / raceDays)
        res.racesNum = Object.values(races[i]).filter(race => race.stage === 2).length
        res.kpi = (raceDays / countDays(races[i]['000']?.loadDate)).toFixed(2)
        return res
    })
    return result
}


function getPardsStatistics(races) {
    let result = []
    for (let pard of getList(races, ['pard'])) {
        let cost = 0
        let n = 0
        for (let item of getList(races)) {
            if (pard === item.pard) {
                cost = parseInt(cost + item.cost)
                n = n + 1
            }
        }
        result.push({ name: pard, cost, racesNum: n })

    }
    return result
}