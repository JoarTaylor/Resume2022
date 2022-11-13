//resume-elements
const workHeader = document.querySelector('.left-article h4');
const jobs = document.querySelector('.jobs');
const educationHeader = document.querySelector('.right-article h4');
const educations = document.querySelector('.educations');
const myDropDown = document.querySelector(".dropdown-content");
const dropBtn = document.querySelector('.dropbtn');

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
    const recentOption = document.createElement('div');
    recentOption.innerHTML = "Senaste";
    myDropDown.appendChild(recentOption);

    const latestOption = document.createElement('div');
    latestOption.innerHTML = "Tidigaste";

    myDropDown.appendChild(latestOption);

    //creating dropdown
    dropBtn.addEventListener('click', dropDown);

    function dropDown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
        }
    }
    }

    //recent education as default
    sortRecent();   

    //sort by recent education
    recentOption.addEventListener('click', sortRecent);
    function sortRecent() {
        educations.innerHTML = null;
        eductationArray.sort(({Completion:a}, {Completion: b}) => b-a);
        eductationArray.forEach((course) => {
            const eduDescription = document.createElement('div');
            eduDescription.className = "education-list";
            const eduEntries = Object.entries(course);
            eduEntries.forEach(([key, value]) => {
                eduDescription.innerHTML += `<span style="font-weight: bold;">${key}:</span> ${value} <br> `;
                educations.appendChild(eduDescription);

                /* function dragstart_handler(ev) {
                    // Add the target element's id to the data transfer object
                    ev.dataTransfer.setData("text/plain", ev.target.id);
                } */
            })
        })
    }

    //sort by earliest education
    latestOption.addEventListener('click', sortEarliest); 
    function sortEarliest() {
        educations.innerHTML = null;
        eductationArray.sort(({Completion:a}, {Completion: b}) => a-b);
        eductationArray.forEach((course) => {
            const eduDescription = document.createElement('div');
            eduDescription.className = "education-list";
            const eduEntries = Object.entries(course);
            eduEntries.forEach(([key, value]) => {
                eduDescription.innerHTML += `<span style="font-weight: bold;">${key}:</span> ${value} <br> `;
                educations.appendChild(eduDescription);
            })
        })
    }

    //output work-info
    workArray.forEach((workplace) => {
        const workDescription = document.createElement('div');
        workDescription.className = "work-list";

        const workEntries = Object.entries(workplace);
        workEntries.forEach(([key, value]) => {

    
            workDescription.innerHTML += `<span style="font-weight: bold;">${key}:</span> ${value} <br> `;

            jobs.appendChild(workDescription);
        })
    })
})