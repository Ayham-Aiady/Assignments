const users = [];
const userForm = document.getElementById("userForm");
const table = document.getElementById("table");
const tb = table.querySelector("tbody");

// User class
class User {
  constructor(email, name, phone, gender, address) {
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.gender = gender;
    this.address = address;
  }
}

// 🔥 Load existing users on page load
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:4000/users");

    response.data.forEach(user => {
      users.push(new User(
        user.email,
        user.name,
        user.phonenumber, // match the backend column name
        user.gender,
        user.address
      ));
    });

    rt(); // Render table
    rc(); // Render cards

  } catch (error) {
    console.error("❌ Failed to load users:", error);
    alert("Could not load users from server.");
  }
});

// Form submit
document.getElementById('userForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  const m = document.getElementById('m');

  let gender = "";
  genderInputs.forEach(input => {
    if (input.checked) {
      gender = input.value === "1" ? "male" : "female";
    }
  });

  // Validation
  const ep = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const np = /^[A-Za-z\s]+$/;
  const pp = /^\d{10,}$/;

  if (!ep.test(email)) return alert("Please enter a valid email.");
  if (!np.test(name)) return alert("Name must be only alphabetic characters.");
  if (!pp.test(phone)) return alert("Phone number must be at least 10 digits.");
  if (gender === "") return alert("Please select a gender.");
  if (address === "") return alert("Address can not be empty.");

  try {
    const response = await axios.post("/api/users", {
      email,
      name,
      phoneNumber: phone,
      address,
      gender
    });

    alert("User submitted successfully!");
    users.push(new User(email, name, phone, gender, address));
    rt();
    rc();
    this.reset();
    m.textContent = "Submitted successfully!!!";

  } catch (error) {
    console.error("❌ Submission error:", error);
    alert("Failed to submit user. Please try again.");
  }
});

// Render table
function rt() {
  tb.innerHTML = "";
  users.forEach((user) => {
    const row = tb.insertRow();
    const cells = [user.email, user.name, user.phone, user.gender, user.address];
    cells.forEach((text) => {
      const cell = row.insertCell();
      cell.textContent = text;
    });
  });
}

// Render cards
function rc() {
  let cb = document.getElementById("uc");
  cb.innerHTML = ""; // Clear previous

  users.forEach(user => {
    const card = document.createElement("div");
    card.style.border = "1px solid #ccc";
    card.style.borderRadius = "8px";
    card.style.padding = "1rem";
    card.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
    card.style.width = "250px";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";

    const uimage = document.createElement("img");
    uimage.src = user.gender === "male" ? "male-icon-32.png" : "6997662.png";
    uimage.alt = `${user.gender} avatar`;
    uimage.style.width = "80px";
    uimage.style.height = "80px";
    uimage.style.borderRadius = "50%";
    uimage.style.marginBottom = "1rem";

    card.appendChild(uimage);
    card.innerHTML += `
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Gender:</strong> ${user.gender}</p>
      <p><strong>Address:</strong> ${user.address}</p>
    `;

    cb.appendChild(card);
    card.classList.add("user-card");
  });
}
