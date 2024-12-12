let collection = [];
let favorites = [];

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

function createCard(item, isFavorite = false) {
  const card = document.createElement("div");
  card.classList.add(isFavorite ? "favorite-card" : "card");
  card.innerHTML = `
    <img src="${item.img}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>Level: ${item.level}</p>
    <button onclick="${
      isFavorite
        ? `removeFromFavorites('${item.name}')`
        : `addToFavorites('${item.name}')`
    }">
      ${isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  `;
  return card;
}

function displayCollection() {
  const collectionContainer = document.getElementById("collection");
  collectionContainer.innerHTML = "";

  collection.forEach((item) => {
    const card = createCard(item);
    collectionContainer.appendChild(card);
  });

  displaySum();
}

function displayFavorites() {
  const favoritesContainer = document.getElementById("favorites");
  favoritesContainer.innerHTML = "";

  favorites.forEach((item) => {
    const card = createCard(item, true);
    favoritesContainer.appendChild(card);
  });
}

function toggleFavorite(name, isAdding) {
  const source = isAdding ? collection : favorites;
  const target = isAdding ? favorites : collection;

  const item = source.find((i) => i.name === name);
  if (item) {
    target.push(item);
    source.splice(source.indexOf(item), 1);
    displayCollection();
    displayFavorites();
  }
}

function addToFavorites(name) {
  toggleFavorite(name, true);
}

function removeFromFavorites(name) {
  toggleFavorite(name, false);
}

function toggleSort() {
  collection = collection.reverse();
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

fetchData();

function displaySumFav() {
  const sumFavs = document.getElementById("sumFav");
  sumFavs.innerHTML = `Total Favorite Digimon in Favorites: ${favorites.length}`;
}
