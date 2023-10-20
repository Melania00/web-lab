let fridges = [];
let searchFridges = [];

const saveFridge = () => {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const type = document.getElementById("type").value;
    const itemId = Date.now()
    const fridgesInfo = document.createElement("div");
    fridgesInfo.classList.add("fridges-info");
    fridgesInfo.id = itemId.toString;

    
fridgesInfo.innerHTML = `
  <h3>${name}</h3>
  <p><strong>Description:</strong> ${description}</p>
  <p><strong>Price:</strong> ${price}</p>
  <p><strong>Type:</strong> ${type}</p>
  <button type="button" class="deleteButton" onclick="deleteFridge(this.parentElement)">Delete</button>
  <button type="button" class="editButton" onclick="editFridge(${fridges.length - 1})">Edit</button>
`;
  
    
    document.getElementById("fridgesList").appendChild(fridgesInfo);

    fridges.push({
        id: itemId,
        name: name,
        description: description,
        price: price,
        type: type
    });
    
    console.log(fridges)

}

const findFridgesByBrand = () => { 
const searchBrand = document.getElementById("searchBrand");
const cancelFindFridgesButton = document.getElementById("cancelFindButton");

findFridges.addEventListener("click", () => {
  searchBrand = document.getElementById("searchBrand").value;
  const foundFridges = fridges.filter(fridge => {
      return fridge.type.toLowerCase().includes(searchBrand.toLowerCase());
  });

  renderItemsList(foundFridges, onEditItem, onRemoveItem);
});

cancelFindFridgesButton.addEventListener("click", () => {
  renderItemsList(fridges, onEditItem, onRemoveItem);

  document.getElementById("searchBrand").value = "";
});
};

const sortFridgesByPriceButton = document.getElementById("sortPriceButton")
function sortFridgesByPrice(){
const sortFridgesByPrice = () => {
    
    searchFridges = fridges.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    console.log(searchFridges)
    fridgesList = document.getElementById("fridgesList")
    console.log(fridgesList)
    fridgesList.innerHTML = "";
    console.log(fridgesList)

    searchFridges.forEach(element => {


        const fridgesInfo = document.createElement("div");
        fridgesInfo.classList.add("fridges-info");
    
        
    fridgesInfo.innerHTML = `<div id="${itemId}">
    <h3>${name}</h3>
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Price:</strong> ${price}</p>
    <p><strong>Type:</strong> ${type}</p>
    <button type="button" class="deleteButton" onclick="deleteFridge(this.parentElement)">Delete</button>
    <button type="button" class="editButton" onclick="editFridge(${fridges.length - 1})">Edit</button>
    `;
      
        
        document.getElementById("fridgesList").appendChild(fridgesInfo);
    
        fridges.push({
            id: itemId,
            name: name,
            description: description,
            price: price,
            type: type
        });
       
    });
    sortFridgesByPrice(fridges, onEditItem, onRemoveItem);
}}

function deleteFridge(element) {
element.remove();
}

function toggleAside() {
const fridgeAside = document.getElementById("fridgeAside");
fridgeAside.classList.toggle("hidden");
}

function editFridge(element) {
const nameElement = element.querySelector("h3");
const descriptionElement = element.querySelector("p:nth-child(2)");
const priceElement = element.querySelector("p:nth-child(3)");
const typeElement = element.querySelector("p:nth-child(4)");

const newName = prompt("Edit Name:", nameElement.textContent);
const newDescription = prompt("Edit Description:", descriptionElement.textContent.replace("Description: ", ""));
const newPrice = prompt("Edit Price:", priceElement.textContent.replace("Price: ", ""));
const newType = prompt("Edit Type:", typeElement.textContent.replace("Type: ", ""));

if (newName !== null) {
  nameElement.textContent = newName;
}

if (newDescription !== null) {
  descriptionElement.textContent = "Description: " + newDescription;
}

if (newPrice !== null) {
  priceElement.textContent = "Price: " + newPrice;
}

if (newType !== null) {
  typeElement.textContent = "Type: " + newType;
}};


function displayFridges() {
  const fridgesList = document.getElementById("fridgesList");
  fridgesList.innerHTML = '';

  fridges.forEach((fridge) => {
      const fridgesInfo = document.createElement('div');
      fridgesInfo.id = fridge.id;
      fridgesInfo.innerHTML = `
          <h3>${fridge.name}</h3>
          <p><strong>Description:</strong> ${fridge.description}</p>
          <p><strong>Price:</strong> ${fridge.price}</p>
          <p><strong>Type:</strong> ${fridge.type}</p>
          <button type="button" class="deleteButton" onclick="deleteFridge(this.parentElement)">Delete</button>
          <button type="button" class="editButton" onclick="editFridge(this.parentElement)">Edit</button>
      `;

      fridgesList.appendChild(fridgesInfo);
  });
}