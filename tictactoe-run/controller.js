const { EventEmitter } = require('events');

class ControlGame extends EventEmitter {
  #turn;

  constructor(position) {
    super();
    this.#turn = 0;
    this.position = position;
    this.someoneWon = false;
  }
  
  hasWon() {
    if (this.#isHorizontalCharSame() || 
    this.#isVerticalCharSame() || 
    this.#isDiagonalCharSame()) {
      this.someoneWon = true;
      return true;
    }
  }

  #isHorizontalCharSame() {
    const { q, w, e, a, s, d, z, x, c } = this.position;
    switch (true) {
      case (q === w && q === e && q !== ' '): return true;
      case (a === s && a === d && a !== ' '): return true;
      case (z === x && z === c && z !== ' '): return true;
      default: return false;
    }
  }

  #isVerticalCharSame() {
    const { q, w, e, a, s, d, z, x, c } = this.position;
    switch (true) {
      case (q === a && q === z && q !== ' '): return true;
      case (w === s && w === x && w !== ' '): return true;
      case (e === d && e === c && e !== ' '): return true;
      default: return false;
    }
  }

  #isDiagonalCharSame() {
    const { q, w, e, a, s, d, z, x, c } = this.position;
    switch (true) {
      case (q === s && q === c && q !== ' '): return true;
      case (e === s && e === z && e !== ' '): return true;
      default: return false;
    }
  }

  allPositionsNotFilled() {
    return (Object.entries(this.position).some((characterValue) => {
      const [_, value] = characterValue;
      return value === ' ';
    }))
  }

  updatePosition(positionPressed) {
    if (this.position[positionPressed] === ' ') {
      if ((this.#turn % 2) === 0) {
        this.position[positionPressed] = 'x';
      } else {
        this.position[positionPressed] = 'o';
      }
      this.emit('validMove', positionPressed);
      this.#incrementTurnCount();
    }
  }

  #incrementTurnCount() {
    this.#turn += 1;
  }
}

exports.ControlGame = ControlGame;