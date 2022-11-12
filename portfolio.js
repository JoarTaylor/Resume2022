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
        let imgRepoArray = imgData.repoImages;

        imgRepoArray.forEach((repoImg) => {
    

            //pair github-repo with image-id in json-file
            if(repoImg.id == repo.id) {

                const portfolioImage = document.createElement('img');
                portfolioImage.className = "portfolio-image";
                portfolioImage.src = repoImg.src;

                const repoName = document.createElement('h2');
                repoName.innerHTML = repo.name;

                const repoDescription = document.createElement('p');
                repoDescription.innerHTML = repo.description;
                

                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.className = "repo-link";
                
                
                repoLink.innerHTML = `<br>` +  `Github <i class='fa-solid fa-up-right-from-square'></i>`;
                
                const liveGameLink = document.createElement('a');
                liveGameLink.className = "live-game-link";
                liveGameLink.href = repoImg.liveLink;
                liveGameLink.target = "_blank";
                liveGameLink.rel = "noreferrer noopener";

                const repoDetailList = document.createElement('div');
                repoDetailList.className = "repo-item-list";

                
                repoDetailList.appendChild(repoName);
                repoDetailList.appendChild(repoDescription);
                repoDetailList.appendChild(liveGameLink);
                repoDetailList.appendChild(repoLink);
                liveGameLink.appendChild(portfolioImage);

                repoList.appendChild(repoDetailList)
            }
        })
    })
    })
})

