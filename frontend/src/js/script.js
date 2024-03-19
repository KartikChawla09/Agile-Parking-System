function showLoginPage() {
  document.getElementById("loginPage").style.display = "block";
  document.getElementById("registerPage").style.display = "none";
}

// Function to show the register page
function showRegisterPage() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("registerPage").style.display = "block";
}

// Function to handle login form submission
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    // Send login request to backend
    fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid username or password");
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful login (e.g., redirect to dashboard)
        console.log("Login successful", data);
        window.location.href = "dashboard.html"; // Change to your desired URL
      })
      .catch((error) => {
        // Handle login error
        console.error("Login failed:", error.message);
      });
  });

// Function to handle register form submission
document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const registerUsername = document.getElementById("registerUsername").value;
    const registerPassword = document.getElementById("registerPassword").value;

    // Send register request to backend
    fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registerUsername,
        password: registerPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Registration failed");
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful registration (e.g., show success message)
        console.log("Registration successful", data);
        window.location.href = "dashboard.html"; // Change to your desired URL
      })
      .catch((error) => {
        // Handle registration error
        console.error("Registration failed:", error.message);
      });
  });
