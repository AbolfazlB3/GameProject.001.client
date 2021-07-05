import Core from './Core/Core.js'
import Viewport from './UI/viewport.js'
import { resources, loadResources } from './UI/GUIUtilities.js'

const canvas = document.getElementById('main_canvas')

canvas.addEventListener('contextmenu', event => event.preventDefault());


const canvasScale = 1

/*
const socket = io("localhost:3000");

socket.on("connect", () => {
  // either with send()
  socket.send("Hello!");

  // or with emit() and custom event names
  socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
});

// handle the event sent with socket.send()
socket.on("message", data => {
  console.log(data);
});

// handle the event sent with socket.emit()
socket.on("greetings", (elem1, elem2, elem3) => {
  console.log(elem1, elem2, elem3);
});

*/



const core = new Core();

const vp = new Viewport(canvas, 3, core);

core.setViewport(vp);

loadResources();

core.start();



