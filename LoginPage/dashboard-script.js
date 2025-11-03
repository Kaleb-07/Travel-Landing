document.addEventListener("DOMContentLoaded", () => {
  loadUserData()
  loadRecentTrips()
  setupProfileMenu()
})

function loadUserData() {
  const user = JSON.parse(localStorage.getItem("wanderlustUser"))
  // ... other code ...
  document.querySelector(".profile-avatar img").src = user.imageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop";
  if (!user) {
    window.location.href = "login.html"
    return
  }

  document.getElementById("userName").textContent = user.firstName || "Traveler"
  document.getElementById("fullName").textContent = (user.firstName || "") + " " + (user.lastName || "")
  document.getElementById("profileEmail").textContent = user.email || ""
  document.getElementById("profileCountry").textContent = user.country || "Not specified"
}

function loadRecentTrips() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const recentTripsContainer = document.getElementById("recentTripsContainer");

  if (bookings.length === 0) {
    recentTripsContainer.innerHTML = `
      <p class="empty-state">
        <i class="fas fa-inbox"></i>
        No trips booked yet. Start exploring!
      </p>
    `;
    document.getElementById("tripCount").textContent = "0";
    return;
  }

  recentTripsContainer.innerHTML = "";

  // Show last 3 bookings
  bookings.slice(-3).reverse().forEach((booking) => {
    const tripHTML = `
      <div class="trip-item">
        <div>
          <h4>📍 ${booking.destination}, ${booking.location}</h4>
          <span class="trip-status ${booking.status.toLowerCase()}">${booking.status}</span>
        </div>
        <div class="trip-actions">
          <button class="btn btn-small" onclick="viewBookingDetails(${booking.id})">View Details</button>
          <button class="btn btn-small btn-danger" onclick="cancelBooking(${booking.id})">Cancel</button>
        </div>
      </div>
    `;
    recentTripsContainer.innerHTML += tripHTML;
  });

  document.getElementById("tripCount").textContent = bookings.length;
}

function viewBookingDetails(bookingId) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || []
  const booking = bookings.find((b) => b.id === bookingId)

  if (!booking) return

  const checkinDate = new Date(booking.checkin).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const checkoutDate = new Date(booking.checkout).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

   const detailsHTML = `
  <div class="booking-details-modal">
    <div class="details-content">
      <button class="close-btn" onclick="closeDetailsModal()">&times;</button>
      <h2>Booking Overview</h2>
      <div class="detail-group">
        <div class="detail-row">
          <span class="detail-label">Destination:</span>
          <span class="detail-value">${booking.destination}, ${booking.location}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Status:</span>
          <span class="detail-value ${booking.status.toLowerCase()}">${booking.status}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Dates:</span>
          <span class="detail-value">${checkinDate} – ${checkoutDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Guests:</span>
          <span class="detail-value">${booking.guests}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Room Type:</span>
          <span class="detail-value">${booking.roomType}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Total Price:</span>
          <span class="detail-value price-value">${booking.totalPrice}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Booking ID:</span>
          <span class="detail-value">${booking.id}</span>
        </div>
      </div>
      ${booking.specialRequests ? `
        <hr>
        <div class="detail-group">
          <div class="detail-row">
            <span class="detail-label">Special Requests:</span>
            <span class="detail-value">${booking.specialRequests}</span>
          </div>
        </div>
      ` : ""}
      <div class="details-buttons">
        <button class="btn btn-primary" onclick="downloadBooking(${booking.id})">Download Booking</button>
        <button class="btn btn-secondary" onclick="closeDetailsModal()">Close</button>
      </div>
    </div>
  </div>
`;

  const modal = document.createElement("div")
  modal.id = "detailsModal"
  modal.innerHTML = detailsHTML
  document.body.appendChild(modal)
}

function closeDetailsModal() {
  const modal = document.getElementById("detailsModal")
  if (modal) modal.remove()
}

function cancelBooking(bookingId) {
  if (confirm("Are you sure you want to cancel this booking?")) {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings = bookings.filter((b) => b.id !== bookingId); // Remove the booking
    localStorage.setItem("bookings", JSON.stringify(bookings));
    loadRecentTrips();
    alert("✅ Booking cancelled and removed successfully");
  }
}

// --- AI Travel Prediction Card ---
function aiPredictNextTravel() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  let predictionHTML = "";

  if (bookings.length === 0) {
    predictionHTML = `<p>Book trips to get AI predictions!</p>`;
  } else {
    // Use last destination and suggest a similar place
    const last = bookings[bookings.length - 1];
    // Fake logic: suggest a trending/neighbor country
    let suggestion = "Barcelona, Spain";
    if (last.location.toLowerCase().includes("brazil")) suggestion = "Chile";
    if (last.destination.toLowerCase().includes("greece")) suggestion = "Rome, Italy";
    if (last.destination.toLowerCase().includes("bali")) suggestion = "Phuket, Thailand";

    predictionHTML = `
      <h4>🌟 Next Hotspot: ${suggestion}</h4>
      <p>Based on your recent trip to ${last.destination}, we recommend ${suggestion} for beaches and culture!</p>
    `;
  }

  document.getElementById("ai-prediction-content").innerHTML = predictionHTML;
}