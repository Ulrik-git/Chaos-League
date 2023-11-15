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

    let input = nameInput.value.split(',').map(item => item.trim());
    if (input.length > 5) {
        alert('Please enter up to 5 names.');
        return;
    }

    let roles = ['Top', 'Jungle', 'Mid', 'Support', 'Adc'].map(role => role.toLowerCase());
    let names = [];
    let specifiedRoles = [];

    input.forEach(item => {
        let splitItem = item.split(':');
        names.push(splitItem[0].trim());
        if (splitItem.length > 1) {
            specifiedRoles.push(splitItem[1].trim().toLowerCase());
        } else {
            specifiedRoles.push(null);
        }
    });

    let remainingRoles = roles.filter(role => !specifiedRoles.includes(role));
    shuffleArray(remainingRoles); // shuffle the remaining roles

    let finalRoles = specifiedRoles.map(role => role || remainingRoles.pop());

    fetch('https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json')
        .then(response => response.json())
        .then(data => {
            let keys = Object.keys(data.data);
            let usedKeys = []; // store used keys

            for(let i = 0; i < names.length; i++) {
                let nthKey;
                do {
                    nthKey = keys[Math.round(Math.random() * keys.length)];
                } while (usedKeys.includes(nthKey)); // fetch a new key if it's already used

                usedKeys.push(nthKey); // add the used key to the array

                let nthElement = data.data[nthKey];
                
                let championDiv = document.createElement('div');
                championDiv.className = 'championDiv';

                let p = document.createElement('p');
                p.textContent = nthElement.id;
                championDiv.appendChild(p);

                let img = document.createElement('img');
                if (nthElement.id == "FiddleSticks") {
                    img.src = `https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/${nthElement.name}.png`;
                } else {
                    img.src = `https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/${nthElement.id}.png`;
                }
                championDiv.appendChild(img);

                let roleP = document.createElement('p');
                roleP.textContent = finalRoles[i].charAt(0).toUpperCase() + finalRoles[i].slice(1).toLowerCase();
                championDiv.appendChild(roleP);

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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}