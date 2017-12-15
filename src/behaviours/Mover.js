export default () => {
  return {
    // I know this isn't right.. but..
    setParent: parent => {
      this.parent = parent;
    },
    bark: () => console.log("Woof"),
    dwa: () => {
      console.log("dwaaaaaaaaaaaaaa");
      console.log(this);
      console.log(this.WAKEUP);
      console.log(this.parent);
      console.log(this.parent.WAKEUP);
    }
    // set x(x) {
    //   this.sprite.position.x = x;
    // },
    // get x() {
    //   // console.log("hey, good effort");

    //   return this.sprite.position.x;
    // }
  };
};
// export default class Mover {
//   dwa() {
//     console.log("dwaaaaaaaaaaaaaa");
//     console.log(this);
//     console.log(this.WAKEUP);
//   }
// }
// export function Mover() {
//   console.log("profile test ");
//   console.log(this);
// }
// export default Mover;
