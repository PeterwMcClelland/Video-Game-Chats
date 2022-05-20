/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : message-view.js  */
/* Date     : 05/13/2022       */
/* Modified : 05/14/2022       */
/* --------------------------- */
// Function to reload messages to get the most recents
function getRecentMessages() {
    setInterval(function(){
            document.location.reload();
    }, 20000);
};
// Call function to begin, first getting the current day and time
getRecentMessages();