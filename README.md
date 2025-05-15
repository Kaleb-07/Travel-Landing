# Travel Landing Website

This is a simple travel landing website that showcases featured travel destinations on the home page. Users can click on **Learn More** buttons to navigate to a booking page for each destination, where more details are displayed and booking can be handled.

---

## Features
- **Home Page (`index.html`)**
  - Displays a hero section with a background image and call-to-action.
  - Shows a "Featured Destinations" section with destination cards.
  - Each destination card includes:
    - Image
    - Name
    - Location
    - Description
    - Price
    - A **Learn More** button that links to the booking page.
  - Responsive layout with basic styling.

- **Booking Page (`booking.html`)**
  - Dynamically loads destination details based on the destination ID passed via URL query parameters.
  - Shows:
    - Destination name
    - Location
    - Description
    - Price
  - Booking form placeholder (can be extended for actual bookings).
---
## How It Works
### Navigation Flow

- On the **home page**, each destination card's **Learn More** button links to `booking.html` with a query string parameter for the destination ID.  
  Example: `booking.html?id=bali`
- The **booking page** uses JavaScript to read the `id` parameter from the URL and then displays the corresponding destination information.

---

## Setup Instructions

### 1. Clone or Download the Project

Download or clone the repository to your local machine.

### 2. File Structure

