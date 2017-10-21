var chatBox = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  roomnames: [],
  friends: []
};


app.init = function() {

};

app.send = function(messageObj) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: messageObj,
    success: function (data) {
      console.log('chatterbox: Message sent', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.log('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    success: function (data) {
      
      // console.log(data);
      data = data.results;
      for (var i = data.length - 1; i >= 0; i--) {
        app.renderMessage(data[i]);
        if (!app.roomnames.includes(data[i].roomname)) {
          app.roomnames.push(data[i].roomname);
          app.renderRoom(data[i].roomname);
        }
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to recieve message', data);
    }
  });
};

app.clearMessages = function() {
  var chatNode = document.getElementById('chats');
  while (chatNode.hasChildNodes()) {
    chatNode.removeChild(chatNode.lastChild);
  }
};

app.renderMessage = function(message) {
  var createElement = document.createElement('div');
  var usernameEl = document.createElement('div');
  $(createElement).text(message.text);
  var xssText = $(createElement).text();
  $(usernameEl).text(message.username);
  var xssUser = $(usernameEl).text();

  if (app.friends.includes('username ' + message.username)) {
    var element = `<div class='username ${xssUser} friend'><span>${xssUser}</span>: ${xssText}</div>`;
  } else {
    var element = `<div class='username ${xssUser}'><span>${xssUser}</span>: ${xssText}</div>`;
  }
  var currentRoom = $('#roomSelect').val() || 'lobby';
  if (currentRoom === message.roomname) {
    $('#chats').append(element);
  }
};

app.renderRoom = function(roomName) {
  var roomOption = document.getElementById('roomSelect');
  var option = document.createElement('option');
  $(option).text(roomName);
  var xssRoom = $(option).text();
  option.text = xssRoom;
  roomOption.add(option);
};

app.handleUsernameClick = function (event) {
  app.friends.push($(this).attr('class'));
  $(this).addClass('friend');
};

app.handleSubmit = function(event) {
  var separateInfo = window.location.search;
  var startIndex = separateInfo.indexOf('username=');
  var username = separateInfo.slice(startIndex + 9, separateInfo.length);
  var text = $('#message').val();
  var message = {
    username: username,
    text: text,
    roomname: $('#roomSelect').val()
  };
  if (event) {
    event.preventDefault();
  }
  app.send(message);
};

app.checkMessages = function() {
  this.fetch();
  setTimeout(app.checkMessage(), 10000);  
}; 


$(document).ready(function() {
  $('#chats').on('click', '.username', function () {
    app.handleUsernameClick.call(this);
    app.clearMessages();
    app.fetch();
  });

  $('#send').on('click', '.submit', function() {
    app.handleSubmit(event);
    app.clearMessages();
    app.fetch();
  });

  $('#send').on('click', '.createRoom', function() {
    var message = {
      roomname: $('#message').val()
    };
    app.renderRoom();
    app.send(message);
    app.clearMessages();
    app.fetch();
    event.preventDefault();
  });

  $('#roomSelect').change(function() {
    app.clearMessages();
    app.fetch();
  });
  // app.fetch();
  // setTimeout(app.fetch, 20000);
});


