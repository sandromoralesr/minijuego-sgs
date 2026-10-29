export const LEVELS = {
  // Nivel 1: S
  level1: {
    letter: 'S',
    nextLevel: 'level2',

    platformScale: 2.0,
    ballScale: 1.45,
    ballSpeedMin: 230,
    ballSpeedMax: 290,
    obstacleScale: 0.82,

    pattern: [
      'xxxxx',
      'x    ',
      'x    ',
      'xxxxx',
      '    x',
      '    x',
      'xxxxx'
    ]
  },

  // Nivel 2: G
  level2: {
    letter: 'G',
    nextLevel: 'level3',

    platformScale: 1.85,
    ballScale: 1.38,
    ballSpeedMin: 275,
    ballSpeedMax: 345,
    obstacleScale: 0.80,

    pattern: [
      'xxxxx',
      'x    ',
      'x    ',
      'x  xx',
      'x   x',
      'x   x',
      'xxxxx'
    ]
  },

  // Nivel 3: S
  level3: {
    letter: 'S',
    nextLevel: 'winScene',

    platformScale: 1.65,
    ballScale: 1.32,
    ballSpeedMin: 320,
    ballSpeedMax: 405,
    obstacleScale: 0.78,

    pattern: [
      'xxxxx',
      'x    ',
      'x    ',
      'xxxxx',
      '    x',
      '    x',
      'xxxxx'
    ]
  }
};
