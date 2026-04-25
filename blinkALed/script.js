"use strict";

let port;
let writer;

const connectBtn = document.getElementById("connect");
const disconnectBtn = document.querySelector(".disconnect");
const onBtn = document.getElementById("on");
const offBtn = document.getElementById("off");

function setConnectedUI(isConnected) {
  connectBtn.classList.toggle("hidden", isConnected);
  disconnectBtn.classList.toggle("hidden", !isConnected);
}

connectBtn.onclick = async () => {
  try {
    // For Opening the dialog up to select the port connected to!
    port = await navigator.serial.requestPort();
    console.log(port);

    // Baud rate is the connection rate your module and front end would use to connect
    // always set them
    await port.open({ baudRate: 9600 });

    // only you write !!!
    writer = port.writable.getWriter();

    setConnectedUI(true);
    alert("Connected to Arduino");
  } catch (error) {
    console.error(error);
    alert("Failed to connect to Arduino");
  }
};

disconnectBtn.onclick = async () => {
  try {
    if (writer) {
      // close the connection
      await writer.close();
      writer = null;
    }

    if (port) {
      // close the port
      await port.close();
      port = null;
    }

    setConnectedUI(false);
    alert("Disconnected from Arduino");
  } catch (error) {
    console.error(error);
    alert("Failed to disconnect");
  }
};

onBtn.onclick = async () => {
  if (!writer) {
    alert("Connect to Arduino first");
    return;
  }

  // write to the arduino
  await writer.write(new TextEncoder().encode("ON\n"));
};

offBtn.onclick = async () => {
  if (!writer) {
    alert("Connect to Arduino first");
    return;
  }
  // write to the  arduino
  await writer.write(new TextEncoder().encode("OFF\n"));
};
