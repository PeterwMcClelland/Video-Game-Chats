/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : login.js         */
/* Date     : 05/13/2022       */
/* Modified : 05/14/2022       */
/* --------------------------- */
// Function to sign in
async function loginFormHandler(event) {
    // Prevent the default behavior (refresh)
    event.preventDefault();
    // Declare variables to grt value from page
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    // If field values are not null validate if is a valid user
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username
               ,password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // Check the response status
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert("User or password invalid");
        };
    };
};
// Declare listener to execute click event
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);