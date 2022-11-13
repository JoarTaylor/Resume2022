const repoList = document.querySelector('.main-article');
const url = "https://api.github.com/users/JoarTaylor/repos"
const urlLocal = "./data.json";
const repoHeader = document.querySelector('.main-section h3');

//get image-info from json-file
async function getrepoImages() {
    let response = await fetch(urlLocal);
    if(response.ok) {
        let imgData = await response.json();
        return imgData;
    } else {
        console.log('HTTP-Error: ' + response.status);
        repoHeader.textContent = 'HTTP-Error: ' + response.status;
    }
}

//get repo-info from github-api
async function getRepos() {
    let response = await fetch(url);
    if(response.ok) {
        repoList.innerHTML = null;
        let data = await response.json();
        return data;
    } else{
        repoList.innerHTML = null;
        repoHeader.innerHTML = 'HTTP-error: ' + response.status;
    }
}

getRepos().then((data) => {
    let githubArray = Array.from(data);

    githubArray.forEach((repo) => {
        
    getrepoImages().then((imgData) => {
        let localRepoArray = imgData.repoImages;

        localRepoArray.forEach((localRepo) => {
    
            //pair github-repo with image-id in json-file
            if(localRepo.id == repo.id) {

                const repoItem = document.createElement('div');
                repoItem.className = "repo-item-list";
                repoItem.innerHTML = `
                <h2>${repo.name}</h2>
                <p>${repo.description}</p>
                <a class="live-game-link" href="${localRepo.liveLink}"><img class="portfolio-image" src="${localRepo.src}"</img></a>
                <a class ="repo-link" href="${repo.html_url}" rel="noreferrer noopener" target="_blank">Github <i class="fa-solid fa-up-right-from-square"></i></a>
                `;

                repoList.appendChild(repoItem);
            }
        })
    })
    })
})

