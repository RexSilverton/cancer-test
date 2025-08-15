const form = document.getElementById("club-form");
const message = document.getElementById("form-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  message.classList.add("hidden");

  const formData = new FormData(form);
  try {
    const response = await fetch("https://formspree.io/f/xgvzqdpb", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      form.reset();
      message.textContent = "✅ Thank you! Your submission has been received.";
      message.className = "success";
    } else {
      const data = await response.json();
      message.textContent =
        data?.errors?.[0]?.message ||
        "❌ There was a problem submitting the form.";
      message.className = "error";
    }
  } catch (error) {
    message.textContent = "❌ Network error. Please try again.";
    message.className = "error";
  } finally {
    message.classList.remove("hidden");
  }
});
