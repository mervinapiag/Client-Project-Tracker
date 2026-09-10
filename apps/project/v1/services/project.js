'use strict';

const projectRepository = require('../repositories/project');
/**
 * Project Repositories
 * 
 */

/**
 * Create a Project
 */

const create =  async (projectObj) => {

    //Check if product name is exist
    const isAvailable = await projectRepository.existingName(projectObj.project_name);

    if (!isAvailable) {
        throw new Error('Project Name already exists');
    }

    return projectRepository.create(projectObj);
};

/**
 * Find All Projects
 */
const findAll = async (limit = 10, offset = 0, filters = {}) => {

    //For Filtering
    const where = {};

    if (filters.status) {
        where.status = filters.status;
    }

    if (filters.priority) {
        where.priority = filters.priority;
    }

    const { rows, count} = await projectRepository.findAll(
        where, limit, offset, 
    )

    return {
        projects : rows,
        count, 
        offset, 
        limit
    };

};

/**
 * Find Project by its Primary Id
 */
const findByPk = async (id) => {
    // Check if the project with the specified ID exists
    const project = await projectRepository.findByPk(id);
    if(!project) throw new Error('Project not found!');

    return project;
};


/**
 * Update a Project by its Id
 */

const update = async(id, projectObj) => {
    // Check if the project with the specified ID exists
    const project = await projectRepository.findByPk(id);
  
    return await project.update(projectObj);

}

/**
 * Delete a project by its ID.
 *
 */
const destroy = async(id) => {

    // Check if the project with the specified ID exists
    const project = await findByPk(id);
    
    return await project.destroy();

}

module.exports = {
    create, update, findAll, findByPk, destroy
}