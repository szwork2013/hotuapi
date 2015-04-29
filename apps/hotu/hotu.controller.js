'use strict';

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /hotu              ->  index
 * POST    /hotu              ->  create
 * GET     /hotu/:id          ->  show
 * PUT     /hotu/:id          ->  update
 * DELETE  /hotu/:id          ->  destroy
 */

var _ = require('lodash');
var Drawing = require('./drawing.model');

function handleError(res, err) {
  // return res.send(500, err);
  return res.json(['500', err]);
}
function exist(k){
  return (k !== null) && (k !== undefined);
}

// Creates a new hotu in the DB.
function postDrawing(req, res) {
  var body = req.body;
  var userid = body.userid;
  var drawid = body.drawid;
  var data = body.data;
  var title = body.title;
  var desc = body.desc;

  var query = {
    'userid':userid,
    'drawid':drawid,
  };

  var all = {
    'userid':userid,
    'drawid':drawid,
    'data':data,
    'desc':desc,
    'title':title
  };

  if (exist(userid)&&exist(drawid)&&exist(data)) {
    Drawing.find(query, function(e, d) {
      if (e) return handleError(res, e);
      if(d&&d.length){
        _update(res, query, data);
      }else{
        _create(res, all);
      }
    });
  } else {
    return handleError(res, null);
  }
}

// 替换
function _update(res, query, data) {
  if (exist(query) && exist(data) ) {
    Drawing.update(query, {
      '$set': {
        'data': data
      }
    }, function(e, d) {
      if (e) return handleError(res, e);
      res.json(d);
    });
  } else {
    return handleError(res, null);
  }
}

// 创建
function _create (res, all) {
  Drawing.create(all, function(e, d) {
    if (e) return handleError(res, e);
    res.json(d);
  });
}

// 查询
function getDrawing(req, res) {
  var query = req.query;
  var userid = query.userid;
  var drawid = query.drawid;
  if (exist(userid) && exist(drawid)) {
    Drawing.find({
      'userid': userid,
      'drawid': drawid,
    }, {_id:0}, function(e, d) {
      if (e) return handleError(res, e);
      res.json(d[0]);
    });
  }else{
    return handleError(res, '查询字段可能有误');
  }
}

module.exports = {
  'getDrawing':getDrawing,
  'postDrawing':postDrawing
};
// // Get list of hotu
// exports.index = function(req, res) {
//   Hotu.find(function (err, hotu) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, hotu);
//   });
// };

// // Get a single hotu
// exports.show = function(req, res) {
//   DrawData.findById(req.params.id, function (err, hotu) {
//     if(err) { return handleError(res, err); }
//     if(!hotu) { return res.send(404); }
//     return res.json(hotu);
//   });
// };

// // Creates a new hotu in the DB.
// exports.create = function(req, res) {
//   DrawData.create(req.body, function(err, hotu) {
//     if(err) { return handleError(res, err); }
//     return res.json(201, hotu);
//   });
// };

// // Updates an existing hotu in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   DrawData.findById(req.params.id, function (err, hotu) {
//     if (err) { return handleError(res, err); }
//     if(!hotu) { return res.send(404); }
//     var updated = _.merge(hotu, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.json(200, hotu);
//     });
//   });
// };

// // Deletes a hotu from the DB.
// exports.destroy = function(req, res) {
//   Hotu.findById(req.params.id, function (err, hotu) {
//     if(err) { return handleError(res, err); }
//     if(!hotu) { return res.send(404); }
//     hotu.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };


