/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : messaje.js       */
/* Date     : 05/13/2022       */
/* Modified : 05/15/2022       */
/* --------------------------- */
// Function to add a message
async function messageFormHandler(event) {
    // Prevent the default behavior (refresh)
    event.preventDefault();
    // Declare variables to get value from page
    const message = document.querySelector('input[name="message-body"]').value.trim();
    const chat_id = window.location.toString().split('/')[
                    window.location.toString().split('/').length - 1];
    // If message is not null then save and redirect to messages
    if (message) {
        const response = await fetch('/api/messages', {
            method: 'POST',
            body: JSON.stringify({
                 message
                ,chat_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Check the response status
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        };
    };
};
// Function to reload messages to get the most recents
function getRecentMessages() {
    setInterval(function(){
        if (!document.querySelector('input[name="message-body"]').value.trim()){
            document.location.reload();
        };
    }, 20000);
};
// Call function to begin, first getting the current day and time
getRecentMessages();
// Declare listener to execute click event for add new post
document.querySelector('.message-form').addEventListener('submit', messageFormHandler);