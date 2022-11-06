const repoList = document.querySelector('.right-article ul');

const url = "https://api.github.com/users/JoarTaylor/repos"
const urlLocal = "./data.json";

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
    repoList.innerHTML = "Fetching data..."
    if(response.ok) {
        repoList.innerHTML = null;
        let data = await response.json();
        return data;
    } else{
        console.log('HTTP-Error: ' + response.status);
        repoList.innerHTML = "Github api-key not working, try again later";
    }
}



getRepos().then((data) => {
    let githubArray = Array.from(data);

    githubArray.forEach((repo) => {

        const repoItem = document.createElement('li');
        repoList.appendChild(repoItem);
        
    getrepoImages().then((imgData) => {
        let imgRepoArray = imgData.repoImages;

        imgRepoArray.forEach((repoImg) => {
    

            //pair github-repo with image-id in json-file
            if(repoImg.id == repo.id) {
                const portfolioImage = document.createElement('img');
                portfolioImage.className = "portfolio-image";
                portfolioImage.src = repoImg.src;

                const repoDescription = document.createElement('li');
                repoDescription.innerHTML = `<span style="font-weight: bold; font-size: 1.2rem;">${repo.name}</span> ` + `<br>` + repo.description  + `<br>`;
                

                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.style.fontSize = "1rem";
                repoLink.style.color = "#006d44";
                
                repoLink.innerHTML = `<br>` + " Check out the repository";
                
                const liveRepoLink = document.createElement('a');
                liveRepoLink.href = repoImg.liveLink;
                liveRepoLink.target = "_blank";
                liveRepoLink.rel = "noreferrer noopener";

                const repoDetailList = document.createElement('ul');
                repoDetailList.className = "repo-item-list";

                repoItem.appendChild(repoDetailList);
                repoDetailList.appendChild(repoDescription);
                repoDetailList.appendChild(repoDescription);
                repoDetailList.appendChild(liveRepoLink);
                repoDetailList.appendChild(repoLink);
                liveRepoLink.appendChild(portfolioImage);
            }
        })
        
    })
    })
})

