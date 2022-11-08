const moment = require("moment");
const { User } = require("../models/index");

function formatDate(date) {
  return moment(date).format("DD MMM, Y");
}

function textSummary(text) {
  return text.slice(0, 100) + "...";
}

// function authorIDtoUsername(id_val) {
//   const user = User.findOne({
//     where: {
//       id: id_val,
//     },
//   });

//   user.then((userData) => {
//      const plainUser = userData.get({plain:true})
//     console.log('plainUser:',plainUser);

//     return plainUser.username;
//   });
// }

module.exports = {
  formatDate,
  textSummary,
  //   authorIDtoUsername,
};
