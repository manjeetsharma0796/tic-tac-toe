class ControlGame {
  #turn;

  constructor() {
    this.#turn = 0;
  }
  hasWon(){}

  allPositionsNotFilled(position) {
    return (Object.entries(position).some((characterValue) => {
      const [character, value] = characterValue;
      return value === ' ';
    }))
  } 

  updatePosition(position, positionPressed) {
    if (position[positionPressed] === ' ') {
      if ((this.#turn % 2) === 0) {
        position[positionPressed] = 'x';
      } else {
        position[positionPressed] = 'o';
      }
      this.#incrementTurnCount();
    }
  }

  #incrementTurnCount() {

    this.#turn += 1;
  }
}

exports.ControlGame = ControlGame;