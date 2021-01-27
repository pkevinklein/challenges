import Deck from "./deck.js";

let deckPlayer1, deckPlayer2;
let tiePile = [];
let gameOver = false;

export function startGame() {
  const deck = new Deck();
  console.log("starting");
  deck.shuffleCards();
  const deckMidPoint = Math.ceil(deck.drawPile.length / 2);
  deckPlayer1 = new Deck(deck.drawPile.slice(0, deckMidPoint));
  deckPlayer2 = new Deck(
    deck.drawPile.slice(deckMidPoint, deck.drawPile.length)
  );
  while (!gameOver) {
    flipCards();
  }
}

// startGame();

export function flipCards() {
  if (isGameOver(deckPlayer1)) {
    console.log("Player 2 wins the game!");
    gameOver = true;
    return "Player 2 wins the game!";
  } else if (isGameOver(deckPlayer2)) {
    console.log("Player 1 wins the game!");
    gameOver = true;
    return "Player 1 wins the game!";
  }
  let player1Card;
  let player2Card;
  if (deckPlayer1.hasCards() && deckPlayer2.hasCards()) {
    player1Card = deckPlayer1.drawPile.shift();
    player2Card = deckPlayer2.drawPile.shift();
  } else {
    if (!deckPlayer1.hasCards() && deckPlayer1.hasDiscartedCards()) {
      deckPlayer1._shuffleDiscardPile();
    }
    if (!deckPlayer2.hasCards() && deckPlayer2.hasDiscartedCards()) {
      deckPlayer2._shuffleDiscardPile();
    }
    player1Card = deckPlayer1.drawPile.shift();
    player2Card = deckPlayer2.drawPile.shift();
  }
  console.log(
    `Player 1 (${
      deckPlayer1.drawPile.length + deckPlayer1.discardPile.length + 1
    } cards): ${player1Card.value}${player1Card.suit}`
  );
  console.log(
    `Player 2 (${
      deckPlayer2.drawPile.length + deckPlayer2.discardPile.length + 1
    } cards): ${player2Card.value}${player2Card.suit}`
  );
  if (roundWinner(player1Card, player2Card)) {
    console.log("Player 1 wins this round");
    if (tiePile.length > 0) {
      getsTiePile(deckPlayer1);
    }
    deckPlayer1.discardPile.push(player1Card, player2Card);
  } else if (roundWinner(player2Card, player1Card)) {
    console.log("Player 2 wins this round");
    if (tiePile.length > 0) {
      getsTiePile(deckPlayer2);
    }
    deckPlayer2.discardPile.push(player1Card, player2Card);
  } else {
    console.log("No winner in this round");
    tiePile.push(player1Card, player2Card);
  }
}

export function roundWinner(cardOne, cardTwo) {
  if (cardOne.value > cardTwo.value) {
    return cardOne;
  } else if (cardOne.value < cardTwo.value) {
    return cardTwo;
  } else {
    return false;
  }
}

export function isGameOver(deck) {
  return deck.drawPile.length === 0 && deck.discardPile.length === 0;
}

export function getsTiePile(playerDeck) {
  tiePile.forEach((card) => playerDeck.discardPile.push(card));
  tiePile = [];
  return playerDeck;
}
