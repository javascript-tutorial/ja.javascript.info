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
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
  }
};
