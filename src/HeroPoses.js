module.exports = [
  {
    name: "run",
    interval: 400,
    frames: [
      {
        x: 236,
        y: 8,
        width: 28,
        height: 44
      },
      {
        x: 296,
        y: 8,
        width: 25,
        height: 44
      }
    ]
  },
  {
    name: "jump",
    interval: 400,
    frames: [
      {
        x: 95,
        y: 89,
        width: 42,
        height: 51
      },
      {
        x: 183,
        y: 58,
        width: 45,
        height: 62
        // offsetX ?? or maybe anchor .5 would be a better way to go...
      }
    ]
  }
];
