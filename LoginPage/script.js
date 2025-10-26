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

async function handleLogin() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const errorDiv = document.getElementById("errorMessage")
  const errorText = document.getElementById("errorText")
  const btnText = document.getElementById("btnText")
  const btnSpinner = document.getElementById("btnSpinner")
  // Reset error message
  errorDiv.style.display = "none"
  // Validation
  if (!email || !password) {
    showError("Please fill in all fields")
    return
  }
  if (!isValidEmail(email)) {
    showError("Please enter a valid email address")
    return
  }
  if (password.length < 6) {
    showError("Password must be at least 6 characters")
    return
  }
  // Show loading state
  btnText.style.display = "none"
  btnSpinner.style.display = "inline-block"

    try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store user data (demo purposes)
    const userData = {
      email: email,
      loginTime: new Date().toISOString(),
    }

    localStorage.setItem("wanderlustUser", JSON.stringify(userData))

    alert("✅ Login successful! Welcome back!")

    // Redirect to dashboard
    window.location.href = "dashboard.html"
  } catch (error) {
    showError("Login failed. Please try again.")
  } finally {
    btnText.style.display = "inline"
    btnSpinner.style.display = "none"
  }
}
// ==================== SIGNUP PAGE ====================
function initSignupPage() {
  const form = document.getElementById("signupForm")

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault()
      await handleSignup()
    })
  }
}

async function handleSignup() {
  const firstName = document.getElementById("firstName").value
  const lastName = document.getElementById("lastName").value
  const email = document.getElementById("email").value
  const country = document.getElementById("country").value
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirmPassword").value
  const agreeTerms = document.getElementById("agreeTerms").checked
  const errorDiv = document.getElementById("errorMessage")
  const btnText = document.getElementById("btnText")
  const btnSpinner = document.getElementById("btnSpinner")

    // Reset error message
  errorDiv.style.display = "none"

    // Validation
  if (!firstName || !lastName || !email || !country || !password || !confirmPassword) {
    showError("Please fill in all fields")
    return
  }

    if (firstName.length < 2) {
    showError("First name must be at least 2 characters")
    return
  }

  if (lastName.length < 2) {
    showError("Last name must be at least 2 characters")
    return
  }

  if (!isValidEmail(email)) {
    showError("Please enter a valid email address")
    return
  }
  if (password.length < 8) {
    showError("Password must be at least 8 characters")
    return
  }

  // Check password strength
  if (!isStrongPassword(password)) {
    showError("Password must include uppercase, lowercase, number, and special character (@$!%*?&)")
    return
  }

  if (password !== confirmPassword) {
    showError("Passwords do not match")
    return
  }

  if (!agreeTerms) {
    showError("Please agree to the Terms of Service")
    return
  }

  // Show loading state
  btnText.style.display = "none"
  btnSpinner.style.display = "inline-block"
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store user data (demo purposes)
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      country: country,
      signupTime: new Date().toISOString(),
    }

    localStorage.setItem("wanderlustUser", JSON.stringify(userData))

    alert("✅ Account created successfully! Welcome to Wanderlust!")

    // Redirect to dashboard
    window.location.href = "dashboard.html"
  } catch (error) {
    showError("Sign up failed. Please try again.")
  } finally {
    btnText.style.display = "inline"
    btnSpinner.style.display = "none"
  }
}

// ==================== DASHBOARD PAGE ====================
function initDashboard() {
  // Check if user is logged in
  const user = localStorage.getItem("wanderlustUser")

  if (!user) {
    alert("Please log in first")
    window.location.href = "login.html"
    return
  }
  
}
