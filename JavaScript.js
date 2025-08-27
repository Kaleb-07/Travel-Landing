// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

    // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

    // Navbar scroll effect
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
  
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
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const destination = document.getElementById("destination").value
    const checkin = document.getElementById("checkin").value
    const checkout = document.getElementById("checkout").value
    const guests = document.getElementById("guests").value

    if (!destination || !checkin || !checkout) {
      alert("Please fill in all required fields")
      return
    }

        // Here you would typically send the data to your backend
    alert(`Searching for trips to ${destination} from ${checkin} to ${checkout} for ${guests} guest(s)`)
  })

  // Testimonials slider
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  const dots = document.querySelectorAll(".dot")
  let currentTestimonial = 0

    function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach((card) => {
      card.classList.remove("active")
    })

        // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active")
    })

        // Show current testimonial and activate corresponding dot
    testimonialCards[index].classList.add("active")
    dots[index].classList.add("active")
  }

    // Auto-advance testimonials
  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length
    showTestimonial(currentTestimonial)
  }

    // Set up auto-advance
  let testimonialInterval = setInterval(nextTestimonial, 5000)

  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentTestimonial = index
      showTestimonial(currentTestimonial)
