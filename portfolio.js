const repoList = document.querySelector('.right-article ul');

const url = "https://api.github.com/users/JoarTaylor/repos"
const urlLocal = "/data.json";

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
    } else {
        console.log('HTTP-Error: ' + response.status);
        repoList.innerHTML = "Github api-key not working, try again later";
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
                let portfolioImage = document.createElement('img');
                portfolioImage.className = "portfolio-image";
                portfolioImage.src = repoImg.src;

                let repoDescription = document.createElement('li');
                repoDescription.innerHTML = repo.name + `<br>` + repo.description  + `<br>`;

                let repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.innerHTML = " Check out the repository";
                
                let liveRepoLink = document.createElement('a');
                liveRepoLink.href = repoImg.liveLink;
                liveRepoLink.target = "_blank";
                liveRepoLink.rel = "noreferrer noopener";
                

                repoDescription.appendChild(repoLink);
                repoList.appendChild(repoDescription);
                repoList.appendChild(liveRepoLink);
                liveRepoLink.appendChild(portfolioImage);
               
            }
        })
        
    })
    })
})

