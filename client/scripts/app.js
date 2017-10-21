var chatBox = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  roomnames: [],
  friends: []
};


app.init = function() {
  // console.log('app.init called');
  // $('.username').on('click', function () {
  //   app.handleUsernameClick();
  // });
  // $('#send').on('submit', '.submit', app.handleSubmit(event));
  // function() {
  //   debugger;
  //   console.log('here');
  //   app.handleSubmit(event);
  // });
};



app.send = function(messageObj) {
  
  // $.post('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', messageObj);
  // console.log('posted');
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: messageObj,
    //contentType: 'application/json',
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
  //var message;
  var message = $.get('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', function(data) {
    // console.log('data ', data);
    messages = data.results;
    //console.log('here');
    // console.log('messages ', messages);
    //console.log('end');
    for (var i = messages.length - 1; i >= 0; i--) {
      app.renderMessage(messages[i]);
      if (!app.roomnames.includes(messages[i].roomname)) {
        app.roomnames.push(messages[i].roomname);
        app.renderRoom(messages[i].roomname);
      }
      // console.log('roomname ', messages[i].roomname);
    }
  });
  window.bigTest = message;
  var arr = message.responseJSON;
  // console.log('message.res ', message);
  //console.log(message);
  
  // $.ajax({
  // // This is the url you should use to communicate with the parse API server.
  //   url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  //   type: 'GET',
  //   data: message,
  //   contentType: 'application/json',
  //   success: function (data) {
  //     console.log(data);
  //   },
  //   error: function (data) {
  //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //     console.error('chatterbox: Failed to recieve message', data);
  //   }
  // });
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
  if (app.friends.includes('username ' + message.username)) {
    var element = `<div class='username ${message.username} friend'><span>${message.username}</span>: ${message.text}</div>`;
    //var createEl = document.createElement('blink');
    // console.log('room select ', $('#roomSelect').val());
  } else {
    var element = `<div class='username ${message.username}'><span>${message.username}</span>: ${message.text}</div>`;
  }
  //var createEl = document.createElement('blink');
  // console.log('room select ', $('#roomSelect').val());
  if ($('#roomSelect').val() === message.roomname) {
    $('#chats').append(element);
  }
  //added under chats
  //declare a new variable element user name
  // var username = `<div class='username'>${message.username}</div>`;
  // //append the name to the #main with the username class
  // $('#main').append(username);
  //$('#main').addClass('username');
};
app.renderRoom = function(roomName) {
  var roomOption = document.getElementById('roomSelect');
  var option = document.createElement('option');
  option.text = roomName;
  roomOption.add(option);
  // var option = `<option class=${roomName}>${roomName}</option>`;
  //option.addClass(roomName);
  // if (!$('option').hasClass(roomName)) {
  //   $('#roomSelect').append(option);
  // }
  // var element = `<div>${roomName}</div>`;
  //$('#roomSelect').add(roomName);
};

app.handleUsernameClick = function (event) {
  app.friends.push($(this).attr('class'));
  // event.addClass('friend');
  console.log('handle ', this);
  $(this).addClass('friend');
//whatever blink .on click
//add class username to #main.
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
  console.log(message);
  //app.renderMessage(message);
  event.preventDefault();
  console.log(event);
  app.send(message);
  // app.send(document.getElementById('send'));
};

app.checkMessages = function() {
  this.fetch();
  setTimeout(app.checkMessage(), 10000);  
}; 


$(document).ready(function() {
  console.log('app.init called');
  $('#chats').on('click', '.username', function () {
    app.handleUsernameClick.call(this);
    app.clearMessages();
    app.fetch();
  });
  $('#send').on('click', '.submit', function() {
    // debugger;
    //console.log('here');
    app.handleSubmit(event);
    app.clearMessages();
    app.fetch();
  });
  $('#roomSelect').change(function() {
    console.log('hello');
    app.clearMessages();
    app.fetch();
  });
  app.fetch();


});

//send a message
//username




