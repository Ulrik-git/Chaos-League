let mainElement = document.querySelector('#main');
let nameInput = document.querySelector('#nameInput');
let generateButton = document.querySelector('#generateButton');

// Add placeholder text to mainElement
let placeholderText = document.createElement('p');
placeholderText.textContent = "Add names or click Generate to get started";
placeholderText.className = 'placeholder'; // Add class
mainElement.appendChild(placeholderText);

let roles = ['Top', 'Jungle', 'Mid', 'Support', 'Adc'];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

generateButton.addEventListener('click', () => {
    mainElement.innerHTML = ''; // clear the previous results

    let names = nameInput.value.split(',');
    if (names.length > 5) {
        alert('Please enter up to 5 names.');
        return;
    }

    shuffleArray(names); // shuffle the names array

    let rolesCopy = [...roles]; // create a copy of the roles array

    fetch('https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json')
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < 5; i++) {
                let keys = Object.keys(data.data);
                let nthElement = data.data[keys[Math.round(Math.random() * keys.length)]];
                
                let championDiv = document.createElement('div');
                championDiv.className = 'championDiv';

                let p = document.createElement('p');
                p.textContent = nthElement.id;
                championDiv.appendChild(p);

                let img = document.createElement('img');
                img.src = `https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/${nthElement.id}.png`;
                championDiv.appendChild(img);

                let roleIndex = Math.floor(Math.random() * rolesCopy.length);
                let roleP = document.createElement('p');
                roleP.textContent = rolesCopy[roleIndex];
                championDiv.appendChild(roleP);
                rolesCopy.splice(roleIndex, 1); // remove the used role from the array

                if (names[i]) {
                    let nameP = document.createElement('p');
                    nameP.textContent = names[i];
                    championDiv.appendChild(nameP);
                }

                mainElement.appendChild(championDiv);
            }
        })
        .catch(error => console.error(error));
});