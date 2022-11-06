//resume-elements
const workHeader = document.querySelector('.left-article h4')
const workList = document.querySelector('.left-article ul')
const educationHeader = document.querySelector('.right-article h4')
const educationList = document.querySelector('.right-article ul')

let url= "./data.json";
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
    let workArray = Array.from(data.Arbetslivserfarenhet);
    let eductationArray = Array.from(data.Utbildning);


    eductationArray.forEach((course) => {

        const eduDetails = document.createElement('li');
        const eduDetailsList = document.createElement('ul');
        eduDetailsList.className = "portfolio-list";

        const eduEntries = Object.entries(course);
        eduEntries.forEach(([key, value]) => {
            console.log(key, value);
            eduDetails.appendChild(eduDetailsList);
            const eduDetailsItem = document.createElement('li');
            eduDetailsItem.innerHTML = key + ': ' + value;
            eduDetailsList.appendChild(eduDetailsItem);

            educationList.appendChild(eduDetails);
        })

    })
    
    workArray.forEach((workplace) => {
        const workDetails = document.createElement('li');
        const workDetailsList = document.createElement('ul');
        workDetailsList.className = "work-list";

        const workEntries = Object.entries(workplace);
        workEntries.forEach(([key, value]) => {
            console.log(key, value);
            workDetails.appendChild(workDetailsList);
            const workDetailsItem = document.createElement('li');
            workDetailsItem.innerHTML = key + ': ' + value;
            workDetailsList.appendChild(workDetailsItem);

            workList.appendChild(workDetails);
        })
    })
})