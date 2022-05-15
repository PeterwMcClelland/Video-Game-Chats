/* ----------------------------- */
/* Project  : Video Games Chat   */
/* Team     : Dark Overlords     */
/* File     : delete-chatroom.js */
/* Date     : 05/13/2022         */
/* Modified : 05/14/2022         */
/* ----------------------------- */
// Funtion to delete a chatroom
async function deleteFormHandler(event) {
    // Prevent the default behavior (refresh)
    event.preventDefault();
    // Declare variables to get value from page
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // Call delete method (route)
    const response = await fetch(`/api/chatrooms/${id}`, {
        method: 'DELETE'
    });
    // Check the response status
    if (response.ok) {
        document.location.replace('/dashboard/')
    } else {
        alert("You can't delete a chatroom that have at least a message");
    }
}
// Declare listener to execute click event for delete a chatroom
document.querySelector('.delete-chat-btn').addEventListener('click', deleteFormHandler);