import Deck from "./deck.js";
import { roundWinner } from "./main.js";

const deck = new Deck();
// test 1
test("A new deck should contain 40 cards.", () => {
  expect(deck.drawPile.length).toBe(40);
});

// test 2
test("A shuffle function should shuffle a deck.", () => {
  const array = [1, 2, 3];
  expect(deck._shuffleCards(array)).not.toBe(array);
});

// test checking if array is modified
test("The array's contents is the same after shuffled.", () => {
  const array = [1, 2, 3];
  expect(deck._shuffleCards(array).sort()).toStrictEqual(array.sort());
});

// test 3
test("If a player with an empty draw pile tries to draw a card, the discard pile is shuffled into the draw pile.", () => {
  let emptyDeck = new Deck([1, 2, 3]);
  emptyDeck.drawPile = [];
  emptyDeck.discardPile = [1, 2, 3];
  emptyDeck._shuffleDiscardPile();
  expect(emptyDeck.drawPile.sort()).toEqual([1, 2, 3]);
});

// test 4
test("When comparing two cards, the higher card should win.", () => {
  const card1 = { value: 1, suit: "♠" };
  const card2 = { value: 2, suit: "♣" };
  expect(roundWinner(card1, card2)).toBe(card2);
});
