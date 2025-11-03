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
document.addEventListener("DOMContentLoaded", aiPredictNextTravel);

// --- Weather Card ---
function loadWeatherForDestination() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  let weatherHTML = "";
  if (bookings.length === 0) {
    weatherHTML = `<p>Book a trip to see the weather forecast!</p>`;
  } else {
    const dest = bookings[bookings.length-1].destination;
    // Fake logic: hardcoded "weather" for demo
    let weather = {
      condition: "Sunny",
      temp: 29,
    };
    if (dest.toLowerCase().includes("paris")) weather = { condition: "Cloudy", temp: 18 };
    if (dest.toLowerCase().includes("bali")) weather = { condition: "Humid", temp: 31 };
    if (dest.toLowerCase().includes("greece")) weather = { condition: "Clear", temp: 26 };

    weatherHTML = `
      <h4>${dest}</h4>
      <p><strong>Weather:</strong> ${weather.condition}</p>
      <p><strong>Temperature:</strong> ${weather.temp}°C</p>
    `;
  }
  document.getElementById("weather-content").innerHTML = weatherHTML;
}

document.addEventListener("DOMContentLoaded", loadWeatherForDestination);

function downloadBooking(bookingId) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || []
  const booking = bookings.find((b) => b.id === bookingId)

  if (!booking) return

  let content = `WANDERLUST BOOKING CONFIRMATION\n`
  content += `================================\n\n`
  content += `Booking ID: #${booking.id}\n`
  content += `Destination: ${booking.destination}, ${booking.location}\n`
  content += `Status: ${booking.status}\n\n`
  content += `GUEST INFORMATION\n`
  content += `Name: ${booking.firstName} ${booking.lastName}\n`
  content += `Email: ${booking.email}\n`
  content += `Phone: ${booking.phone}\n\n`
  content += `CHECK-IN: ${new Date(booking.checkin).toLocaleDateString()}\n`
  content += `CHECK-OUT: ${new Date(booking.checkout).toLocaleDateString()}\n`
  content += `GUESTS: ${booking.guests}\n`
  content += `ROOM TYPE: ${booking.roomType}\n\n`
  content += `TOTAL AMOUNT: ${booking.totalPrice}\n`
  content += `BOOKING DATE: ${new Date(booking.bookingDate).toLocaleDateString()}\n`

  const element = document.createElement("a")
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
  element.setAttribute("download", `Booking_${booking.id}.txt`)
  element.style.display = "none"
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)

  alert("✅ Booking downloaded successfully!")
}

function setupProfileMenu() {
  const profileMenu = document.querySelector(".profile-menu")
  const profileImg = document.querySelector(".navbar-profile img")

  if (profileImg) {
    profileImg.addEventListener("click", (e) => {
      e.stopPropagation()
      profileMenu.style.display = profileMenu.style.display === "block" ? "none" : "block"
    })
  }

  document.addEventListener("click", () => {
    if (profileMenu) profileMenu.style.display = "none"
  })
}

function editProfile() {
  const user = JSON.parse(localStorage.getItem("wanderlustUser")) || {};

  const modalHTML = `
    <div class="booking-details-modal" id="profileEditModal">
      <div class="details-content">
        <button class="close-btn" onclick="closeProfileEditModal()">&times;</button>
        <h2>Edit Profile</h2>
        <form id="profileEditForm" enctype="multipart/form-data">
          <div style="text-align:center; margin-bottom: 18px;">
            <img id="profilePreview" src="${user.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'}" 
                 alt="Profile Preview"
                 style="width:100px; height:100px; border-radius:15px; object-fit:cover; border:2px solid #667eea;">
            <div><input type="file" id="editImage" accept="image/*" style="margin-top:10px;"></div>
          </div>
          <div class="detail-group">
            <!-- rest of your rows... -->
            <div class="detail-row">
              <label class="detail-label" for="editFirstName">First Name</label>
              <input class="detail-value" type="text" id="editFirstName" name="editFirstName" value="${user.firstName || ""}" required>
            </div>
            <div class="detail-row">
              <label class="detail-label" for="editLastName">Last Name</label>
              <input class="detail-value" type="text" id="editLastName" name="editLastName" value="${user.lastName || ""}" required>
            </div>
            <div class="detail-row">
              <label class="detail-label" for="editEmail">Email</label>
              <input class="detail-value" type="email" id="editEmail" name="editEmail" value="${user.email || ""}" required>
            </div>
            <div class="detail-row">
              <label class="detail-label" for="editCountry">Country</label>
              <input class="detail-value" type="text" id="editCountry" name="editCountry" value="${user.country || ""}">
            </div>
          </div>
          <div class="details-buttons">
            <button class="btn btn-primary" type="submit">Save Changes</button>
            <button class="btn btn-secondary" type="button" onclick="closeProfileEditModal()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;
  const modal = document.createElement("div");
  modal.innerHTML = modalHTML;
  document.body.appendChild(modal);

  // Show preview when new image is selected
  document.getElementById("editImage").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        document.getElementById("profilePreview").src = evt.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
  document.getElementById("profileEditForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let updatedUser = {
      firstName: document.getElementById("editFirstName").value,
      lastName: document.getElementById("editLastName").value,
      email: document.getElementById("editEmail").value,
      country: document.getElementById("editCountry").value,
      imageUrl: document.getElementById("profilePreview").src // Save the image
    };
    localStorage.setItem("wanderlustUser", JSON.stringify(updatedUser));
    loadUserData();
    closeProfileEditModal();
    alert("✅ Profile updated successfully!");
  });
}