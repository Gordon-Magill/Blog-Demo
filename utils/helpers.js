const moment = require('moment')

function formatDate(date){
    return moment(date).format('DD MMM, Y')
}

function textSummary(text) {
    return text.slice(0,100)+'...'
}

module.exports = {
    formatDate,
    textSummary
}