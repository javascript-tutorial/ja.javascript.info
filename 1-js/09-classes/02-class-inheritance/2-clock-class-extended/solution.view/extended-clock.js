class ExtendedClock extends Clock {
  constructor(options) {
    super(options);
<<<<<<< HEAD
    let { precision=1000 } = options;
    this._precision = precision;
  }

  start() {
    this._render();
    this._timer = setInterval(() => this._render(), this._precision);
=======
    let { precision = 1000 } = options;
    this.precision = precision;
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), this.precision);
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
  }
};
