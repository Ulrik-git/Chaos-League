import { champions } from './champions.js';

let chaosButton = document.getElementById('chaosButton');
let randomButton = document.getElementById('randomButton');
let chaosMode = document.getElementById('chaosMode');
let randomMode = document.getElementById('randomMode');

chaosButton.addEventListener('click', () => {
    chaosMode.style.display = 'block';
    randomMode.style.display = 'none';
});

randomButton.addEventListener('click', () => {
    chaosMode.style.display = 'none';
    randomMode.style.display = 'flex';
    randomMode.style.justifyContent = 'center';
    randomMode.style.flexDirection = 'row';
    randomMode.style.flexWrap = 'wrap';
});

let randomMain = document.getElementById('randomMain');
  
  // Accessing champions by role
  /*
  console.log(champions.top); // Displays top lane champions
  console.log(champions.jungle); // Displays jungle champions
  console.log(champions.mid); // Displays mid lane champions
  console.log(champions.bot); // Displays bot lane champions
  console.log(champions.support); // Displays support champions  
  */

  let roleButtons = document.querySelectorAll('.roleButton');

roleButtons.forEach(button => {
    button.addEventListener('click', () => {
        randomMain.innerHTML = ''; // clear the previous results

        let role = button.dataset.role;

        let championsWithRole = champions[role];
        let randomChampion = championsWithRole[Math.floor(Math.random() * championsWithRole.length)];

        let championDiv = document.createElement('div');
        championDiv.className = 'championDiv';
        
        let p = document.createElement('p');
        p.textContent = randomChampion.name;
        championDiv.appendChild(p);
        
        let img = document.createElement('img');
        img.src = `https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/${randomChampion.image}.png`;
        championDiv.appendChild(img);

        randomMain.appendChild(championDiv);
    });
});
