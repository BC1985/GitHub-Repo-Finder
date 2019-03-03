function getUser() {
    $('form').submit(function (event){
        event.preventDefault();
        getUrl();
    });
}

function getUrl() {
    let user = $('input').val();
    let url ='https://api.github.com/users/:username/repos';
    let array = url.split('/')
    array[4] = user;
    url = array.join('/');
    getUserRepos(url);

}
function getUserRepos(url) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson =>displayResults(responseJson))
        .catch (err => {
        $('#error-message').text(`Oops... ${err.message}`);

            $('input[type=text]').val("")

    });
}



function displayResults(responseJson){
    // iterate through the articles array, stopping at the max number of .repos

    const data=responseJson;
    for (let i = 0; i < data.length ; i++) {

        $('.repos').append(
            `<li><h3><a href=${data[i].html_url}>${data[i].name}</h3></a></li>`
        )
        clearContainer();
        //clears input field
        $('input[type=text]').val("")

    };

}

$(function () {
    //ensures user can't click submit until input field is is cliked

    $('input[type=text]').keyup(function () {
        if ($(this).val() == '') {
            $('.enableOnInput').prop('disabled', true);
        } else {
            $('.enableOnInput').prop('disabled', false);
        }
    });
});

function clearContainer() {
    //clears image container for a new batch of pics
    $('form').submit(function (event) {
        $('.repos').empty();
    });

}

function renderPage() {
    getUser();
}

$(renderPage)