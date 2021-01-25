import Deck from "./deck.js";

export default class Game {
  constructor() {
    this.tiePile = [];
    this.playerHand = {
      "player-1": [],
      "player-2": [],
    };
    this.discardPile = {
      "player-1": [],
      "player-2": [],
    };
    this.init();
  }
  init() {
    let deck = new Deck();
    return deck.fullSuit();
  }
  //
  // split the decks
  // pick the top card
  // advance a round
  //

  // compare the cards
  //   isRoundWinner(cardOne, cardTwo) {
  //     return cardOne.value > cardTwo.value;
  //   }

  //   isGameOver(deck) {
  //     return deck.cards.length === 0 && deck.discardPile.length === 0;
  //   }
}
