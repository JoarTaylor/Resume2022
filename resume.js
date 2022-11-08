//resume-elements
const workHeader = document.querySelector('.left-article h4')
const workList = document.querySelector('.left-article ul')
const educationHeader = document.querySelector('.right-article h4')
const educationList = document.querySelector('.right-article ul')
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
        educationList.innerHTML = null;
        eductationArray.sort(({Completion:a}, {Completion: b}) => b-a);
        eductationArray.forEach((course) => {

            const eduDetails = document.createElement('ul');
            const eduDescription = document.createElement('li');
            eduDescription.className = "education-list";
    
            const eduEntries = Object.entries(course);
            eduEntries.forEach(([key, value]) => {
                eduDetails.appendChild(eduDescription);
                const eduDetailsItem = document.createElement('li');
                eduDetailsItem.innerHTML = `<span style="font-weight: bold;">${key}:</span> `  + value;
                eduDescription.appendChild(eduDetailsItem);
    
                educationList.appendChild(eduDetails);
            })
        })
    }

    //sort by earliest education
    latestOption.addEventListener('click', sortEarliest); 
    function sortEarliest() {
        educationList.innerHTML = null;
        eductationArray.sort(({Completion:a}, {Completion: b}) => a-b);
        eductationArray.forEach((course) => {

            const eduDetails = document.createElement('ul');
            const eduDescription = document.createElement('li');
            eduDescription.className = "education-list";
            
            const eduEntries = Object.entries(course);
            eduEntries.forEach(([key, value]) => {
                
                eduDetails.appendChild(eduDescription);
                const eduDetailsItem = document.createElement('li');
                eduDetailsItem.innerHTML = `<span style="font-weight: bold;">${key}:</span> `  + value;
                eduDescription.appendChild(eduDetailsItem);
                educationList.appendChild(eduDetails);
            })
        })
    }

    //output work-info
    workArray.forEach((workplace) => {
        const workDetails = document.createElement('ul');
        const workDescription = document.createElement('li');
        workDescription.className = "work-list";

        const workEntries = Object.entries(workplace);
        workEntries.forEach(([key, value]) => {
            workDetails.appendChild(workDescription);
            const workDetailsItem = document.createElement('li');
            workDetailsItem.innerHTML = `<span style="font-weight: bold;">${key}:</span> `  + value;
            workDescription.appendChild(workDetailsItem);

            workList.appendChild(workDetails);
        })
    })
})