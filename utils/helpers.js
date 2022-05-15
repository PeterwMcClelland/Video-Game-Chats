/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : helpers.js       */
/* Date     : 05/13/2022       */
/* Modified : 05/13/2022       */
/* --------------------------- */
// Methods to get differents formats
module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} - HH:MM:SS`;
    }
}