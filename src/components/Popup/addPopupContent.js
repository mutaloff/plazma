import getList from "../../utils/getList"
import { htmlDateFormat } from "../../utils/dateFunctions"


const getAddPopupContent = (races, carIndex, cargo, add) => {
    return [
        {
            pard: 'Контрагент',
            type: 'text',
            key: 'pard',
            info: add ? '' : races[carIndex][('00' + cargo).slice(-3)]?.pard,
            elems: getList(races, ['pard'])
        },
        {
            driver: 'Водитель',
            type: 'text',
            key: 'driver',
            info: add ? Object.values(races[carIndex]).at(-1)?.driver : Object.values(races[carIndex]).at(cargo)?.driver,
            elems: getList(races, ['driver'])
        },
        {
            number: 'Номер',
            type: 'text',
            key: 'number',
            info: races[carIndex][('00' + cargo).slice(-3)]?.number
        },
        {
            cost: 'Стоимость',
            type: 'number',
            key: 'cost',
            info: add ? 0 : races[carIndex][('00' + cargo).slice(-3)]?.cost
        },
        {
            load: 'Погрузка',
            type: 'text',
            key: 'load',
            info: add ? '' : races[carIndex][('00' + cargo).slice(-3)]?.load,
            elems: getList(races, ['load', 'unload'])
        },
        {
            unload: 'Выгрузка',
            type: 'text', key: 'unload',
            info: add ? '' : races[carIndex][('00' + cargo).slice(-3)]?.unload,
            elems: getList(races, ['load', 'unload'])
        },
        {
            loadDate: 'Дата погрузки',
            type: 'date',
            key: 'loadDate',
            info: add ? '' : htmlDateFormat(races[carIndex][('00' + cargo).slice(-3)]?.loadDate)
        },
        {
            unloadDate: 'Дата выгрузки',
            type: 'date',
            key: 'unloadDate',
            info: add ? '' : htmlDateFormat(races[carIndex][('00' + cargo).slice(-3)]?.unloadDate)
        },
        {
            firm: 'Фирма',
            type: 'text',
            key: 'firm',
            info: add ? 'Мегаполис' : races[carIndex][('00' + cargo).slice(-3)]?.firm,
            elems: ['Мегаполис', 'Муталов Рустем Айратович', 'Плазма', 'Автокомплект']
        },
        {
            link: 'Ссылка',
            type: 'text',
            key: 'link',
            info: add ? '' : races[carIndex][('00' + cargo).slice(-3)]?.link
        },
    ]
}

export default getAddPopupContent