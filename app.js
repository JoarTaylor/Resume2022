//info-elements
const leftInfo = document.querySelector('.left-info-items');
const rightInfo = document.querySelector('.right-info-items');

//object with info about me
const joar = {
    Name: 'Joar',
    Birthday: 19951126,
    Hometown: 'Stockholm',
    Freelance: 'Available'
}

//creating array from object
const joarEntries = Object.entries(joar);

joarEntries.forEach(([key, value]) => {
    const infoLabel = document.createElement('li');
    infoLabel.innerHTML = `${key}`;
    infoLabel.classList.add('left-listitems');
    leftInfo.appendChild(infoLabel);
    

    const infoContent = document.createElement('li');
    infoContent.innerHTML = `${value}`;
    infoContent.classList.add('right-listitems')
    rightInfo.appendChild(infoContent);

    console.log(`${key} ${value}`)
})


