const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');
const goalInput = document.getElementById('goal');
const goalText = document.getElementById('goal-text');
const updateGoalButton = document.getElementById('update-goal');
const tips = document.getElementById('tips');
const cupSizeSelect = document.getElementById('cup-size');
const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
const startTimerButton = document.getElementById('start-timer');
const goalTimeInput = document.getElementById('goal-time');
let darkModeEnabled = false;
let timerInterval;

const tipsArray = [
  "Stay hydrated for better skin.",
  "Drinking water helps to flush out toxins.",
  "Water can help control calories.",
  "Hydration boosts energy levels."
];

updateBigCup();
displayRandomTip();

smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => highlightCups(idx));
});

cupSizeSelect.addEventListener('change', updateCupSizes);

updateGoalButton.addEventListener('click', updateGoal);

toggleDarkModeButton.addEventListener('click', toggleDarkMode);

startTimerButton.addEventListener('click', startTimer);

function highlightCups(idx) {
    if (idx === 7 && smallCups[idx].classList.contains("full")) idx--;
    else if (smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full')) {
        idx--;
    }

    smallCups.forEach((cup, idx2) => {
        if (idx2 <= idx) {
            cup.classList.add('full');
        } else {
            cup.classList.remove('full');
        }
    });

    updateBigCup();
}

function updateBigCup() {
    const fullCups = document.querySelectorAll('.cup-small.full').length;
    const totalCups = smallCups.length;
    const cupSize = parseInt(cupSizeSelect.value);
    const goal = parseFloat(goalInput.value) * 1000; 

    if (fullCups === 0) {
        percentage.style.visibility = 'hidden';
        percentage.style.height = 0;
    } else {
        percentage.style.visibility = 'visible';
        percentage.style.height = `${(fullCups * cupSize) / goal * 330}px`;
        percentage.innerText = `${Math.round((fullCups * cupSize) / goal * 100)}%`;
    }

    if ((fullCups * cupSize) === goal) {
        remained.style.visibility = 'hidden';
        remained.style.height = 0;
    } else {
        remained.style.visibility = 'visible';
        liters.innerText = `${(goal - (fullCups * cupSize)) / 1000}L`;
    }
}

function updateGoal() {
    goalText.innerText = `Goal: ${goalInput.value} Liters`;
    updateBigCup();
}

function displayRandomTip() {
    const randomTip = tipsArray[Math.floor(Math.random() * tipsArray.length)];
    tips.innerText = randomTip;
}

function updateCupSizes() {
    const cupSize = cupSizeSelect.value;
    smallCups.forEach(cup => cup.innerText = `${cupSize} ml`);
    updateBigCup();
}

function toggleDarkMode() {
    darkModeEnabled = !darkModeEnabled;
    document.body.classList.toggle('dark-mode', darkModeEnabled);
}

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    const goalTime = parseInt(goalTimeInput.value) * 60 * 60 * 1000; 
    const endTime = Date.now() + goalTime;

    timerInterval = setInterval(() => {
        const remainingTime = endTime - Date.now();
        
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            alert('Time to complete your water drinking goal!'); 
        } else {
            const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
            const seconds = Math.floor((remainingTime / 1000) % 60);
            console.log(`Time remaining: ${hours}h ${minutes}m ${seconds}s`);
        }
    }, 1000);
}
