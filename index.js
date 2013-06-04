////////////////////////////////////////////////////////////////////////////
//                    index.js for the spinner module                     //
////////////////////////////////////////////////////////////////////////////

var colors = require('colors');

module.exports = function Spinner(duringMessage, afterMessage) {
  afterMessage = afterMessage || duringMessage;

  var notStarted   = true
    , states       = ['-', '\\', '|', '/']
    , currentState
    , timer;

  function start() {
    if (notStarted) {
      notStarted = false;
      currentState = 0;
      tick();
    }
  }

  function end() {
    clearTimeout(timer);
    process.stdout.clearLine();
    process.stdout.write('\r+ ' + afterMessage + '\n');
  }

  function tick() {
    var bar = states[currentState++ % states.length];
    process.stdout.write('\r' + bar.bold.cyan + ' ' + duringMessage + ' ');
    timer = setTimeout(tick, 200);
  }

  //------------------------------------------------------------------------

  return {
    start : start,
    end   : end
  };
};
