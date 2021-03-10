$(document).ready(() => {
    const timeline = $('#timeline');
    const userInput = $('#user-input');
    const msgInput = $('#msg-input');
    const submitBtn = $('#submit-btn');

    getAndDisplayChirps();
    
    $(submitBtn).on('click', () => {
        $.ajax({
            url: '/api/chirps',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: $(userInput).val(),
                message: $(msgInput).val(),
            }),
            success: (result) => {
                console.log(result);
                getAndDisplayChirps();
            },
            error: (error) => {
                console.log(error);
            }
        })
        $(userInput).val('');
        $(msgInput).val('');
    })

    function getAndDisplayChirps() {
        $.ajax({
            type: 'GET',
            url: '/api/chirps'
        })
        .then(chirpItems => {
            $(timeline).empty();
            for (const id in chirpItems) {
                if (id === 'nextid') return;

                const deleteBtn = $('<button class="rounded m-1 btn btn-link d-flex align-self-end">Delete</button>').on('click', () => {
                    $.ajax({
                        type: 'DELETE',
                        url: `/api/chirps/${id}`
                    })
                    .then(res => {
                        console.log(res);
                        getAndDisplayChirps();
                    })
                });

                $(`
                    <div class="card col-7 m-3 rounded shadow">
                        <div class="card-body">
                            <h5 class="card-title col-12">${chirpItems[id].username}</h5>
                            <p class=class="card-text">${chirpItems[id].message}</p>                           
                        </div>
                    </div>
                `).appendTo(timeline)
                .append(deleteBtn);
                
            }
        })
    }

});