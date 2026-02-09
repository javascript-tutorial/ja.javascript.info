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
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
  }
};
