

let getDateDiff = (date1, date2) => {
    if (date1 && date2) {
        let d1 = date1.split(".");
        let d2 = date2.split(".");
        let dt1 = new Date(parseInt(d1[2], 10), parseInt(d1[1], 10) - 1, parseInt(d1[0], 10));
        let dt2 = new Date(parseInt(d2[2], 10), parseInt(d2[1], 10) - 1, parseInt(d2[0], 10));
        let Difference_In_Time = Math.abs(dt2.getTime() - dt1.getTime());
        return Difference_In_Time / (1000 * 3600 * 24);
    }
    return null
}


let countDays = (start) => {
    if (start) {
        start = htmlDateFormat(start)
    } else {
        start = new Date(new Date().getFullYear(), 0, 0)
    }
    var diff = (new Date() - new Date(start)) + ((new Date(start).getTimezoneOffset() - new Date().getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24
    var day = Math.floor(diff / oneDay) - 1
    return day
}

function today() {
    const today = new Date()
    const yyyy = today.getFullYear()
    let mm = today.getMonth() + 1
    let dd = today.getDate()

    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm

    return dd + '.' + mm + '.' + yyyy;
}

function htmlDateFormat(date) {
    if (date?.includes('.')) {
        let a = date.split('.')
        return a[2] + '-' + a[1] + '-' + a[0];
    }
    return date
}



function defaultDateFormat(date) {
    if (date?.includes('-')) {
        let a = date.split('-')
        return a[2] + '.' + a[1] + '.' + a[0];
    }
    return date
}


export { getDateDiff, countDays, today, htmlDateFormat, defaultDateFormat }