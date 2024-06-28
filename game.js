let energy = 1;
let happiness = 100;
let experience = 0;
let gold = 0;

function updateBars() {
    document.getElementById('energy-bar').style.width = energy + '%';
    document.getElementById('energy-label').innerText = 'Enerji: ' + energy + '%';

    document.getElementById('happiness-bar').style.width = happiness + '%';
    document.getElementById('happiness-label').innerText = 'Mutluluk: ' + happiness + '%';

    document.getElementById('experience-bar').style.width = experience + '%';
    document.getElementById('experience-label').innerText = 'Deneyim: ' + experience + '%';

    document.getElementById('gold-display').innerText = 'DOGGAR: ' + gold;
}

function feed() {
    energy = Math.min(100, energy + Math.floor(Math.random() * 6) + 5);
    experience = Math.min(100, experience + Math.floor(Math.random() * 5) + 1);
    updateBars();
}

function giveWater() {
    energy = Math.min(100, energy + Math.floor(Math.random() * 6) + 5);
    experience = Math.min(100, experience + Math.floor(Math.random() * 5) + 1);
    updateBars();
}

function clickPuppy() {
    if (energy > 0) {
        energy = Math.max(0, energy - 1);
        let earnedGold = Math.floor(Math.random() * 10) + 1;
        gold += earnedGold;
        updateBars();
    }
}

setInterval(() => {
    energy = Math.max(0, energy - 1);
    updateBars();
}, 60000);

setInterval(() => {
    happiness = Math.max(0, happiness - (Math.floor(Math.random() * 99) + 1));
    updateBars();
}, 3600000);

updateBars();
