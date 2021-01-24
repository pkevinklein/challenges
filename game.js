class Game {
  constructor() {}
  //
  // split the decks
  // pick the top card
  // advance a round
  //

  // compare the cards
  isRoundWinner(cardOne, cardTwo) {
    return cardOne.value > cardTwo.value;
  }

  isGameOver(deck) {
    return deck.cards.length === 0 && deck.discardPile.length === 0;
  }
}
