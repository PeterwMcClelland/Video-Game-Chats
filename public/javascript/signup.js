/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : signup.js        */
/* Date     : 05/13/2022       */
/* Modified : 05/14/2022       */
/* --------------------------- */
// Function to sign up a user
async function signupFormHandler(event) {
    // Prevent the default behavior (refresh)
    event.preventDefault();
    // Declare variables to get value from page
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    // If field values are not null save new user
    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username
               ,password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        // Check the response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        };
    };
};
// Declare listener to execute click event
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);