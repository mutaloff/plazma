import axios from "axios";
import { url } from "./config";
import { firebaseDB } from "./utils/firebase";
import { doc, getDocs, updateDoc, collection } from "firebase/firestore";
import { setCarsInfoAction, setDriversInfoAction, setRacesAction } from "./redux/racesReducer";

const API = {
    async getCoords() {
        let data = await axios.get(url)
        return data.data.Elm
    },
    async getDistance(x, y) {
        let replacement = [['Толмачево', 'Новосибирск'], ['Благовещенск', 'Турушла'],
        ['Сим', 'Сим, Челябинская обл.'], ['Новотроицкое', 'Чишмы'],
        ['Каменск Уральский', 'Екатеринбург'], ['Москва', 'Подольск'],
        ['Белый Яр', 'Сургут'], ['Таежный', 'Богучаны']]
        for (let item of replacement) {
            if (item[0] === x || item[0] === y) {
                if (item[0] === x) x = item[1]
                if (item[0] === y) y = item[1]
            }
        }
        let data1 = await axios.get(`https://api.geotree.ru/address.php?term=${x}&key=8ivP9SWl1dLw`)
        let a = data1.data[0]?.levels['4'].geo_center
        let data2 = await axios.get(`https://api.geotree.ru/address.php?term=${y}&key=8ivP9SWl1dLw`)
        let b = data2.data[0]?.levels['4'].geo_center
        let url = 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?'
        let key = '&travelMode=driving&key=AsvRBuzW_Wr0IFfuMqsVsrytXpfAxAg-UjPKy7H7adPR_jea1Ox1NK9EDtIfxctW'
        let route = `origins=${a.lat},%20${a.lon}&destinations=${b.lat},%20${b.lon}`
        let data = await axios.get(url + route + key)
        return data.data.resourceSets[0].resources[0].results[0].travelDistance
    },
    fetchRaces() {
        return async dispatch => {
            let races = []
            const docsSnap = await getDocs(collection(firebaseDB, 'races'))
            docsSnap.forEach(doc => {
                const ordered = Object.keys(doc.data()).sort().reduce((obj, key) => {
                    obj[key] = doc.data()[key];
                    return obj;
                }, {});
                races.push(ordered);
            })
            dispatch(setRacesAction(races.sort((a, b) => a['000']?.number.substring(1, 4) - b['000']?.number.substring(1, 4))))
        }
    },
    async addRace(id, data) {
        Object.keys(data).forEach(key => {
            if (data[key].firm === 'Муталов Рустем Айратович') {
                data[key].firm = 'Муталов Р.А.'
            }
        })
        try {
            console.log(data)
            updateDoc(doc(firebaseDB, "races", id), data)
        } catch (e) {
            console.log('Ошибка firebase', e)
        }
    },
    fetchCars() {
        return async dispatch => {
            const url = 'https://sheets.googleapis.com/v4/spreadsheets/'
            const key = 'AIzaSyCUy4YiFCuVmI_D_GDoNet-YCDJsJSiZyU'
            const carsRoute = '11_jY0Ul13rmmq_vY1DZu7uvQejPZ693nlYTEFCwRuDc/values/Машины?key='
            const driversRoute = '11_jY0Ul13rmmq_vY1DZu7uvQejPZ693nlYTEFCwRuDc/values/Водители?key='
            let carsInfo = await axios.get(url + carsRoute + key)
            let driversInfo = await axios.get(url + driversRoute + key)
            dispatch(setCarsInfoAction(carsInfo.data.values))
            dispatch(setDriversInfoAction(driversInfo.data.values))
        }
    }
}



export { API }
