import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { getCargoInfo } from '../../utils/getCargoInfo';
import getList from '../../utils/getList';
import sortList from '../../utils/sortList';



const parseKeys = (item, keys = []) => {
    let newArr = []
    for (let key of keys) {
        newArr.push(item[key])
    }

    return newArr
}

const DataCompare = () => {

    let pard

    const [data, setData] = useState([])

    const [resultExcel, setResultExcel] = useState([])

    const [resultDB, setResultDB] = useState([])

    const [overlap, setOverlap] = useState([])

    const dataReadHandler = (e) => {
        const reader = new FileReader()
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result
            const workbook = XLSX.read(data, {
                type: 'binary',
                cellDates: true,
            })
            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]
            const result = XLSX.utils.sheet_to_json(sheet)

            const parsedData = result.map(res => {
                const day = new Date(res.unloadDate).getDate()
                const month = new Date(res.unloadDate).getMonth()
                const year = new Date(res.unloadDate).getFullYear()
                return { ...res, unloadDate: ('0' + day).slice(-2) + '.' + ('0' + (month + 1)).slice(-2) + '.' + year }
            })
            setData(parsedData)
        }
    }

    const { races } = useSelector(state => state.races)

    const compareHandler = () => {
        let db = [...races]
        let leftoversExcel = []
        let coincidence = []
        data.forEach((value, index) => {
            let res = getCargoInfo(db, value)
            if (res) {
                db = db.map((race, i) => {
                    if (i === res.carIndex) {
                        let result = {}
                        Object.keys(race).forEach((key, j) => {
                            if (j !== res.cargoIndex) {
                                return result[("000" + j).slice(-3)] = race[key]
                            } else {
                                coincidence.push([race[key], value])
                            }
                        })
                        return result
                    }
                    return race
                })
            } else {
                leftoversExcel.push(value)
            }
            let list = []
            for (let value of getList(db)) {
                let obj = {}
                obj.unloadDate = value.unloadDate
                obj.pard = value.pard
                obj.cost = value.cost
                obj.firm = value.firm
                obj.driver = value.driver
                obj.link = value.link
                list.push(obj)
            }
            setOverlap(coincidence)
            setResultDB(sortList(list, 'unloadDate', true))
            setResultExcel(sortList(leftoversExcel, 'unloadDate', true))
        })
    }


    return <div>
        <div>

            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={dataReadHandler}
            />
            <button onClick={compareHandler}>Сравнить</button>
            {
                data.length > 0 && (
                    <div style={{ display: 'flex' }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    {
                                        ['unloadDate', 'pard', 'cost'].map((key) => (
                                            <th key={key}>{key}</th>
                                        ))
                                    }
                                    {
                                        ['unloadDate', 'pard', 'cost', 'driver'].map((key) => (
                                            <th key={key}>{key}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    overlap.map((row, index) => (
                                        <> {
                                            (!pard || pard.includes(row[0].pard.toLowerCase().replace(/\s/g, ''))) && < tr key={index}>
                                                <td>{index}</td>
                                                {
                                                    Object.values(parseKeys(row[1], ['unloadDate', 'pard', 'cost'])).map((value, index) => (
                                                        <td key={index}>{value}</td>
                                                    ))
                                                }
                                                {

                                                    Object.values(parseKeys(row[0], ['unloadDate', 'pard', 'cost', 'driver'])).map((value, index) => (
                                                        <td key={index}>{value}</td>
                                                    ))
                                                }
                                            </tr >
                                        }
                                        </>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                )}

            {
                data.length > 0 && (
                    <div style={{ display: 'flex' }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    {
                                        Object.keys(data[0]).map((key) => (
                                            <th key={key}>{key}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    resultExcel.map((row, index) => (
                                        (!pard || pard.includes(row.pard.toLowerCase().replace(/\s/g, ''))) &&
                                        <tr key={index}>
                                            <td>{index}</td>
                                            {

                                                Object.values(row).map((value, index) => (
                                                    <td key={index}>{value}</td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <table className="table">
                            <thead>
                                <tr>
                                    {
                                        Object.keys(data[0]).map((key) => (
                                            <th key={key}>{key}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    resultDB.map((row, index) => (
                                        (!pard || pard.includes(row.pard.toLowerCase().replace(/\s/g, ''))) &&
                                        <tr key={index}>
                                            {
                                                Object.values(row).map((value, index) => (
                                                    index < 5
                                                        ? <td key={index}>{value}</td>
                                                        : <td ><a href={value} target='_blanc'>ссылка</a></td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )}
        </div>
    </div >
}


export default DataCompare
