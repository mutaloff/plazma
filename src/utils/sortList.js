

let sortList = (list, key, up) => {
    if (up) {
        return [...list.sort((a, b) => {
            if (key === 'number') {
                return parseInt(a[key].substring(1, 4)) - parseInt(b[key].substring(1, 4))
            }
            if (key === 'unloadDate') {
                let aDate = a.unloadDate.split(".")
                let bDate = b.unloadDate.split(".")
                return new Date(aDate[2], aDate[1] - 1, aDate[0]).getTime() - new Date(bDate[2], bDate[1] - 1, bDate[0]).getTime()

            }
            if (typeof a[key] === 'string') {
                return a[key].localeCompare(b[key])
            }
            return a[key] - b[key]
        })]
    } else {
        return [...list.sort((a, b) => {
            if (key === 'number') {
                return parseInt(b[key].substring(1, 4)) - parseInt(a[key].substring(1, 4))
            }
            if (key === 'unloadDate') {
                let aDate = a.unloadDate.split(".")
                let bDate = b.unloadDate.split(".")
                return new Date(bDate[2], bDate[1] - 1, bDate[0]).getTime() - new Date(aDate[2], aDate[1] - 1, aDate[0]).getTime()
            }
            if (typeof a[key] === 'string') {
                return b[key].localeCompare(a[key])
            }
            return b[key] - a[key]
        })]
    }
}

export default sortList