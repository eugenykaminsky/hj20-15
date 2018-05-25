'use strict';

function pooling() {
  let elemPooling = document.querySelectorAll(".pooling > div"),
    xhr = new XMLHttpRequest();

  xhr.open("GET", "https://neto-api.herokuapp.com/comet/pooling", false);
  xhr.send();
  arrayScan(elemPooling, xhr.responseText);
}

setInterval(pooling, 5000);

function longPooling() {
  let elemlongPooling = document.querySelectorAll(".long-pooling > div"),
    xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState != 4) return;

    if (this.status == 202) {
      arrayScan(elemlongPooling, xhr.responseText.trim());
    }

    longPooling();
  };

  xhr.open("GET", "https://neto-api.herokuapp.com/comet/long-pooling", true);
  xhr.send();
}
longPooling();

let connection = new WebSocket("wss://neto-api.herokuapp.com/comet/websocket");

connection.addEventListener("message", function(event) {
  let socket = document.querySelectorAll(".websocket > div");
  arrayScan(socket, event.data);
});

function arrayScan(data, num) {
  Array.from(data).forEach(function(item) {
    item.classList.remove("flip-it");
    if (item.innerHTML === num) {
      item.classList.add("flip-it");
    }
  });
}

