/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : add-chatroom.js  */
/* Date     : 05/13/2022       */
/* Modified : 05/15/2022       */
/* --------------------------- */
// Funtion to create a new chatroom
async function newFormHandler(event) {
    // Prevent the default behavior (refresh)
    event.preventDefault();
    // Declare variables to get value from page
    const title       = document.querySelector('input[name="chat-title"]').value;
    const description = document.querySelector('textarea[name="description"]').value;
    const console_id  = document.querySelector('select[name="console"]').value;
    // Validate no null values
    if (title && description) {
        // Call to chatroom route to add new chatroom
        const response = await fetch(`/api/chatrooms`, {
            method: 'POST',
            body: JSON.stringify({
                title
               ,description
               ,console_id
            })
        ,headers: {
                'Content-Type': 'application/json'
            }
        });
        // Check the response status
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        };
    };
};
// Declare listener to execute click event for add new chatroom
document.querySelector('.new-chat-form').addEventListener('submit', newFormHandler);