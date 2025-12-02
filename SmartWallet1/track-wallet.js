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

/* ============================
   📦 INITIAL SETUP: DISTANCE-BASED SIGNAL
============================= */
document.addEventListener('DOMContentLoaded', () => {
    // Sets initial state to reflect the wallet being far away (Mount Everest)
    const signalDot = document.getElementById('status-dot');
    const signalText = document.getElementById('signal-text');
    
    const simulatedDistance = '12,000 mi'; 
    
    signalDot.classList.add('red');
    signalText.textContent = `Signal: Very Weak (${simulatedDistance})`;
    document.getElementById('distance-info').textContent = `Wallet Location: Mount Everest, Nepal`;

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
    
    // 1. Show the custom alert to simulate calculation
    showMobileAlert("🗺️ Calculating best route...\n\n(Simulated route to Mount Everest from a distant location.)")
        .then(() => {
            // 2. Switch the UI to the Directions View
            setDirectionsView();
        });
});


/* ============================
   🎯 TRACK BUTTON (Animation)
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
    
    await showMobileAlert("🎯 Tracking started…\nMove to locate your wallet.");

    marker.classList.add("tracking-active");

    // 2. Stop tracking and revert after a delay
    setTimeout(async () => {
        marker.classList.remove("tracking-active");
        trackButton.style.backgroundColor = '#00bcd4'; 
        trackButton.querySelector('span').textContent = 'Track';
        await showMobileAlert("🎯 Tracking stopped.");
    }, 5000);
});