let energy = 1;
let happiness = 100;
let experience = 0;
let gold = 0;
let foodCount = 10;
let waterCount = 5;

function updateBars() {
    document.getElementById('energy-bar').style.width = energy + '%';
    document.getElementById('energy-label').innerText = 'Enerji: ' + energy + '%';
    document.getElementById('happiness-bar').style.width = happiness + '%';
    document.getElementById('happiness-label').innerText = 'Mutluluk: ' + happiness + '%';
    document.getElementById('experience-bar').style.width = experience + '%';
    document.getElementById('experience-label').innerText = 'Deneyim: ' + experience + '%';
    document.getElementById('gold-display').innerText = 'DOGGAR: ' + gold;
    document.getElementById('food-count').innerText = foodCount;
    document.getElementById('water-count').innerText = waterCount;
}

function feed(event) {
    event.stopPropagation();
    if (foodCount > 0) {
        foodCount--;
        energy = Math.min(100, energy + Math.floor(Math.random() * 6) + 5);
        experience = Math.min(100, experience + Math.floor(Math.random() * 5) + 1);
        updateBars();
    } else {
        showPopup();
    }
}

function giveWater(event) {
    event.stopPropagation();
    if (waterCount > 0) {
        waterCount--;
        energy = Math.min(100, energy + Math.floor(Math.random() * 6) + 5);
        experience = Math.min(100, experience + Math.floor(Math.random() * 5) + 1);
        updateBars();
    } else {
        showPopup();
    }
}

function clickPuppy(event) {
    event.stopPropagation();
    if (energy > 0) {
        energy = Math.max(0, energy - 1);
        let earnedGold = Math.floor(Math.random() * 10) + 1;
        gold += earnedGold;
        updateBars();
    }
}

function toggleInventoryPopup(event) {
    event.stopPropagation();
    const inventoryPopup = document.getElementById('inventory-popup');
    inventoryPopup.style.display = inventoryPopup.style.display === 'none' || inventoryPopup.style.display === '' ? 'flex' : 'none';
}

function toggleMarketPopup(event) {
    event.stopPropagation();
    const marketPopup = document.getElementById('market-popup');
    marketPopup.style.display = marketPopup.style.display === 'none' || marketPopup.style.display === '' ? 'flex' : 'none';
}

function showPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function showSuccessPopup() {
    document.getElementById('success-popup').style.display = 'block';
}

function closeSuccessPopup() {
    document.getElementById('success-popup').style.display = 'none';
}

function buyItem(event, item, quantity) {
    event.stopPropagation();
    if (item === 'mama') {
        foodCount += quantity;
    } else if (item === 'su') {
        waterCount += quantity;
    }
    updateBars();
    showSuccessPopup();
}

function closeMenus() {
    document.getElementById('inventory-popup').style.display = 'none';
    document.getElementById('market-popup').style.display = 'none';
}

function showTasks(event) {
    event.stopPropagation();
    alert("Tasks button clicked!");
}

function showFriends(event) {
    event.stopPropagation();
    alert("Friends button clicked!");
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
