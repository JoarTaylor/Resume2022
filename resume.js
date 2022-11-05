//resume-elements
const workHeader = document.querySelector('.left-article h4')
const workList = document.querySelector('.left-article ul')
const educationHeader = document.querySelector('.right-article h4')
const educationList = document.querySelector('.right-article ul')

let url= "/data.json";
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
    console.log(workArray);
    let eductationArray = Array.from(data.Utbildning);
    console.log(eductationArray);

    eductationArray.forEach((course) => {
        let courseItem = document.createElement('li');
        courseItem.textContent = course;
        educationList.appendChild(courseItem);    
    })
    
    workArray.forEach((workplace) => {
        let courseItem = document.createElement('li');
        courseItem.textContent = workplace;
        workList.appendChild(courseItem);    
    })
})