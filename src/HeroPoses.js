module.exports = [
  {
    name: "walk",
    interval: 300,
    frames: [
      {
        x: 196,
        y: 9,
        // Keep all the dimensions the same where possible
        // as it effects the bounding box currently
        // Update: That's dumb, let things have a root width/height for collisions.
        width: 36,
        height: 43
      },
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
      },
      {
        x: 236,
        y: 8,
        width: 28,
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
      }
    ]
  },
  {
    name: "fall",
    interval: 400,
    frames: [
      {
        x: 183,
        y: 58,
        width: 45,
        height: 62
        // offsetX ?? or maybe anchor .5 would be a better way to go...
      }
    ]
  },
  {
    name: "dead",
    interval: 400,
    frames: [
      {
        x: 183, // TODO
        y: 58,
        width: 45,
        height: 62
        // offsetX ?? or maybe anchor .5 would be a better way to go...
      }
    ]
  }
];
