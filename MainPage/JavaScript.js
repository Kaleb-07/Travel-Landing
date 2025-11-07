// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

if (hamburger && navMenu) {
hamburger.addEventListener("click", () => {
hamburger.classList.toggle("active")
navMenu.classList.toggle("active")
})
}

// Close mobile menu when clicking on a link
if (navLinks.length && hamburger && navMenu) {
navLinks.forEach((link) => {
link.addEventListener("click", () => {
hamburger.classList.remove("active")
navMenu.classList.remove("active")
})
})
}

// Navbar scroll effect
const navbar = document.querySelector(".navbar")
if (navbar) {
window.addEventListener("scroll", () => {
if (window.scrollY > 100) {
navbar.classList.add("scrolled")
} else {
navbar.classList.remove("scrolled")
}
})
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
anchor.addEventListener("click", function (e) {
e.preventDefault()
const target = document.querySelector(this.getAttribute("href"))
if (target) {
const offsetTop = target.offsetTop - 80
window.scrollTo({
top: offsetTop,
behavior: "smooth",
})
}
})
})

// Search form functionality
const searchForm = document.querySelector(".search-form")
if (searchForm) {
searchForm.addEventListener("submit", (e) => {
e.preventDefault()

  const destination = document.getElementById("destination")?.value
  const checkin = document.getElementById("checkin")?.value
  const checkout = document.getElementById("checkout")?.value
  const guests = document.getElementById("guests")?.value

  if (!destination || !checkin || !checkout) {
    alert("Please fill in all required fields")
    return
  }

  alert(`Searching for trips to ${destination} from ${checkin} to ${checkout} for ${guests} guest(s)`)
})
}

// Testimonials slider
const testimonialCards = document.querySelectorAll(".testimonial-card")
const dots = document.querySelectorAll(".dot")
if (testimonialCards.length) {
let currentTestimonial = 0

function showTestimonial(index) {
  testimonialCards.forEach((card) => {
    card.classList.remove("active")
  })
  dots.forEach((dot) => {
    dot.classList.remove("active")
  })
  testimonialCards[index].classList.add("active")
  dots[index].classList.add("active")
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length
  showTestimonial(currentTestimonial)
}

let testimonialInterval = setInterval(nextTestimonial, 5000)

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentTestimonial = index
    showTestimonial(currentTestimonial)
    clearInterval(testimonialInterval)
    testimonialInterval = setInterval(nextTestimonial, 5000)
  })
})
}

// Contact form
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
contactForm.addEventListener("submit", async function (e) {
e.preventDefault()

text
  const name = this.querySelector('input[type="text"]')?.value
  const email = this.querySelector('input[type="email"]')?.value
  const subject = this.querySelectorAll('input[type="text"]')?.value
  const message = this.querySelector("textarea")?.value

  if (!name || !email || !subject || !message) {
    alert("❌ Please fill in all fields")
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("❌ Please enter a valid email address")
    return
  }

  alert("📧 Sending your message... Please wait")

  try {
    alert("✅ Message sent successfully! We'll get back to you soon.")
    this.reset()
  } catch (error) {
    console.error("Error sending email:", error)
    alert("❌ Error sending message. Please try again or contact us directly.")
  }
})
}

// Newsletter form with email
const newsletterForm = document.querySelector(".newsletter-form")
if (newsletterForm) {
newsletterForm.addEventListener("submit", async function (e) {
e.preventDefault()

  const email = this.querySelector('input[type="email"]')?.value
  if (!email) {
    alert("❌ Please enter your email address")
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("❌ Please enter a valid email address")
    return
  }

  try {
    alert("✅ Thank you for subscribing to our newsletter!")
    this.reset()
  } catch (error) {
    console.error("Error:", error)
    alert("❌ Could not process subscription. Please try again.")
  }
})
}

// Back to top button
const backToTopButton = document.getElementById("backToTop")
if (backToTopButton) {
window.addEventListener("scroll", () => {
if (window.scrollY > 300) {
backToTopButton.classList.add("show")
} else {
backToTopButton.classList.remove("show")
}
})

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})
}

// Destination cards - click to book
const destinationCards = document.querySelectorAll(".destination-card")
if (destinationCards.length) {
destinationCards.forEach((card) => {
card.addEventListener("click", function () {
const destination = this.querySelector("h3")?.textContent
const country = this.querySelector("p")?.textContent
const price = this.querySelector(".price")?.textContent

    if (!localStorage.getItem("wanderlustUser")) {
      alert("Please login first to book a trip!")
      window.location.href = "login.html"
      return
    }

    window.openBookingModal({
      type: "destination",
      name: destination,
      location: country,
      price: price,
      duration: "Flexible",
    })
  })
})
}

// Animate elements on scroll
const observerOptions = {
threshold: 0.1,
rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.style.opacity = "1"
entry.target.style.transform = "translateY(0)"
}
})
}, observerOptions)

const animateElements = document.querySelectorAll(".destination-card, .package-card, .stat")
animateElements.forEach((el) => {
el.style.opacity = "0"
el.style.transform = "translateY(30px)"
el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
observer.observe(el)
})

// Set minimum date for date inputs to today
const today = new Date().toISOString().split("T")
if (document.getElementById("checkin")) {
document.getElementById("checkin").setAttribute("min", today)
}
if (document.getElementById("checkout")) {
document.getElementById("checkout").setAttribute("min", today)
}

// Update checkout minimum date when checkin changes
if (document.getElementById("checkin")) {
document.getElementById("checkin").addEventListener("change", function () {
const checkinDate = new Date(this.value)
checkinDate.setDate(checkinDate.getDate() + 1)
const minCheckout = checkinDate.toISOString().split("T")
if (document.getElementById("checkout")) {
document.getElementById("checkout").setAttribute("min", minCheckout)
}
  // BOOKING SYSTEM - Global Functions
  window.openBookingModal = (tripData) => {
    if (!localStorage.getItem("wanderlustUser")) {
      alert("Please login first to book a trip!")
      window.location.href = "login.html"
      return
    }
const modal = document.createElement("div")
    modal.id = "bookingModal"
    modal.className = "booking-modal"

    const priceValue = tripData.price.replace(/[^\d]/g, "")
     modal.innerHTML = `
      <div class="booking-modal-content">
        <div class="booking-modal-header">
          <h2>📍 Book Your Trip to ${tripData.name}</h2>
          <button class="close-modal" onclick="window.closeBookingModal()">&times;</button>
        </div>
        <div class="booking-modal-body">
          <form id="bookingForm" onsubmit="window.submitBooking(event)">
            
            <!-- Trip Summary -->
            <div class="package-summary">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h3>${tripData.name}, ${tripData.location}</h3>
                  <p style="margin: 5px 0; color: #666;">${tripData.type === "destination" ? "✈️ Destination" : "📦 Package"}</p>
                </div>
                <span class="price" style="font-size: 1.5rem;">${tripData.price}</span>
              </div>
            </div>
            
            <!-- Personal Information -->
            <div class="form-section">
              <h4>👤 Your Information</h4>
              <div class="form-row">
                <div class="form-group">
                  <label>First Name *</label>
                  <input type="text" id="bookFirstName" placeholder="John" required>
                </div>
                <div class="form-group">
                  <label>Last Name *</label>
                  <input type="text" id="bookLastName" placeholder="Doe" required>
                </div>
              </div>
              <div class="form-group">
                <label>Email Address *</label>
                <input type="email" id="bookEmail" placeholder="john@example.com" required>
              </div>
              <div class="form-group">
                <label>Phone Number *</label>
                <input type="tel" id="bookPhone" placeholder="+1 (555) 123-4567" required>
              </div>
            </div>

             <!-- Travel Dates -->
            <div class="form-section">
              <h4>📅 Travel Dates</h4>
              <div class="form-row">
                <div class="form-group">
                  <label>Check-in Date *</label>
                  <input type="date" id="bookCheckin" required>
                </div>
                <div class="form-group">
                  <label>Check-out Date *</label>
                  <input type="date" id="bookCheckout" required>
                </div>
              </div>
            </div>

            <!-- Number of Guests -->
            <div class="form-section">
              <h4>🏨 Accommodation</h4>
              <div class="form-row">
                <div class="form-group">
                  <label>Number of Guests *</label>
                  <select id="bookGuests" required>
                    <option value="">Select number of guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Guests</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Room Type *</label>
                  <select id="roomType" required onchange="window.updateTotalPrice()">
                    <option value="">Select room type</option>
                    <option value="Standard">🏠 Standard Room</option>
                    <option value="Deluxe">⭐ Deluxe Room (+20%)</option>
                    <option value="Suite">✨ Suite (+50%)</option>
                    <option value="Villa">🏝️ Villa (+100%)</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Special Requests -->
            <div class="form-section">
              <h4>📝 Special Requests (Optional)</h4>
              <textarea id="bookSpecialRequests" placeholder="Any special requirements? (e.g., early check-in, high floor, etc.)" rows="3"></textarea>
            </div>

            <!-- Terms -->
            <div class="form-section">
              <div class="checkbox-wrapper">
                <input type="checkbox" id="bookTerms" required>
                <label for="bookTerms">I agree to the booking terms and conditions</label>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="price-breakdown">
              <div class="price-row">
                <span>Base Price:</span>
                <span id="basePrice">$${priceValue}</span>
              </div>
              <div class="price-row">
                <span>Room Type Adjustment:</span>
                <span id="roomAdjustment">+$0</span>
              </div>
              <div class="price-row">
                <span>Taxes & Fees (10%):</span>
                <span id="taxAmount">$0</span>
              </div>
              <div class="price-row total">
                <span>Total Amount:</span>
                <span id="totalAmount">$${priceValue}</span>
              </div>
            </div>

            <!-- Buttons -->
            <div class="booking-buttons">
              <button type="button" class="btn btn-secondary" onclick="window.closeBookingModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">
                <i class="fas fa-check"></i> Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
        `
        
    document.body.appendChild(modal)
    document.body.style.overflow = "hidden"

    // Set minimum dates
    const today = new Date().toISOString().split("T")[0]
    document.getElementById("bookCheckin").setAttribute("min", today)
    document.getElementById("bookCheckout").setAttribute("min", today)

    // Pre-fill user data if logged in
    const user = JSON.parse(localStorage.getItem("wanderlustUser"))
    if (user) {
      document.getElementById("bookFirstName").value = user.firstName || ""
      document.getElementById("bookLastName").value = user.lastName || ""
      document.getElementById("bookEmail").value = user.email || ""
    }

    // Store trip data globally for submit function
    window.currentTripData = tripData
    window.basePrice = Number.parseInt(priceValue)


})
}
});