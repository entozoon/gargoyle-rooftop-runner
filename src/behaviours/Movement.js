export default () => {
  // Genuinely don't know why this won't work (trying to avoid a .init)
  // this.parent = parent;

  return {
    setParent(_parent) {
      this.parent = _parent;
    },
    set x(_) {
      this._x = _;
      // console.log(this.parent);

      this.parent.sprite.position.x = _;
    },
    get x() {
      return this._x;
    },
    set y(_) {
      this._y = _;
      this.parent.sprite.position.y = _;
    },
    get y() {
      return this._y;
    }
  };
};
