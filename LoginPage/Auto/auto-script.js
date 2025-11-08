// Auth Script
document.addEventListener("DOMContentLoaded", () => {
  initAuthPage()
})

function initAuthPage() {
  const loginForm = document.getElementById("loginForm")
  const signupForm = document.getElementById("signupForm")

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup)
  }
}

async function handleLogin(e) {
  e.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const btnText = document.getElementById("btnText")
  const btnSpinner = document.getElementById("btnSpinner")

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

  // Show loading
  btnText.style.display = "none"
  btnSpinner.style.display = "inline-block"

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store user data
    const userData = {
      email: email,
      loginTime: new Date().toISOString(),
    }

    localStorage.setItem("wanderlustUser", JSON.stringify(userData))

    alert("✅ Login successful! Welcome back!")
    window.location.href = "../../DashBoard/dashboard.html"
  } catch (error) {
    showError("Login failed. Please try again.")
  } finally {
    btnText.style.display = "inline"
    btnSpinner.style.display = "none"
  }
}

async function handleSignup(e) {
  e.preventDefault()

  const firstName = document.getElementById("firstName").value
  const lastName = document.getElementById("lastName").value
  const email = document.getElementById("email").value
  const country = document.getElementById("country").value
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirmPassword").value
  const agreeTerms = document.getElementById("agreeTerms").checked
  const btnText = document.getElementById("btnText")
  const btnSpinner = document.getElementById("btnSpinner")

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

  // Show loading
  btnText.style.display = "none"
  btnSpinner.style.display = "inline-block"

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store user data
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      country: country,
      signupTime: new Date().toISOString(),
    }

    localStorage.setItem("wanderlustUser", JSON.stringify(userData))

    alert("✅ Account created successfully! Welcome to Wanderlust!")
    window.location.href = "../../DashBoard/dashboard.html"
  } catch (error) {
    showError("Sign up failed. Please try again.")
  } finally {
    btnText.style.display = "inline"
    btnSpinner.style.display = "none"
  }
}

// Utility Functions
function showError(message) {
  const errorDiv = document.getElementById("errorMessage")
  const errorText = document.getElementById("errorText")

  if (errorDiv && errorText) {
    errorText.textContent = message
    errorDiv.style.display = "flex"
    errorDiv.scrollIntoView({ behavior: "smooth", block: "center" })
  } else {
    alert("❌ " + message)
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isStrongPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
  return passwordRegex.test(password)
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const button = event.target.closest(".toggle-password")
  const icon = button.querySelector("i")

  if (input.type === "password") {
    input.type = "text"
    icon.classList.remove("fa-eye")
    icon.classList.add("fa-eye-slash")
  } else {
    input.type = "password"
    icon.classList.remove("fa-eye-slash")
    icon.classList.add("fa-eye")
  }
}

function socialLogin(provider) {
  alert(`Logging in with ${provider}... (Integration needed)`)
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("wanderlustUser")
    alert("✅ Logged out successfully!")
    window.location.href = "../login/login.html"
  }
}
