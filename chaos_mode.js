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

    let namesAndRoles = nameInput.value.split(',').map(item => item.trim());
    if (namesAndRoles.length > 5) {
        alert('Please enter up to 5 names and roles.');
        return;
    }

    let names = namesAndRoles.map(item => item.split(':')[0]);
    let roles = namesAndRoles.map(item => item.split(':')[1]);

    // Check if all roles are unique
    let uniqueRoles = new Set(roles);
    if (uniqueRoles.size !== roles.length) {
        alert('Each person must have a unique role.');
        return;
    }

    fetch('https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json')
        .then(response => response.json())
        .then(data => {
            let keys = Object.keys(data.data);
            let usedKeys = []; // store used keys

            for(let i = 0; i < 5; i++) {
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
                roleP.textContent = roles[i];
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