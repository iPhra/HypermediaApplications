'use strict';


/**
 * Returns the full description of an Event.
 *
 * event_id Long The id of the desired event.
 * returns Event
 **/
exports.eventsEventIdGET = function(event_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "date",
  "imgpath" : "imgpath",
  "description" : "description",
  "location" : "location",
  "book_id" : "book_id",
  "organiser_email" : "organiser_email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns a list of all the events.
 *
 * offset Long Offset with regards to the current page. (optional)
 * limit Long Items per page. (optional)
 * returns List
 **/
exports.eventsGET = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "{}", "{}" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

