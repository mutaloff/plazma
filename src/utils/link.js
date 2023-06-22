

function getLink(str) {
    if (str) {
        var startindex = str.indexOf('/0:');
        var endindex = str.indexOf(':0/', startindex);

        if (startindex === -1) {
            startindex = str.indexOf('/1:', startindex);
        }

        if (endindex === -1) {
            endindex = str.indexOf(':500000/', startindex);
        }

        if (startindex !== -1 && endindex !== -1 && endindex > startindex) {
            return "https://e.mail.ru/inbox" + str.substring(startindex, endindex) + ":500000/"
        }
        return str
    }
    return ''
}

export default getLink

