function getUser() {
  const noInputError = "Please enter username";
  $("form").submit(e => {
    e.preventDefault();
    if ($("input[type=text]").val() === "") {
      $("#error-message").text(noInputError);
      $("#user-info").empty();
      return false;
    }
    getUrl();
  });
}

function getUrl() {
  let user = $("input").val();
  let url = "https://api.github.com/users/:username/repos";
  let array = url.split("/");
  array[4] = user;
  url = array.join("/");
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
    .then(responseJson => {
      displayResults(responseJson);
    })
    .catch(() => {
      $("#error-message").text(`Doggonit... Couldn't find user`);

      $("input[type=text]").val("");
    });
}

function displayResults(responseJson) {
  // iterate through the articles array, stopping at the max number of .repos
  const baseUrl = "https://github.com";
  const data = responseJson;
  for (let i = 0; i < data.length; i++) {
    const repoName = data[i].name;
    const repoLink = data[i].html_url;
    const userName = data[i].owner.login;
    const userHomePage = `${baseUrl}/${data[i].owner.login}`;
    console.log(userHomePage);
    $(".repos").append(`<li><h3><a href=${repoLink}>${repoName}</h3></a></li>`);
    clearContainer();
    //clears input field and any previous errors
    $("input[type=text]").val("");
    $("#error-message").empty();
    // Dispaly username above list of repos
    $("#user-info").html(
      `<p>Here is a list of repos for user <a href="${userHomePage}"</a>${userName}</p>`
    );
  }
}

function clearContainer() {
  //clears image container for a new batch of pics
  $("form").submit(() => {
    $(".repos").empty();
  });
}

function renderPage() {
  getUser();
}

$(renderPage);
