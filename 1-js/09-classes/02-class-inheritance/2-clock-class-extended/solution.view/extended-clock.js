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
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
  }
};
