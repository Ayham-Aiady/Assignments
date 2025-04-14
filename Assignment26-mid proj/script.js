
const users = [];
const userForm = document.getElementById("userForm");
const table = document.getElementById("table");
const tb = table.querySelector("tbody");

class User {
    constructor(email, name, phone, gender, address) {
      this.email = email;
      this.name = name;
      this.phone = phone;
      this.gender = gender;
      this.address = address;
    }
  }




document.getElementById('userForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const g = document.querySelectorAll('input[name="gender"]');
  let gender = "";
  g.forEach(input => {
    if (input.checked) {
      gender = input.value === "1" ? "Male" : "Female";
    }
  });
  const address = document.getElementById('address').value.trim();
  const m = document.getElementById('m');

 
  const ep = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  


  if (!ep.test(email)) {
    alert("Please enter a valid email.");
    return;
  }
  const np = /^[A-Za-z\s]+$/;
  if (!np.test(name)) {
    alert("Name must be only alphabetic characters.");
    return;
  }

  const pp = /^\d{10,}$/;
  if (!pp.test(phone)) {

    alert("Phone number must be at least 10 digits.");
    return;
  }


  if (g === "") 
    {
    alert("Please select a gender.");
    return;
  }


  if (address === "") {
    alert("Address can not be empty.");
    return;
  }

  const newUser = new User(email, name, phone, gender, address);
  users.push(newUser);
 
  m.textContent = "submitted successfully!!!";
  this.reset();

  rt();
  rc();

});


function rt() {
    const tb = table.querySelector("tbody");
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


  function rc() {
    let cb = document.getElementById("uc");
    if (!cb) {
      // cb = document.createElement("div");
    
      table.parentElement.appendChild(cb);
    }
    cb.innerHTML = "";
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
      uimage.src = user.gender === "Male" ? "male-icon-32.png" : "6997662.png";
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
  