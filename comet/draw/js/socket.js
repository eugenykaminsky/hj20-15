'use strict';

window.editor.addEventListener("update", update);

function update(event) {
  let canvas = event.canvas,
    ctx = canvas.getContext("2d"),
    connection = new WebSocket("wss://neto-api.herokuapp.com/draw");

  connection.addEventListener("open", () => {
    canvas.toBlob(blob => {
      connection.send(blob);
    });
  });
}

