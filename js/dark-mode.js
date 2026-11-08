document.addEventListener("DOMContentLoaded", function () {
  // Create the button
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "dark-mode-toggle";
  toggleBtn.style.position = "fixed";
  toggleBtn.style.bottom = "10px";
  toggleBtn.style.right = "10px";
  toggleBtn.style.zIndex = 9999;
  toggleBtn.style.width = "40px";
  toggleBtn.style.height = "40px";
  toggleBtn.style.border = "none";
  toggleBtn.style.borderRadius = "50%";
  toggleBtn.style.fontSize = "1.2em";
  toggleBtn.style.display = "flex";
  toggleBtn.style.alignItems = "center";
  toggleBtn.style.justifyContent = "center";
  toggleBtn.style.cursor = "pointer";
  toggleBtn.style.transition = "all 0.3s ease";
  toggleBtn.style.backgroundColor = "transparent"; // light-theme background
  toggleBtn.style.color = "#333"; // light-theme icon color

  // Create the Font Awesome icon
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-moon"; // start with the moon
  toggleBtn.appendChild(icon);

  // Add it to the page
  document.body.appendChild(toggleBtn);

  // Dark Mode CSS
  const darkStyle = document.getElementById("dark-mode-style");

  // Restore the last saved state
  const saved = localStorage.getItem("darkMode");
  if (saved === "true") {
    darkStyle.disabled = false;
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    toggleBtn.style.backgroundColor = "#343541";
    toggleBtn.style.color = "#f8f8f2";
  }

  // Toggle on click
  toggleBtn.addEventListener("click", function () {
    darkStyle.disabled = !darkStyle.disabled;
    localStorage.setItem("darkMode", !darkStyle.disabled);

    if (darkStyle.disabled) {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      toggleBtn.style.backgroundColor = "#eee";
      toggleBtn.style.color = "#333";
    } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      toggleBtn.style.backgroundColor = "#343541";
      toggleBtn.style.color = "#f8f8f2";
    }
  });

  // Hover animation
  toggleBtn.addEventListener("mouseover", () => {
    toggleBtn.style.transform = "rotate(15deg)";
  });
  toggleBtn.addEventListener("mouseout", () => {
    toggleBtn.style.transform = "rotate(0deg)";
  });
});
