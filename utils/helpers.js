/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : helpers.js       */
/* Date     : 05/13/2022       */
/* Modified : 05/19/2022       */
/* --------------------------- */
// Call moment module to use
let moment = require("moment");
// Methods to get date format
module.exports = {
    format_date: date => {
        return `${moment(date).format("LLL")}`;
    }
}