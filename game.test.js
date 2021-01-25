import Deck from "./deck.js";
import { isRoundWinner, flipCards } from "./main.js";
const deck = new Deck();
// test 1
test("A new deck should contain 40 cards.", () => {
  expect(deck.cards.length).toBe(40);
});

// test 2
test("A shuffle function should shuffle a deck.", () => {
  const array = [1, 2, 3];
  console.log(deck._shuffleCards(array));
  expect(deck._shuffleCards(array)).not.toBe(array);
});

// test if array is modified
test("The array's contents is the same after shuffled.", () => {
  const array = [1, 2, 3];
  expect(deck._shuffleCards(array).sort()).toStrictEqual(array.sort());
});

// test 3
test("If a player with an empty draw pile tries to draw a card, the discard pile is shuffled into the draw pile.", () => {
  deck.drawPile = [];
  deck.discardPile = [1, 2, 3];
  flipCards();
  expect(deck.drawPile).toEqual([1, 2, 3]);
});

// test 4

// test 5
