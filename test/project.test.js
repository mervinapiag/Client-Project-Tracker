'use strict';

require('dotenv').config({ path: '.env.test' });

const supertest = require('supertest');
const chai = require('chai');
const assert = require('assert');
const expect = chai.expect;
const app = require('../index');

const request = supertest(app);
const httpConstants = require('http2').constants;

describe('Project API', () => {
    let createdProjectId;

    it('should create a new project', (done) => {
        const project = {
            data: {
                client_name: 'Test Client',
                project_name: `Test Project ${Date.now()}`,
                description: 'This is a test project',
                status: 'pending',
                priority: 'high',
                start_date: '2026-09-10',
                due_date: '2026-09-30'
            }
        };

        request
            .post('/api/v1/projects/')
            .send(project)
            .expect(httpConstants.HTTP_STATUS_CREATED)
            .end((err, res) => {
                if (err) return done(err);

                assert(res.body.status === true);
                assert(res.body.message === 'Project successfully created');
                assert(res.body.data.client_name === project.data.client_name);
                assert(res.body.data.project_name === project.data.project_name);

                createdProjectId = res.body.data.id;

                done();
            });
    });

    it('should not create a project with duplicate project name', (done) => {
        const project = {
            data: {
                client_name: 'Test Client',
                project_name: `Duplicate Project ${Date.now()}`,
                description: 'Duplicate test',
                status: 'pending',
                priority: 'medium',
                start_date: '2026-09-10',
                due_date: '2026-09-20'
            }
        };

        request
            .post('/api/v1/projects/')
            .send(project)
            .end((err) => {
                if (err) return done(err);

                request
                    .post('/api/v1/projects/')
                    .send(project)
                    .end((err, res) => {
                        if (err) return done(err);

                        expect(res.statusCode)
                            .to.not.equal(httpConstants.HTTP_STATUS_CREATED);

                        done();
                    });
            });
    });

    it('should not create a project without client name', (done) => {
        const project = {
            data: {
                project_name: `No Client ${Date.now()}`,
                description: 'Test project',
                status: 'pending',
                priority: 'high',
                start_date: '2026-09-10',
                due_date: '2026-09-20'
            }
        };

        request
            .post('/api/v1/projects/')
            .send(project)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.statusCode)
                    .to.not.equal(httpConstants.HTTP_STATUS_CREATED);

                done();
            });
    });

    it('should not create a project without project name', (done) => {
        const project = {
            data: {
                client_name: 'Test Client',
                description: 'Test project',
                status: 'pending',
                priority: 'high',
                start_date: '2026-09-10',
                due_date: '2026-09-20'
            }
        };

        request
            .post('/api/v1/projects/')
            .send(project)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.statusCode)
                    .to.not.equal(httpConstants.HTTP_STATUS_CREATED);

                done();
            });
    });

    it('should not create a project with invalid status', (done) => {
        const project = {
            data: {
                client_name: 'Test Client',
                project_name: `Invalid Status ${Date.now()}`,
                description: 'Test project',
                status: 'invalid_status',
                priority: 'high',
                start_date: '2026-09-10',
                due_date: '2026-09-20'
            }
        };

        request
            .post('/api/v1/projects/')
            .send(project)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.statusCode)
                    .to.not.equal(httpConstants.HTTP_STATUS_CREATED);

                done();
            });
    });

    it('should not create a project with invalid priority', (done) => {
        const project = {
            data: {
                client_name: 'Test Client',
                project_name: `Invalid Priority ${Date.now()}`,
                description: 'Test project',
                status: 'pending',
                priority: 'invalid_priority',
                start_date: '2026-09-10',
                due_date: '2026-09-20'
            }
        };

        request
            .post('/api/v1/projects/')
            .send(project)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.statusCode)
                    .to.not.equal(httpConstants.HTTP_STATUS_CREATED);

                done();
            });
    });

    it('should not create a project when due date is earlier than start date', (done) => {
        const project = {
            data: {
                client_name: 'Test Client',
                project_name: `Invalid Dates ${Date.now()}`,
                description: 'Test project',
                status: 'pending',
                priority: 'high',
                start_date: '2026-09-30',
                due_date: '2026-09-10'
            }
        };

        request
            .post('/api/v1/projects/')
            .send(project)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.statusCode)
                    .to.not.equal(httpConstants.HTTP_STATUS_CREATED);

                done();
            });
    });

    it('should find all projects', (done) => {
        request
            .get('/api/v1/projects/')
            .expect(httpConstants.HTTP_STATUS_OK)
            .end((err, res) => {
                if (err) return done(err);

                assert(res.body.status === true);
                assert(res.body.message === 'Project successfully retrieved');
                assert(Array.isArray(res.body.data.projects));

                done();
            });
    });

    it('should find a project by its id', (done) => {
        request
            .get(`/api/v1/projects/${createdProjectId}`)
            .expect(httpConstants.HTTP_STATUS_OK)
            .end((err, res) => {
                if (err) return done(err);

                assert(res.body.status === true);
                assert(res.body.message === 'Project successfully retrieved');
                assert(res.body.data.id === createdProjectId);

                done();
            });
    });

    it('should update a project by id', (done) => {
        const updatedProject = {
            data: {
                client_name: 'Updated Client',
                project_name: `Updated Project ${Date.now()}`,
                description: 'Updated description',
                status: 'in_progress',
                priority: 'medium',
                start_date: '2026-09-10',
                due_date: '2026-10-01'
            }
        };

        request
            .put(`/api/v1/projects/${createdProjectId}`)
            .send(updatedProject)
            .expect(httpConstants.HTTP_STATUS_OK)
            .end((err, res) => {
                if (err) return done(err);

                assert(res.body.status === true);
                assert(res.body.message === 'Project successfully updated');
                assert(res.body.data.id === createdProjectId);

                done();
            });
    });

    it('should delete a project by id', (done) => {
        request
            .delete(`/api/v1/projects/${createdProjectId}`)
            .expect(httpConstants.HTTP_STATUS_OK)
            .end((err) => {
                done(err);
            });
    });
});