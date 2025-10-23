// epoch.js

// Call this function when the page has loaded
// and when mouseovers occur:
function updateDuration() {
    'use strict';

    // Get now:
    var now = new Date();

    // Create the message:
    var message = 'It has been ' + now.getTime();
    message += ' milliseconds since the epoch. (mouseover to update)';

 