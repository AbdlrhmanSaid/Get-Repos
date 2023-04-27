let theInput = document.querySelector("input");
let getBtn = document.querySelector(".btn");
let reposData = document.querySelector(".show-data");

getBtn.onclick = function () {
  getRepos();
};

function getRepos() {
  if (theInput.value === "") {
    let p = document.querySelector(".erorr");
    p.innerHTML = "Value Cant Be Embty";
    theInput.style.outline = "1px  solid red";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((responses) => responses.json())
      .then((repostirise) => {
        console.log(repostirise);
        // empty container
        reposData.innerHTML = "";

        // loop on repos
        repostirise.forEach((repo) => {
          // crate main div ele
          let mainDiv = document.createElement("div");

          // add class to mainDiv
          mainDiv.className = "repo-box";

          // create repo name text
          let repoName = document.createTextNode(`${repo.name}`);

          // append repo name in main div
          mainDiv.append(repoName);

          // create repo url anchor
          let theUrl = document.createElement("a");

          // create repo url anchor text
          let theUrlTxt = document.createTextNode("Visit");

          // append url text in url
          theUrl.appendChild(theUrlTxt);

          // add the hyper text refernce "href"
          theUrl.href = `https://api.github.com/users/${theInput.value}/${repo.name}`;

          // set attribute Target
          theUrl.setAttribute("Target", "_blank");

          // add theUrl to main div
          mainDiv.appendChild(theUrl);

          // append mainDiv in container
          reposData.appendChild(mainDiv);

          // create star span count
          let starsSpan = document.createElement("span");

          // create star span text
          let starsTxt = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );
          // append txt in span
          starsSpan.appendChild(starsTxt);

          // append span in mainDiv
          mainDiv.appendChild(starsSpan);
        });
      });
  }
}
