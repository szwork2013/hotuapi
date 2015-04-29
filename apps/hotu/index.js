'use strict';

var express = require('express');
var hotu = require('./hotu.controller');

var router = express.Router();
router.post('/drawing', hotu.postDrawing);
router.get('/drawing', hotu.getDrawing);


// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
