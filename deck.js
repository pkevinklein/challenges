const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const suits = ["♠", "♣", "♥", "♦"];

export default class Deck {
  constructor(cards = fullSuit()) {
    this.cards = cards;
    this.discardPile = [];
    this.numberOfCards = this.cards.length;
  }
  shuffleCards() {
    this.cards = this._shuffleCards(this.cards);
  }
  numberOfCards() {
    return this.cards.length;
  }
  _shuffleCards([...cards]) {
    for (let i = cards.length - 1; i >= 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = cards[newIndex];
      cards[newIndex] = cards[i];
      cards[i] = oldValue;
    }
    return cards;
  }
  hasCards() {
    return this.cards.length > 0;
  }
  hasDiscartedCards() {
    return this.discardPile.length > 0;
  }
}

class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }
}

function fullSuit() {
  return suits.flatMap((suit) => {
    return values.map((value) => new Card(value, suit));
  });
}
