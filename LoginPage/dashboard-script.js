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

}