// =========================================================================
// 📲 MOBILE MODAL FUNCTION (REPLACEMENT FOR alert())
// =========================================================================
function showMobileAlert(message) {
    const modal = document.getElementById('custom-modal');
    const messageElement = document.getElementById('modal-message');
    const okButton = document.getElementById('modal-ok-btn');
    
    messageElement.textContent = message;
    modal.style.display = 'flex';

    // Returns a Promise that resolves when the user clicks 'OK'
    return new Promise(resolve => {
        okButton.onclick = () => {
            modal.style.display = 'none';
            resolve();
        };
    });
}

// =========================================================================
// ⚙️ DATA: Random Everyday Locations
// =========================================================================
const randomLocations = [
    // Very Close locations (Excellent signal)
    { name: "Living Room Couch", distance: "0.01", signal: "Excellent", color: "green" },
    { name: "Bedroom Nightstand", distance: "0.02", signal: "Excellent", color: "green" },
    { name: "Kitchen Counter", distance: "0.03", signal: "Excellent", color: "green" },
    { name: "Car Glove Compartment", distance: "0.1", signal: "Excellent", color: "green" },
    
    // Nearby locations (Strong signal)
    { name: "Starbucks, Downtown", distance: "0.5", signal: "Strong", color: "green" },
    { name: "Local Supermarket", distance: "0.8", signal: "Strong", color: "green" },
    { name: "Neighborhood Park", distance: "0.6", signal: "Strong", color: "green" },
    { name: "Gas Station", distance: "1.2", signal: "Strong", color: "green" },
    { name: "Gym - Locker #24", distance: "0.9", signal: "Strong", color: "green" },
    
    // Medium distance locations (Medium signal)
    { name: "Shopping Mall Food Court", distance: "3.5", signal: "Medium", color: "yellow" },
    { name: "Movie Theater", distance: "4.2", signal: "Medium", color: "yellow" },
    { name: "Office Building Lobby", distance: "5.1", signal: "Medium", color: "yellow" },
    { name: "University Library", distance: "6.3", signal: "Medium", color: "yellow" },
    { name: "Coffee Shop", distance: "2.8", signal: "Medium", color: "yellow" },
    { name: "Restaurant", distance: "3.9", signal: "Medium", color: "yellow" },
    
    // Far locations (Weak signal)
    { name: "Airport Terminal", distance: "12.5", signal: "Weak", color: "red" },
    { name: "Train Station", distance: "15.3", signal: "Weak", color: "red" },
    { name: "Outdoor Concert Venue", distance: "18.7", signal: "Weak", color: "red" },
    { name: "Amusement Park", distance: "22.4", signal: "Weak", color: "red" },
    
    // Very Far locations (Very Weak signal)
    { name: "Mount Everest Base Camp, Nepal", distance: "12,000", signal: "Very Weak", color: "red" },
    { name: "Beach Resort", distance: "85.6", signal: "Very Weak", color: "red" },
    { name: "Ski Resort Lodge", distance: "120.3", signal: "Very Weak", color: "red" },
    { name: "Camping Site", distance: "45.8", signal: "Very Weak", color: "red" }
];

// Calculate trip duration based on distance
function calculateTripDuration(distanceStr) {
    // Remove commas and parse the distance
    const distance = parseFloat(distanceStr.replace(/,/g, ''));
    
    // Simulated travel time logic:
    if (distance < 1) {
        // Very close - minutes
        const minutes = Math.floor(distance * 60);
        return `${minutes} min`;
    } else if (distance < 10) {
        // Nearby - hours
        const hours = Math.floor(distance / 3); // Assuming 3 mph walking speed
        const minutes = Math.floor((distance % 3) * 20);
        if (hours > 0) {
            return `${hours} hr ${minutes} min`;
        } else {
            return `${minutes} min`;
        }
    } else {
        // Far away - days and hours
        const baseHours = distance / 60; // Assuming 60 mph driving speed
        const randomVariation = Math.random() * 2; // Add 0-2 hours variation
        const totalHours = baseHours + randomVariation;
        
        const days = Math.floor(totalHours / 24);
        const hours = Math.floor(totalHours % 24);
        
        if (days > 0) {
            return `${days} days ${hours} hrs`;
        } else {
            return `${hours} hrs`;
        }
    }
}

// =========================================================================
// ⚙️ UI Management Functions
// =========================================================================

function setTrackingView() {
    // Show tracking/pin map (green grid) and distance/signal info
    document.getElementById('wallet-tracking-view').style.display = 'block';
    document.getElementById('directions-view').style.display = 'none';
    
    document.getElementById('distance-info').classList.remove('hidden');
    document.getElementById('connection-status').classList.remove('hidden');
    document.getElementById('directions-info').classList.add('hidden');
    
    // Update header title
    document.querySelector('.header-title').textContent = 'TRACK YOUR WALLET';
    
    // Show the Track button
    document.getElementById('track-circle-btn').classList.remove('hidden');
}

function setDirectionsView() {
    // Hide tracking map and show directions map (blue navigation) and route info
    document.getElementById('wallet-tracking-view').style.display = 'none';
    document.getElementById('directions-view').style.display = 'block';

    document.getElementById('distance-info').classList.add('hidden');
    document.getElementById('connection-status').classList.add('hidden');
    document.getElementById('directions-info').classList.remove('hidden');
    
    // Update header title
    document.querySelector('.header-title').textContent = 'NAVIGATING TO WALLET';

    // Hide the Track button
    document.getElementById('track-circle-btn').classList.add('hidden');
}

// Generate random wallet location
function generateRandomLocation() {
    const randomIndex = Math.floor(Math.random() * randomLocations.length);
    return randomLocations[randomIndex];
}

// Update UI with new location data
function updateWalletLocation(locationData) {
    // Update wallet location text
    document.getElementById('wallet-location-text').textContent = locationData.name;
    
    // Update signal status
    const signalDot = document.getElementById('status-dot');
    const signalText = document.getElementById('signal-text');
    
    // Remove all color classes
    signalDot.classList.remove('gray', 'red', 'yellow', 'green');
    
    // Add appropriate color class
    signalDot.classList.add(locationData.color);
    
    // Update signal text
    signalText.textContent = `Signal: ${locationData.signal} (${locationData.distance} mi)`;
    
    // Update directions info if needed
    document.getElementById('trip-distance').textContent = `${locationData.distance} mi`;
    document.getElementById('trip-duration').textContent = calculateTripDuration(locationData.distance);
}

/* ============================
   📦 INITIAL SETUP
============================= */
document.addEventListener('DOMContentLoaded', () => {
    // Start with unknown location and signal
    const signalDot = document.getElementById('status-dot');
    signalDot.classList.add('gray');
    
    // Set initial text
    document.getElementById('wallet-location-text').textContent = "Not located yet";
    document.getElementById('signal-text').textContent = "Signal: Unknown";
    
    // Ensure we start in tracking mode
    setTrackingView();
});


/* ============================
   🔊 MAKE WALLET RING
============================= */
document.getElementById("ring-btn").addEventListener("click", () => {
    showMobileAlert("🔊 Your wallet is ringing!");
});


/* ============================
   📍 GET DIRECTIONS (SIMULATION)
============================= */
document.getElementById("directions-btn").addEventListener("click", () => {
    const locationText = document.getElementById('wallet-location-text').textContent;
    
    if (locationText === "Not located yet") {
        showMobileAlert("📍 Please track your wallet first to get directions!");
        return;
    }
    
    // 1. Show the custom alert to simulate calculation
    showMobileAlert(`🗺️ Calculating best route to ${locationText}...\n\n(Simulated navigation directions.)`)
        .then(() => {
            // 2. Switch the UI to the Directions View
            setDirectionsView();
        });
});


/* ============================
   🎯 TRACK BUTTON (Generate Random Location)
============================= */
document.getElementById("track-circle-btn").addEventListener("click", async () => {
    
    // If user is currently in directions mode, switch back to tracking view
    if (document.getElementById('directions-view').style.display === 'block') {
        setTrackingView();
    }
    
    let marker = document.querySelector(".wallet-marker");
    let trackButton = document.getElementById("track-circle-btn");
    
    // 1. Show tracking status
    trackButton.style.backgroundColor = '#ff00ff'; 
    trackButton.querySelector('span').textContent = 'Tracking...';
    
    await showMobileAlert("🎯 Tracking started…\nScanning for wallet signal...");

    marker.classList.add("tracking-active");

    // 2. Simulate tracking process
    setTimeout(async () => {
        // Generate random location
        const randomLocation = generateRandomLocation();
        
        // Update UI with new location
        updateWalletLocation(randomLocation);
        
        marker.classList.remove("tracking-active");
        trackButton.style.backgroundColor = '#00bcd4'; 
        trackButton.querySelector('span').textContent = 'Track';
        
        await showMobileAlert(`🎯 Wallet located!\n\n📍 Location: ${randomLocation.name}\n📡 Signal: ${randomLocation.signal}\n📏 Distance: ${randomLocation.distance} mi`);
    }, 3000);
});