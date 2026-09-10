'use strict';

const models = require('../../../../models');

/**
 * Project Services
 * 
 */

/**
 * Create a Project
 * @param {Object} projectObj - The Project object
 * @returns {Promise<Object>} - A Promise that resolves to the created project object.
 */
const create =  async (projectObj) => {

    return models.Project.create(projectObj);

};

/**
 * Find All Projects
 * @param {int} offset - Number of items to skip before fetching the current page.
 * @param {int} limit -  Extract the number of items to display default to 10 if not provided).
 * @returns {Array<Object>} - A Promise that resolves to an object containing the paginated projects.
 */
const findAll = async (where, limit, offset  )=> {
    console.log(where);
    const { rows, count} = await models.Project.findAndCountAll({
        where,limit, offset
    })

    return {
        rows,
        count, 
        offset, 
        limit
    };

};

/**
 * Find Project by its Primary Id
 * @param {int} id - ID of a project
 * @returns {Promise<Object>} A Promise that resolves to the retrieved projects.
 * @throws {Error} If the project with the specified ID does not exist.
 */
const findByPk = async (id) => {
    // Check if the project with the specified ID exists
    const project = await models.Project.findByPk(id);
    if(!project) throw new Error('Project not found!');

    return project;
};

/**
 * Check Existing Project by its Name
 * @param {String} name - Name of a project
 * @returns {Promise<Object>} A Promise that resolves to the retrieved projects.
 * @throws {Error} If the project with the specified Name does not exist.
 */
const existingName = async(name) => {

   // Check if the project with the specified name exists
    const project = await models.Project.findOne({
        where: {
            project_name: name
        }
    });

    if(project) {
        throw new Error('Project Name already exists');
    } else {
        return true;
    };
    
};

/**
 * Update a Project by its Id
 * @param {id} id = ID of a Project
 * @param {Object} projectObj - The project object
 * @returns {Promise<Object>} - A Promise that resolves to the updated project object.
 * @throws {Error} If the project with specified ID does not exist.
 */
const update = async(id, projectObj) => {
    // Check if the project with the specified ID exists
    const project = await findByPk(id);
  
    return await project.update(projectObj);

}

/**
 * Delete a project by its ID.
 *
 * @param {number} projectId - The ID of the project to delete.
 * @returns {Promise<number>} A Promise.
 * @throws {Error} If the project with the specified ID does not exist.
 */
const destroy = async(id) => {

    // Check if the project with the specified ID exists
    const project = await findByPk(id);
    
    return await project.destroy();

}

module.exports = {
    create, update, findAll, findByPk, destroy,existingName
}