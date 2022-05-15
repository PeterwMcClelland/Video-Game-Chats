/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : edit-chatroom.js */
/* Date     : 05/13/2022       */
/* Modified : 05/14/2022       */
/* --------------------------- */
// Function to edit a chatroom
async function editFormHandler(event) {
    // Prevent the default behavior (refresh)
    event.preventDefault();
    // Declare variables to get value from page
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const title = document.querySelector('input[name="chat-title"]').value.trim();
    const description = document.querySelector('textarea[name="description"]').value.trim();
    const console_id  = document.querySelector('select[name="console"]').value;
    // Call update method (route)
    const response = await fetch(`/api/chatrooms/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
           ,description
           ,console_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // Check the response status
    if (response.ok) {
        document.location.replace('/dashboard/')
    } else {
        alert(response.statusText);
    }
}
// Declare listener to execute click event for update chatroom
document.querySelector('.edit-chat-form').addEventListener('submit', editFormHandler);