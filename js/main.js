let collection = [];
let favorites = [];
let isSortedAsc = true;

async function fetchData() {
  try {
    const response = await fetch("https://digimon-api.vercel.app/api/digimon");
    const data = await response.json();
    collection = data.slice(0, 30);
    displayCollection();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayCollection() {
  const collectionContainer = document.getElementById("collection");
  collectionContainer.innerHTML = "";

  collection.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Level: ${item.level}</p>
      <button onclick="addToFavorites('${item.name}')">Add to Favorites</button>
    `;
    collectionContainer.appendChild(card);
  });

  displaySum();
  displaySumFav();
}

function displayFavorites() {
  const favoritesContainer = document.getElementById("favorites");
  favoritesContainer.innerHTML = "";

  favorites.forEach((item) => {
    const favoriteItem = document.createElement("div");
    favoriteItem.classList.add("favorite-item");
    favoriteItem.innerHTML = `
      <div class="favorite-card">
        <img src="${item.img}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>Level: ${item.level}</p>
        <button onclick="removeFromFavorites('${item.name}')">Remove from Favorites</button>
      </div>
    `;
    favoritesContainer.appendChild(favoriteItem);
  });
}

function addToFavorites(name) {
  const item = collection.find((i) => i.name === name);
  if (item) {
    favorites.push(item);
    collection = collection.filter((i) => i.name !== name);
    displayCollection();
    displayFavorites();
  }
}

function removeFromFavorites(name) {
  const item = favorites.find((i) => i.name === name);
  if (item) {
    collection.push(item);
    favorites = favorites.filter((i) => i.name !== name);
    displayCollection();
    displayFavorites();
  }
}

function toggleSort() {
  isSortedAsc = !isSortedAsc;
  collection = isSortedAsc
    ? collection.sort((a, b) => a.name.localeCompare(b.name))
    : collection.sort((a, b) => b.name.localeCompare(a.name));
  displayCollection();
}

function displaySum() {
  const levels = [
    "Fresh",
    "In Training",
    "Rookie",
    "Champion",
    "Armor",
    "Ultimate",
    "Mega",
  ];
  const levelCount = levels.reduce((acc, level) => {
    acc[level] = collection.filter((item) => item.level === level).length;
    return acc;
  }, {});

  const sumElement = document.getElementById("sum");
  sumElement.innerHTML = `
    Fresh: ${levelCount["Fresh"]} | 
    In Training: ${levelCount["In Training"]} | 
    Rookie: ${levelCount["Rookie"]} | 
    Champion: ${levelCount["Champion"]} | 
    Armor: ${levelCount["Armor"]} | 
    Ultimate: ${levelCount["Ultimate"]} | 
    Mega: ${levelCount["Mega"]}
  `;
}

function displaySumFav() {
  const levels = [
    "Fresh",
    "In Training",
    "Rookie",
    "Champion",
    "Armor",
    "Ultimate",
    "Mega",
  ];
  const levelCount = levels.reduce((acc, level) => {
    acc[level] = favorites.filter((item) => item.level === level).length;
    return acc;
  }, {});

  const sumElement = document.getElementById("sumFav");
  sumElement.innerHTML = `
    Fresh: ${levelCount["Fresh"]} | 
    In Training: ${levelCount["In Training"]} | 
    Rookie: ${levelCount["Rookie"]} | 
    Champion: ${levelCount["Champion"]} | 
    Armor: ${levelCount["Armor"]} | 
    Ultimate: ${levelCount["Ultimate"]} | 
    Mega: ${levelCount["Mega"]}
  `;
}

function sortFavorites() {
  isSortedAsc = !isSortedAsc;
  favorites = isSortedAsc
    ? favorites.sort((a, b) => a.name.localeCompare(b.name))
    : favorites.sort((a, b) => b.name.localeCompare(a.name));
  displayFavorites();
}

fetchData();
