const appState = {
  fridges: [
    {
      id: Date.now(),
      name: "Fridge 1",
      description: "awesome fridge",
      brand: "LG",
      price: 1234
    },
    {
      id: Date.now() + 1,
      name: "Fridge 2",
      description: "awesome fridge 2",
      brand: "Samsung",
      price: 123
    }
  ],
  brandFilter: "",
  applySorting: false,
  displayList: [],

  editFridge: null,

  searchInput: "",

  newFridgeForm: {
    name: "",
    description: "",
    price: 0,
    brand: ""
  },

  totalPrice: 0
};

window.saveFridge = function () {
  let fridge = appState.editFridge;

  let name = document.getElementById("name").value;
  let description = document.getElementById("description").value;
  let price = parseInt(document.getElementById("price").value);
  let brand = document.getElementById("brand").value;

  // Check if all fields are filled
  if (!name || !description || isNaN(price) || !brand) {
    alert("Please fill in all fields");
    return;
  }

  if (!appState.editFridge) {
    fridge = {
      id: Date.now()
    };
  }

  fridge.name = name;
  fridge.description = description;
  fridge.price = price;
  fridge.brand = brand;

  if (appState.editFridge) {
    appState.editFridge = null;
  } else {
    appState.fridges.push(fridge);
  }

  updateDisplayList();
  render();
  resetForm();
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

window.editFridge = function (id) {
  appState.editFridge = appState.fridges.find((f) => f.id === id);
  updateDisplayList();
  render();
};

window.deleteFridge = function (id) {
  appState.fridges = appState.fridges.filter((f) => f.id !== id);
  updateDisplayList();
  render();
};

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
