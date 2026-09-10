'use strict';
const express = require('express');
const router = express.Router();
const project = require('../controllers/project');
const { postRequestSchema, patchRequestSchema, 
    getRequestSchema, idSchema
} = require('../requests/project');
const validator = require('express-joi-validation').createValidator({});
/**
 * Todo Routes
 * 
 */
const routes = () => {
    router.post('/',validator.body(postRequestSchema), project.create());
    router.get('/', validator.query(getRequestSchema), project.findAll());
    router.get('/:id', validator.params(idSchema), project.findByPk() );
    router.delete('/:id', validator.params(idSchema), project.destroy());
    router.put('/:id', validator.params(idSchema), validator.body(postRequestSchema), project.update());
    router.patch('/:id', validator.params(idSchema), validator.body(patchRequestSchema), project.update());
    return router;
};

module.exports = routes;