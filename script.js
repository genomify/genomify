let originalCardList; // Store the original list of cards
let selectedCardTitle; // Store the title of the selected card

fetch('data/data.json')
  .then(response => response.json())
  .then(data => {
    originalCardList = data; // Store the original list of cards
    displayCards(data);
  });

function displayCards(data) {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.innerHTML = ''; // Clear previous cards

  data.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.title = item.title; // Set the title as a dataset attribute
    card.addEventListener('click', () => showCardDetails(item, data));

    const image = document.createElement('img');
    image.src = `images/${item.image}`;
    image.alt = item.title;
    image.classList.add('card-image'); // Add a CSS class for styling
    card.appendChild(image);

    const title = document.createElement('h3');
    title.textContent = item.title;
    card.appendChild(title);

    cardContainer.appendChild(card);
  });

  // Scroll to the previously selected card
  if (selectedCardTitle) {
    const selectedCard = document.querySelector(`.card[data-title="${selectedCardTitle}"]`);
    if (selectedCard) {
      selectedCard.scrollIntoView();
    }
  }
}

function showCardDetails(item, data) {
  // Store the title of the selected card
  selectedCardTitle = item.title;

  // Hide the card list view
  const cardContainer = document.querySelector('.card-container');
  cardContainer.style.display = 'none';

  // Add a CSS class to the body element
  document.body.classList.add('show-card-details');

  // Create the card details view
  const cardDetails = document.createElement('div');
  cardDetails.className = 'card-details';

  const title = document.createElement('h2');
  title.textContent = item.title;
  cardDetails.appendChild(title);

  const image = document.createElement('img');
  image.src = `images/${item.image}`;
  image.alt = item.title;
  image.classList.add('card-details-image'); // Add a CSS class for styling
  cardDetails.appendChild(image);

  const text = document.createElement('p');
  text.textContent = item.text;
  cardDetails.appendChild(text);

  // Create a back button to return to the card list view
  const backButton = document.createElement('button');
  backButton.textContent = 'Back';
  backButton.addEventListener('click', () => {
    // Show the card list view
    cardContainer.style.display = 'grid';

    // Remove the card details view
    cardDetails.remove();

    // Remove the CSS class from the body element
    document.body.classList.remove('show-card-details');

    // Display the original list of cards
    displayCards(data);
  });
  cardDetails.appendChild(backButton);

  // Append the card details view to the document body
  document.body.appendChild(cardDetails);
}
