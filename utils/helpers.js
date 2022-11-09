// Using moment.js for date handling
const moment = require("moment");

// Formatting dates on posts
function formatDate(date) {
  return moment(date).format("DD MMM, Y");
}

// Clipping the content of a post for wrapping in a card
function textSummary(text) {
  return text.slice(0, 100) + "...";
}

module.exports = {
  formatDate,
  textSummary,
};
