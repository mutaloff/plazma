import { API } from "../api"


async function getPointsDistance(race, i) {
    async function countDistance(load, unload, type) {
        let data = await API.getDistance(load, unload)
        race[i][type] = data
        return data
    }
    if (race.length) {
        if (i === 0) {
            race[i].interval = 0
        } else {
            if (race[i - 1].unload.includes('-')) {
                let unload = race[i - 1].unload.split('-').at(-1)
                let load = race[i].load
                await countDistance(load, unload, 'interval')
            } else {
                let unload = race[i - 1].unload
                let load = race[i].load
                await countDistance(load, unload, 'interval')
            }
        }

        if (race[i].load === 'Уфа' && race[i].unload === 'Новый Уренгой') {
            race[i].distance = 2356
        } else if (race[i].load === 'Челябинск' && race[i].unload === 'Уфа') {
            race[i].distance = 427
        } else if (race[i].load === 'Югорск' && race[i].unload === 'Челябинск') {
            race[i].distance = 922
        } else if (race[i].load === 'Ноябрьск' && race[i].unload === 'Талинка') {
            race[i].distance = 792
        }
        else {
            if (race[i].unload.includes('-')) {
                let load = race[i].load
                let unloads = race[i].unload.split('-')
                let distances = []
                for (let j = 0; j < unloads.length; j++) {
                    if (j === 0) {
                        distances.push(await countDistance(load, unloads[j], 'distance'))
                    } else {
                        distances.push(await countDistance(unloads[j - 1], unloads[j], 'distance'))
                    }
                }
                race[i].distance = distances.reduce((partialSum, a) => partialSum + a, 0)
            } else {
                await countDistance(race[i].load, race[i].unload, 'distance')
            }
        }
    }
    return race
}

export default getPointsDistance