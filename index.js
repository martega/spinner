////////////////////////////////////////////////////////////////////////////
//                    index.js for the spinner module                     //
////////////////////////////////////////////////////////////////////////////

var colors = require('colors');

module.exports = function Spinner(duringMessage, successMessage, errorMessage) {
  successMessage = successMessage || duringMessage;
  errorMessage   = errorMessage   || successMessage;

  var bars       = ['-', '\\', '|', '/']
    , currentBar = 0
    , state      = 'waiting'
    , timer;

  function start() {
    if (state === 'waiting') {
      state = 'running';
      tick();
    }
  }

  function end() {
    if (state === 'running') {
      state = 'done';
      clearTimeout(timer);
      process.stdout.clearLine();
      process.stdout.write('\r\u2713 '.bold.green + successMessage + '\n');
    }
  }

  function error() {
    if (state === 'running') {
      state = 'done';
      clearTimeout(timer);
      process.stdout.clearLine();
      process.stdout.write('\r\u2718 '.bold.red + errorMessage + '\n');
    }
  }

  function tick() {
    if (state === 'running') {
      var bar = bars[currentBar++ % bars.length];
      process.stdout.write('\r' + bar.bold.cyan + ' ' + duringMessage + ' ');
      timer = setTimeout(tick, 200);
    }
  }

  //------------------------------------------------------------------------

  return {
    start : start,
    end   : end,
    error : error
  };
};
