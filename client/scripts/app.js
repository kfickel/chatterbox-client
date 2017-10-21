var chatBox = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
};

app.init = function() {
  $('.username').on('click', function () {
    app.handleUsernameClick();
  });
  $('#send .submit').submit(function() {
    //debugger;
    console.log('here');
    app.handleSubmit();
  });
};

app.send = function(messageObj) {
  var message = {
    username: 'shawndrost',
    text: 'trololo',
    roomname: '4chan'
  };
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: messageObj,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
  
};
app.fetch = function() {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  var chatNode = document.getElementById('chats');
  //console.log($('#chats'));
  //NOTE TO SELVES: need to change this for all childNodes
  while (chatNode.hasChildNodes()) {
    chatNode.removeChild(chatNode.lastChild);
  }
};

app.renderMessage = function(message) {
  //added under chats
  //declare a new variable element user name
  var username = `<div class='username'>${message.username}</div>`;
  //append the name to the #main with the username class
  $('#main').append(username);
  var element = `<blink>${message.username}: ${message.text}</blink>`;
  //var createEl = document.createElement('blink');
  $('#chats').append(element);
};
app.renderRoom = function(roomName) {
  var element = `<div>${roomName}</div>`;
  $('#roomSelect').append(element);
};

app.handleUsernameClick = function () {
//whatever blink .on click
//add class username to #main.
};
app.handleSubmit = function() {
  var separateInfo = window.location.search;
  var startIndex = separateInfo.indexOf('username=');
  var username = separateInfo.slice(startIndex + 9, separateInfo.length);
  var endMessageInd = separateInfo.indexOf('&submit=');
  var text = separateInfo.slice(9, endMessageInd);
  var message = {
    username: username,
    text: text,
    roomname: 'cool'
  };
  console.log(message);
  app.renderMessage(message);
  //app.send(document.getElementById('send'));
};


