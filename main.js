import Deck from "./deck.js";

let player1Deck, player2Deck;
let tiePile = [];
let gameOver = false;

function startGame() {
  const deck = new Deck();
  console.log("starting");
  deck.shuffleCards(deck.cards);
  const deckMidPoint = Math.ceil(deck.numberOfCards / 2);
  player1Deck = new Deck(deck.cards.slice(0, deckMidPoint));
  player2Deck = new Deck(deck.cards.slice(deckMidPoint, deck.cards.length));
  while (!gameOver) {
    flipCards();
  }
}

startGame();

function flipCards() {
  if (isGameOver(player1Deck)) {
    console.log("Player 2 wins the game!");
    gameOver = true;
    return "Player 2 wins the game!";
  } else if (isGameOver(player2Deck)) {
    console.log("Player 1 wins the game!");
    gameOver = true;
    return "Player 1 wins the game!";
  }
  let player1Card;
  let player2Card;
  if (player1Deck.hasCards() && player2Deck.hasCards()) {
    player1Card = player1Deck.cards.shift();
    player2Card = player2Deck.cards.shift();
  } else {
    if (!player1Deck.hasCards() && player1Deck.hasDiscartedCards()) {
      player1Deck.shuffleCards(player1Deck.discardPile);
      player1Deck.discardPile.forEach((card) => player1Deck.cards.push(card));
      player1Deck.discardPile = [];
    }
    if (!player2Deck.hasCards() && player2Deck.hasDiscartedCards()) {
      player2Deck.shuffleCards(player2Deck.discardPile);
      player2Deck.discardPile.forEach((card) => player2Deck.cards.push(card));
      player2Deck.discardPile = [];
    }
    player1Card = player1Deck.cards.shift();
    player2Card = player2Deck.cards.shift();
  }
  console.log(
    `Player 1 (${
      player1Deck.cards.length + player1Deck.discardPile.length + 1
    } cards): ${player1Card.value}${player1Card.suit}`
  );
  console.log(
    `Player 2 (${
      player2Deck.cards.length + player2Deck.discardPile.length + 1
    } cards): ${player2Card.value}${player2Card.suit}`
  );
  if (isRoundWinner(player1Card, player2Card)) {
    console.log("Player 1 wins this round");
    if (tiePile.length > 0) {
      tiePile.forEach((card) => player1Deck.discardPile.push(card));
      tiePile = [];
    }
    player1Deck.discardPile.push(player1Card, player2Card);
  } else if (isRoundWinner(player2Card, player1Card)) {
    console.log("Player 2 wins this round");
    if (tiePile.length > 0) {
      tiePile.forEach((card) => player2Deck.discardPile.push(card));
      tiePile = [];
    }
    player2Deck.discardPile.push(player1Card, player2Card);
  } else {
    console.log("No winner in this round");
    tiePile.push(player1Card, player2Card);
  }
}

function isRoundWinner(cardOne, cardTwo) {
  return cardOne.value > cardTwo.value;
}

function isGameOver(deck) {
  return deck.cards.length === 0 && deck.discardPile.length === 0;
}