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