var mistakes = 0;
var cardList = [
  "cucaracha",
  "shinola",
  "godweensatan",
  "mollusk",
  "guava",
  "quebec",
  "whitepepper",
  "countrygreats",
];

var cardSet;
var board = [];
const rows = 4;
const columns = 4;

var card1Select;
var card2Select;

window.onload = function () {
  shuffleCards();
  startGame();
};

function shuffleCards() {
  cardSet = cardList.concat(cardList);

  for (let i = 0; i < cardSet.length; i++) {
    let j = Math.floor(Math.random() * cardSet.length);

    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let cardImg = cardSet.pop();
      row.push(cardImg);

      let card = document.createElement("img");
      card.id = r.toString() + "-" + c.toString();
      card.src = cardImg + ".jpg";
      card.classList.add("card");
      card.addEventListener("click", selectCard);
      document.getElementById("board").append(card);
    }
    board.push(row);
  }
  setTimeout(hideCard, 0);
}

function hideCard() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(r.toString() + "-" + c.toString());
      card.src = "genedean.png";
    }
  }
}

function selectCard() {
  if (this.src.includes("genedean")) {
    if (!card1Select) {
      card1Select = this;

      let coords = card1Select.id.split("-");
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card1Select.src = board[r][c] + ".jpg";
    } else if (!card2Select && this != card1Select) {
      card2Select = this;

      let coords = card2Select.id.split("-");
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card2Select.src = board[r][c] + ".jpg";
      setTimeout(update, 1000);
    }
  }
}

function update() {
  if (card1Select.src != card2Select.src) {
    card1Select.src = "genedean.png";
    card2Select.src = "genedean.png";
    mistakes += 1;
    document.getElementById("mistakes").innerText = mistakes;
  }

  card1Select = null;
  card2Select = null;
}
