// Scroll-to-top button logic
window.onscroll = function () {
  document.getElementById("scrollTopBtn").style.display = window.scrollY > 300 ? "block" : "none";
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// AOS animation init
AOS.init({ duration: 800 });

// Contact form submission
const form = document.querySelector(".contact-form");

if (form) {
  // Create popup element
  const popup = document.createElement("div");
  popup.id = "popupMessage";
  popup.style.position = "relative";
  popup.style.marginTop = "10px";
  popup.style.padding = "12px 16px";
  popup.style.borderRadius = "8px";
  popup.style.fontSize = "0.9rem";
  popup.style.display = "none";
  popup.style.transition = "opacity 0.3s ease";
  form.appendChild(popup); // Add below the form

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    try {
      const response = await fetch("https://backend-razorcodes-portfolio.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();
      if (response.ok) {
        form.reset();
        popup.textContent = "✅ Thank you for reaching us. We're available now and will message you in an hour.";
        popup.style.backgroundColor = "#d4edda";
        popup.style.color = "#155724";
        popup.style.display = "block";
        setTimeout(() => (popup.style.display = "none"), 5000);
      } else {
        popup.textContent = "❌ " + result.error;
        popup.style.backgroundColor = "#f8d7da";
        popup.style.color = "#721c24";
        popup.style.display = "block";
      }
    } catch (err) {
      popup.textContent = "❌ Failed to send message. Check your internet or Try Again Later.";
      popup.style.backgroundColor = "#f8d7da";
      popup.style.color = "#721c24";
      popup.style.display = "block";
    }
  });
}
