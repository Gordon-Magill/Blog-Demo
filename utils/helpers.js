function formatDate(date){
    return date.toLocaleDateString()
}

function textSummary(text) {
    return text.slice(0,100)+'...'
}

module.exports = {
    formatDate,
    textSummary
}