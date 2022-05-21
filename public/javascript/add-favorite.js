document.getElementById('addFavorite').addEventListener('change', addFavorite);
// Function to add favorite
async function addFavorite (){
    //event.preventDefault();
    console.log(this);
   
    const user_id = 1;
    const chat_id  = 5;

    const response = await fetch('/api/favorites', {
        method: 'post',
        body: JSON.stringify({
            user_id
           ,chat_id
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    // Check the response status
    if (response.ok) {
       // document.location.replace('/favorite');

    } else {
        alert("Unable to add this chat to favorite");
    };
};

