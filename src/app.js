
var config = {
    1: {
        'name': 'Blue',
        'div': 'bluePlayer'
    },
    2: {
        'name': 'Red',
        'div': 'redPlayer'
    },
    3: {
        'name': 'Yellow',
        'div': 'yellowPlayer'
    },
    4: {
        'name': 'Green',
        'div': 'greenPlayer'
    }
}

var ws = new WebSocket("ws://localhost:8000/ws")
ws.onmessage = event => {
    data = JSON.parse(event.data);
    for (const player in data.stats) {
        $('#' + config[player].div + '-Timer').html(msToTime(data.stats[player]))
    }
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    console.log(event.key)
    switch (event.key) {
      case 'P':
        console.log('Sending PAUSE')
        ws.send('P')
        break
      case 'R':
        console.log('Sending RESET')
        ws.send('R')
        break
      case 'C':
        console.log('Sending CONTINUE')
        ws.send('C')
        break
    }
  
  }, true);


function msToTime(s) {
    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
      z = z || 2;
      return ('00' + n).slice(-z);
    }
    var ms = s % 10;
    s = (s - (s % 1000)) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
  
    return pad(mins, 1) + ':' + pad(secs) + '.' + pad(ms, 1);
  }