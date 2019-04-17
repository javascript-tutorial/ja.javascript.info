class Clock {
  constructor({ template }) {
<<<<<<< HEAD
    this._template = template;
  }

  _render() {
=======
    this.template = template;
  }

  render() {
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
<<<<<<< HEAD
    if (mins < 10) min = '0' + mins;
=======
    if (mins < 10) mins = '0' + mins;
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

<<<<<<< HEAD
    let output = this._template
=======
    let output = this.template
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
<<<<<<< HEAD
    clearInterval(this._timer);
  }

  start() {
    this._render();
    this._timer = setInterval(() => this._render(), 1000);
=======
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
  }
}
