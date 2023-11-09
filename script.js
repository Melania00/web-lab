const appState = {
  fridges: [],
  brandFilter: "",
  applySorting: false,
  displayList: [],

  editFridge: null,

  searchInput: "",

  totalPrice: 0
};

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("brand").value = "";
}

function updateDisplayList() {
  appState.displayList = [...appState.fridges];

  if (appState.brandFilter) {
    appState.displayList = appState.fridges.filter((f) =>
      f.brand.toLowerCase().includes(appState.brandFilter.toLocaleLowerCase())
    );
  }

  if (appState.applySorting) {
    appState.displayList = appState.displayList.sort(
      (a, b) => a.price - b.price
    );
  }
}

function render() {
  const fridgesContainer = document.getElementById("fridgesList");
  fridgesContainer.innerHTML = "";

  const formTitle = document.getElementById("fridgeFormTitle");
  if (appState.editFridge !== null) {
    formTitle.innerHTML = "Edit Fridge";
    document.getElementById("name").value = appState.editFridge.name;
    document.getElementById("description").value =
      appState.editFridge.description;
    document.getElementById("price").value = appState.editFridge.price;
    document.getElementById("brand").value = appState.editFridge.brand;
  } else {
    formTitle.innerHTML = "New Fridge";
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = 0;
    document.getElementById("brand").value = null;
  }

  appState.displayList.forEach((fridge) => {
    const fridgeDiv = document.createElement("div");
    fridgeDiv.classList.add("fridges-info");
    fridgeDiv.id = fridge.id;
    fridgeDiv.innerHTML = `
      <h3>${fridge.name}</h3>
      <p><strong>Description:</strong> ${fridge.description}</p>
      <p><strong>Price:</strong> ${fridge.price}</p>
      <p><strong>Type:</strong> ${fridge.brand}</p>
      <button type="button" class="deleteButton" onclick="deleteFridge(${fridge.id})">Delete</button>
      <button type="button" class="editButton" onclick="editFridge(${fridge.id})">Edit</button>
    `;
    fridgesContainer.appendChild(fridgeDiv);
  });
}

window.sortFridgesByPrice = function () {
  appState.applySorting = !appState.applySorting;
  updateDisplayList();
  render();
};

window.applyFilters = function () {
  appState.brandFilter = document.getElementById("searchBrand").value;
  updateDisplayList();
  render();
};

window.resetFilters = function () {
  document.getElementById("searchBrand").value = appState.brandFilter = "";
  updateDisplayList();
  render();
};

window.calculateTotal = function () {
  appState.totalPrice = appState.displayList.reduce((t, f) => f.price + t, 0);
  document.getElementById("totalPrice").innerText = appState.totalPrice;
};

updateDisplayList();
render();

// Helper function to fetch fridges from the server
function fetchFridges() {
  fetch('/api/fridges')
    .then(response => response.json())
    .then(data => {
      appState.fridges = data;
      updateDisplayList();
      render();
    })
    .catch(error => console.error('Error fetching fridges:', error));
}

window.saveFridge = function () {
  let fridge = appState.editFridge;

  let name = document.getElementById("name").value;
  let description = document.getElementById("description").value;
  let price = parseFloat(document.getElementById("price").value);
  let brand = document.getElementById("brand").value;

  // Check if all fields are filled
  if (!name || !description || isNaN(price) || !brand) {
    alert("Please fill in all fields");
    return;
  }

  const fridgeData = { name, description, price, brand };

  if (fridge) {
    // Update an existing fridge
    fetch(`/api/fridges/${fridge.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fridgeData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      resetForm();
      fetchFridges();
      appState.editFridge = null;
    })
    .catch(error => console.error('Error updating fridge:', error));
  } else {
    // Create a new fridge
    fetch('/api/fridges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fridgeData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchFridges();
    })
    .catch(error => console.error('Error creating fridge:', error));
  }

  resetForm();
};

window.deleteFridge = function (id) {
  fetch(`/api/fridges/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    fetchFridges();
  })
  .catch(error => console.error('Error deleting fridge:', error));
};

window.editFridge = function (id) {
  const fridge = appState.fridges.find(f => f.id === id);
  appState.editFridge = fridge;
  document.getElementById("name").value = fridge.name;
  document.getElementById("description").value = fridge.description;
  document.getElementById("price").value = fridge.price;
  document.getElementById("brand").value = fridge.brand;
  render();
};

// Call fetchFridges on initial load to populate the list
fetchFridges();
