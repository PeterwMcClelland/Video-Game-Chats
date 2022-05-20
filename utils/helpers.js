/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : helpers.js       */
/* Date     : 05/13/2022       */
/* Modified : 05/19/2022       */
/* --------------------------- */
// Call date-fs module to use
const dayjs = require("dayjs");
// Methods to get date format
module.exports = {
    format_date: date => {
        return dayjs(date).format('MMMM D, YYYY h:mm a');
    }
}