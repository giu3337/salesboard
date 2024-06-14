// Product A info
const productA = {
    emoji: "⭐",
    revenue: 200,
    commision: 50
}

// Product B info
const productB = {
    emoji: "🔥",
    revenue: 300,
    commision: 75
}

// Top section
const starButton = document.getElementById('top-button-star')
const fireButton = document.getElementById('top-button-fire')
const resetButton = document.getElementById('reset-button')
// Middle section
const salesHistoryEl = document.getElementById('sales-history-id')
const achievementHistoryEl = document.getElementById('achievement-history-id')
const liveSalesEl = document.getElementById('live-sales')
const liveAchievementsEl = document.getElementById('live-achievements')
// Bottom section
const totalRevenueEl = document.getElementById('total-revenue-id')
const totalCommisionEl = document.getElementById('total-commission-id')

// Theme switch
const themeSwitch = document.getElementById('theme-switch')
themeSwitch.addEventListener('click', toggleTheme)

// Initialize state
let totalRevenue = localStorage.getItem('totalRevenue') ? 
    JSON.parse(localStorage.getItem('totalRevenue')) : 0

let totalCommision = localStorage.getItem('totalCommision') ?
    JSON.parse(localStorage.getItem('totalCommision')) : 0

let liveSales = localStorage.getItem('liveSales') ? 
    JSON.parse(localStorage.getItem('liveSales')) : []

let liveAchivements = localStorage.getItem('liveAchivements') ? 
    JSON.parse(localStorage.getItem('liveAchivements')) : []

// Load initial state from local storage
updateUI()
loadTheme()

function updateUI() {
    totalRevenueEl.textContent = `$${totalRevenue}`
    totalCommisionEl.textContent = `$${totalCommision}`
    salesHistoryEl.innerHTML = liveSales.join('')
    achievementHistoryEl.innerHTML = liveAchivements.join('')
    liveSalesEl.textContent = `Live Sales - ${liveSales.length}`
    liveAchievementsEl.textContent = `Live Achievements - ${liveAchivements.length}`
}

// Save state to local storage
function saveState() {
    localStorage.setItem('totalRevenue', JSON.stringify(totalRevenue))
    localStorage.setItem('totalCommision', JSON.stringify(totalCommision))
    localStorage.setItem('liveSales', JSON.stringify(liveSales))
    localStorage.setItem('liveAchivements', JSON.stringify(liveAchivements))
}

// Handle button click
function handleButtonClick(product) {
    if (liveSales.length === 0) {
        liveAchivements.push("🔔")
    }
    if (totalRevenue > 2500 && !liveAchivements.includes("💰")) {
        liveAchivements.push("💰")
    }
    if (liveSales.length === 15) {
        liveAchivements.push("🏆")
    }

    liveSales.push(product.emoji)
    totalRevenue += product.revenue
    totalCommision += product.commision

    updateUI()
    saveState()
}

// Toggle theme
function toggleTheme() {
    document.documentElement.classList.toggle('light-mode')
    const isLightMode = document.documentElement.classList.contains('light-mode')
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark')
    themeSwitch.textContent = isLightMode ? '🌙' : '🌞'
}

// Load theme from local storage
function loadTheme() {
    const theme = localStorage.getItem('theme')
    if (theme === 'light') {
        document.documentElement.classList.add('light-mode')
        themeSwitch.textContent = '🌙'
    } else {
        themeSwitch.textContent = '🌞'
    }
}

// Star Button
starButton.addEventListener('click', () => handleButtonClick(productA))

// Fire Button
fireButton.addEventListener('click', () => handleButtonClick(productB))

// Reset Button
resetButton.addEventListener('click', () => {
    totalRevenue = 0
    totalCommision = 0
    liveSales = []
    liveAchivements = []
    updateUI()
    saveState()
})
