'use strict';

const Joi = require('joi');
/**
 * Project Requests
 * 
 */

//status arr
const statusArr = [
    'pending',
    'in_progress',
    'completed',
    'cancelled'
];

const priorityArr = [
    'low',
    'medium',
    'high'
];

//create project
const postRequestSchema = Joi.object({
    data: {
        client_name: Joi.string()
                        .min(2)
                        .required()
                        .messages(
                            { 
                                'any.required': 'Client Name is required', 
                                'string.empty': 'Client Name is required', 
                                'string.min': 'Client Name must be at least 2 characters' 
                            }
                        ),
        project_name: Joi.string()
                         .min(2)
                         .required()
                         .messages(
                                { 
                                    'any.required': 'Project Name is required', 
                                    'string.empty': 'Project Name is required', 
                                    'string.min': 'Project Name must be at least 2 characters' 
                                }
                         ),
        description: Joi.string().allow('').optional(), 
        status: Joi.string()
                   .valid(...statusArr)
                   .required()
                   .messages(
                        { 
                            'any.required': 'Status is required', 
                            'any.only': 'Status must be one of: pending, in_progress, completed, cancelled' 
                        }
                    ),
        priority: Joi.string()
                     .valid(...priorityArr)
                     .required()
                     .messages(
                        { 
                            'any.required': 'Priority is required', 
                            'any.only': 'Priority must be one of: low, medium, high' 
                        }
                    ),
        start_date: Joi.date()
                       .required()
                       .messages(
                            { 
                                'any.required': 'Start Date is required', 
                                'date.base': 'Start Date must be a valid date' 
                            }
                        ),
        due_date: Joi.date()
                     .greater(Joi.ref('start_date'))
                     .messages(
                        { 
                            'any.required': 'Due Date is required', 
                            'date.base': 'Due Date must be a valid date', 
                            'date.greater': 'Due Date cannot be earlier than Start Date' 
                        }
                    )
    }
});

//update project
const patchRequestSchema = Joi.object({
    data: {
        client_name: Joi.string().min(2).messages({ 'string.min': 'Client Name must be at least 2 characters' }),
        project_name: Joi.string().min(2).messages({ 'string.min': 'Project Name must be at least 2 characters' }),
        description: Joi.string().allow(''),
        status: Joi.string().valid(...statusArr).messages({ 'any.only': 'Status must be one of: pending, in_progress, completed, cancelled' }),
        priority: Joi.string().valid(...priorityArr).messages({ 'any.only': 'Priority must be one of: low, medium, high' }),
        start_date: Joi.date().messages({ 'date.base': 'Start Date must be a valid date'}),
        due_date: Joi.date()
    }
});

// id schema for url params
const idSchema = Joi.object({
    id: Joi.number()
           .integer()
           .required()
           .messages(
                { 
                    'any.required': 'Project ID is required', 
                    'number.base': 'Project ID must be a number', 
                    'number.integer': 'Project ID must be an integer' 
                }
            )
});

// schema for get request
const getRequestSchema = Joi.object({
    limit: Joi.number().integer().default(10),
    offset: Joi.number().integer().default(1),
    status: Joi.string()
        .valid('pending', 'in_progress', 'completed', 'cancelled'),
    priority: Joi.string()
        .valid('low', 'medium', 'high')
}).default();


module.exports = {
    postRequestSchema, patchRequestSchema,
    getRequestSchema, idSchema
}