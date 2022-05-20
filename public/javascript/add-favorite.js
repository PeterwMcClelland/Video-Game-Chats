// Function to add favorite
async function addFavorite (event){
    event.preventDefault();

    const console_id  = document.querySelector('select[name="addFavorite"]').value

    const response = await fetch('/favorite', {
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
