// Auth Initialization
document.addEventListener("DOMContentLoaded", () => {
  // Get current page
  const currentPage = window.location.pathname.split("/").pop() || "login.html"

  // Initialize appropriate page
  if (currentPage === "login.html" || currentPage === "") {
    initLoginPage()
  } else if (currentPage === "signup.html") {
    initSignupPage()
  } else if (currentPage === "dashboard.html") {
    initDashboard()
  }
})

// ==================== LOGIN PAGE ====================
function initLoginPage() {
  const form = document.getElementById("loginForm")

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault()
      await handleLogin()
    })
  }
}