//event handler in JavaScript is a matter of associating an event and an object with a JavaScript function. For example:

//Traditional approach

window.onload = init;

//That one line says that when the load event happens with the window, the init() function should be called. An event listener is created or registered, and the init() function will act as the event handler for the load event on the window object.

// You’ve also seen variations on this code multiple times by now:

document.getElementById('theForm').onsubmit = process;

//When the element with an id value of theForm triggers a submit event, the process() function is called.