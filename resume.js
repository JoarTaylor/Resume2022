//resume-elements
const workHeader = document.querySelector('.left-article h4')
const workList = document.querySelector('.left-article ul')
const educationHeader = document.querySelector('.right-article h4')
const educationList = document.querySelector('.right-article ul')

let url= "./data.json";

//get data from json file
async function getData() {
    let response = await fetch(url);
    if(response.ok) {
        let data = await response.json();
        return data;
    } else {
        console.log("HTTP-Error: " + response.status);
    }
}

getData().then((data) => {
    //create array from json files
    let workArray = Array.from(data.Arbetslivserfarenhet);
    let eductationArray = Array.from(data.Utbildning);

    //create sortbuttons for education
    const recentButton = document.createElement('button');
    recentButton.innerHTML = "Senaste";
    educationHeader.appendChild(recentButton);
    const latestButton = document.createElement('button');
    latestButton.innerHTML = "Tidigaste";
    educationHeader.appendChild(latestButton);

    sortRecent();   

//sort by recent education
    recentButton.addEventListener('click', sortRecent);
    function sortRecent() {
        educationList.innerHTML = null;
        eductationArray.sort(({Date:a}, {Date: b}) => b-a);
        console.log(eductationArray);
        eductationArray.forEach((course) => {

            const eduDetails = document.createElement('li');
            const eduDetailsList = document.createElement('ul');
            eduDetailsList.className = "education-list";
    
            const eduEntries = Object.entries(course);
            eduEntries.forEach(([key, value]) => {
                eduDetails.appendChild(eduDetailsList);
                const eduDetailsItem = document.createElement('li');
                eduDetailsItem.innerHTML = key + ': ' + value;
                eduDetailsList.appendChild(eduDetailsItem);
    
                educationList.appendChild(eduDetails);
            })
        })
    }

    //sort by earliest education
    latestButton.addEventListener('click', sortEarliest); 
    function sortEarliest() {
        educationList.innerHTML = null;
        eductationArray.sort(({Date:a}, {Date: b}) => a-b);
        console.log(eductationArray);
        eductationArray.forEach((course) => {

            const eduDetails = document.createElement('li');
            const eduDetailsList = document.createElement('ul');
            eduDetailsList.className = "education-list";
    
            const eduEntries = Object.entries(course);
            eduEntries.forEach(([key, value]) => {
                eduDetails.appendChild(eduDetailsList);
                const eduDetailsItem = document.createElement('li');
                eduDetailsItem.innerHTML = key + ': ' + value;
                eduDetailsList.appendChild(eduDetailsItem);
    
                educationList.appendChild(eduDetails);
            })
        })
    }

    workArray.forEach((workplace) => {
        const workDetails = document.createElement('li');
        const workDetailsList = document.createElement('ul');
        workDetailsList.className = "work-list";

        const workEntries = Object.entries(workplace);
        workEntries.forEach(([key, value]) => {
            workDetails.appendChild(workDetailsList);
            const workDetailsItem = document.createElement('li');
            workDetailsItem.innerHTML = key + ': ' + value;
            workDetailsList.appendChild(workDetailsItem);

            workList.appendChild(workDetails);
        })
    })
})