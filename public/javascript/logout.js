/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : logout.js        */
/* Date     : 05/13/2022       */
/* Modified : 05/14/2022       */
/* --------------------------- */
// Function to logout a user
async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    // Check the response status
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    };
};
// Listener to call function that logout when click
document.querySelector('#logout').addEventListener('click', logout);