import { applyMiddleware, combineReducers, createStore } from "redux"
import { racesReducer } from "./racesReducer"
import thunk from "redux-thunk"
import { uiReducer } from "./UIReducer"
import { statisticsReducer } from "./statisticsReduces"

const rootReducer = combineReducers({
    races: racesReducer,
    ui: uiReducer,
    statistics: statisticsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store