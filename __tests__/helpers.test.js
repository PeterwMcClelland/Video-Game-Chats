/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : helpers.test.js  */
/* Date     : 05/13/2022       */
/* Modified : 05/13/2022       */
/* --------------------------- */
// Test case
const {format_date} = require('../utils/helpers');
test('Check format date', () => {
    const date = new Date('2020-05-13 15:25:09');
    expect(format_date(date)).toBe('5/13/2020');
});