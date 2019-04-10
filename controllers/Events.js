'use strict';

var utils = require('../utils/writer.js');
var Events = require('../service/EventsService');

module.exports.eventsEventIdDELETE = function eventsEventIdDELETE (req, res, next) {
  var event_id = req.swagger.params['event_id'].value;
  Events.eventsEventIdDELETE(event_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsEventIdGET = function eventsEventIdGET (req, res, next) {
  var event_id = req.swagger.params['event_id'].value;
  Events.eventsEventIdGET(event_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};

module.exports.eventsEventIdPUT = function eventsEventIdPUT (req, res, next) {
  var event_id = req.swagger.params['event_id'].value;
  var event = req.swagger.params['event'].value;
  Events.eventsEventIdPUT(event_id,event)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsGET = function eventsGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Events.eventsGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};

module.exports.eventsPOST = function eventsPOST (req, res, next) {
  var event = req.swagger.params['event'].value;
  Events.eventsPOST(event)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
