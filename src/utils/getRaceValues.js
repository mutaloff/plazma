

const getRaceValues = (races, car) => {
    let distance = 0
    let cost = 0
    let startDate = ''
    let finishDate = ''
    let carRaceValues = Object.values(races[car])
    let result = []
    for (let i = 0; i < carRaceValues.length; i++) {
        distance = distance + carRaceValues[i].distance + carRaceValues[i].interval
        cost = cost + carRaceValues[i].cost
        let obj
        if (carRaceValues[i].stage === 0 || i === 0) {
            startDate = carRaceValues[i].loadDate
        }
        if (carRaceValues[i].stage === 2 || i === carRaceValues.length - 1) {
            finishDate = carRaceValues[i].unloadDate
            obj = { index: i, distance, cost, finishDate, startDate }
            result.push(obj)
            distance = 0
            cost = 0
        }
    }
    return result
}

export default getRaceValues