import { saveAs } from 'file-saver';
import Excel from 'exceljs';

const workSheetName = 'Данные';
const workBookName = 'Отчеты';

const columns = [
    { header: 'Водитель', key: 'driver' },
    { header: 'Номер', key: 'number' },
    { header: 'Стоимость', key: 'cost' },
    { header: 'Погрузка', key: 'load' },
    { header: 'Выгрузка', key: 'unload' },
    { header: 'Дата погрузки', key: 'loadDate' },
    { header: 'Дата выгрузки', key: 'unloadDate' },
    { header: 'Этап', key: 'stage' },
    { header: 'Ссылка', key: 'link' },
    { header: 'Дистанция', key: 'distance' },
    { header: 'Интервал', key: 'interval' },
    { header: 'Фирма', key: 'firm' },
    { header: 'Контрагент', key: 'pard' },
    { header: 'Статус', key: 'status' },
    { header: 'Дата', key: 'date' },
];

const workbook = new Excel.Workbook();

const saveExcel = async (races) => {
    try {
        const fileName = workBookName;
        const worksheet = workbook.addWorksheet(workSheetName);
        worksheet.columns = columns;
        races.forEach((singleData, i) => {
            Object.values(singleData).forEach(data => {
                worksheet.addRow(data);
            })
        });
        const buf = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
        console.error('<<<ERRROR>>>', error);
        console.error('Something Went Wrong', error.message);
    } finally {
        workbook.removeWorksheet(workSheetName);
    }
};

export default saveExcel