const appState = {
  fridges: [
    {
      id: Date.now(),
      name: "Fridge 1",
      description: "awesome fridge",
      brand: "LG",
      price: 1234,
    },
    {
      id: Date.now()+1,
      name: "Fridge 2",
      description: "awesome fridge 2",
      brand: "Samsung",
      price: 123,
    }
  ],
  showSearchResults: false,
  searchResults: [],

  editFridge: null,

  searchInput: "",

  newFridgeForm: {
    name: "",
    description: "",
    price: 0,
    brand: "",
  }
}

function saveFridge() {
  let fridge = appState.editFridge;
  if (!appState.editFridge) {
    fridge = {
      id: Date.now()
    }
  }

  fridge.name = document.getElementById("name").value;
  fridge.description = document.getElementById("description").value;
  fridge.price = parseInt(document.getElementById("price").value);
  fridge.brand = document.getElementById("brand").value;

  if (appState.editFridge) {
    appState.editFridge = null;
  } else {
    appState.fridges.push(fridge);
  }

  render()
}

function render() {
  const fridgesContainer = document.getElementById("fridgesList")
  fridgesContainer.innerHTML = '';

  let displayList = appState.fridges;
  if (appState.showSearchResults) {
    displayList = appState.searchResults;
  }

  const formTitle = document.getElementById("fridgeFormTitle")
  if (appState.editFridge !== null) {
    formTitle.innerHTML = `Edit Fridge`
    document.getElementById("name").value = appState.editFridge.name;
    document.getElementById("description").value = appState.editFridge.description;
    document.getElementById("price").value = appState.editFridge.price;
    document.getElementById("brand").value = appState.editFridge.brand;
  } else {
    formTitle.innerHTML = `New Fridge`
    document.getElementById("name").value = '';
    document.getElementById("description").value = '';
    document.getElementById("price").value = 0;
    document.getElementById("brand").value = null;
  }

  displayList.forEach((fridge) => {
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
  })

  const totalPriceDiv = document.getElementById("totalPrice")
  let sum = 0;
  for (let i = 0; i < appState.fridges.length; i++) {
    sum += appState.fridges[i].price;
  }

  totalPriceDiv.innerHTML = `Total price of all available fridges: ${sum}`;
}

function editFridge(id) {
  appState.editFridge = appState.fridges.find(f => f.id === id);
  render();
}

function deleteFridge(id) {
  const idx = appState.fridges.findIndex(f => f.id === id);
  appState.fridges.splice(idx, 1)

  render();
}

function sortFridgesByPrice() {
  appState.fridges.sort((a, b) => a.price - b.price);
  render();
}

function applyFilters() {
  const brandFilter = document.getElementById("searchBrand").value;

  appState.showSearchResults = true;
  appState.searchResults = appState.fridges.filter(f => f.brand === brandFilter);

  render();
}

function resetFilters() {
  appState.showSearchResults = false;
  render();
}

render();
