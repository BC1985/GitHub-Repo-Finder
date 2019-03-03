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
        .then(response => response.json())
        .then(responseJson =>displayResults(responseJson));

}

function displayResults(responseJson){
    // iterate through the articles array, stopping at the max number of .repos

    const data=responseJson;
    for (let i = 0; i < data.length ; i++) {

        $('.repos').append(
            `<ul>
            <li><h3><a href=${data[i].html_url}>${data[i].name}</h3></a></li>
            </ul>
            `
        )
    };
    //display the .repos section  
   // $('#.repos').removeClass('hidden');
}


function renderPage() {
    getUser();
}

$(renderPage)