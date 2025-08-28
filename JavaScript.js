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

            // Reset the interval
      clearInterval(testimonialInterval)
      testimonialInterval = setInterval(nextTestimonial, 5000)
    })
  })

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form")
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const email = this.querySelector('input[type="email"]').value

    if (!email) {
      alert("Please enter your email address")
      return
    }

        // Here you would typically send the email to your backend
    alert("Thank you for subscribing to our newsletter!")
    this.reset()
  })

    // Contact form
  const contactForm = document.querySelector(".contact-form")
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

        const formData = new FormData(this)
    const name = this.querySelector('input[type="text"]').value
    const email = this.querySelector('input[type="email"]').value
    const subject = this.querySelectorAll('input[type="text"]')[1].value
    const message = this.querySelector("textarea").value

    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields")
      return
    }

    // Here you would typically send the form data to your backend
    alert("Thank you for your message! We'll get back to you soon.")
    this.reset()
  })

  // Back to top button
  const backToTopButton = document.getElementById("backToTop")

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

    // Destination cards hover effect
  const destinationCards = document.querySelectorAll(".destination-card")
  destinationCards.forEach((card) => {
    card.addEventListener("click", function () {
      const destination = this.querySelector("h3").textContent
      const country = this.querySelector("p").textContent
      alert(`You clicked on ${destination}, ${country}. Booking functionality would be implemented here.`)
    })
  })
  
    // Package booking buttons
  const bookingButtons = document.querySelectorAll(".package-card .btn-primary")
  bookingButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const packageName = this.closest(".package-card").querySelector("h3").textContent
      const packagePrice = this.closest(".package-card").querySelector(".price").textContent
      alert(
        `You're about to book the ${packageName} package for ${packagePrice}. Booking system would be implemented here.`,
      )
    })
  })

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

    // Observe elements for animation
  const animateElements = document.querySelectorAll(".destination-card, .package-card, .stat")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

    // Set minimum date for date inputs to today
  const today = new Date().toISOString().split("T")[0]
  document.getElementById("checkin").setAttribute("min", today)
  document.getElementById("checkout").setAttribute("min", today)

})
