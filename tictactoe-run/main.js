const { table } = require('table');
const { ControlGame } = require('./controller');
const position = {
  q: ' ',
  w: ' ',
  e: ' ',
  a: ' ',
  s: ' ',
  d: ' ',
  z: ' ',
  x: ' ',
  c: ' ',
};

const displayBoard = (positions) => {
  const config = {
    border: {
      topBody: `─`,
      topJoin: `┬`,
      topLeft: `┌`,
      topRight: `┐`,

      bottomBody: `─`,
      bottomJoin: `┴`,
      bottomLeft: `└`,
      bottomRight: `┘`,

      bodyLeft: `│`,
      bodyRight: `│`,
      bodyJoin: `│`,

      joinBody: `─`,
      joinLeft: `├`,
      joinRight: `┤`,
      joinJoin: `┼`
    }
  };

  const { q,w,e,a,s,d,z,x,c} = position;

  const data = [
    [q, w, e],
    [a, s, d],
    [z, x, c]
  ];
  console.log(table(data, config));
};

const displayWinMessage = () => {
  process.stdout.write('won by someone');
};

startStdin = () => {
  process.stdin.setEncoding('utf-8');
  process.stdin.setRawMode(true);
};

const stopStdin = () => {
  process.stdin.pause();
};

const watchStdin = (isEOI, controller, position) => {
  startStdin();

  process.stdin.on('data', (keyPressed) => {
    console.clear();
    if (isEOI(keyPressed)) {
      stopStdin();
      // onEnd();
      return;
    }
    controller.updatePosition(position, keyPressed);
    if(controller.hasWon())
    if (!controller.allPositionsNotFilled(position)) {
      stopStdin();
      displayBoard(position);
      process.stdout.write('This Game is draw' + '\n');
      return;
    }
    displayBoard(position);
  });
};

const main = () => {
  const controller = new ControlGame();
  const isEOI = (key) => key === 'p';

  startStdin();
  watchStdin(isEOI, controller, position);
  displayBoard(position);




}

main();