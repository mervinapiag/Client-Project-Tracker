'use strict';
const logger = require('../../../../utils/logger').child({name: 'auth'});
const projectService = require('../services/project');
const httpConstants = require('http2').constants;

/**
 * Project Controllers
 * 
 */

//Create Project
const create = ()=> {
    
    return (req, res) => {

        projectService.create(req.body.data)
        .then(data => {
            res.status(httpConstants.HTTP_STATUS_CREATED).json({
                status: true,
                message: "Project successfully created",
                data: data
            });
        })
        .catch(err => {
            logger.error(err);
            res.status(httpConstants.HTTP_STATUS_BAD_REQUEST)
                .json({
                    status: false,
                    message: err.message
                })
        });
    }

};

//Find All Projects
const findAll = () => {

    return (req, res) => {
        //For Filters
        const { limit, offset, status, priority } = req.query;
        projectService.findAll(limit, offset, { status, priority })
            .then(data => {
                res.status(httpConstants.HTTP_STATUS_OK).json({
                    status: true,
                    message: "Project successfully retrieved",
                    data: data
                });
            })
            .catch(err => {
                logger.error(err);
                res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).json({
                    status: false,
                    message: err.message
                });
            });
    }
};

//Find Project
const findByPk = () => {
    return (req, res) => {
        projectService.findByPk(req.params.id)
        .then(data => {
            res.status(httpConstants.HTTP_STATUS_OK).json({
                status: true,
                message: "Project successfully retrieved",
                data: data
            });
        })
        .catch(err => {
            logger.error(err)
            res.status(httpConstants.HTTP_STATUS_NOT_FOUND).json({
                status: false,
                message: err.message
            });
        });
    };
}


//Update Project
const update = ()=> {
    return (req, res) => {
        projectService.update(req.params.id, req.body.data)
            .then(data => {
                res.status(httpConstants.HTTP_STATUS_OK).json({
                    status: true,
                    message: "Project successfully updated",
                    data: data
                });
            })
            .catch(err => {
                logger.error(err)
                const statusCode = err?.message === 'Project not found' ? 
                httpConstants.HTTP_STATUS_NOT_FOUND : httpConstants.HTTP_STATUS_BAD_REQUEST;
                res.status(statusCode).json({
                    status: false,
                    message: err.message
                });
            });
    };
};

//Destroy Project
const destroy = () => {
    return (req, res) => {
        projectService.destroy(req.params.id)
            .then(() => {
                res.status(httpConstants.HTTP_STATUS_OK).json({
                    status: true,
                    message: "Project successfully deleted",
                });
            })
            .catch(err => {
                logger.error(err)
                res.status(httpConstants.HTTP_STATUS_NOT_FOUND).json({
                    status: false,
                    message: err.message
                });
            });
    };
};

module.exports = {
    create, findAll, 
    findByPk, update, destroy
}