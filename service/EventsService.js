'use strict';


/**
 * Delete an existing event.
 *
 * event_id Long The id of the desired event.
 * no response value expected for this operation
 **/
exports.eventsEventIdDELETE = function(event_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


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
  "book" : {
    "available_quantity" : 5,
    "themes" : [ { }, { } ],
    "num_of_pages" : 1,
    "imgpath" : "imgpath",
    "genres" : [ { }, { } ],
    "isbn13" : 0,
    "abstract" : "abstract",
    "current_price" : 6.0274563,
    "availability" : "unreleased",
    "title" : "title",
    "interview" : "interview",
    "cover_type" : "hard cover"
  },
  "organizer_email" : "organizer_email",
  "description" : "description",
  "location" : "location",
  "book_id" : "book_id"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing event information.
 *
 * event_id Long The id of the desired event.
 * event Event The fields to update.
 * no response value expected for this operation
 **/
exports.eventsEventIdPUT = function(event_id,event) {
  return new Promise(function(resolve, reject) {
    resolve();
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


/**
 * Inserts a new Event.
 *
 * event Event The event to be inserted.
 * returns inline_response_200_5
 **/
exports.eventsPOST = function(event) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "author_id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

