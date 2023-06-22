const getList = (races, keys = []) => {
    let result = []
    let carIndex = 0
    for (let race of Object.values(races)) {
        if (keys.length) {
            for (let key of keys) {
                result.push(...Object.values(race).map(item => item[key]))
            }
        } else {
            result.push(...Object.values(race))
        }
        carIndex = carIndex + 1
    }
    return ([...new Set(result)])
}

export default getList