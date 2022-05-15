/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : auth.js          */
/* Date     : 05/13/2022       */
/* Modified : 05/13/2022       */
/* --------------------------- */
// Function to avoid access through the direction path without authentication
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};
// Export module
module.exports = withAuth;