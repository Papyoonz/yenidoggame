let energy = 50;
let happiness = 10;
let experience = 0;
let gold = 100000;  // Oyuna başlangıçta 100000 Doggar ile başlar
let foodCount = 5;
let waterCount = 1;
let level = 1;
let experienceThreshold = 1000;
let botPurchased = false;
let botActive = false;

function saveGame() {
    const gameData = {
        energy,
        happiness,
        experience,
        gold,
        foodCount,
        waterCount,
        level,
        botPurchased,
        botActive
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

function loadGame() {
    const savedGameData = localStorage.getItem('gameData');
    if (savedGameData) {
        const gameData = JSON.parse(savedGameData);
        energy = gameData.energy;
        happiness = gameData.happiness;
        experience = gameData.experience;
        gold = gameData.gold;
        foodCount = gameData.foodCount;
        waterCount = gameData.waterCount;
        level = gameData.level;
        botPurchased = gameData.botPurchased;
        botActive = gameData.botActive;
        updateBars();
        updatePuppy();
        updateBotIcon();
    }
}

function updateBars() {
    document.getElementById('energy-bar').style.width = energy + '%';
    document.getElementById('energy-label').innerText = 'Enerji: ' + energy + '%';
    document.getElementById('happiness-bar').style.width = happiness + '%';
    document.getElementById('happiness-label').innerText = 'Mutluluk: ' + happiness.toFixed(1) + '%';  // Mutluluk yüzdesini virgülden sonra 1 basamak gösterir
    document.getElementById('experience-bar').style.width = (experience / experienceThreshold * 100) + '%';
    document.getElementById('experience-label').innerText = 'Deneyim: ' + experience + '/' + experienceThreshold;
    document.getElementById('gold-display').innerText = 'DOGGAR: ' + gold;
    document.getElementById('food-count').innerText = foodCount;
    document.getElementById('water-count').innerText = waterCount;
}

function updatePuppy() {
    const puppy = document.querySelector('.puppy');
    if (level >= 2) {
        puppy.src = 'puppy2.png';
    } else {
        puppy.src = 'puppy.png';
    }
}

function updateBotIcon() {
    const botIcon = document.getElementById('bot-icon');
    if (botPurchased) {
        botIcon.style.display = 'block';
        botIcon.className = botActive ? 'bot-active' : 'bot-inactive';
    } else {
        botIcon.style.display = 'none';
    }
}

function animateDoggarDisplay() {
    const goldDisplay = document.getElementById('gold-display');
    goldDisplay.classList.add('animate');
    setTimeout(() => goldDisplay.classList.remove('animate'), 1000);
}

function feed(event) {
    event.stopPropagation();
    if (foodCount > 0) {
        foodCount--;
        let energyIncrease = Math.floor(Math.random() * 6) + 5;
        if (level > 1) {
            energyIncrease = Math.floor(energyIncrease * 0.8); // %20 daha az enerji alır
        }
        energy = Math.min(100, energy + energyIncrease);
        experience += energyIncrease;
        checkLevelUp();
        updateBars();
        saveGame();
    } else {
        showPopup();
    }
}

function giveWater(event) {
    event.stopPropagation();
    if (waterCount > 0) {
        waterCount--;
        let energyIncrease = Math.floor(Math.random() * 6) + 5;
        if (level > 1) {
            energyIncrease = Math.floor(energyIncrease * 0.8); // %20 daha az enerji alır
        }
        energy = Math.min(100, energy + energyIncrease);
        experience += energyIncrease;
        checkLevelUp();
        updateBars();
        saveGame();
    } else {
        showPopup();
    }
}

function clickPuppy(event) {
    event.stopPropagation();
    if (energy > 0) {
        energy = Math.max(0, energy - 1);
        let earnedGold = Math.floor(Math.random() * 10) + 1;
        earnedGold = applyHappinessMultiplier(earnedGold);
        gold += earnedGold;
        experience += earnedGold;
        checkForGift();
        checkLevelUp();
        updateBars();
        saveGame();
    }
}

function applyHappinessMultiplier(earnedGold) {
    if (happiness >= 50 && happiness < 55) {
        return Math.floor(earnedGold * 1.01);
    } else if (happiness >= 55 && happiness < 65) {
        return Math.floor(earnedGold * 1.05);
    } else if (happiness >= 65 && happiness < 85) {
        return Math.floor(earnedGold * 1.10);
    } else if (happiness >= 85 && happiness < 95) {
        return Math.floor(earnedGold * 1.15);
    } else if (happiness >= 95) {
        return Math.floor(earnedGold * 1.25);
    }
    return earnedGold;
}

function checkForGift() {
    if (happiness >= 100) {
        if (Math.random() < 0.001) {
            const giftType = Math.random() < 0.5 ? 'su' : 'mama';
            if (giftType === 'su') {
                waterCount++;
                showBotGiftPopup('su');
            } else {
                foodCount++;
                showBotGiftPopup('mama');
            }
            saveGame();
        }
    }
}

function showBotGiftPopup(giftType) {
    const botGiftPopup = document.getElementById('bot-gift-popup');
    const giftIcon = document.getElementById('gift-icon');
    giftIcon.src = giftType === 'su' ? 'su.png' : 'mama.png';
    botGiftPopup.style.display = 'block';
    setTimeout(() => {
        botGiftPopup.style.display = 'none';
    }, 5000);
}

function checkLevelUp() {
    if (experience >= experienceThreshold) {
        experience = 0;
        level++;
        experienceThreshold *= 2; // Her seviyede gerekli deneyim miktarını artır
        showLevelUpPopup();
        updatePuppy();
    }
}

function showLevelUpPopup() {
    const levelUpPopup = document.createElement('div');
    levelUpPopup.className = 'popup';
    levelUpPopup.innerHTML = `
        <h2>Tebrikler!</h2>
        <p>${level}. seviyeye ulaştınız!</p>
        <button onclick="closeLevelUpPopup(this)">Kapat</button>
    `;
    document.body.appendChild(levelUpPopup);
}

function closeLevelUpPopup(button) {
    const popup = button.parentNode;
    document.body.removeChild(popup);
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
    document.getElementById('remaining-doggar').innerText = gold;
    document.getElementById('success-popup').style.display = 'block';
}

function closeSuccessPopup() {
    document.getElementById('success-popup').style.display = 'none';
}

function showInsufficientFundsPopup() {
    document.getElementById('insufficient-funds-popup').style.display = 'block';
}

function closeInsufficientFundsPopup() {
    document.getElementById('insufficient-funds-popup').style.display = 'none';
}

function showBotAlertPopup() {
    const botAlertPopup = document.getElementById('bot-alert-popup');
    botAlertPopup.style.display = 'block';
}

function closeBotAlertPopup() {
    const botAlertPopup = document.getElementById('bot-alert-popup');
    botAlertPopup.style.display = 'none';
    botActive = false;
    updateBotIcon();
    saveGame();
}

function buyItem(event, item, quantity) {
    event.stopPropagation();
    let cost = 0;
    if (item === 'mama') {
        cost = quantity === 1 ? 7 : 50;
    } else if (item === 'su') {
        cost = 5;
    } else if (item === 'bot') {
        cost = 1000;
        if (gold >= cost) {
            gold -= cost;
            botPurchased = true;
            updateBotIcon();
            saveGame();
            showSuccessPopup();
            return;
        } else {
            showInsufficientFundsPopup();
            return;
        }
    } else if (item === 'toys') {
        cost = 500;
        if (gold >= cost) {
            gold -= cost;
            happiness = Math.min(100, happiness + (Math.random() * 0.9) + 0.1);
            updateBars();
            saveGame();
            showSuccessPopup();
            animateDoggarDisplay();
            return;
        } else {
            showInsufficientFundsPopup();
            return;
        }
    }

    if (gold >= cost) {
        gold -= cost;
        if (item === 'mama') {
            foodCount += quantity;
        } else if (item === 'su') {
            waterCount += quantity;
        }
        updateBars();
        saveGame();
        showSuccessPopup();
        animateDoggarDisplay();
    } else {
        showInsufficientFundsPopup();
    }
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

function toggleBot() {
    if (botPurchased) {
        botActive = !botActive;
        updateBotIcon();
        saveGame();
    }
}

function useBot() {
    if (botActive) {
        if (energy < 5) {
            if (foodCount > 0) {
                feed(new Event('click'));
            } else if (waterCount > 0) {
                giveWater(new Event('click'));
            } else {
                showBotAlertPopup();
            }
        } else if (energy > 0 && energy < 100) {
            clickPuppy(new Event('click'));
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadGame();
    updateBars();
    updateBotIcon();
    document.addEventListener('click', closeMenus);
    setInterval(() => {
        useBot();
        saveGame();
    }, 1000); // Bot her saniye kontrol eder
});

setInterval(() => {
    energy = Math.max(0, energy - 1);
    updateBars();
    saveGame();
}, 60000);

setInterval(() => {
    happiness = Math.max(0, happiness - (Math.floor(Math.random() * 99) + 1));
    updateBars();
    saveGame();
}, 3600000);

updateBars();
