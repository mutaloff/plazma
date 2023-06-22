import { htmlDateFormat } from "./dateFunctions"

const getCargoInfo = (races, cargo) => {
    if (cargo) {
        let carIndex = 0
        let result = []
        let length = Object.keys(cargo).length
        let coincidences = []
        for (let race of races) {
            let cargoIndex = 0
            for (let cargoes of Object.values(race)) {
                coincidences = []
                for (let key of Object.keys(cargo)) {
                    if (cargo[key] === cargoes[key]) {
                        coincidences.push({ key, procent: 1 })
                    } else {
                        if (key === 'pard') {
                            let str1 = cargo[key].toLowerCase().replace(/\s/g, '')
                            let str2 = cargoes[key].toLowerCase().replace(/\s/g, '')
                            if (str1.includes(str2) || str2.includes(str1)) {
                                coincidences.push({ key, procent: 1 })
                            }
                        } else if (key === 'cost') {
                            if (parseInt(cargo[key]) === parseInt(cargoes[key])) {
                                coincidences.push({ key, procent: 1 })
                            }
                        } else if (key === 'unloadDate') {
                            let excelDate = new Date(htmlDateFormat(cargo[key])).getTime()
                            let dbDate = new Date(htmlDateFormat(cargoes[key])).getTime()

                            if (Math.abs(excelDate - dbDate) < 1 * 86400000) {
                                coincidences.push({ key, procent: 1 })
                            } else if (Math.abs(excelDate - dbDate) < 2 * 86400000) {
                                coincidences.push({ key, procent: 0.9 })
                            } else if (Math.abs(excelDate - dbDate) < 4 * 86400000) {
                                coincidences.push({ key, procent: 0.8 })
                            } else if (Math.abs(excelDate - dbDate) < 7 * 86400000) {
                                coincidences.push({ key, procent: 0.7 })
                            } else if (Math.abs(excelDate - dbDate) < 30 * 86400000) {
                                coincidences.push({ key, procent: 0.5 })
                            }
                        }
                    }
                }
                let obj = {}
                obj.procent = coincidences.reduce((sum, a) => sum + a.procent, 0) / length
                obj.carIndex = carIndex
                obj.cargoIndex = cargoIndex
                obj.pard = cargo.pard
                obj.coincidences = coincidences
                result.push(obj)
                cargoIndex = cargoIndex + 1
            }
            carIndex = carIndex + 1
        }

        let max = Math.max(...result.map(o => o.procent))
        if (cargo.pard === 'ФОРТУНА-ТРАНС') {
            console.log(max)
        }
        if (max > 0.8) {
            let max = Math.max(...result.map(o => o.procent))
            return result.find(element => element.procent === max);
        }
        return
    }
}

export { getCargoInfo }