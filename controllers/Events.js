'use strict';

const utils = require('../utils/writer.js');
const Events = require('../service/EventsService');

module.exports.eventsEventIdGET = function eventsEventIdGET (req, res, next) {
  const event_id = req.swagger.params['event_id'].value;
  Events.eventsEventIdGET(event_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};

module.exports.eventsGET = function eventsGET (req, res, next) {
  const offset = req.swagger.params['offset'].value;
  const limit = req.swagger.params['limit'].value;
  Events.eventsGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};
