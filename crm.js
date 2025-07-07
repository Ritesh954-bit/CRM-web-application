let customers = [];
let editIndex = null;

const form = document.getElementById("customerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const tableBody = document.getElementById("customerTableBody");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    alert("Both fields are required.");
    return;
  }

  const customer = { name, email };

  if (editIndex === null) {
    customers.push(customer); // CREATE
  } else {
    customers[editIndex] = customer; // UPDATE
    editIndex = null;
  }

  form.reset();
  renderTable();
});

function renderTable() {
  tableBody.innerHTML = "";

  customers.forEach((cust, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${cust.name}</td>
      <td>${cust.email}</td>
      <td>
        <button onclick="editCustomer(${index})">Edit</button>
        <button onclick="deleteCustomer(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function editCustomer(index) {
  const cust = customers[index];
  nameInput.value = cust.name;
  emailInput.value = cust.email;
  editIndex = index;
}

function deleteCustomer(index) {
  if (confirm("Are you sure you want to delete this customer?")) {
    customers.splice(index, 1); //delete
    renderTable();
  }
}

renderTable(); // initial call
