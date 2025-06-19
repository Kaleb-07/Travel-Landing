document.addEventListener("DOMContentLoaded", () => {
  const destinationContainer = document.getElementById("destinations");
  const loader = document.getElementById("loader");
  const errorBox = document.getElementById("error");

  fetch("/api/destinations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch destinations");
      return res.json();
    })

      destinations.forEach((dest) => {
        const div = document.createElement("div");
        div.className = "destination-card";
        div.innerHTML = `
          <img src="${dest.image_url}" alt="Image of ${dest.name}" />
          <div class="content">
            <h3>${dest.name}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${dest.location}</p>
            <p>${dest.description}</p>
            <div class="card-footer">
              <span class="price">$${dest.price}</span>
              <a href="/destinations" class="btn primary">Learn More</a>
            </div>
          </div>
        `;
        destinationContainer.appendChild(div);
      });
    })
    .catch((err) => {
      errorBox.textContent = err.message;
      errorBox.style.display = "block";
    })
    .finally(() => {
      loader.style.display = "none";
    });
});
